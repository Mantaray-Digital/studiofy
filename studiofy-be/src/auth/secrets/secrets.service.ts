import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/modules/users/entities/users.entity';
import { randomUUID } from 'crypto';
import { TokenPayload } from 'src/types/token.payload';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { decrypt } from 'src/utils/decrypt';

@Injectable()
export class SecretsService {
  private readonly jwtSecret: string;
  private readonly refreshJwtSecret: string;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
   this.jwtSecret = this.configService.getOrThrow('JWT_SECRET');
   this.refreshJwtSecret = this.configService.getOrThrow('JWT_REFRESH_SECRET');
  }

 
  getJwtSecret(): string {
    return this.jwtSecret;
  }


  async assignTokens(
    user: UserDocument,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const sessionId = randomUUID();

    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      sessionId,
    };

    return this.issueTokens(payload);
  }

  async refreshAccessToken(token: string) {
    let decoded: TokenPayload;

    try {
      decoded = this.jwtService.verify(token, {
        secret: this.refreshJwtSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const key = `refreshToken_${decoded.userId}_${decoded.sessionId}`;
    const cachedToken = await this.redis.get(key);

    if (!cachedToken || cachedToken !== token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.redis.del(key);

    return this.issueTokens({
      userId: decoded.userId,
      email: decoded.email,
      sessionId: randomUUID(),
    });
  }

  private async issueTokens(payload: TokenPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: this.configService.getOrThrow('ACCESSTOKEN_EXPIRES_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshJwtSecret,
      expiresIn: this.configService.getOrThrow('REFRESHTOKEN_EXPIRES_IN'),
    });

    const key = `refreshToken_${payload.userId}_${payload.sessionId}`;
    const ttl = Number(this.configService.getOrThrow('CACHE_TTL'));

    await this.redis.set(key, refreshToken, 'EX', ttl);

    return { accessToken, refreshToken };
  }
}

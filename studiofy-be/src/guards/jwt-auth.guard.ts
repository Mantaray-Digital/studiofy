import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { RequestWithCookies } from 'src/types/RequestTypes/RequestWithCookies';
import { UserAuthenticatedRequest } from 'src/types/RequestTypes/UserAuthenticatedRequest';
import { SecretsService } from 'src/auth/secrets/secrets.service';
import { TokenPayload } from 'src/types/token.payload';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private secretsService: SecretsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req =
      context
        .switchToHttp()
        .getRequest<RequestWithCookies & UserAuthenticatedRequest>();

    // 1️⃣ Extract token (cookie → authorization → fail)
    const token =
      req.cookies?.accessToken ||
      this.extractBearerToken(req.headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    // 2️⃣ Verify & decode token
    const userId = await this.checkTokenValidity(token);

    // 3️⃣ Get user from DB
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    // 4️⃣ Attach the user to the request
    user.password = undefined;
    req.user = user;

    return true;
  }

  private async checkTokenValidity(token: string): Promise<string> {
    try {
      const payload: TokenPayload = await this.jwtService.verify(token, {
        secret: this.secretsService.getJwtSecret(),
      });
      return payload.userId;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractBearerToken(authHeader?: string): string | null {
    if (!authHeader) return null;
    if (!authHeader.startsWith('Bearer ')) return null;
    return authHeader.replace('Bearer ', '').trim();
  }
}

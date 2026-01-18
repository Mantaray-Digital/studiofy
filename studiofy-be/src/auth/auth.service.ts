import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth-dto';
import { SignInDto } from './dto/signin.dto';
import { CookieConfigService } from 'src/config/cookies/cookies.service';
import { Response } from 'express';
import { VerifyEmailTokenDto } from './dto/verify-email-token.dto';
import { UsersService } from 'src/modules/users/users.service';
import { UserDocument } from 'src/modules/users/entities/users.entity';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { SecretsService } from './secrets/secrets.service';
import { UserStatus } from 'src/modules/users/enums/user-status';

@Injectable()
export class AuthService {
  constructor(
    @Inject('EMAIL_SERVICE') private rabbitClient: ClientProxy,
    private readonly userService: UsersService,
    private readonly secretsService: SecretsService,
    private cookieConfigService: CookieConfigService,
  ) {}

  async signIn({ email, password }: SignInDto, res: Response) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { accessToken, refreshToken } = await this.secretsService.assignTokens(user);
    res.cookie('accessToken', accessToken, this.cookieConfigService.cookieOptions.accessToken);
    res.cookie('refreshToken', refreshToken, this.cookieConfigService.cookieOptions.refreshToken);
    return { accessToken, refreshToken } ;
  }

  signout(res: Response): null {
    res.clearCookie('accessToken', this.cookieConfigService.cookieOptions.accessToken);
    res.clearCookie('refreshToken', this.cookieConfigService.cookieOptions.refreshToken);
    return null;
  }

  async signUp(credentials: CreateUserDto) {
    const user = await this.userService.create(credentials);

    await this.verifyEmail(user);

    return this.secretsService.assignTokens(user);
     
  }

  async refreshAccessToken(token: string, res: Response) {
    const { accessToken, refreshToken } = await this.secretsService.refreshAccessToken(token);
    res.cookie('accessToken', accessToken, this.cookieConfigService.cookieOptions.accessToken);
    res.cookie('refreshToken', refreshToken, this.cookieConfigService.cookieOptions.refreshToken);

    return { accessToken, refreshToken };
  }

  async verifyEmail(user: UserDocument) {
    const { rawToken } = await this.userService.setVerifyEmailToken(user._id.toString());

    this.rabbitClient.emit('yallapass_email_verification_event', {
      to: user.email,
      subject: 'Verify Your Email',
      data: {
        resetToken: rawToken,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    return null;
  }

  async verifyEmailToken({ token }: VerifyEmailTokenDto) {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    return await this.userService.findByVerifyEmailToken(hashedToken);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const resetToken = user.createPasswordRestToken();
    await user.save({ validateModifiedOnly: true });

    this.rabbitClient.emit('yallapass_forgot_password', {
      to: user.email,
      subject: 'Reset your password',
      message: 'Your password reset token is: ',
      data: {
        resetToken,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    return null;
  }

  async resetPassword(resetPasswordDto: ResetPasswordAuthDto): Promise<UserDocument> {
    const hashedToken = createHash('sha256').update(resetPasswordDto.resetToken).digest('hex');
    const user = await this.userService.findByToken(hashedToken);
    if (!user) {
      throw new UnauthorizedException('Invalid reset token');
    }
    user.password = resetPasswordDto.password;
    user.passwordRestToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateModifiedOnly: true });
    user.password = undefined;

    return user;
  }

  async googleSignIn(googleUser: any, res: Response) {
    const { email, firstName, lastName, picture } = googleUser;

    let user = await this.userService.findByEmail(email);

    if (!user) {
      const randomPassword = randomBytes(16).toString('hex') + 'A1@';

      user = await this.userService.create({
        email,
        firstName: firstName || 'User',
        lastName: lastName || ' ',
        password: randomPassword,
        profilePic: picture,
      },
      UserStatus.ACTIVE
    );


    }

    const { accessToken, refreshToken } = await this.secretsService.assignTokens(user);

    res.cookie('accessToken', accessToken, this.cookieConfigService.cookieOptions.accessToken);
    res.cookie('refreshToken', refreshToken, this.cookieConfigService.cookieOptions.refreshToken);

    return { accessToken, refreshToken };
  }
}

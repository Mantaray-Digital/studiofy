import { Controller, Post, Body, Res, HttpCode, HttpStatus, UseInterceptors, Patch, Get, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth-dto';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { ResponseMessage } from 'src/Decorator/customMessage.decorator';
import { SignInDto } from './dto/signin.dto';
import { UserParam } from 'src/Decorator/user-param.decorator';
import { type Response, type Request } from 'express';
import { VerifyEmailTokenDto } from './dto/verify-email-token.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { RefreshToken } from 'src/Decorator/refresh-token.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { type UserDocument } from 'src/modules/users/entities/users.entity';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Logged in successfully')
  async signIn(@Body() credential: SignInDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signIn(credential, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Logged out successfully')
  signout(@Res({ passthrough: true }) res: Response) {
    return this.authService.signout(res);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('User registered successfully')
  async signUp(@Body() credentials: CreateUserDto) {
    return await this.authService.signUp(credentials);
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Access token refreshed successfully')
  async refreshToken( @Res({ passthrough: true }) res: Response, @RefreshToken() refreshToken: string) {
    return await this.authService.refreshAccessToken(refreshToken,res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Email verification link sent successfully')
  sendVerificationLink(@UserParam() user: UserDocument) {
    return this.authService.verifyEmail(user);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('verify-email')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Email verified successfully')
  async verifyEmail(@Body() token: VerifyEmailTokenDto) {
    return await this.authService.verifyEmailToken(token);
  }

  @Post('forgot-password')
  @ResponseMessage('Password reset token sent successfully')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return null;
  }

  @Post('reset-password')
  @ResponseMessage('Password reset successfully')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordAuthDto) {
    await this.authService.resetPassword(resetPasswordDto);
    return null;
  }

  @Get('isLoggedIn')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  isLoggedIn() {
    return { isLoggedIn: true };
  }

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Logged in successfully') 
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {

    await this.authService.googleSignIn(req.user, res);
    
    return res.redirect("http://localhost:8080/api/v1/auth/isLoggedIn")
  }
}

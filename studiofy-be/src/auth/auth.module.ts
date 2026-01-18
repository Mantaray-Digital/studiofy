import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { CookieConfigService } from 'src/config/cookies/cookies.service';
import { SecretsService } from './secrets/secrets.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, SecretsService, CookieConfigService , GoogleStrategy],
  exports: [SecretsService],
})
export class AuthModule {}

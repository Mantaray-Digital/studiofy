import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ResetPasswordAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  resetToken: string;
}

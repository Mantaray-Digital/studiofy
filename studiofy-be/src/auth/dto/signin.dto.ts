import { IsString, IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email: string;
}

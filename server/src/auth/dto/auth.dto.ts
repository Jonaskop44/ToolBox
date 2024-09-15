import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class VerifyTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}

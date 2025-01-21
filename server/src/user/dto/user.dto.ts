import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class GetUserDataFromTokenDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export class ActivateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
export class ResendActivationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class CheckPasswordResetTokenDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export class SendPasswordResetEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

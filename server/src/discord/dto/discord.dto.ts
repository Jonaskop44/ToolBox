import { IsNotEmpty, IsString } from 'class-validator';

export class DiscordStartBotDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

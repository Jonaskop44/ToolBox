import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DiscordStartBotDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export class DiscordMassCreateChannelsDto {
  @IsString()
  @IsNotEmpty()
  readonly guildId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly delay: number;

  @IsString()
  @IsNotEmpty()
  readonly channelName: string;
}

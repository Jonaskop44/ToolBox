import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DiscordStartBotDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  readonly guildId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly delay: number;
}

export class DiscordMassCreateChannelsDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly channelName: string;
}

export class DiscordMassCreateRolesDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly roleName: string;
}

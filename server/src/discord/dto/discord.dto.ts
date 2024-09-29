import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DiscordStartBotDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
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

export class DiscordSetBotValuesDto {
  @IsString()
  @IsNotEmpty()
  readonly guildId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly delay: number;
}

export class DiscordAccountMessageSpam {
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  readonly channelId: string;

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly delay: number;
}



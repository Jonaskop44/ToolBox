import { Body, Controller, Post } from '@nestjs/common';
import { DiscordService } from './discord.service';
import {
  DiscordMassCreateChannelsDto,
  DiscordStartBotDto,
} from './dto/discord.dto';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post('startBot')
  async startBot(@Body() dto: DiscordStartBotDto) {
    return this.discordService.startBot(dto);
  }

  @Post('stopBot')
  async stopBot() {
    return this.discordService.stopBot();
  }

  @Post('massCreateChannels')
  async massCreateChannels(@Body() dto: DiscordMassCreateChannelsDto) {
    return this.discordService.massCreateChannels(dto);
  }

  @Post('banAllMembers')
  async banAllMembers() {
    return this.discordService.banAllMembers();
  }
}

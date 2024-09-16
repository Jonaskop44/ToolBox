import { Body, Controller, Post } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordStartBotDto } from './dto/discord.dto';

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
}

import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { DiscordStartBotDto } from './dto/discord.dto';

@Injectable()
export class DiscordService {
  constructor(private readonly client: Client) {}

  async startBot(dto: DiscordStartBotDto) {
    this.client.once('ready', () => {
      console.log('Bot is online!');
    });

    await this.client.login(dto.token);
  }
}

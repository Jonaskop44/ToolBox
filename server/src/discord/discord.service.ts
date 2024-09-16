import { ConflictException, Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { DiscordStartBotDto } from './dto/discord.dto';

@Injectable()
export class DiscordService {
  constructor(private readonly client: Client) {}

  async startBot(dto: DiscordStartBotDto) {
    this.client.once('ready', () => {
      return {
        message: 'Bot is ready',
      };
    });

    await this.client.login(dto.token).catch((error) => {
      throw new ConflictException('The token is invalid');
    });

    return {
      message: 'Bot is starting',
    };
  }

  async stopBot() {
    await this.client
      .destroy()
      .then(() => {
        return {
          message: 'Bot is stopping',
        };
      })
      .catch((error) => {
        throw new ConflictException('Bot is not running');
      });
  }
}

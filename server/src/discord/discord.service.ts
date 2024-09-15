import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class DiscordService implements OnModuleInit {
  constructor(private readonly client: Client) {}

  async onModuleInit() {
    await this.startBot();
  }

  async startBot() {
    this.client.once('ready', () => {
      console.log('Bot is online!');
    });
  }
}

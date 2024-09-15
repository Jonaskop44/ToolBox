import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { Client, GatewayIntentBits } from 'discord.js';

@Module({
  controllers: [DiscordController],
  providers: [
    DiscordService,
    {
      provide: Client,
      useFactory: () => {
        return new Client({
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages,
          ],
        });
      },
    },
  ],
  exports: [Client], // Optional, falls du den Client woanders verwenden willst
})
export class DiscordModule {}

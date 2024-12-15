import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { Client, GatewayIntentBits } from 'discord.js';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DiscordController],
  providers: [
    DiscordService,
    JwtService,
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
  exports: [Client],
})
export class DiscordModule {}

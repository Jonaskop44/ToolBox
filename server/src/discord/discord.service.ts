import { ConflictException, Injectable } from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';
import {
  DiscordMassCreateChannelsDto,
  DiscordStartBotDto,
} from './dto/discord.dto';

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

  async massCreateChannels(dto: DiscordMassCreateChannelsDto) {
    const guild = await this.client.guilds.fetch(dto.guildId).catch((error) => {
      throw new ConflictException('The guild does not exist');
    });
    if (!guild) {
      throw new ConflictException('The guild does not exist');
    }

    // Create channels
    let createdChannels = 0;
    for (let i = 1; i <= dto.amount; i++) {
      if (dto.delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, dto.delay));
      }

      try {
        guild.channels.create({
          name: dto.channelName + i,
          type: ChannelType.GuildText,
          reason: 'Mass create channels',
        });

        createdChannels++;
      } catch (error) {
        throw new ConflictException(
          'An error occured while creating the channels',
        );
      }
    }

    return {
      message: `${createdChannels} channels were successfully created.`,
    };
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';
import {
  DiscordBanAllMembersDto,
  DiscordMassCreateChannelsDto,
  DiscordStartBotDto,
} from './dto/discord.dto';

@Injectable()
export class DiscordService {
  constructor(private readonly client: Client) {}

  async startBot(dto: DiscordStartBotDto) {
    if (this.client.isReady()) {
      return {
        message: 'Bot is already running',
      };
    }

    return new Promise(async (resolve, reject) => {
      this.client.once('ready', () => {
        resolve({
          message: 'Bot is ready',
        });
      });

      await this.client.login(dto.token).catch((error) => {
        reject(new ConflictException('The token is invalid'));
      });
    });
  }

  async stopBot() {
    // Check if the bot is already stopped, status 3 means the bot is stopped
    if (this.client.ws.status === 3) {
      return {
        message: 'Bot is already stopped',
      };
    }

    return new Promise(async (resolve, reject) => {
      await this.client
        .destroy()
        .then(() => {
          resolve({
            message: 'Bot is stopping',
          });
        })
        .catch((error) => {
          reject(new ConflictException('Bot is not running'));
        });
    });
  }

  async banAllMembers(dto: DiscordBanAllMembersDto) {
    const guild = await this.client.guilds.fetch(dto.guildId).catch((error) => {
      throw new ConflictException('The guild does not exist');
    });
    if (!guild) {
      throw new ConflictException('The guild does not exist');
    }

    
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

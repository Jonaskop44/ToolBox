import { ConflictException, Injectable } from '@nestjs/common';
import { ChannelType, Client, Guild } from 'discord.js';
import {
  DiscordMassCreateChannelsDto,
  DiscordStartBotDto,
} from './dto/discord.dto';

@Injectable()
export class DiscordService {
  private guild: Guild;
  private delay: number;

  constructor(private readonly client: Client) {}

  async startBot(dto: DiscordStartBotDto) {
    if (this.client.isReady()) {
      return {
        message: 'Bot is already running',
      };
    }

    return new Promise(async (resolve, reject) => {
      this.client.once('ready', async () => {
        try {
          // Check if the guild exists and the delay is valid
          const guild = await this.client.guilds
            .fetch(dto.guildId)
            .catch(() => {
              this.stopBot();
              throw new ConflictException('The guild does not exist');
            });

          if (!guild) {
            this.stopBot();
            throw new ConflictException('The guild does not exist');
          }

          if (dto.delay < 0) {
            this.stopBot();
            throw new ConflictException('Delay must be a positive number');
          }

          this.guild = guild;
          this.delay = dto.delay;

          resolve({
            message: 'Bot is ready',
          });
        } catch (error) {
          reject(new ConflictException(error.message || 'An error occurred'));
        }
      });

      await this.client.login(dto.token).catch((error) => {
        reject(new ConflictException('The token is invalid'));
      });
    });
  }

  async stopBot() {
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

  async banAllMembers() {
    let bannedMembers = 0;
    const count = this.guild.memberCount;
    const members = await this.guild.members.fetch();

    for (const [memberId, member] of members) {
      if (member.bannable) {
        if (this.delay > 0) {
          await this.sleep(this.delay);
        }

        try {
          await member.ban();
          bannedMembers++;
          // spinner.success({ text: `Banned ${member.user.tag}` });
        } catch (error) {
          // spinner.error({
          //   text: `Could not ban ${member.user.tag}. Error: ${error.message}`,
          // });
        }
      } else {
        // spinner.warn({
        //   text: `Could not ban ${member.user.tag} (not bannable)`,
        // });
      }
    }
    return {
      message: `Banned ${bannedMembers} members out of ${count} members`,
    };
  }

  async massCreateChannels(dto: DiscordMassCreateChannelsDto) {
    let createdChannels = 0;
    for (let i = 1; i <= dto.amount; i++) {
      if (this.delay > 0) {
        await this.sleep(this.delay);
      }

      try {
        await this.guild.channels.create({
          name: `${dto.channelName}${i}`,
          type: ChannelType.GuildText,
          reason: 'Mass create channels',
        });

        createdChannels++;
      } catch (error) {
        throw new ConflictException(
          'An error occurred while creating the channels',
        );
      }
    }

    return {
      message: `${createdChannels} channels were successfully created.`,
    };
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

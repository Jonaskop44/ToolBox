import { ConflictException, Injectable } from '@nestjs/common';
import {
  ChannelType,
  Client,
  Colors,
  Guild,
  PermissionsBitField,
} from 'discord.js';
import {
  DiscordAccountMessageSpam,
  DiscordMassCreateChannelsDto,
  DiscordMassCreateRolesDto,
  DiscordSetBotValuesDto,
  DiscordStartBotDto,
} from './dto/discord.dto';
import axios from 'axios';

@Injectable()
export class DiscordService {
  private guild: Guild;
  private delay: number = 0;

  constructor(private readonly client: Client) {}

  async setBotValues(dto: DiscordSetBotValuesDto) {
    if (this.client.isReady()) {
      const guild = await this.client.guilds
        .fetch(dto.guildId)
        .catch((error) => {
          console.error('Error fetching guild:', error);
          throw new ConflictException('The guild does not exist');
        });

      if (!guild) {
        throw new ConflictException('The guild does not exist');
      }

      if (dto.delay < 0) {
        throw new ConflictException('Delay must be a positive number');
      }

      this.guild = guild;
      this.delay = dto.delay;

      return {
        message: 'Bot values set',
      };
    } else {
      throw new ConflictException('Bot is not running');
    }
  }

  async startBot(dto: DiscordStartBotDto) {
    if (this.client.isReady()) {
      return {
        message: 'Bot is already running',
      };
    }

    return new Promise(async (resolve, reject) => {
      try {
        await this.client.login(dto.token).catch((error) => {
          reject(new ConflictException('The token is invalid'));
        });

        this.client.once('ready', () => {
          resolve({
            message: 'Bot is ready',
          });
        });
      } catch (error) {
        await this.stopBot();
        reject(new ConflictException(error.message || 'An error occurred'));
      }
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
    try {
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
            console.log(`Banned ${member.user.tag}`);
          } catch (error) {
            console.log(
              `Could not ban ${member.user.tag}. Error: ${error.message}`,
            );
          }
        } else {
          console.log(`Could not ban ${member.user.tag} (not bannable)`);
        }
      }
      return {
        message: `Banned ${bannedMembers} members out of ${count} members`,
      };
    } catch (error) {
      throw new ConflictException('The guildId isn´t set yet');
    }
  }

  async kickAll() {
    try {
      let kickedMembers = 0;
      const count = this.guild.memberCount;
      const members = await this.guild.members.fetch();

      for (const [memberId, member] of members) {
        if (member.bannable) {
          if (this.delay > 0) {
            await this.sleep(this.delay);
          }

          try {
            await member.kick();
            kickedMembers++;
            console.log(`Kicked ${member.user.tag}`);
          } catch (error) {
            console.log(
              `Could not kick ${member.user.tag}. Error: ${error.message}`,
            );
          }
        } else {
          console.warn(`Could not kick ${member.user.tag} (not kickable)`);
        }
      }

      return {
        message: `Kicked ${kickedMembers} members out of ${count} members`,
      };
    } catch (error) {
      throw new ConflictException('The guildId isn´t set yet');
    }
  }

  //Delete all channels
  async deleteAllChannels() {
    try {
      let deletedChannels = 0;
      const channels = this.guild.channels.cache.filter(
        (channel) => channel.type !== ChannelType.GuildCategory,
      );

      for (const [channelId, channel] of channels) {
        const permissions = channel.permissionsFor(this.client.user);

        if (permissions.has(PermissionsBitField.Flags.ManageChannels)) {
          if (this.delay > 0) {
            await this.sleep(this.delay);
          }

          try {
            await channel.delete();
            deletedChannels++;
            console.log(`Deleted channel: ${channel.name}`);
          } catch (error) {
            console.error(
              `Cloud not delete channel: ${channel.name} Error: ${error.message}`,
            );
          }
        } else {
          console.warn(
            `Could not delete channel: ${channel.name} (not deletable)`,
          );
        }
      }

      return {
        message: `Deleted ${deletedChannels} channels out of ${channels.size} channels`,
      };
    } catch (error) {
      throw new ConflictException('The guildId isn´t set yet');
    }
  }

  async deleteAllRoles() {
    try {
      let deletedRoles = 0;
      const roles = this.guild.roles.cache.filter(
        (role) => role.id !== this.guild.id,
      ); // Exclude the @everyone role

      for (const [roleId, role] of roles) {
        if (this.delay > 0) {
          await this.sleep(this.delay);
        }
        try {
          await role.delete();
          deletedRoles++;
          console.log(`Deleted role: ${role.name}`);
        } catch (error) {
          console.error(
            `Could not delete role: ${role.name}. Error: ${error.message}`,
          );
        }
      }

      return {
        message: `Deleted ${deletedRoles} roles out of ${roles.size} roles`,
      };
    } catch (error) {
      throw new ConflictException('The guildId isn´t set yet');
    }
  }

  async massCreateRoles(dto: DiscordMassCreateRolesDto) {
    try {
      let createdRoles = 0;

      for (let i = 1; i <= dto.amount; i++) {
        if (this.delay > 0) {
          await this.sleep(this.delay);
        }

        try {
          await this.guild.roles.create({
            name: `${dto.roleName}${createdRoles}`,
            reason: 'Mass roles',
            color: Colors.DarkRed,
          });

          createdRoles++;
          console.log(`Created role: ${dto.roleName + i}`);
        } catch (error) {
          throw new ConflictException(
            `Cloud not create role: ${dto.roleName + i} Error: ${error.message}`,
          );
        }
      }

      return {
        message: `Created ${createdRoles} roles`,
      };
    } catch (error) {
      throw new ConflictException('The guildId isn´t set yet');
    }
  }

  async massCreateChannels(dto: DiscordMassCreateChannelsDto) {
    try {
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
            `Could not create channel: ${dto.channelName + i}. Error: ${
              error.message
            }`,
          );
        }
      }

      return {
        message: `${createdChannels} channels were successfully created.`,
      };
    } catch (error) {
      throw new ConflictException('The guildId isn´t set yet');
    }
  }

  async accountMessageSpam(dto: DiscordAccountMessageSpam) {
    for (let i = 0; i < dto.amount; i++) {
      await this.sleep(dto.delay);
      await axios
        .post(
          `https://discord.com/api/v9/channels/${dto.channelId}/messages`,
          {
            content: dto.message,
          },
          {
            headers: {
              Authorization: dto.token,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          throw new ConflictException(error);
        });
    }
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

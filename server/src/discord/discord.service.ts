import { ConflictException, Injectable } from '@nestjs/common';
import {
  ChannelType,
  Client,
  Colors,
  Guild,
  PermissionsBitField,
} from 'discord.js';
import {
  DiscordMassCreateChannelsDto,
  DiscordMassCreateRolesDto,
  DiscordSetBotValuesDto,
  DiscordStartBotDto,
} from './dto/discord.dto';

@Injectable()
export class DiscordService {
  private guild: Guild;
  private delay: number;

  constructor(private readonly client: Client) {}

  async setBotValues(dto: DiscordSetBotValuesDto) {
    const guild = await this.client.guilds.fetch(dto.guildId).catch((error) => {
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

  async kickAll() {
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
          // spinner.success({ text: `Kicked ${member.user.tag}` });
        } catch (error) {
          // spinner.error({
          //   text: `Could not kick ${member.user.tag}. Error: ${error.message}`,
          // });
        }
      } else {
        // spinner.warn({
        //   text: `Could not kick ${member.user.tag} (not kickable)`,
        // });
      }
    }

    return {
      message: `Kicked ${kickedMembers} members out of ${count} members`,
    };
  }

  //Delete all channels
  async deleteAllChannels() {
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
          // spinner.success({ text: `Deleted channel: ${channel.name}` });
        } catch (error) {
          // spinner.error({
          //   text: `Could not delete channel: ${channel.name}. Error: ${error.message}`,
          // });
        }
      } else {
        // spinner.warn({
        //   text: `Could not delete channel: ${channel.name} (not deletable)`,
        // });
      }
    }

    return {
      message: `Deleted ${deletedChannels} channels out of ${channels.size} channels`,
    };
  }

  async deleteAllRoles() {
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
        // spinner.success({ text: `Deleted role: ${role.name}` });
      } catch (error) {
        // spinner.error({
        //   text: `Could not delete role: ${role.name}. Error: ${error.message}`,
        // });
      }
    }

    return {
      message: `Deleted ${deletedRoles} roles out of ${roles.size} roles`,
    };
  }

  async massCreateRoles(dto: DiscordMassCreateRolesDto) {
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
        // spinner.success({ text: `Created role: ${roleName + i}` });
      } catch (error) {
        // spinner.error({
        //   text: `Could not create role: ${roleName + i}. Error: ${
        //     error.message
        //   }`,
        // });
      }
    }

    return {
      message: `Created ${createdRoles} roles`,
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

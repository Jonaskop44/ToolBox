import { Body, Controller, Post } from '@nestjs/common';
import { DiscordService } from './discord.service';
import {
  DiscordMassCreateChannelsDto,
  DiscordMassCreateRolesDto,
  DiscordSetBotValuesDto,
  DiscordStartBotDto,
} from './dto/discord.dto';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post('startBot')
  async startBot(@Body() dto: DiscordStartBotDto) {
    return this.discordService.startBot(dto);
  }

  @Post('setBotValues')
  async setBotValues(@Body() dto: DiscordSetBotValuesDto) {
    return this.discordService.setBotValues(dto);
  }

  @Post('stopBot')
  async stopBot() {
    return this.discordService.stopBot();
  }

  @Post('massCreateChannels')
  async massCreateChannels(@Body() dto: DiscordMassCreateChannelsDto) {
    return this.discordService.massCreateChannels(dto);
  }

  @Post('massCreateRoles')
  async massCreateRoles(@Body() dto: DiscordMassCreateRolesDto) {
    return this.discordService.massCreateRoles(dto);
  }

  @Post('banAllMembers')
  async banAllMembers() {
    return this.discordService.banAllMembers();
  }

  @Post('kickAll')
  async kickAll() {
    return this.discordService.kickAll();
  }

  @Post('deleteAllChannels')
  async deleteAllChannels() {
    return this.discordService.deleteAllChannels();
  }

  @Post('deleteAllRoles')
  async deleteAllRoles() {
    return this.discordService.deleteAllRoles();
  }
}

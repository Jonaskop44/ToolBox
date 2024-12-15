import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DiscordService } from './discord.service';
import {
  DiscordAccountMessageSpam,
  DiscordMassCreateChannelsDto,
  DiscordMassCreateRolesDto,
  DiscordSetBotValuesDto,
  DiscordStartBotDto,
} from './dto/discord.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @UseGuards(JwtGuard)
  @Post('startBot')
  async startBot(@Body() dto: DiscordStartBotDto) {
    return this.discordService.startBot(dto);
  }

  @UseGuards(JwtGuard)
  @Post('setBotValues')
  async setBotValues(@Body() dto: DiscordSetBotValuesDto) {
    return this.discordService.setBotValues(dto);
  }

  @UseGuards(JwtGuard)
  @Post('stopBot')
  async stopBot() {
    return this.discordService.stopBot();
  }

  @UseGuards(JwtGuard)
  @Post('massCreateChannels')
  async massCreateChannels(@Body() dto: DiscordMassCreateChannelsDto) {
    return this.discordService.massCreateChannels(dto);
  }

  @UseGuards(JwtGuard)
  @Post('massCreateRoles')
  async massCreateRoles(@Body() dto: DiscordMassCreateRolesDto) {
    return this.discordService.massCreateRoles(dto);
  }

  @UseGuards(JwtGuard)
  @Post('banAllMembers')
  async banAllMembers() {
    return this.discordService.banAllMembers();
  }

  @UseGuards(JwtGuard)
  @Post('kickAll')
  async kickAll() {
    return this.discordService.kickAll();
  }

  @UseGuards(JwtGuard)
  @Post('deleteAllChannels')
  async deleteAllChannels() {
    return this.discordService.deleteAllChannels();
  }

  @UseGuards(JwtGuard)
  @Post('deleteAllRoles')
  async deleteAllRoles() {
    return this.discordService.deleteAllRoles();
  }

  @UseGuards(JwtGuard)
  @Post('accountMessageSpam')
  async accountMessageSpam(@Body() dto: DiscordAccountMessageSpam) {
    return this.discordService.accountMessageSpam(dto);
  }
}

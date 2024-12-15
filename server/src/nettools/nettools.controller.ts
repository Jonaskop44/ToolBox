import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { NettoolsService } from './nettools.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('nettools')
export class NettoolsController {
  constructor(private readonly nettoolsService: NettoolsService) {}

  @UseGuards(JwtGuard)
  @Get('ipinfo/:ip')
  async getIpInfo(@Param('ip') ip: string) {
    return this.nettoolsService.getIpInfo(ip);
  }

  @UseGuards(JwtGuard)
  @Get('lookupMacAddress/:mac')
  async getlookupMacAddress(@Param('mac') mac: string) {
    return this.nettoolsService.getlookupMacAddress(mac);
  }

  @UseGuards(JwtGuard)
  @Get('portscan/:ip')
  async scanPorts(
    @Param('ip') ip: string,
    @Query('startPort') startPort: string,
    @Query('endPort') endPort: string,
  ) {
    const start = parseInt(startPort);
    const end = parseInt(endPort);

    return this.nettoolsService.scanPorts(ip, start, end);
  }
}

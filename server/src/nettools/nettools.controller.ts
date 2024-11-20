import { Controller, Get, Param, Query } from '@nestjs/common';
import { NettoolsService } from './nettools.service';

@Controller('nettools')
export class NettoolsController {
  constructor(private readonly nettoolsService: NettoolsService) {}

  @Get('ipinfo/:ip')
  async getIpInfo(@Param('ip') ip: string) {
    return this.nettoolsService.getIpInfo(ip);
  }

  @Get('lookupMacAddress/:mac')
  async getlookupMacAddress(@Param('mac') mac: string) {
    return this.nettoolsService.getlookupMacAddress(mac);
  }

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

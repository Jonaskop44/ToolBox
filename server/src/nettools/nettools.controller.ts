import { Controller, Get, Param } from '@nestjs/common';
import { NettoolsService } from './nettools.service';

@Controller('nettools')
export class NettoolsController {
  constructor(private readonly nettoolsService: NettoolsService) {}

  @Get('ipinfo/:ip')
  async getIpInfo(@Param('ip') ip: string) {
    return this.nettoolsService.getIpInfo(ip);
  }
}

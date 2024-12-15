import { Module } from '@nestjs/common';
import { NettoolsService } from './nettools.service';
import { NettoolsController } from './nettools.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [NettoolsController],
  providers: [NettoolsService, JwtService],
})
export class NettoolsModule {}

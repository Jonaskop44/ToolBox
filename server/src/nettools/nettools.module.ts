import { Module } from '@nestjs/common';
import { NettoolsService } from './nettools.service';
import { NettoolsController } from './nettools.controller';

@Module({
  controllers: [NettoolsController],
  providers: [NettoolsService],
})
export class NettoolsModule {}

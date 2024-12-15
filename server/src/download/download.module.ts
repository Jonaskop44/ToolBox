import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService, JwtService],
})
export class DownloadModule {}

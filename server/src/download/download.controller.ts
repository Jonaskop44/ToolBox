import { Controller, Get, Param, Res } from '@nestjs/common';
import { DownloadService } from './download.service';
import { Response } from 'express';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('youtube/:url')
  async downloadVideo(@Param('url') url: string, @Res() res: Response) {
    const decodedUrl = decodeURIComponent(url);
    const videoPath = await this.downloadService.downloadVideo(decodedUrl);
    res.download(videoPath);
  }
}

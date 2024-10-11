import { Controller, Get, Param, Query, Res } from '@nestjs/common';
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

  @Get('spotify/song/:url')
  async downloadSpotifySong(
    @Param('url') url: string,
    @Query('clientId') clientId: string,
    @Query('clientSecret') clientSecret: string,
    @Res() res: Response,
  ) {
    const decodedUrl = decodeURIComponent(url);
    const songPath = await this.downloadService.downloadSpotifySong(
      decodedUrl,
      clientId,
      clientSecret,
    );
    res.download(songPath);
  }

  @Get('spotify/playlist/:url')
  async downloadSpotifyPlaylist(
    @Param('url') url: string,
    @Query('clientId') clientId: string,
    @Query('clientSecret') clientSecret: string,
    @Res() res: Response,
  ) {
    const decodedUrl = decodeURIComponent(url);
    const songPath = await this.downloadService.downloadSpotifyPlaylist(
      decodedUrl,
      clientId,
      clientSecret,
    );
  }
}

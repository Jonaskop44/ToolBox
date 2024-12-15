import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @UseGuards(JwtGuard)
  @Get('youtube/:url')
  async downloadVideo(@Param('url') url: string, @Res() res: Response) {
    const decodedUrl = decodeURIComponent(url);
    await this.downloadService.downloadVideo(decodedUrl, res);
  }

  @UseGuards(JwtGuard)
  @Get('spotify/song/:url')
  async downloadSpotifySong(
    @Param('url') url: string,
    @Query('clientId') clientId: string,
    @Query('clientSecret') clientSecret: string,
    @Res() res: Response,
  ) {
    const decodedUrl = decodeURIComponent(url);
    await this.downloadService.downloadSpotifySong(
      decodedUrl,
      clientId,
      clientSecret,
      res,
    );
  }

  @UseGuards(JwtGuard)
  @Get('spotify/playlist/:url')
  async downloadSpotifyPlaylist(
    @Param('url') url: string,
    @Query('clientId') clientId: string,
    @Query('clientSecret') clientSecret: string,
    @Res() res: Response,
  ) {
    const decodedUrl = decodeURIComponent(url);
    await this.downloadService.downloadSpotifyPlaylist(
      decodedUrl,
      clientId,
      clientSecret,
      res,
    );
  }
}

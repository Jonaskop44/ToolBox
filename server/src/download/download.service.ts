import { ConflictException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { exec } from 'youtube-dl-exec';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class DownloadService {
  constructor() {}

  async downloadVideo(videoUrl: string): Promise<string> {
    const downloadsFolder = path.resolve(__dirname, '..', 'downloads');

    if (!fs.existsSync(downloadsFolder)) {
      fs.mkdirSync(downloadsFolder, { recursive: true });
    }

    try {
      await exec(videoUrl, {
        output: path.join(downloadsFolder, '%(title)s.%(ext)s'),
        format: 'bestvideo+bestaudio/best',
      });

      //Get the downloaded file name
      const files = fs
        .readdirSync(downloadsFolder)
        .filter((file) => file.endsWith('.webm') || file.endsWith('.mp4'));

      //Get title of the video
      const videoTitle = files[0].split('.')[0];
      const videoOutputPath = path.join(downloadsFolder, `${videoTitle}.mp4`);

      if (files.length === 1) {
        const videoFile = path.join(downloadsFolder, files[0]);

        if (!fs.existsSync(videoFile)) {
          throw new ConflictException('Video file not found: ' + videoFile);
        }

        fs.renameSync(videoFile, videoOutputPath);

        if (!fs.existsSync(videoOutputPath)) {
          throw new ConflictException(
            `The file ${videoOutputPath} could not be created.`,
          );
        }

        return videoOutputPath;
      }

      //Merge the video and audio files
      const videoFile = path.join(
        downloadsFolder,
        files.find((file) => file.includes('f') && file.endsWith('.webm')),
      );
      const audioFile = path.join(
        downloadsFolder,
        files.find((file) => file.includes('f') && file.endsWith('.webm')),
      );

      //Use ffmpeg to merge the video and audio files
      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(videoFile)
          .input(audioFile)
          .output(videoOutputPath)
          .on('end', () => {
            resolve(videoOutputPath);
          })
          .on('error', (err) => {
            reject(err);
          })
          .run();
      });

      if (!fs.existsSync(videoOutputPath)) {
        throw new ConflictException(
          `The file ${videoOutputPath} could not be created.`,
        );
      }

      return videoOutputPath;
    } catch (error) {
      throw new ConflictException('Error downloading video: ' + error);
    }
  }
}

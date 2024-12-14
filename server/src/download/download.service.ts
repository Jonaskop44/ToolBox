import { ConflictException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { exec } from 'youtube-dl-exec';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import * as SpotifyWebApi from 'spotify-web-api-node';
import * as archiver from 'archiver';
import { Response } from 'express';
import {
  downloadMp3FromVideo,
  getPlaylistTracks,
  getTrack,
  getYoutubeVideoUrl,
} from './download.helper';

@Injectable()
export class DownloadService {
  constructor() {}

  async downloadVideo(videoUrl: string, res: Response): Promise<void> {
    const downloadsFolder = path.resolve(__dirname, '..', 'downloads/youtube');

    if (!fs.existsSync(downloadsFolder)) {
      fs.mkdirSync(downloadsFolder, { recursive: true });
    }

    try {
      await exec(videoUrl, {
        output: path.join(downloadsFolder, '%(title)s.%(ext)s'),
        format: 'bestvideo+bestaudio/best',
      });

      // Get the downloaded file name
      const files = fs
        .readdirSync(downloadsFolder)
        .filter((file) => file.endsWith('.webm') || file.endsWith('.mp4'));

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

        // Return the video to the client
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="video.mp4"',
        );
        res.download(videoOutputPath, () => {
          fs.unlinkSync(videoOutputPath);
        });

        return;
      }

      // Merge video and audio files if required
      const videoFile = path.join(
        downloadsFolder,
        files.find((file) => file.includes('f') && file.endsWith('.webm')),
      );
      const audioFile = path.join(
        downloadsFolder,
        files.find((file) => file.includes('f') && file.endsWith('.webm')),
      );

      // Use ffmpeg to merge the video and audio files
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

      res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
      res.download(videoOutputPath, () => {
        fs.unlinkSync(videoOutputPath);
      });
    } catch (error) {
      throw new ConflictException('Error downloading video: ' + error);
    }
  }

  async downloadSpotifySong(
    songURL: string,
    clientId: string,
    clientSecret: string,
    res: Response,
  ): Promise<void> {
    const spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret,
    });

    try {
      const downloadsFolder = path.resolve(
        __dirname,
        '..',
        'downloads/spotify/songs',
      );

      if (!fs.existsSync(downloadsFolder)) {
        fs.mkdirSync(downloadsFolder, { recursive: true });
      }

      const data = await spotifyApi.clientCredentialsGrant();
      const accessToken = data.body['access_token'];
      spotifyApi.setAccessToken(accessToken);

      const trackId = songURL.match(/\/track\/(\w+)/)[1];
      const track = await getTrack(trackId, spotifyApi);
      console.log('Track: ', track);

      //Get youtube video URL
      const youtubeVideoUrl = await getYoutubeVideoUrl(
        track.trackName,
        track.artistName,
      );
      console.log('Youtube Video URL: ', youtubeVideoUrl);

      const songFilePath = `${downloadsFolder}/${track.artistName}-${track.trackName}.mp3`;
      await downloadMp3FromVideo(youtubeVideoUrl, songFilePath);
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="' +
          `${track.artistName}-${track.trackName}.mp3` +
          '"',
      );

      res.download(songFilePath, (err) => {
        if (err) {
          console.error('Error during download:', err);
        } else {
          fs.unlink(songFilePath, (deleteErr) => {
            if (deleteErr) {
              console.error('Error deleting file:', deleteErr);
            } else {
              console.log(`File deleted: ${songFilePath}`);
            }
          });
        }
      });
    } catch (error) {
      throw new ConflictException('Error downloading song: ' + error);
    }
  }

  async downloadSpotifyPlaylist(
    playlistURL: string,
    clientId: string,
    clientSecret: string,
    res: Response,
  ): Promise<void> {
    const spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret,
    });

    try {
      const downloadsFolder = path.resolve(
        __dirname,
        '..',
        'downloads/spotify/playlists',
      );

      if (!fs.existsSync(downloadsFolder)) {
        fs.mkdirSync(downloadsFolder, { recursive: true });
      }

      const data = await spotifyApi.clientCredentialsGrant();
      const accessToken = data.body['access_token'];
      spotifyApi.setAccessToken(accessToken);

      const playlistId = playlistURL.match(/\/playlist\/(\w+)/)[1];
      const tracks = await getPlaylistTracks(playlistId, spotifyApi);
      console.log('Tracks: ', tracks);

      const playlistFolder = path.join(downloadsFolder, playlistId);
      if (!fs.existsSync(playlistFolder)) {
        fs.mkdirSync(playlistFolder);
      }

      const trackFiles: string[] = [];

      // Download each track and collect file paths
      for (const track of tracks) {
        const youtubeVideoUrl = await getYoutubeVideoUrl(
          track.trackName,
          track.artistName,
        );
        console.log('Youtube Video URL: ', youtubeVideoUrl);

        const songFilePath = path.join(
          playlistFolder,
          `${track.artistName}-${track.trackName}.mp3`,
        );
        await downloadMp3FromVideo(youtubeVideoUrl, songFilePath);
        trackFiles.push(songFilePath);
      }

      // Create a ZIP file of all tracks
      const zipFilePath = path.join(downloadsFolder, `${playlistId}.zip`);
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      archive.pipe(output);
      trackFiles.forEach((filePath) => {
        archive.file(filePath, { name: path.basename(filePath) });
      });
      archive.finalize();

      output.on('close', () => {
        console.log(`ZIP file created: ${zipFilePath}`);

        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${playlistId}.zip"`,
        );
        res.setHeader('Content-Type', 'application/zip');
        res.download(zipFilePath, (err) => {
          if (err) {
            console.error('Error during download:', err);
          }

          trackFiles.forEach((filePath) => fs.unlinkSync(filePath));
          fs.unlinkSync(zipFilePath);
          console.log('Files deleted after download');
        });
      });
    } catch (error) {
      throw new ConflictException('Error downloading playlist: ' + error);
    }
  }
}

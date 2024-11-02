import { ConflictException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { exec } from 'youtube-dl-exec';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import * as SpotifyWebApi from 'spotify-web-api-node';
import {
  downloadMp3FromVideo,
  getPlaylistTracks,
  getTrack,
  getYoutubeVideoUrl,
} from './download.helper';

@Injectable()
export class DownloadService {
  constructor() {}

  async downloadVideo(videoUrl: string): Promise<string> {
    const downloadsFolder = path.resolve(__dirname, '..', 'downloads/youtube');

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

  async downloadSpotifySong(
    songURL: string,
    clientId: string,
    clientSecret: string,
  ): Promise<string> {
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

      const youtubeVideoUrl = await getYoutubeVideoUrl(
        track.trackName,
        track.artistName,
      );
      console.log('Youtube Video URL: ', youtubeVideoUrl);

      const songFilePath = `${downloadsFolder}/${track.artistName}-${track.trackName}.mp3`;

      await downloadMp3FromVideo(youtubeVideoUrl, songFilePath);

      return songFilePath;
    } catch (error) {
      throw new ConflictException('Error downloading song: ' + error);
    }
  }

  async downloadSpotifyPlaylist(
    playlistURL: string,
    clientId: string,
    clientSecret: string,
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

      for (const track of tracks) {
        const youtubeVideoUrl = await getYoutubeVideoUrl(
          track.trackName,
          track.artistName,
        );
        console.log('Youtube Video URL: ', youtubeVideoUrl);

        const songFilePath = `${downloadsFolder}/${track.playlistName}/${track.artistName}-${track.trackName}.mp3`;

        await downloadMp3FromVideo(youtubeVideoUrl, songFilePath);
      }
    } catch (error) {
      throw new ConflictException('Error downloading song: ' + error);
    }
  }
}

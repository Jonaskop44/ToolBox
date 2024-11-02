import puppeteer from 'puppeteer';
import * as path from 'path';
import { exec } from 'youtube-dl-exec';
import { ConflictException } from '@nestjs/common';

export async function getTrack(trackId: string, spotifyApi) {
  try {
    const response = await spotifyApi.getTrack(trackId);
    const track = response.body;
    const trackName = track.name;
    const artistName = track.artists[0].name;
    const albumName = track.album.name;
    const imageUrl =
      track.album.images.length > 0 ? track.album.images[0].url : null;
    return { trackName, artistName, albumName, imageUrl };
  } catch (err) {
    throw new ConflictException("Couldn't get track from Spotify API");
  }
}

export async function getYoutubeVideoUrl(
  trackName: string,
  artistName: string,
) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const searchQuery = `${artistName} - Topic ${trackName}`;
    const url = `https://www.youtube.com/results?search_query=${searchQuery}`;

    await page.goto(url);
    await page.waitForSelector('#contents ytd-video-renderer');

    const firstVideo = await page.$('#contents ytd-video-renderer a#thumbnail');
    const videoUrl = await firstVideo.evaluate((element) => element.href);

    await browser.close();
    return videoUrl;
  } catch (err) {
    console.error(err);
  }
}

export async function getPlaylistTracks(playlistId: string, spotifyApi) {
  try {
    const playlist = await spotifyApi.getPlaylist(playlistId);
    const tracks = playlist.body.tracks.items;
    const trackList = [];

    for (const track of tracks) {
      const trackName = track.track.name;
      const artistName = track.track.artists[0].name;
      const albumName = track.track.album.name;
      const imageUrl =
        track.track.album.images.length > 0
          ? track.track.album.images[0].url
          : null;
      const playlistName = playlist.body.name;

      //Save track information in an array
      trackList.push({
        trackName,
        artistName,
        albumName,
        imageUrl,
        playlistName,
      });
    }

    return trackList;
  } catch (error) {
    throw new ConflictException(
      "Couldn't get playlist tracks from Spotify API",
    );
  }
}

export async function downloadMp3FromVideo(url: string, audioFilePath: string) {
  try {
    await exec(url, {
      output: path.join(audioFilePath),
      format: 'bestaudio/best',
    });
  } catch (err) {
    throw new ConflictException("Couldn't download mp3");
  }
}

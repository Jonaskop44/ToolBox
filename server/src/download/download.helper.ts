import puppeteer from 'puppeteer';
import * as path from 'path';
import { exec } from 'youtube-dl-exec';

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
    console.error(err);
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

export async function downloadMp3FromVideo(url: string, audioFilePath: string) {
  try {
    await exec(url, {
      output: path.join(audioFilePath),
      format: 'bestaudio/best',
    });
  } catch (err) {
    console.error('Error in downloadMp3FromVideo:', err);
  }
}

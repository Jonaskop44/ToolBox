export interface Downloader {
  url: string;
  clientId: string;
  clientSecret: string;
}

export enum DownloaderTypes {
  DOWNLOADVIDEO = "DOWNLOADVIDEO",
  DOWNLOADSONG = "DOWNLOADSONG",
  DOWNLOADPLAYLIST = "DOWNLOADPLAYLIST",
}

export type DownloaderModalType = DownloaderTypes;

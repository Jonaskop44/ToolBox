import axios from "axios";
import { link } from "fs";

export default class Helper {
  constructor() {}

  async downloadVideo(url: string) {
    try {
      const response = await axios.get(
        `/download/youtube/${encodeURIComponent(url)}`,
        {
          responseType: "blob",
        }
      );

      if (response.status !== 200) {
        return { status: false };
      }

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Fehler beim Herunterladen des Videos:", error);
      return { status: false };
    }
  }

  async downloadSong(url: string, clientId: string, clientSecret: string) {
    try {
      const response = await axios.get(
        `/download/youtube/${encodeURIComponent(url)}`,
        {
          responseType: "blob",
        }
      );

      if (response.status !== 200) {
        return { status: false };
      }

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Fehler beim Herunterladen des Videos:", error);
      return { status: false };
    }
  }

  async downloadPlaylist(url: string, clientId: string, clientSecret: string) {
    try {
      const response = await axios.get(
        `/download/youtube/${encodeURIComponent(url)}`,
        {
          responseType: "blob",
        }
      );

      if (response.status !== 200) {
        return { status: false };
      }

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Fehler beim Herunterladen des Videos:", error);
      return { status: false };
    }
  }
}

// http://127.0.0.1:3001/api/v1/download/spotify/song/SONG_URL?clientId=CLIENTID&clientSecret=CLIENT_SECRET
// http://127.0.0.1:3001/api/v1/download/spotify/playlist/PLAYLIST?clientId=YOUR_CLIENT&clientSecret=YOUR_SECRECT

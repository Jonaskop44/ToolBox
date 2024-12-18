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
        `/download/spotify/song/${encodeURIComponent(
          url
        )}?clientId=${clientId}&clientSecret=${clientSecret}`,
        {
          responseType: "blob",
        }
      );

      if (response.status !== 200) {
        console.error("Failed to download song.");
        return { status: false };
      }

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "song.mp3";

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);

      return { status: true };
    } catch (error) {
      console.error("Error downloading song:", error);
      return { status: false };
    }
  }

  async downloadPlaylist(url: string, clientId: string, clientSecret: string) {
    try {
      const response = await axios.get(
        `/download/spotify/playlist/${encodeURIComponent(
          url
        )}?clientId=${clientId}&clientSecret=${clientSecret}`,
        {
          responseType: "blob",
        }
      );

      if (response.status !== 200) {
        console.error("Failed to download playlist.");
        return { status: false };
      }

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "playlist.zip";

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);

      return { status: true };
    } catch (error) {
      console.error("Error downloading playlist:", error);
      return { status: false };
    }
  }
}

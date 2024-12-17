import axios from "axios";
import Cookies from "js-cookie";
import { Auth } from "./auth";
import { Discord } from "./discord";
import { Nettools } from "./nettools";
import { Downloader } from "./downlaoder";

export default class ApiClient {
  auth: Auth;
  discord: Discord;
  nettools: Nettools;
  downloader: Downloader;
  constructor() {
    this.auth = new Auth();
    this.discord = new Discord();
    this.nettools = new Nettools();
    this.downloader = new Downloader();

    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
    axios.defaults.baseURL = "http://localhost:3001/api/v1/";
  }
}

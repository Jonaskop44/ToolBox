import axios from "axios";
import Cookies from "js-cookie";
import { Auth } from "./auth";
import { Discord } from "./discord";

export default class ApiClient {
  auth: Auth;
  discord: Discord;
  constructor() {
    this.auth = new Auth();
    this.discord = new Discord();

    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
    axios.defaults.baseURL = "http://localhost:3001/api/v1/";
  }
}

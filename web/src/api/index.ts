import axios from "axios";
import Cookies from "js-cookie";
import { Auth } from "./auth";

export default class ApiClient {
  auth: Auth;
  constructor() {
    this.auth = new Auth();

    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
    axios.defaults.baseURL = "http://localhost:3001/api/v1/";
  }
}

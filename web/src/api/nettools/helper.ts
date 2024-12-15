import axios from "axios";

export default class Helper {
  constructor() {}

  async ipInfo(ip: string) {
    try {
      const response = await axios.get(`nettools/ipinfo/${ip}`);

      if (response.status !== 200) {
        return { status: false };
      }

      const data = await response.data;
      return {
        status: true,
        data: data,
      };
    } catch (err) {
      return { status: false };
    }
  }

  async lookupMacAddress(mac: string) {
    try {
      const response = await axios.get(`/nettools/lookupMacAddress/${mac}`);

      if (response.status !== 200) {
        return { status: false };
      }

      const data = await response.data;
      return {
        status: true,
        data: data,
      };
    } catch (err) {
      return { status: false };
    }
  }

  async portScanner(ip: string, startPort: string, endPort: string) {
    try {
      const response = await axios.get(
        `/nettools/portscan/${ip}?startPort=${startPort}&endPort=${endPort}`
      );

      if (response.status !== 200) {
        return { status: false };
      }

      const data = await response.data;
      return {
        status: true,
        data: data,
      };
    } catch (err) {
      return { status: false };
    }
  }
}

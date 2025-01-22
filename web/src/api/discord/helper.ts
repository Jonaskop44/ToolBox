import axios from "axios";

export default class Helper {
  constructor() {}

  async startBot(token: string) {
    try {
      const response = await axios.post("discord/startBot", { token });
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async massCreateChannels(amount: number, name: string) {
    try {
      const response = await axios.post("discord/massCreateChannels", {
        amount,
        name,
      });
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async massCreateRoles(amount: number, name: string) {
    try {
      const response = await axios.post("discord/massCreateRoles", {
        amount,
        name,
      });
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async banAllMembers() {
    try {
      const response = await axios.get("discord/banAllMembers");
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async kickAll() {
    try {
      const response = await axios.get("discord/kickAll", {});
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async deleteAllChannels() {
    try {
      const response = await axios.get("discord/deleteAllChannels", {});
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async deleteAllRoles() {
    try {
      const response = await axios.get("discord/deleteAllRoles", {});
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async accountMessageSpam(
    token: string,
    channelId: string,
    message: string,
    amount: number,
    delay: number
  ) {
    try {
      const response = await axios.post("discord/accountMessageSpam", {
        token,
        channelId,
        message,
        amount,
        delay,
      });
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async stopBot() {
    try {
      const response = await axios.post("discord/stopBot");
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }

  async setBotValues(guildId: string, delay: number) {
    try {
      const response = await axios.post("discord/setBotValues", {
        guildId,
        delay,
      });
      return { status: true, data: response };
    } catch (error) {
      return { status: false };
    }
  }
}

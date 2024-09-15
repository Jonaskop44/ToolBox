import axios from "axios";

export default class Helper {
  constructor() {}

  async verifyToken(token: string) {
    try {
      const response = await axios.post(`auth/verify`, {
        token: token,
      });

      if (response.status !== 201) {
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

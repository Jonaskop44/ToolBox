import axios from "axios";

export default class Helper {
  constructor() {}

  async verifyToken(token: string) {
    try {
      const response = await axios.post(`auth/verify`, {
        token: token,
      });

      if (response.status !== 201) {
        return { status: false, message: "Invalid token" };
      }

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Token verified successfully",
      };
    } catch (err) {
      return { status: false, message: "Something went wrong" };
    }
  }
}

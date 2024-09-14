import axios from "axios";
import { User } from "@/types/user";

export default class Register {
  constructor() {}

  async post(user: User) {
    try {
      const response = await axios.post("auth/register", {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      if (response.status !== 201) return { status: false };

      const data = await response.data;
      return { status: true, data: data };
    } catch (error) {
      return { status: false };
    }
  }
}

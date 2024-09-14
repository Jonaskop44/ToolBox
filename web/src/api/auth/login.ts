import { User } from "@/types/user";
import axios from "axios";
import { useUserStore } from "@/data/userStore";

export default class Login {
  constructor() {}

  public async post(user: User) {
    return axios
      .post(`auth/login`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.status !== 201)
          return { status: false, data: null, message: response.data.message };
        const data = response.data;

        const { setUser } = useUserStore.getState();
        setUser(data);

        return { status: true, data: data };
      })
      .catch((error) => {
        return {
          status: false,
          data: null,
        };
      });
  }
}

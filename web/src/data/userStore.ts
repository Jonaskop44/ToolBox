import { User } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      await axios
        .get(`/user/token/data/${token}`)
        .then(async (response) => {
          if (response.status !== 200) {
            set({ user: null });
            return { status: false, data: null, message: "User not found" };
          }

          const data = response.data;
          set({ user: data });
        })
        .catch((error) => {
          set({ user: null });
          return { status: false, data: null, message: "Something went wrong" };
        });
    }
  },
  refreshToken: async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken && refreshToken) {
      await axios
        .post(
          `/auth/refreshToken`,
          {
            data: "[form]",
          },
          {
            headers: {
              Authorization: `Refresh ${refreshToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status !== 201) return { status: false };

          const data = response.data;
          Cookies.set("accessToken", data.accessToken);
        })
        .catch((error) => {
          return { status: false };
        });
    }
  },
}));

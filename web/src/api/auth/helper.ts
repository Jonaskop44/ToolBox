import axios from "axios";

export default class Helper {
  constructor() {}

  async activateUser(token: string) {
    try {
      const response = await axios.post(`/user/activate`, {
        token: token,
      });

      if (response.status !== 201)
        return { status: false, message: "The token is invalid or expired" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "User activated successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  async checkPasswordRestToken(token: string) {
    try {
      const response = await axios.post(`user/password/check/restToken`, {
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

  async resendActivationEmail(email: string) {
    try {
      const response = await axios.post(`user/activate/resend`, {
        email: email,
      });

      if (response.status !== 201)
        return { status: false, message: "User not found" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Activation email sent successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      const response = await axios.post(`user/password/resend`, {
        email: email,
      });

      if (response.status !== 201)
        return { status: false, message: "User not found" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  async resetPassword(email: string, password: string, token: string) {
    try {
      const response = await axios.patch(`user/password/reset`, {
        email: email,
        password: password,
        token: token,
      });

      if (response.status !== 200)
        return { status: false, message: "Invalid token" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Password reset successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

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

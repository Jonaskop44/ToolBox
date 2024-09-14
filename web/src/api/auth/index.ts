import Login from "./login";
import Register from "./register";

export class Auth {
  login: Login;
  register: Register;
  constructor() {
    this.login = new Login();
    this.register = new Register();
  }
}

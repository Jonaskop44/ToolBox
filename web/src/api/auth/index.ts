import Helper from "./helper";
import Login from "./login";
import Register from "./register";

export class Auth {
  login: Login;
  register: Register;
  helper: Helper;
  constructor() {
    this.login = new Login();
    this.register = new Register();
    this.helper = new Helper();
  }
}

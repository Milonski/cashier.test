import { Client } from "../client";
import { TUser } from "../types";

type TLogInParams = {
  login: any;
  password: any;
};

class UserAPI {
  constructor(private client: Client) {}

  getCurrent() {
    return this.client.send<TUser>("User.getCurrent");
  }

  logIn(params: TLogInParams) {
    return this.client.send<TUser>("User.logIn", params);
  }

  logOut() {
    return this.client.send<string>("User.logOut");
  }
}

export default UserAPI;

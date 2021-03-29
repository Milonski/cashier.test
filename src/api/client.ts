import axios from "axios";

import { TResponse } from "./types";

export class Client {
  static ENDPOIND = "https://cashier.realfast.ru/rpc";

  private id = 1;
  private cookie = "";

  async send<T>(method: string, params?: {}): Promise<TResponse<T>> {
    const requestData = {
      jsonrpc: "2.0",
      id: this.id++,
      method,
      params,
    };
    const response = await axios.post(Client.ENDPOIND, requestData, {
      headers: { Cookie: this.cookie },
      validateStatus: () => true,
    });
    if (Array.isArray(response.headers["set-cookie"])) {
      this.cookie = response.headers["set-cookie"].join("; ");
    }
    const responseData: TResponse<T> = response.data;
    return responseData;
  }
}

const client = new Client();

export default client;

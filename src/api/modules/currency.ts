import { Client } from "../client";
import {TCurrency} from "../types";

class CurrencyAPI {
  constructor(private client: Client) {}

  getAll() {
    return this.client.send<{data: TCurrency[]; total: number; }>("Currency.getAll");
  }
}

export default CurrencyAPI;
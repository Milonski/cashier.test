import { Client } from "../client";
import {TClient, TGetByIdParams} from "../types";

type TFilterParams = {
  searchQuery?: any;
    paging: {
      offset: number;
      limit: number;
    }
}

class ClientAPI {
  constructor(private client: Client) {}

  filter(params: TFilterParams) {
    return this.client.send<{data: TClient[]; total: number; }>("Client.filter", params);
  }

  getById(params: TGetByIdParams) {
    return this.client.send<TClient>("Client.getById", params);
  }
}

export default ClientAPI;
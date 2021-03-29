import { Client } from "../client";
import { THall, TChangeMoneyParams, TGetByIdParams } from "../types";

type TCreateParams = {
  clientId: number;
  agentId?: number;
  login: any;
  password: any;
  name: any;
  balance?: any;
  currency: string;
  isBalanceUnlimited: boolean;
  isBlocked: boolean;
};

type TBaseFilterParams = {
  searchQuery?: any;
  paging: {
    offset: number;
    limit: number;
  };
};

type TFilterParams = {
  clientId?: number;
  agentId?: number;
  currency?: string;
} & TBaseFilterParams;

type TUpdateParams = {
  id: any;
  password?: any;
  isBlocked?: boolean;
  isBalanceUnlimited?: boolean;
};

class HallAPI {
  constructor(private client: Client) {}

  create(params: TCreateParams) {
    return this.client.send<THall>("Hall.create", params);
  }

  depositMoney(params: TChangeMoneyParams) {
    return this.client.send<string>("Hall.depositMoney", params);
  }

  withdrawMoney(params: TChangeMoneyParams) {
    return this.client.send<string>("Hall.withdrawMoney", params);
  }

  filter(params: TFilterParams) {
    return this.client.send<{ data: THall[]; total: number }>(
      "Hall.filter",
      params
    );
  }

  getById(params: TGetByIdParams) {
    return this.client.send<THall>("Hall.getById", params);
  }

  update(params: TUpdateParams) {
    return this.client.send<string>("Hall.update", params);
  }
}

export default HallAPI;

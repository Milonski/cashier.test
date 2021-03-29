import { Client } from "../client";
import { TPlayer, TChangeMoneyParams, TGetByIdParams } from "../types";

type TCreateParams = {
  login: any;
  hallId: any;
  password: any;
  balance?: any;
  isBlocked?: boolean;
};

type TFilterParams = {
  hallId: any;
  currency?: any;
  searchQuery?: any;
  paging: {
    offset: number;
    limit: number;
  };
};

type TUpdateParams = {
  id: any;
  password?: any;
  isBlocked?: boolean;
};

class PlayerAPI {
  constructor(private client: Client) {}

  create(params: TCreateParams) {
    return this.client.send<TPlayer>("Player.create", params);
  }

  depositMoney(params: TChangeMoneyParams) {
    return this.client.send<string>("Player.depositMoney", params);
  }

  withdrawMoney(params: TChangeMoneyParams) {
    return this.client.send<string>("Player.withdrawMoney", params);
  }

  filter(params: TFilterParams) {
    return this.client.send<{ data: TPlayer[]; total: number }>(
      "Player.filter",
      params
    );
  }

  getById(params: TGetByIdParams) {
    return this.client.send<TPlayer>("Player.getById", params);
  }

  update(params: TUpdateParams) {
    return this.client.send<string>("Player.update", params);
  }
}

export default PlayerAPI;

import { Client } from "../client";
import { TAgent, TChangeMoneyParams, TGetByIdParams } from "../types";

type TCreateParams = {
  clientId: number;
  parentAgentId?: number;
  login: any;
  password: any;
  name: any;
  balance?: any;
  currency: any | null;
  canHaveChildren: boolean;
  isBlocked: boolean;
  isBalanceUnlimited: boolean;
};

type TFilterParams = {
  clientId: number;
  parentAgentId?: number;
  currency?: any;
  searchQuery?: any;
  nestingLevel?: number;
  paging: {
    offset: number;
    limit: number;
  };
};

type TUpdateParams = {
  id: number;
  password?: any;
  isBlocked?: boolean;
  isBalanceUnlimited?: boolean;
  canHaveChildren?: boolean;
};

class AgentAPI {
  constructor(private client: Client) {}

  create(params: TCreateParams) {
    return this.client.send<TAgent>("Agent.create", params);
  }

  depositMoney(params: TChangeMoneyParams) {
    return this.client.send<string>("Agent.depositMoney", params);
  }

  withdrawMoney(params: TChangeMoneyParams) {
    return this.client.send<string>("Agent.withdrawMoney", params);
  }

  filter(params: TFilterParams) {
    return this.client.send<{ data: TAgent[]; total: number }>(
      "Agent.filter",
      params
    );
  }

  getById(params: TGetByIdParams) {
    return this.client.send<TAgent>("Agent.getById", params);
  }

  update(params: TUpdateParams) {
    return this.client.send<string>("Agent.update", params);
  }
}

export default AgentAPI;

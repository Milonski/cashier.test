import { Client } from "../client";
import { TProvider, TAccessParams } from "../types";

type TFilterParams = {
  clientId?: number,
  agentId?: number,
  hallId?: number
}

class ProviderAPI {
  constructor(private client: Client) {}

  filter(params: TFilterParams) {
    return this.client.send<{data: TProvider[]; total: number; }>("Provider.filter", params);
  }

  disable(params: TAccessParams) {
    return this.client.send<string>("Provider.disable", params);
  }

  enable(params: TAccessParams) {
    return this.client.send<string>("Provider.enable", params);
  }

  grantAccess(params: TAccessParams) {
    return this.client.send<string>("Provider.grantAccess", params);
  }

  revokeAccess(params: TAccessParams) {
    return this.client.send<string>("Provider.revokeAccess", params);
  }
}

export default ProviderAPI;
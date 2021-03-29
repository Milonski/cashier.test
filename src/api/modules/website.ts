import { Client } from "../client";
import { TWebsite, TAccessParams } from "../types";

type TFilterParams = {
  clientId?: number,
  agentId?: number,
  hallId?: number
}

class WebsiteAPI {
  constructor(private client: Client) {}

  filter(params: TFilterParams) {
    return this.client.send<{data: TWebsite[]; total: number; }>("Website.filter", params);
  }

  disable(params: TAccessParams) {
    return this.client.send<string>("Website.disable", params);
  }

  enable(params: TAccessParams) {
    return this.client.send<string>("Website.enable", params);
  }

  grantAccess(params: TAccessParams) {
    return this.client.send<string>("Website.grantAccess", params);
  }

  revokeAccess(params: TAccessParams) {
    return this.client.send<string>("Website.revokeAccess", params);
  }
}

export default WebsiteAPI;
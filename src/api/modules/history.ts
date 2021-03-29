import { Client } from "../client";
import { THistory } from "../types";

type TFilterParams = {
  playerId: number;
  providerId?: number;
  gameId?: number;
  hallId?: number;
  sessionStartedAt: number;
  sessionFinishedAt: number;
  paging: {
    offset: number;
    limit: number;
  }
}

class HistoryAPI {
  constructor(private client: Client) {}

  filter(params: TFilterParams) {
    return this.client.send<{data: THistory[]; total: number; }>("History.filter", params);
  }
}

export default HistoryAPI;
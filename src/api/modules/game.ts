import { Client } from "../client";
import { TGame } from "../types";

type TFilterParams = {
  providerId?: number;
  searchQuery?: string;
  paging: {
    offset: number;
    limit: number;
  };
};

class GameAPI {
  constructor(private client: Client) {}

  filter(params: TFilterParams) {
    return this.client.send<{ data: TGame[]; total: number }>(
      "Game.filter",
      params
    );
  }
}

export default GameAPI;

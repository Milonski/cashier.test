import { Client } from "../api/client";
import {
  AgentAPI,
  ClientAPI,
  CurrencyAPI,
  HallAPI,
  HistoryAPI,
  PlayerAPI,
  ProviderAPI,
  UserAPI,
  WebsiteAPI,
  GameAPI,
} from "../api";
import { generateRandomLogin } from "../utilities";
import { TAgent } from "../api/types";

describe("Доступы провадера", () => {
  describe("Выключить себе провайдера", () => {
    let agent: TAgent;

    test("Новый агент успешно создан", async () => {
      var randomLogin = generateRandomLogin("AutoTestAgent_", 16);
      const client = new Client();
      const userAPI = new UserAPI(client);
      const agentAPI = new AgentAPI(client);
      // const provider = new ProviderAPI(client);
      const l = await userAPI.logIn({
        login: "new_admin",
        password: "113322",
      });
      // console.log(l);
      const r1 = await agentAPI.create({
        clientId: 30,
        login: randomLogin,
        password: "113322",
        name: randomLogin,
        balance: 1000,
        currency: "USD",
        canHaveChildren: true,
        isBlocked: false,
        isBalanceUnlimited: false,
      });
      expect(r1).toHaveProperty("result");
      if ("result" in r1) {
        expect(r1.result.id).toEqual(expect.any(Number));
        agent = r1.result;
      }
      const k = await userAPI.logOut();
    });

    test("Список провайдеров получен", async () => {
      const client = new Client();
      const userAPI = new UserAPI(client);
      const agentAPI = new AgentAPI(client);
      const providerAPI = new ProviderAPI(client);
      const l = await userAPI.logIn({
        login: agent.login,
        password: "113322",
      });
      const r1 = await providerAPI.filter({
        //agentId: agent.id,
      });
      console.log(r1);
    });
  });
});

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
import { expectHasAccess, expectHasNotAccess } from "./utilities";

describe("Права доступа", () => {
  describe("От роли Агента (AutoTest_LimitedAgent_Elena / 113322)", () => {
    const client = new Client();
    const user = new UserAPI(client);
    const agent = new AgentAPI(client);
    const cashierClient = new ClientAPI(client);
    const currency = new CurrencyAPI(client);
    const hall = new HallAPI(client);
    const history = new HistoryAPI(client);
    const player = new PlayerAPI(client);
    const provider = new ProviderAPI(client);
    const website = new WebsiteAPI(client);
    const game = new GameAPI(client);

    beforeAll(async () => {
      await user.logIn({
        login: "AutoTest_LimitedAgent_Elena",
        password: "113322",
      });
    });

    afterAll(async () => {
      await user.logOut();
    });

    describe("Agent", () => {
      test(".create Доступ есть", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await agent.create({
          clientId: 30,
          parentAgentId: 414,
          login: randomLogin,
          password: "123456",
          name: randomLogin,
          balance: 1000,
          currency: "USD",
          canHaveChildren: true,
          isBlocked: false,
          isBalanceUnlimited: false,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney Доступ есть", async () => {
        const r1 = await agent.depositMoney({
          id: 417,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney Доступ есть", async () => {
        const r1 = await agent.withdrawMoney({
          id: 417,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".filter Доступ есть", async () => {
        const r1 = await agent.filter({
          parentAgentId: 414,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".getById Доступ есть", async () => {
        const r1 = await agent.getById({
          id: 417,
        });
        expectHasAccess(r1);
      });

      test(".update Доступ есть", async () => {
        const r1 = await agent.update({
          id: 417,
          password: "123456",
        });
        expectHasAccess(r1);
      });
    });

    describe("Client", () => {
      test(".filter Доступа нет", async () => {
        const r1 = await cashierClient.filter({
          searchQuery: "30",
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById Доступ есть", async () => {
        const r1 = await cashierClient.getById({
          id: 30,
        });
        expectHasAccess(r1);
      });
    });

    describe("Currency", () => {
      test(".getById Доступ есть", async () => {
        const r1 = await currency.getAll();
        expectHasAccess(r1);
      });
    });

    describe("Hall", () => {
      test(".create Доступ есть", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await hall.create({
          clientId: 30,
          agentId: 414,
          login: randomLogin,
          password: "123456",
          name: randomLogin,
          balance: 100,
          currency: "USD",
          isBalanceUnlimited: false,
          isBlocked: false,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney Доступ есть", async () => {
        const r1 = await hall.depositMoney({
          id: 415,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney Доступ есть", async () => {
        const r1 = await hall.withdrawMoney({
          id: 415,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".filter Доступ есть", async () => {
        const r1 = await hall.filter({
          clientId: 30,
          agentId: 414,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".getById Доступ есть", async () => {
        const r1 = await hall.getById({
          id: 415,
        });
        expectHasAccess(r1);
      });

      test(".update Доступ есть", async () => {
        const r1 = await hall.update({
          id: 254,
          password: "123456",
        });
        expectHasAccess(r1);
      });
    });

    describe("History", () => {
      test(".filter Доступ есть", async () => {
        const r1 = await history.filter({
          playerId: 30,
          sessionStartedAt: 1607431055,
          sessionFinishedAt: 1607433684,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });
    });

    describe("Player", () => {
      test(".create Доступ есть", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await player.create({
          login: randomLogin,
          hallId: 415,
          password: "123456",
          balance: 1000,
          isBlocked: false,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney Доступ есть", async () => {
        const r1 = await player.depositMoney({
          id: 417,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney Доступ есть", async () => {
        const r1 = await player.withdrawMoney({
          id: 417,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".filter Доступ есть", async () => {
        const r1 = await player.filter({
          hallId: 415,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".getById Доступ есть", async () => {
        const r1 = await player.getById({
          id: 345,
        });
        expectHasAccess(r1);
      });

      test(".update Доступ есть", async () => {
        const r1 = await player.update({
          id: 345,
          password: "123456",
        });
        expectHasAccess(r1);
      });
    });

    describe("Provider", () => {
      test(".filter Доступ есть", async () => {
        const r1 = await provider.filter({
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".disable Доступ есть", async () => {
        const r1 = await provider.disable({
          ids: [2],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".enable Доступ есть", async () => {
        const r1 = await provider.enable({
          ids: [2],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".grantAccess Доступ есть", async () => {
        const r1 = await provider.grantAccess({
          ids: [2],
          agentId: 417,
        });
        expectHasAccess(r1);
      });

      test(".revokeAccess Доступ есть", async () => {
        const r1 = await provider.revokeAccess({
          ids: [2],
          agentId: 417,
        });
        expectHasAccess(r1);
      });
    });

    describe("Website", () => {
      test(".filter Доступ есть", async () => {
        const r1 = await website.filter({
          agentId: 414,
        });
        expect(r1).not.toHaveProperty("error.code", -32001);
      });

      test(".disable Доступ есть", async () => {
        const r1 = await website.disable({
          ids: [29],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".enable Доступ есть", async () => {
        const r1 = await website.enable({
          ids: [29],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".grantAccess Доступ есть", async () => {
        const r1 = await website.grantAccess({
          ids: [29],
          agentId: 417,
        });
        expectHasAccess(r1);
      });

      test(".revokeAccess Доступ есть", async () => {
        const r1 = await website.revokeAccess({
          ids: [29],
          agentId: 417,
        });
        expectHasAccess(r1);
      });
    });

    describe("Game", () => {
      test(".filter Доступ есть", async () => {
        const r1 = await game.filter({
          providerId: 3,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });
    });
  });
});

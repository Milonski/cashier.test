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
  describe("От роли Админа Зала (AutoTest_Hall_Limited / 113322)", () => {
    const client = new Client();
    const user = new UserAPI(client);
    const agent = new AgentAPI(client);
    const cashier_client = new ClientAPI(client);
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
      test(".create Доступа нет", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await agent.create({
          clientId: 10,
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
        expectHasNotAccess(r1);
      });

      test(".depositMoney Доступа нет", async () => {
        const r1 = await agent.depositMoney({
          id: 417,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".withdrawMoney Доступа нет", async () => {
        const r1 = await agent.withdrawMoney({
          id: 417,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".filter Доступа нет", async () => {
        const r1 = await agent.filter({
          parentAgentId: 414,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById Доступа нет", async () => {
        const r1 = await agent.getById({
          id: 417,
        });
        expectHasNotAccess(r1);
      });

      test(".update Доступа нет", async () => {
        const r1 = await agent.update({
          id: 417,
          password: "123456",
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Client", () => {
      test(".filter Доступа нет", async () => {
        const r1 = await cashier_client.filter({
          searchQuery: "30",
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById Доступа нет", async () => {
        const r1 = await cashier_client.getById({
          id: 30,
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Currency", () => {
      test(".getById Доступа нет", async () => {
        const r1 = await currency.getAll();
        expectHasNotAccess(r1);
      });
    });

    describe("Hall", () => {
      test(".create Доступа нет", async () => {
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
        expectHasNotAccess(r1);
      });

      test(".depositMoney Доступа нет", async () => {
        const r1 = await hall.depositMoney({
          id: 415,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".withdrawMoney Доступа нет", async () => {
        const r1 = await hall.withdrawMoney({
          id: 415,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".filter Доступа нет", async () => {
        const r1 = await hall.filter({
          clientId: 30,
          agentId: 414,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById (себя) Доступ есть", async () => {
        const r1 = await hall.getById({
          id: 383,
        });
        expectHasAccess(r1);
      });

      test(".getById(чужой) Доступа нет", async () => {
        const r1 = await hall.getById({
          id: 415,
        });
        expectHasNotAccess(r1);
      });

      test(".update(себя) Доступ есть", async () => {
        const r1 = await hall.update({
          id: 383,
          password: "123456",
        });
        expectHasAccess(r1);
      });

      test(".update (чужой) Доступа нет", async () => {
        const r1 = await hall.update({
          id: 415,
          password: "123456",
        });
        expectHasNotAccess(r1);
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
          hallId: 383,
          password: "123456",
          balance: 1000,
          isBlocked: false,
        });
        expectHasAccess(r1);
      });

      test(".create (чужой) Доступа нет", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await player.create({
          login: randomLogin,
          hallId: 415,
          password: "123456",
          balance: 1000,
          isBlocked: false,
        });
        expectHasNotAccess(r1);
      });

      test(".depositMoney Доступ есть", async () => {
        const r1 = await player.depositMoney({
          id: 381,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney (чужой) Доступа нет", async () => {
        const r1 = await player.depositMoney({
          id: 383,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".withdrawMoney Доступ есть", async () => {
        const r1 = await player.withdrawMoney({
          id: 381,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney (чужой) Доступа нет", async () => {
        const r1 = await player.withdrawMoney({
          id: 383,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".filter Доступ есть", async () => {
        const r1 = await player.filter({
          hallId: 383,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".filter (чужой) Доступа нет", async () => {
        const r1 = await player.filter({
          hallId: 415,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById Доступ есть", async () => {
        const r1 = await player.getById({
          id: 381,
        });
        expectHasAccess(r1);
      });

      test(".getById (чужой) Доступа нет", async () => {
        const r1 = await player.getById({
          id: 383,
        });
        expectHasNotAccess(r1);
      });

      test(".update Доступ есть", async () => {
        const r1 = await player.update({
          id: 381,
          password: "123456",
        });
        expectHasAccess(r1);
      });

      test(".update (чужой) Доступа нет", async () => {
        const r1 = await player.update({
          id: 383,
          password: "123456",
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Provider", () => {
      test(".filter Доступ есть", async () => {
        const r1 = await provider.filter({
          hallId: 383,
        });
        expectHasAccess(r1);
      });

      test(".disable Доступа нет", async () => {
        const r1 = await provider.disable({
          ids: [2],
          hallId: 383,
        });
        expectHasNotAccess(r1);
      });

      test(".enable Доступа нет", async () => {
        const r1 = await provider.enable({
          ids: [2],
          hallId: 383,
        });
        expectHasNotAccess(r1);
      });

      test(".grantAccess Доступа нет", async () => {
        const r1 = await provider.grantAccess({
          ids: [2],
          hallId: 383,
        });
        expectHasNotAccess(r1);
      });

      test(".revokeAccess Доступа нет", async () => {
        const r1 = await provider.revokeAccess({
          ids: [2],
          hallId: 383,
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Website", () => {
      test(".filter Доступа нет", async () => {
        const r1 = await website.filter({
          agentId: 414,
        });
        expectHasNotAccess(r1);
      });

      test(".disable Доступа нет", async () => {
        const r1 = await website.disable({
          ids: [29],
          agentId: 414,
        });
        expectHasNotAccess(r1);
      });

      test(".enable Доступа нет", async () => {
        const r1 = await website.enable({
          ids: [29],
          agentId: 414,
        });
        expectHasNotAccess(r1);
      });

      test(".grantAccess Доступа нет", async () => {
        const r1 = await website.grantAccess({
          ids: [29],
          agentId: 414,
        });
        expectHasNotAccess(r1);
      });

      test(".revokeAccess Доступа нет", async () => {
        const r1 = await website.revokeAccess({
          ids: [29],
          agentId: 414,
        });
        expectHasNotAccess(r1);
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
        expectHasNotAccess(r1);
      });
    });
  });
});

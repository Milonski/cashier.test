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
      test(".create (свой) Доступ есть", async () => {
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

      test(".create (чужой) Доступа нет", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await agent.create({
          clientId: 30,
          parentAgentId: 405,
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

      test(".depositMoney (свой) Доступ есть", async () => {
        const r1 = await agent.depositMoney({
          id: 417,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney (чужой) Доступа нет", async () => {
        const r1 = await agent.depositMoney({
          id: 405,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".withdrawMoney (свой) Доступ есть", async () => {
        const r1 = await agent.withdrawMoney({
          id: 417,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney (чужой) Доступа нет", async () => {
        const r1 = await agent.withdrawMoney({
          id: 417,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".filter (свой) Доступ есть", async () => {
        const r1 = await agent.filter({
          parentAgentId: 414,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".filter (чужой) Доступа нет", async () => {
        const r1 = await agent.filter({
          parentAgentId: 405,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById (свой) Доступ есть", async () => {
        const r1 = await agent.getById({
          id: 417,
        });
        expectHasAccess(r1);
      });

      test(".getById (чужой) Доступа нет", async () => {
        const r1 = await agent.getById({
          id: 417,
        });
        expectHasNotAccess(r1);
      });

      test(".update (свой) Доступ есть", async () => {
        const r1 = await agent.update({
          id: 417,
          password: "123456",
        });
        expectHasAccess(r1);
      });

      test(".update (чужой) Доступа нет", async () => {
        const r1 = await agent.update({
          id: 417,
          password: "123456",
        });
        expectHasNotAccess(r1);
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

      test(".getById Доступа нет", async () => {
        const r1 = await cashierClient.getById({
          id: 30,
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Currency", () => {
      test(".getAll Доступ есть", async () => {
        const r1 = await currency.getAll();
        expectHasAccess(r1);
      });
    });

    describe("Hall", () => {
      test(".create (свой агент) Доступ есть", async () => {
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

      test(".create (чужой агент) Доступ есть", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await hall.create({
          clientId: 30,
          agentId: 405,
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

      test(".depositMoney (свой) Доступ есть", async () => {
        const r1 = await hall.depositMoney({
          id: 415,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney (чужой) Доступа нет", async () => {
        const r1 = await hall.depositMoney({
          id: 405,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".withdrawMoney (свой) Доступ есть", async () => {
        const r1 = await hall.withdrawMoney({
          id: 415,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney (чужой) Доступа нет", async () => {
        const r1 = await hall.withdrawMoney({
          id: 405,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".filter (свой) Доступ есть", async () => {
        const r1 = await hall.filter({
          agentId: 414,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".filter (чужой) Доступа нет", async () => {
        const r1 = await hall.filter({
          agentId: 405,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById (себя) Доступ есть", async () => {
        const r1 = await hall.getById({
          id: 415,
        });
        expectHasAccess(r1);
      });

      test(".getById (чужой) Доступ есть", async () => {
        const r1 = await hall.getById({
          id: 405,
        });
        expectHasNotAccess(r1);
      });

      test(".update (свой субагент) Доступ есть", async () => {
        const r1 = await hall.update({
          id: 415,
          password: "123456",
        });
        expectHasAccess(r1);
      });

      test(".update (чужой агент) Доступа нет", async () => {
        const r1 = await hall.update({
          id: 405,
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
      test(".create (свой зал) Доступ есть", async () => {
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

      test(".create (чужой зал) Доступа нет", async () => {
        var randomLogin = generateRandomLogin("AutoTest_", 16);
        const r1 = await player.create({
          login: randomLogin,
          hallId: 383,
          password: "123456",
          balance: 1000,
          isBlocked: false,
        });
        expectHasNotAccess(r1);
      });

      test(".depositMoney (свой игрок) Доступ есть", async () => {
        const r1 = await player.depositMoney({
          id: 410,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".depositMoney (чужой игрок) Доступа нет", async () => {
        const r1 = await player.depositMoney({
          id: 417,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".withdrawMoney (свой игрок) Доступ есть", async () => {
        const r1 = await player.withdrawMoney({
          id: 410,
          amount: 100,
        });
        expectHasAccess(r1);
      });

      test(".withdrawMoney (чужой игрок) Доступа нет", async () => {
        const r1 = await player.withdrawMoney({
          id: 417,
          amount: 100,
        });
        expectHasNotAccess(r1);
      });

      test(".filter (свой зал) Доступ есть", async () => {
        const r1 = await player.filter({
          hallId: 415,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasAccess(r1);
      });

      test(".filter (чужой зал) Доступа нет", async () => {
        const r1 = await player.filter({
          hallId: 383,
          paging: {
            offset: 0,
            limit: 100,
          },
        });
        expectHasNotAccess(r1);
      });

      test(".getById (свой игрок) Доступ есть", async () => {
        const r1 = await player.getById({
          id: 410,
        });
        expectHasAccess(r1);
      });

      test(".getById (чужой игрок) Доступа нет", async () => {
        const r1 = await player.getById({
          id: 417,
        });
        expectHasNotAccess(r1);
      });

      test(".update (свой игрок) Доступ есть", async () => {
        const r1 = await player.update({
          id: 410,
          password: "123456",
        });
        expectHasAccess(r1);
      });

      test(".update (чужой игрок) Доступа нет", async () => {
        const r1 = await player.update({
          id: 417,
          password: "123456",
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Provider", () => {
      test(".filter (себя) Доступ есть", async () => {
        const r1 = await provider.filter({
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".disable (себя) Доступ есть", async () => {
        const r1 = await provider.disable({
          ids: [2],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".disable (чужой агент) Доступа нет", async () => {
        const r1 = await provider.disable({
          ids: [2],
          agentId: 515,
        });
        expectHasNotAccess(r1);
      });

      test(".enable (себя) Доступ есть", async () => {
        const r1 = await provider.enable({
          ids: [2],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".enable (чужой агент) Доступа нет", async () => {
        const r1 = await provider.enable({
          ids: [2],
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });

      test(".grantAccess (свой субагент) Доступ есть", async () => {
        const r1 = await provider.grantAccess({
          ids: [2],
          agentId: 417,
        });
        expectHasAccess(r1);
      });

      test(".grantAccess (чужой субагент) Доступа нет", async () => {
        const r1 = await provider.grantAccess({
          ids: [2],
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });

      test(".revokeAccess (свой субагент) Доступ есть", async () => {
        const r1 = await provider.revokeAccess({
          ids: [2],
          agentId: 417,
        });
        expectHasAccess(r1);
      });

      test(".revokeAccess (чужой субагент) Доступа нет", async () => {
        const r1 = await provider.revokeAccess({
          ids: [2],
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });
    });

    describe("Website", () => {
      test(".filter (по себе) Доступ есть", async () => {
        const r1 = await website.filter({
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".filter (чужой агент) Доступа нет", async () => {
        const r1 = await website.filter({
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });

      test(".disable (себя) Доступ есть", async () => {
        const r1 = await website.disable({
          ids: [29],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".disable (чужой агент) Доступа нет", async () => {
        const r1 = await website.disable({
          ids: [29],
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });

      test(".enable (себя) Доступ есть", async () => {
        const r1 = await website.enable({
          ids: [29],
          agentId: 414,
        });
        expectHasAccess(r1);
      });

      test(".enable (чужой агент) Доступа нет", async () => {
        const r1 = await website.enable({
          ids: [29],
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });

      test(".grantAccess (свой агент) Доступ есть", async () => {
        const r1 = await website.grantAccess({
          ids: [29],
          agentId: 417,
        });
        expectHasAccess(r1);
      });

      test(".grantAccess (чужой агент) Доступа нет", async () => {
        const r1 = await website.grantAccess({
          ids: [29],
          agentId: 551,
        });
        expectHasNotAccess(r1);
      });

      test(".revokeAccess (свой агент) Доступ есть", async () => {
        const r1 = await website.revokeAccess({
          ids: [29],
          agentId: 417,
        });
        expectHasAccess(r1);
      });

      test(".revokeAccess (чужой агент) Доступа нет", async () => {
        const r1 = await website.revokeAccess({
          ids: [29],
          agentId: 551,
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
        expectHasAccess(r1);
      });
    });
  });
});

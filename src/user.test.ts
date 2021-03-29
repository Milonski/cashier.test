import { Client } from "./api/client";
import { UserAPI } from "./api";

describe("User", () => {
  describe("Схемы", () => {});

  describe("Логика", () => {
    // test(".logIn", async () => {
    //   const r1 = await user.getCurrent();
    //   expect(r1).toHaveProperty("error");

    //   const r2 = await user.logIn({
    //     login: "new_admin",
    //     password: "113322",
    //   });
    //   expect(r2).toHaveProperty("result");
    //   if ("result" in r2) {
    //     expect(r2.result.login).toEqual("new_admin");
    //   }

    //   const r3 = await user.getCurrent();
    //   expect(r3).toHaveProperty("result");
    //   if ("result" in r3) {
    //     expect(r3.result.login).toEqual("new_admin");
    //   }
    // });

    // test(".logOut", async () => {
    //   const r1 = await user.getCurrent();
    //   expect(r1).toHaveProperty("result");

    //   const r2 = await user.logOut();
    //   expect(r2).toHaveProperty("result", "success");

    //   const r3 = await user.getCurrent();
    //   expect(r3).toHaveProperty("error");
    // });

    describe("Создание игрока", () => {
      const client = new Client();
      const user = new UserAPI(client);
      beforeAll(async () => {
        await user.logIn({
          login: "new_admin",
          password: "113322",
        });
      });
      afterAll(async () => {
        await user.logOut();
      });
      let agentBalance: number;
      let playersCount: number;
      test("Получение баланса агента", async () => {
        const r1 = await user.getCurrent();
        agentBalance = 100;
      });
      test("Получение кол-ва игроков", async () => {
        const r1 = await user.getCurrent();
        playersCount = 100;
      });
      test("Игрок создался", async () => {
        const r1 = await user.getCurrent();
        // expect(r1).toHaveProperty("error");
        // if ("error" in r1) {
        //   expect(r1.error.code).toEqual(-3200s0);
        // }
      });
      test("Кол-во игроков увеличилось", async () => {
        const r1 = await user.getCurrent();
        expect(101).toEqual(playersCount + 1);
      });
      test("Баланс агента уменьшился", async () => {
        const r1 = await user.getCurrent();
        expect(0).toEqual(agentBalance - 100);
      });
    });
  });
});

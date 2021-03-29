import {Client} from "./api/client";
import {UserAPI, PlayerAPI} from "./api";
import {randomCorrectLogin} from "./utilities";


describe ("Player", () => {
  describe ("Логика", () => {
    describe ("Создание нового игрока", () => {
      const client = new Client();
      const player = new PlayerAPI(client);
      const user = new UserAPI(client);

      //Вход в акк перед тестом
      beforeAll(async () => {
        await user.logIn({
          login: "new_admin",
          password: "113322",
        });
      });

      //Выход из акк после тестов
      afterAll(async () => {
        await user.logOut();
      });

      let playersCount: number;
      test("Начальное кол-во игроков", async () => {
        const r1 = await player.filter({
          hallId: 383,
          paging: {
            offset: 0,
            limit: 10
          }
        })
        expect(r1).toHaveProperty("result");
        if ("result" in r1) {
          playersCount = r1.result.total;
        }
      });

      test("Новый игрок успешно создался", async () => {
        var randomLogin = randomCorrectLogin(16);
        const r1 = await player.create({
          login: "AutoTest_" + randomLogin,
          hallId: 383,
          password: "1a13322",
          balance: 10000,
          isBlocked: false
        });
        expect(r1).toHaveProperty("result");
        if("result" in r1) {
          expect(r1.result.id).toEqual(expect.any(Number));
        }
      });

      test("Кол-во игроков увеличилось на 1", async () => {
        const r1 = await player.filter({
          hallId: 383,
          paging: {
            offset: 0,
            limit: 10
          }
        })
        expect(r1).toHaveProperty("result");
        let newPlayersCount: number;
        if ("result" in r1) {
          newPlayersCount = r1.result.total;
        }
        expect(newPlayersCount).toEqual(playersCount + 1);
      });
    });
  })
})
import DB from "../../../application/modules/DB/DB";
import User from "../../../application/modules/UserManager/User";
import { regUser, getActiveRecordUser } from "../user/config";

let user: User;
let db: DB; 

beforeAll(async () => {
  user = await getActiveRecordUser();
  db = user.db; 
});

describe('getUserByLogin', () => {
    const {login}  = regUser;

  test('возвращает пользователя с заданным логином', async () => {
    const returnedUser = await db.getUserByLogin('vasya');
    expect(returnedUser).toStrictEqual({id: "2", login: "vasya", name: "Vasya Pupkin", password: "123", token: '0cf5aa89a6d1cdf19ad9fc3b17ba7987'});
  });

  test('не возращает пользователя с заданным логином, его нет', async () => {
    const returnedUser = await db.getUserByLogin(login);
    expect(returnedUser).toBe(null);
  });
});


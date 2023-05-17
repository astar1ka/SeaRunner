import User from "../../../application/modules/UserManager/User";
import { regUser, getActiveRecordUser } from "./config";

let user: User;

beforeAll(async () => user = await getActiveRecordUser());

describe('User.registration', () => {
    const { login, password, name, socketId } = regUser;

    test('Регистрируем рандомного пользователя', async () => {
        const result = await user.registration(login, password, name);
        expect(result).toEqual(true);
        const data = user.getData();
        expect(data.name).toEqual(name);
    });

    test('Повторная регистрация', async () => {
        const result = await user.registration(login, password, name);
        expect(result).toEqual(false);
    });

    test('Попытка входа', async () => {
        const result = await user.auth(login, password, socketId);
        expect(result).toEqual(true);
        const data = user.getData();
        expect(data.token).not.toBeNull();
    });
})
import User from "../../../application/modules/UserManager/User";
import { getActiveRecordUser, authUser, wrongPassword } from "./config";
let user: User;

beforeAll(async () => user = await getActiveRecordUser());


describe('User.auth', () => {
    const {login, password, socketId } = authUser;
    let saveToken: string;

    test('Неправильный пароль', async () => {
        const result = await user.auth(login, wrongPassword, socketId);
        expect(result).toEqual(false);
    });

    test('Попытка входа', async () => {
        const result = await user.auth(login, password, socketId);
        expect(result).toEqual(true);

        const data = user.getData();
        expect(data.token).not.toBeNull();
        saveToken = data.token;
    });

    test('Повторная попытка входа', async () => {
        const result = await user.auth(login, password, socketId);
        expect(result).toEqual(true);

        const data = user.getData()
        expect(data.token).not.toBe(saveToken);
    });
})
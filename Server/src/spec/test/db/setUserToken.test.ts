import md5 from "md5";
import DB from "../../../application/modules/DB/DB";
import { TUser } from "../../../application/modules/Types";
import CONFIG from "../../../config";

const initCb = () => {}

describe('setUserToken', () => {
    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    let user: TUser;
    test('Пользователь Test существует', async () => {
        user = await db.getUserByLogin('test');
        expect(user.name).toEqual('test');
    });
    test('Токен изменяется на md5', async () => {
        const md5Token = md5(Math.random().toString());
        await db.setUserToken(user.id, md5Token);
        user = await db.getUserByLogin('test');
        expect(user.token).toEqual(md5Token);
    });
    test('Заменяем токен на null', async () => {
        await db.setUserToken(user.id, null);
        user = await db.getUserByLogin('test');
        expect(user.token).toEqual(null);
    });
})
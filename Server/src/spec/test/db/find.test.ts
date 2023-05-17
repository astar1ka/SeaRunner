import DB from "../../../application/modules/DB/DB";
import { Tables } from "../../../application/modules/Types";
import CONFIG from "../../../config";
import { Client } from 'pg';

const DB_forTest = new Client ({
    host: 'localhost',
    port: 5432,
    database: 'searunner',
    user: 'postgres',
    password: '111'
});

(async () => {
    await DB_forTest.connect();
})();

const initCb = () => {}

describe('find', () => {

    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });

    test('find', async () => {
        const usersId = await DB_forTest.query('SELECT id FROM users');
        const countId = usersId?.rowCount;
        const randomId = Math.floor(Math.random()*countId)+1;
        let tables = await db.find(Tables.users, randomId);
        expect(tables).not.toBeNull();
        expect(tables).toHaveProperty('login');
    });
});
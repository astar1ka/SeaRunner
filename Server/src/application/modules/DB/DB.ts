import { Client } from 'pg';
import ORM from './ORM';
import { IUser, TUsers, TShips, IUserData, TMessages, IMessageData, ICaptainData, TCaptainData, ICaptain, TCaptains, TRoom, Tables, TAttributes, TMessage, TBaseShip, TSettlement } from '../Types';

export default class DB {
    private db: Client | null;
    private orm: ORM;
    constructor(options: {
        HOST: string,
        PORT: number,
        NAME: string,
        USER: string,
        PASS: string,
        initCb: Function
    }) {
        const { HOST, PORT, NAME, USER, PASS, initCb = () => { } } = options;
        this.db = new Client({
            host: HOST,
            port: PORT,
            database: NAME,
            user: USER,
            password: PASS
        });
        this.orm = new ORM(this.db);
        (async () => {
            await this.connect(initCb);
            /*const query = 'SELECT * FROM users WHERE id=$1::integer';
            const users = await this.db.query(query, [1]).rows?.[0];
            console.log(users);*/
        })();
    }

    async connect(initCb: Function) {
        if (this.db) {
            await this.db.connect();
            initCb();
        }
    }

    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
    }

    public async find(table: Tables, id: number) {
        return await this.orm.select(table).where({ id: id }).run(true);
    }

    public async updateRecord(table: Tables, id: number, data: object) {
        return await this.orm.update(table, data).where({ id: id }).run();
    }

    public async addRecord(table: Tables, data: object) {
        return await this.orm.insert(table, [{ ...data }]).run(true);
    }

    ////////////////////////////
    //////////USER//////////////
    ////////////////////////////

    public async getUserByLogin(login: string) {
        return await this.orm.select('users').where({ login }).run(true)
    }

    public async addUser(data: IUserData) {
        return await this.orm.insert('users', [data]).run(true);
    }

    public setUserToken(id: number, token: string | null) {

        return this.orm.update('users', { token }).where({ id }).run();
    }

    public async updateUser(id: number, field: object) {
        //return this.orm.update('users', id, field);
    }

    ////////////////////////////
    //////////CAPTAIN///////////
    ////////////////////////////

    public addCaptain(captain: ICaptainData) {
        //return this.orm.insert('captains', [captain]).run();
    }

    public getCaptain(userId: number) {
        return this.orm.select('captains').where({userId}).run(true);
    }

    public getCaptains() {
        //return this.orm.all('captains').all<TCaptains>();
    }

    public updateCaptain(userId: number, captain: TCaptainData) {
        //return this.orm.update('captains', userId, captain);
    }

    ////////////////////////////
    //////////SHIP//////////////
    ////////////////////////////

    public getShips(captain_id: number): TShips {
        return this.orm.select('ships').where({captain_id}).run();
    }

    public getShipsTypes(){
        return this.orm.select('ships_types').run();
    }


    ////////
    //Chat//
    ////////

    public getMessages(roomGuid: string) {
        /*return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT messages.userIdFrom, users.name, messages.message, rooms.type FROM messages,users, rooms WHERE users.id = messages.userIdFrom AND rooms.guid = messages.roomGuid AND messages.roomGuid=? ',
                [roomGuid],
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });*/
    }

    public getRoom(guid: string) {
        //return this.orm.get<TRoom>('rooms', { guid });
    }

    public addRoom(guid: string, type: string) {
        //return this.orm.insert('rooms', [{ guid, type }]).run()
    }

    public addUserToRoom(roomGuid: string, userId: number) {
        //return this.orm.insert('roomsUsers', [{ roomGuid, userId }]).run()
    }

    public getRoomUserById(roomGuid: string, userId: number) {
        return this.orm.select('roomsUsers').where({ roomGuid, userId }).run();
    }

    public getPrivateRoom(userId_1: number, userId_2: number) {
        //return 1;
    }

    public async addMessage(roomId: string, userIdFrom: number, message: string): Promise<TMessage | null> {
        return await this.orm.insert('messages', [{ roomId, userIdFrom, message }]).run<TMessage>();
    }

    public editMessage(id: number, message: string) {
        //return this.orm.update('messages', id, { message });
    }

    public deleteMessages(id: number) {
        //return this.orm.delete('messages', id)
    }

    public deleteUser(id: number) {
        //return this.orm.delete('users', id);
    }

    /////////////////////////////
    /////////////ITEMS///////////
    /////////////////////////////

    public addNewItem(guid: string, typeId: number) {
        //return this.orm.insert('items', [{ guid, typeId }])
    }

    public getItem(guid: string) {
        //return this.orm.get('items', { guid });
    }

    public addItemTo(ownerId: number, cellNumber: number, guid: string) {
        //return this.orm.insert('items', [{ ownerId, cellNumber, guid }])
    }

    public getTypesItems() {
        //return this.orm.all('typesItems');
    }

    /////////////////////////////
    /////////////TOWNS///////////
    /////////////////////////////

    public getSettlements(): Promise<TSettlement [] | null>{
        return this.orm.select('settlements').run<TSettlement[]>();
    }

    /////////////////////////////
    /////////////PORTS///////////
    /////////////////////////////

    public getPorts() {
        //return this.orm.all('ports');
    }

    /////////////////////////////
    /////////////FORTS///////////
    /////////////////////////////

    public getForts() {
        //return this.orm.all('forts');
    }

    //typesItems и alliances
    /////////////////////////////
    /////////////ALLIANCES///////////
    /////////////////////////////

    public getAlliances() {
        //return this.orm.all('alliances');
    }

    public getMarketBySettlementId(settlement_id: number){
       return this.orm.select('markets').where({settlement_id}).run(true);
    }

}
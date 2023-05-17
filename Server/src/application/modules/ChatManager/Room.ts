import md5 from "md5";
import DB from "../DB/DB";
import User from "../UserManager/User";
import { TMessages, Tables } from "../Types";
import ActiveRecord from "../ActiveRecord";

export default class Rooms extends ActiveRecord{
    private guid: string = '';
    private type: string = '';
    private messages: TMessages = [];
    constructor (db: DB){
        super(db, Tables.rooms);
    }

    public async init(roomId: number): Promise<boolean>{
        if (roomId){
            this.attributes.id = roomId;
            if (await this.refresh()){
                await this.loadMessage();
                return true;
            }
            return false;
        }
        return false;
    }

    public async getPrivateRoom(user_1: User, user_2: User){
        if (user_1 && user_2){
            return await this.db.getPrivateRoom(user_1.getId(), user_2.getId());
        }
        return null;
    }

    public async createRoom(type: string){
        this.type = type;
        this.guid = md5(Math.random().toString());
        await this.db.addRoom(this.guid, this.type);
    }

    public addUserToRoom(user: User){
        if (user) {
            this.db.addUserToRoom(this.guid, user.getId());
        }
    }

    async addMessage(user:User, message: string){
        if (user && message){
            const result  = await this.db.addMessage(this.attributes.id, user.getId(), message);
            if (result) this.messages.push(result);
            return this.getMessages();
        }
    }

    async loadMessage(){
        return await this.db.getMessages(this.attributes.id);
    }

    getMessages(){
        return this.messages;
    }

    async verification(userId:number){
        const user = await this.db.getRoomUserById(this.guid,userId);
        if (user) return true;
        return false;
    }
}
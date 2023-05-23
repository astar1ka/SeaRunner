import { io } from "socket.io-client";
import { TCaptain } from "../models/Captain";

type TUser = {
    readonly id: number;
    readonly token: string;
    readonly name: string;
} | null;

export enum MESSAGES {
    //USER
    LOG_IN = 'LOG_IN',
    LOG_OUT = 'LOG_OUT',
    REGISTRATION = 'REGISTRATION',
    //CHAT
    GET_ALL_USERS = 'LOG_OUT',
    GET_MESSAGES_PRIVATE = 'LOG_OUT',
    GET_MESSAGES_ALL = 'LOG_OUT',
    GET_MESSAGES = 'GET_MESSAGES',
    //GAME
    GET_CAPTAIN = 'GET_CAPTAIN',
    ADD_CAPTAIN = 'ADD_CAPTAIN',
    GET_START = 'GET_START',
    GAME_LOADED = 'GAME_LOADED'
}

export default class IOSocket {
    private socket = io('http://localhost:3001');
    private user: TUser = null;
    constructor(){
        this.socket.auth = {token: 123}
    }

    public login(login: string, password: string, callback: Function): void {
        this.socket.emit(MESSAGES.LOG_IN, login, password, (user: TUser) => {
            this.user = user;
            this.socket.auth = {token: user?.token}
            callback(user);
        });
    }

    public logout(callback: Function): void {
        if (this.user) {
            this.socket.emit(MESSAGES.LOG_OUT, this.user.token, callback);
        }
    }

    public registration(login: string, password: string, name: string, callback: Function) {
        this.socket.emit(MESSAGES.REGISTRATION, login, password, name, callback);
    }

    public getMessagesToAll(subscriber: Function) {
        if (this.user) {
            this.socket.removeListener('GET_MESSAGES_ALL');
            this.socket.once('GET_MESSAGES_ALL', (data) => {
                subscriber(true, data);
            })
        }
    }

    public getMessagesPrivate(subscriber: Function) {
        this.socket.removeListener('GET_MESSAGES_PRIVATE');
        this.socket.on('GET_MESSAGES_PRIVATE', (data) => subscriber(true, data));
    }

    public sendMessage(message: string, toUserId: number | null) {
        if (this.user) {
            this.socket.emit('SEND_MESSAGE', toUserId, message, this.user.token);
        }
    }

    public gameLoaded() {
        if (this.user) this.socket.emit(MESSAGES.GAME_LOADED);
    }

    public getCaptain(callback: Function) {
        if (this.user) this.socket.emit(MESSAGES.GET_CAPTAIN, this.user.token, callback);
    }

    public addCaptain(allianceId: number, callback: Function) {
        if (this.user) this.socket.emit(MESSAGES.ADD_CAPTAIN, this.user.token, allianceId, callback);
    }

    createDefaultShip(){
        if (this.user) this.socket.emit('CREATE_DEFAULT_SHIP', this.user.token);
    }

    getSettlement(answer: Function){
        if (this.user) this.socket.emit('GET_SETTLEMENT', this.user.token, answer);
    }

    exitSettlement(){
        if (this.user) this.socket.emit('EXIT_SETTLEMENT', this.user.token);
    }

    onUpdateCaptain(handler: Function){
        this.socket.on('UPDATE_CAPTAIN', (captain: TCaptain) => handler(captain));
    }

}
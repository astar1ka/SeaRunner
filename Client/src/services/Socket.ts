import { io } from "socket.io-client";
import { TCaptain } from "../models/Captain";
import mediator from "./Mediator";
import { TSettlement } from "./GameManager";

export type TUser = {
    readonly id: number;
    readonly name: string;
} | null;

export enum MESSAGES {
    //USER
    LOG_IN = 'LOG_IN',
    LOG_IN_SUCCEFUL = 'LOG_IN_SUCCEFUL',
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
    GAME_LOADED = 'GAME_LOADED',
    NEW_GAME = 'NEW_GAME'

}

export default class IOSocket {
    private socket = io('http://localhost:3001');
    private user: TUser = null;
    constructor(){
        this.socket.on(MESSAGES.LOG_IN, (user: TUser) => mediator.call('UPDATE_USER', user));
        this.socket.on(MESSAGES.GET_CAPTAIN, (captain: TCaptain) => mediator.call('UPDATE_PLAYER', captain));
        this.socket.on('GET_SETTLEMENT', (settlement: TSettlement) => {
            console.log(settlement);
            mediator.call('UPDATE_SETTLEMENT', settlement)
        });
    }

    public login(login: string, password: string): void {
        this.socket.emit(MESSAGES.LOG_IN, login, password);
    }

    public logout(callback: Function): void {
        if (this.user) {
            this.socket.emit(MESSAGES.LOG_OUT, callback);
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
            this.socket.emit('SEND_MESSAGE', toUserId, message);
        }
    }

    public gameLoaded() {
        if (this.socket.auth) this.socket.emit(MESSAGES.GAME_LOADED);
    }

    public getCaptain() {
        this.socket.emit(MESSAGES.GET_CAPTAIN);
    }

    public newGame(allianceId: number) {
        this.socket.emit(MESSAGES.NEW_GAME,  allianceId);
    }

    createDefaultShip(){
        if (this.user) this.socket.emit('CREATE_DEFAULT_SHIP');
    }

    getSettlement(){
        this.socket.emit('GET_SETTLEMENT');
    }

    exitSettlement(){
        this.socket.emit('EXIT_SETTLEMENT');
    }

    onUpdateCaptain(handler: Function){
        this.socket.on('UPDATE_CAPTAIN', (captain: TCaptain) => handler(captain));
    }

    setShip(id: number){
        this.socket.emit('SET_SHIP', id);
    }
}
import Cache from "../Cache";
import Manager, { IManager } from "../Manager";
import User from "./User";
import { Event, Socket } from "socket.io";

export default class UserManager extends Manager {
    private users = new Cache<User>;
    constructor(options: IManager) {
        super(options);
        const { LOG_IN, LOG_OUT, REGISTRATION } = this.MESSAGES;
        //io
        this.socket.on(LOG_IN, async (login: string, password: string, socket: Socket) => await this.login(login, password, socket));
        this.socket.on(REGISTRATION, (login: string, password: string, name: string, socket: Socket) => this.registration(socket, login, password, name));
        //this.socket.on(LOG_OUT, (token: string, callback: Function, socket: Socket) => Auth(socket, this.mediator, token, (user: User) => this.logout(user, callback)));
        this.socket.on('disconnect', (socket: Socket) => this.disconnect(socket))
        //Mediator Triggers
        const { GET_USER, GET_USER_BY_TOKEN } = this.TRIGGERS;
        this.mediator.set(GET_USER, (socketId: string) => this.getUser(socketId));
        this.mediator.set(GET_USER_BY_TOKEN, (token: string) => this.getUser(token));
        //Mediator Events
    }

    private async login(login: string, password: string, socket: Socket) {
        const user = new User(this.db);
        console.log(login,password);
        if (await user.auth(login, password, socket.id)) {
            this.users.set(user.getToken(), user);
            socket.handshake.auth.token = user.getToken();
            return ['LOG_IN', user.getData()];
        }
        else return ['LOG_IN', null];
    }

    private userOffline(user: User) {
        this.mediator.call(this.EVENTS.USER_LOG_OUT, user);
        this.users.remove(user.getSocketId());
        user.logout();
    }

    public disconnect(socket: Socket) {
        const user = this.getUser(socket.id);
        if (user) this.userOffline(user);
    }

    public getUser(token: string): User | null {
        return this.users.get(token) || null;
    }

    public async registration(socket: Socket, login: string, password: string, name: string) {
        const user = new User(this.db);
        await user.registration(login, password, name);
    }

    public logout(user: User, callback: Function): void {
        callback(user.logout());
    }

    testLogin(login: string) {
        return login;
    }

}


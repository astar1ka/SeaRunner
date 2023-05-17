import Auth from "../Auth";
import Cache from "../Cache";
import Manager, { IManager } from "../Manager";
import User from "./User";
import { Socket } from "socket.io";

export default class UserManager extends Manager {
    private users = new Cache<User>;
    constructor(options: IManager) {
        super(options);
        const {LOG_IN, LOG_OUT, REGISTRATION} = this.MESSAGES;
        //io
        if (!this.io) return;
        this.io.on('connection', (socket: Socket) => {
            socket.on(LOG_IN, (login:string, password: string, callback: Function) => this.login(socket.id, login, password, callback));
            socket.on(REGISTRATION, (login:string, password: string, name: string, cbRegistration: Function) => this.registration(socket, login, password, name, cbRegistration));
            socket.on(LOG_OUT, (token: string, callback: Function) => Auth(socket,this.mediator, token, (user: User) => this.logout(user, callback)) );
            socket.on('disconnect', () => this.disconnect(socket))
        });
        //Mediator Triggers
        const {GET_USER,GET_USER_BY_TOKEN} = this.TRIGGERS;
        this.mediator.set(GET_USER, (socketId: string) => this.getUser(socketId));
        this.mediator.set(GET_USER_BY_TOKEN, (token: string) => this.getUser(token));
        //Mediator Events
    }

    private async login(socketId: string, login: string, password: string, answer: Function){
        const user = new User(this.db);
        if (await user.auth(login,password,socketId)){
            const userData = user.getData();
            this.users.set(user.getToken(),user);
            answer(userData);
        }
        else answer(null);
    }

    private userOffline(user: User) {
        this.mediator.call(this.EVENTS.USER_LOG_OUT, user);
        this.users.remove(user.getSocketId());
        user.logout();
    }

    public disconnect(socket: Socket){
        const user = this.getUser(socket.id);
        if (user) this.userOffline(user);
    }

    public getUser(token: string): User | null {
        return this.users.get(token) || null;
    }

    public async registration(socket:Socket, login: string, password: string, name: string, cbRegistration: Function) {
            const user = new User(this.db);
            cbRegistration(await user.registration(login, password, name));
    }

    public logout(user: User, callback: Function): void {
        callback(user.logout());
    }

}


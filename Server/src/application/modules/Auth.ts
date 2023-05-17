import { Socket } from "socket.io";
import Mediator from "./Mediator";

export default function Auth(socket: Socket, mediator: Mediator, token: string, next: Function): void{
    if (token) {
        const user = mediator.get('GET_USER_BY_TOKEN', [token]);
        if (user) next(user); 
        else socket.emit('UNAUTH');
    }
    socket.emit('NOT_TOKEN')
}
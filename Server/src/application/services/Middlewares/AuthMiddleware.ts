import { Socket } from "socket.io";
import Mediator from "../Mediator";

export default function AuthMiddleware(arg: any [], next: Function, socket: Socket, mediator: Mediator){
    console.log(socket.handshake.auth);
    if (socket.handshake.auth.token){
        const user = mediator.get('GET_USER_BY_TOKEN', [socket.handshake.auth.token]);
        if (user) {
            arg.push(user);
            return next(arg, socket);
        }
    }
    socket.emit('UN_AUTH');
    return;
}
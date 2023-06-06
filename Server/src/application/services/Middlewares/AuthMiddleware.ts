import { Socket } from "socket.io";
import Mediator from "../Mediator";

export default async function AuthMiddleware(arg: any [], next: Function, socket: Socket, mediator: Mediator){
    if (socket.handshake.auth.token){
        const user = await mediator.get('GET_USER_BY_TOKEN', [socket.handshake.auth.token]);
        if (user) {
            socket.data.user = user;
            return next(arg, socket);
        }
    }
    socket.emit('UN_AUTH');
    socket.disconnect(true);
    return;
}
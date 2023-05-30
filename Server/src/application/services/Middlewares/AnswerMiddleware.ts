import { Socket } from "socket.io";

export default async function AnswerMiddleware(arg: any [], next: Function, socket: Socket){
    const [message, data, to] = await next(arg, socket);
    if (to) socket.to(to).emit(message, data); else socket.emit(message, data);
}
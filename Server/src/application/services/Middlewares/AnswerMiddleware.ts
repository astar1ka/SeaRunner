import { Socket } from "socket.io";

export default async function AnswerMiddleware(arg: any [], next: Function, socket: Socket){
        if (next instanceof Function) {
            const [message, data, to] = await next(arg, socket);
            console.log(data);
            if (message)
            if (to) socket.to(to).emit(message, data); else socket.emit(message, data);
        }
}
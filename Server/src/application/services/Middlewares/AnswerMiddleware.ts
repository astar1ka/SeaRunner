import { Socket } from "socket.io";

export default async function AnswerMiddleware(arg: any [], next: Function, socket: Socket){
        if (next instanceof Function) {
            const result = await next(arg, socket);
            if (result && result instanceof Array) {
                const [message, data, to] = result
                if (message)
                if (to) socket.to(to).emit(message, data); else socket.emit(message, data);
            }

        }
}
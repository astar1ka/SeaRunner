import { Socket } from "socket.io";

export default function useNext(middlewares: Function [], handler: Function) {
    let i = -1;
    const next = async (arg: any, socket: Socket) => {
        i++;
        if (middlewares[i]){
            return await middlewares[i](arg, (arg: any) => next(arg, socket), socket);
        } else {
            return await handler( ...arg, socket);
        }
    }

    return async (arg: any, socket: Socket) => await next(arg, socket);
}
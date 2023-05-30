import { Socket } from "socket.io";
import useNext from "./useNext";
import AuthMiddleware from "./Middlewares/AuthMiddleware";
import Mediator from "./Mediator";
import AnswerMiddleware from "./Middlewares/AnswerMiddleware";

type THandler = {
    event: string,
    handler: Function,
    middlewares: string []
}

type TMiddleware = {
    [key: string] : Function
}

export default class SocketService{
    private handlers: THandler [] = [];
    private middlewares: TMiddleware = {
        'auth': (arg: any, next: Function, socket: Socket) => AuthMiddleware(arg, next, socket, this.mediator),
        'answer': (arg: any, next: Function, socket: Socket) => AnswerMiddleware(arg, next, socket),
    };
    constructor(private io: any, private mediator: Mediator){
        if (!this.io) return;
        io.on('connection', (socket: Socket) => {
            this.handlers.forEach((handler: THandler)=>{
                socket.on(handler.event, (...arg:any) => {
                    const next = useNext(
                        handler.middlewares.map(middleware => this.middlewares[middleware]),
                        handler.handler
                    );
                    next(arg, socket);
                }
                )
            })
        })
    }

    on(event: string, handler: Function, middlewares: string [] = ['']){
        this.handlers.push({
            event,
            handler,
            middlewares
        })
    }
}
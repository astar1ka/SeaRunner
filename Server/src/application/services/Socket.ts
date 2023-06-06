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

type TSocket = {
    on: (event: string , handler: Function, answer?: boolean) => void,
}

type TMiddleware = {
    [key: string] : Function
}

export default class SocketService implements TSocket{
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

    private addHandler(event: string , handler: Function, middlewares: string [] = []): void{
        this.handlers.push({
            event,
            handler,
            middlewares
        })
    }

    private group(callback: (socket: TSocket) => void, middlewares: string [] = []){
        callback({
            on: (event: string , handler: Function, answer: boolean = false) => {
                const handlerMiddleware: string [] = middlewares.filter((a)=> a);
                if (answer) handlerMiddleware.push('answer');
                this.addHandler(event, handler, handlerMiddleware);
            }
        });
    }

    public on(event: string , handler: Function, answer: boolean = false): void{
        this.addHandler(event, handler, (answer) ? ['answer'] : []);
    }

    public middleware(middlewares: string [] = []){
        return {
            on: (event: string , handler: Function, answer: boolean = false) => {
                if (answer) middlewares.push('answer');
                this.addHandler(event, handler, middlewares);
            },
            group: (callback: (socket: TSocket) => void) => this.group(callback, middlewares)
        }
    }
}
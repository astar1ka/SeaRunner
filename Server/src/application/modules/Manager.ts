import Mediator from "../services/Mediator";
import SocketService from "../services/Socket";
import DB from "./DB/DB";

export interface IManager{
    mediator: Mediator;
    db: DB;
    socket: SocketService;
    MESSAGES:  any;
}

export default class Manager{
    protected mediator:Mediator;
    protected EVENTS;
    protected TRIGGERS;
    protected db;
    protected socket;
    protected MESSAGES;
    constructor(options:IManager){
        this.mediator = options.mediator;
        this.db = options.db;
        this.EVENTS = this.mediator.getEventsNames();
        this.TRIGGERS = this.mediator.getTriggersNames();
        this.socket = options.socket;
        this.MESSAGES = options.MESSAGES;
    }
}
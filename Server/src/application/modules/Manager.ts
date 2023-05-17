import Mediator from "./Mediator";
import DB from "./DB/DB";

export interface IManager{
    mediator: Mediator;
    db: DB;
    io: any;
    MESSAGES:  any;
}

export default class Manager{
    protected mediator:Mediator;
    protected EVENTS;
    protected TRIGGERS;
    protected db;
    protected io;
    protected MESSAGES;
    constructor(options:{mediator: Mediator, db: DB, io: any, MESSAGES:  any}){
        this.mediator = options.mediator;
        this.db = options.db;
        this.EVENTS = this.mediator.getEventsNames();
        this.TRIGGERS = this.mediator.getTriggersNames();
        this.io = options.io;
        this.MESSAGES = options.MESSAGES;
    }
}
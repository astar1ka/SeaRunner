export default class Mediator {
    private events: { [key: string]: Function[] } = {};
    private triggers: { [key: string]: Function } = {};
    constructor(private EVENTS: { [key: string]: string }, private TRIGGERS: { [key: string]: string }) {
        Object.values(EVENTS).forEach(value => this.events[value] = []);
        Object.values(TRIGGERS).forEach(value => this.triggers[value] = () => { return null })
    }

    //about triggers
    public getTriggersNames(): { [key: string]: string } {
        return this.TRIGGERS;
    }

    public set(name: string, func: Function) {
        if (this.triggers[name] && func instanceof Function) {
            this.triggers[name] = func;
        }
    }

    public get(name: string, data?: any) {
        if (name && this.triggers[name] instanceof Function) {
            return this.triggers[name](...data);
        }
        return null;
    }

    //about events
    public getEventsNames() {
        return this.EVENTS;
    }

    public subscribe(name: string, func: Function) {
        if (this.events[name] && func instanceof Function) {
            this.events[name].push(func);
        }
    }

    public call(name: string, data?: any) {
        if (name && this.events[name]) {
            this.events[name].forEach(event => {
                if (event instanceof Function) event(data);
            })
        }
    }
}
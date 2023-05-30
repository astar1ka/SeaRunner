class Mediator {
    private events: { [key: string]: Map<string, Function> } = {};
    private triggers: { [key: string]: Function } = {};
    constructor(private EVENTS: { [key: string]: string }, private TRIGGERS: { [key: string]: string }) {
        Object.values(EVENTS).forEach(value => this.events[value] = new Map<string, Function>);
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

    public subscribe(name: string, event: string, func: Function) {
        if (this.events[event] && func instanceof Function) {
            this.events[event].set(name, func);
        }
    }

    public unsubscribe(name: string, event: string) {
        if (this.events[event]) {
            this.events[event].delete(name);
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

const events = {
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_PLAYER: 'UPDATE_PLAYER',
    UPDATE_SETTLEMENT: 'UPDATE_SETTLEMENT',
}

const mediator = new Mediator(events, events);

export default mediator;
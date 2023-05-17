import Cache from "../../Cache";
import DB from "../../DB/DB";
import Mediator from "../../Mediator";
import Item from "./Entite/Item";
import Town from "./Entite/Town";
import Updater from "./Updater";

export default class Game {
    private Towns = new Cache<Town>;
    private Trader = new Cache<Item>;
    private timer?: NodeJS.Timer;
    private updater = new Updater();
    private wind = {
        speed: 7,
        direction: 0
    }
    private EVENTS;
    constructor(private db: DB, private mediator: Mediator) {
        this.EVENTS = this.mediator.getEventsNames();
        this.timer = setInterval(() => this.updater.update());
        this.mediator.subscribe(this.EVENTS.INIT_DATABASE, async () => await this.init())
    }

    private async init() {
        await this.loadTowns();
        console.log(this.Towns.getAll());
        //this.mediator.call(this.EVENTS.INIT_GAME);
    }

    private async loadTowns() {
        for (let i = 1; i < 4; i++) {
            const town = new Town(this.db);
            await town.init(i);
            this.Towns.set(i, town);
        }
    }

    async createItem(ownerId: number, typeId: number) {
        const item = new Item(typeId, this.db);
    }

    craftShip() {

    }
}
import Cache from "../../Cache";
import DB from "../../DB/DB";
import Mediator from "../../Mediator";
import Captain from "./Entite/Captain";
import Item from "./Entite/Item";
import Ship from "./Entite/Ship";
import Updater from "./Updater";
import Settlement from "./Entite/Settlement";
import { TSettlement } from "../../Types";

export default class Game {
    private settlements = new Cache<Settlement>;
    private shipsTypes = new Map;
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
        console.log(this.EVENTS);
        this.mediator.subscribe(this.EVENTS.INIT_DATABASE, () => this.init())
    }

    //Загрузка начальный данных
    private async init() {
        await this.loadShipsTypes();
        await this.loadSettlements();
    }

    private async loadShipsTypes(){
        const shipsTypes = await this.db.getShipsTypes();
        if (shipsTypes){
            if (shipsTypes instanceof Array){
                shipsTypes.forEach((type)=>{
                    this.shipsTypes.set(type.id, type);
                })
            }
        }
    }

    private async loadSettlements() {
        const settlements = await this.db.getSettlements();
        if (settlements) {
            settlements.forEach(async (settlementData: TSettlement) => {
                const settlement = new Settlement(this.db, settlementData);
                await settlement.init();
                this.settlements.set(settlementData.id, settlement)
            });
        } else console.log('Ошибка загрузки поселений, проверьте таблицу: settlements');
    }

    public enterSettlement(captain: Captain, settlementId: number){
        const settlement = this.settlements.get(settlementId);
        if (settlement) {
            const settlementData = settlement.getData();
            captain.setStatus(settlementData.type);
            captain.setXY(settlementData.x, settlementData.y);
        }
    }

    public exitSettlement(captain: Captain){
        if (captain.getData().ship){
            captain.setStatus('sea');
        }
    }

    public getSettlement(x: number,y: number){
        const settlement = this.settlements.getAll().map((settlement)=> settlement.getData()).find((settlement) => settlement.x == x && settlement.y == y);
        return settlement;
    }

    async createItem(ownerId: number, typeId: number) {
        const item = new Item(typeId, this.db);
    }

    async craftShip(captain: Captain, shipType: number){
        const ship = captain.createShip(this.shipsTypes.get(shipType));
        return ship;
    }
}
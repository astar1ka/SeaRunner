import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { Tables } from "../../../Types";
import Trader from "./Trader";

export default class Town extends ActiveRecord{
    private Trader!: Trader;
    constructor(db: DB){
        super(db, Tables.towns)
    }

    public async init(id: number){
        if (id) {
            this.attributes.id = id;
            if (await this.refresh()) {
                this.Trader = new Trader(this.db);
                //await this.Trader.init();
                return true;
            }
            return false;
        }
        return false;
    }
}
import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TSettlement, Tables } from "../../../Types";
import Market from "./Market";

export default class Settlement extends ActiveRecord{
    private Market!: Market;
    constructor(db: DB, data: TSettlement){
        super(db, Tables.settlements)
        this.fields = ['id','name', 'type', 'x', 'y'];
        this.rewrite(data);
    }

    public async init(){
        this.Market = new Market(this.db, this.getId());
        await this.Market.init();
    }

}
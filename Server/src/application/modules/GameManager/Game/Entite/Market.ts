import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { Tables } from "../../../Types";

export default class Market extends ActiveRecord{
    private priceList = {};
    constructor(db: DB, settlementId: number){
        super(db, Tables.markets);
        this.fields = ['id','settlement_id'];
        this.attributes['settlement_id'] = settlementId;
    }

    public async init(){
        let market = await this.db.getMarketBySettlementId(this.get('settlement_id'));
        if (market) {
            this.rewrite(market);
            market = null;
            return true;
        }
        return false;
    }

    public getPriceList(){
        //this.priceList = this.db.getPriceList()
    }

    public sell(){

    }

    public buy(){

    }

    public view(){

    }
}
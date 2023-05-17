import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { Tables } from "../../../Types";

export default class Trader extends ActiveRecord{
    private priceList = {};
    constructor(db: DB){
        super(db, Tables.traders)
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
import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TAttributes, Tables } from "../../../Types";

export default class Inventory extends ActiveRecord{
    constructor(db: DB, ship_id: number){
        super(db, Tables.inventory);
    }

    public putItem(item_id: number){
    }
}
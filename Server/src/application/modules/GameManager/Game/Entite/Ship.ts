import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TAttributes, Tables } from "../../../Types";

export default class Ship extends ActiveRecord{
    constructor(db: DB){
        super(db, Tables.ships);
        this.fields = ['id', 'captain_id', 'speed', 'attack_cooldown', 'current_hp'];
    }

    static load(db: DB, data: TAttributes){
        const ship = new Ship(db);
        ship.rewrite(data);
        return ship;
    }
}
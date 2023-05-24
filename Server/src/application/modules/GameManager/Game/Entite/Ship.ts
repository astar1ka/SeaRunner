import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TShip, Tables } from "../../../Types";

export default class Ship extends ActiveRecord{
    constructor(db: DB){
        super(db, Tables.ships);
        this.fields = [
            'id', 
            'captain_id',
            'type_id', 
            'speed',
            'max_hp',
            'attack_cooldown',
            'inventory_size',
            'name',
            'current_hp'
        ];
    }

    add(shipData: TShip){
        this.create(shipData);
    }
}
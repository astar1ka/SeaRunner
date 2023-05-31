import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TAttributes, TShip, Tables } from "../../../Types";

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

    public static format(data:  TAttributes){
        return {
            id: data.id,
            type: data.type_id,
            speed: data.speed,
            owner: data.captain_id,
            maxHp: data.max_hp,
            currentHp: data.current_hp,
            attack: data.attack_cooldown,
            inventorySize: data.inventory_size,
            name: data.name
        }
    }

    public upload(ship: TShip){
        this.rewrite(ship);
    }
}
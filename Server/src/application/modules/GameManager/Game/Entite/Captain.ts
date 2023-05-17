import ActiveRecord from "../../../ActiveRecord";
import Cache from "../../../Cache";
import DB from "../../../DB/DB";
import { ICaptain, IShip, TAttributes, TShips, Tables } from "../../../Types";
import Ship from "./Ship";

export default class Captain extends ActiveRecord{
    private ship: Ship | null = null;
    private ships: TShips | null = null;
    constructor(db: DB){
        super(db, Tables.captains);
        this.fields = ['id', 'userid', 'allianceid', 'shipid', 'x', 'y','status'];
        this.hidden = ['shipid']
    }

    public addCaptain(data: any){
        this.create(data);
    }

    public addShip(ship: IShip):void {
        //this.ships.set(ship.id,new Ship(ship));
    }

    public async getByUserId(userId: number): Promise<boolean>{
        const data = await this.db.getCaptain(userId);
        if (data) {
            this.rewrite(data);
            this.loadShips();
            const activeShip = this.ships?.find(ship => ship.id === this.get('shipid'));
            if (activeShip) this.ship = Ship.load(this.db,activeShip);
            return true;
        }
        else return false;
    }

    public loadShips() {
        if (this.ships) {
            this.ships = this.db.getShips(this.get('userid'));
        }
    }

    public getData():TAttributes {
        const result = super.getData();
        result.ship = (this.ship) ? this.ship.getData() : null;
        result.ships = this.ships || [];
        return result;
    }
}
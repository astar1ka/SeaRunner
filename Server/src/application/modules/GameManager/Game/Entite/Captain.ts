import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TShip, TAttributes, TShips, Tables} from "../../../Types";
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

    public addShip(ship: TShip):void {
        //this.ships.set(ship.id,new Ship(ship));
    }

    public async getByUserId(userId: number): Promise<boolean>{
        const data = await this.db.getCaptain(userId);
        if (data) {
            this.rewrite(data);
            await this.loadShips();
            const activeShip = this.ships?.find(ship => ship.id === this.get('shipid'));
            if (activeShip) {
                this.ship = new Ship(this.db);
                this.ship.upload(activeShip);
            }
            return true;
        }
        else return false;
    }

    public async loadShips() {
        this.ships = await this.db.getShips(this.getId());
    }

    public getData():TAttributes {
        const result = super.getData();
        result.ship = (this.ship) ? Ship.format(this.ship.getData()) : null;
        result.ships = this.ships?.map(ship => Ship.format(ship)) || [];
        return result;
    }

    public async createShip(newShip: TShip){
        const ship = new Ship(this.db);
        await ship.add(newShip);
    }

    public setStatus(status: string){
        if (status === 'sea' || status === 'town' || status ==='port'){
            this.attributes['status'] = status;
        }
    }

    public setXY(x: number, y: number){
        this.attributes['x'] = x;
        this.attributes['y'] = y;
    }

    setShip(id: number){
        console.log(id);
        const ship = this.ships?.find(ship => ship.id == id);
        if (ship) {
            this.db.setActiveShip(this.getId(), id);
        }
        return false;
    }
}
import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TShip, TAttributes, TShips, Tables, TCaptains } from "../../../Types";
import Ship from "./Ship";

export default class Captain extends ActiveRecord {

    private name!: string;

    private ship: Ship | null = null;

    private ships: TShips = [];

    constructor(db: DB) {
        super(db, Tables.captains);

        this.fields = [
            'id',
            'userid',
            'allianceid',
            'shipid',
            'x',
            'y',
            'status'];

        this.hidden = [
            'shipid'
        ]
    }

    public async addCaptain(data: TAttributes) {
        const { userId, allianceId, shipId, x, y } = data;
        await this.create(
            {
                userid: userId,
                allianceid: allianceId,
                shipid: shipId,
                x,
                y
            }
        );
    }

    public async getByUserId(userId: number): Promise<boolean> {
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

    public getPlayer(): TAttributes {
        const result = Captain.format(this.getData());
        result.ship = (this.ship) ? Ship.format(this.ship.getData()) : null;
        result.ships = this.ships?.map(ship => Ship.format(ship)) || [];
        return result;
    }

    public async createShip(newShip: TShip) {
        const ship = new Ship(this.db);
        await ship.add(newShip);
    }

    public setStatus(status: string) {
        if (status === 'sea' || status === 'town' || status === 'port') {
            this.attributes['status'] = status;
        }
    }

    public setXY(x: number, y: number) {
        this.attributes['x'] = x;
        this.attributes['y'] = y;
    }

    public switchActiveShip(shipId: number) {
        const ship = this.ships.find(ship => ship.id == shipId);
        return false;
    }

    static format(data: TAttributes): TAttributes {
        const { id, user_id, alliance_id, x, y, status } = data;
        return {
            id,
            userId: user_id,
            name: this.name,
            allianceId: alliance_id,
            x,
            y,
            status
        }
    }

    public setShip(id: number): boolean{
            return true;
    }

    public setName(name: string){
        this.name = name;
    }

    public getShips(){
        return this.ships.map(ship => Ship.format(ship));
    }
}
import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { TShip, TAttributes, TShips, Tables, TCaptains } from "../../../Types";
import Ship from "./Ship";

export default class Captain extends ActiveRecord {

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

    public addCaptain(data: TCaptain) {
        const { userId, allianceId, shipId, x, y, status } = data;
        this.create(
            {
                user_id: userId,
                alliance_id: allianceId,
                ship_idd: shipId,
                x,
                y,
                status
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

    public getPlayer(): TPlayer {
        const result = Captain.format(this.view());
        result.ship = (this.ship) ? Ship.format(this.ship.view()) : null;
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

    static format(data: TAttributes): TCaptain {
        const { id, user_id, alliance_id, x, y, status } = data;
        return {
            id,
            userId: user_id,
            allianceId: alliance_id,
            x,
            y,
            status
        }
    }
}
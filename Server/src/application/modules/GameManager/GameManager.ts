import Cache from "../Cache";
import Manager, { IManager } from "../Manager"
import Captain from "./Game/Entite/Captain";
import Game from "./Game/Game";
import Ship from "./Game/Entite/Ship";
import User from "../UserManager/User";
import { Socket } from "socket.io";

export default class GameManager extends Manager {
    private captains = new Cache<Captain>;
    private game;
    constructor(options: IManager) {
        super(options);
        const {
            GET_GAME_DATA,
            GET_CAPTAIN,
            NEW_GAME,
            GET_SETTLEMENT,
            CREATE_SHIP, 
            SET_SHIP,
            GET_SHIPS,
            ENTER_SETTLEMENT,
            EXIT_SETTLEMENT
        } = this.MESSAGES;
            
            this.socket.middleware(['auth']).group(socket=>{
                socket.on(GET_GAME_DATA, async (socket: Socket) => this.getGameData(socket.data.user), true);
                socket.on(NEW_GAME, async (allianceId: number, socket: Socket) => this.newCaptain(allianceId, socket.data.user), true);
                socket.on(GET_CAPTAIN, async (socket: Socket) => await this.getCaptain(socket.data.user), true);
                socket.on(GET_SETTLEMENT, (socket: Socket) => this.getSettlement(socket.data.user));
                socket.on(CREATE_SHIP, (id: number, socket: Socket) => this.createShip(socket.data.user, id), true);
                socket.on(SET_SHIP, (id: number, socket: Socket) => this.setShip(socket.data.user, id));
                socket.on(EXIT_SETTLEMENT, async (socket: Socket) => await this.exitSettlement(socket.data.user));
            });
        this.game = new Game(this.db, this.mediator);
    }

    private async captainByUser(user: User): Promise<Captain | null>{
        let captain = this.captains.get(user.getId());
            if (!captain) {
                captain = new Captain(this.db);
                if (await captain.getByUserId(user.getId())) {
                    this.captains.set(user.getId(), captain);
                    captain.setName(user.getData().name);
                return captain;
                }
                return null;
            }
        return captain;
    }

    ////////////////////////////
    /////////CAPTAIN////////////
    ////////////////////////////

    public async newCaptain(allianceId: number, user: User) {
        const captain = new Captain(this.db);
        if (!await captain.getByUserId(user.getId())){
            captain.addCaptain({userId:user.getId(), 
                allianceId: allianceId,
                shipId:null, 
                x: 200, 
                y: 200});
            this.captains.set(user.getId(), captain);
            return this.getGameData(user);
        }
        return [
            'NEW_GAME_ERROR',
            'Что-то пошло не так, попробуйте перезайти позже'
        ]
    }

    public async getCaptain(user:User) {
        const captain = await this.captainByUser(user);
        if (captain) return ['GET_CAPTAIN', captain.getData()];
        else return ['GET_CAPTAIN', null];
    }

    public async getSettlement(user: User){
        let result = null;
        const captain = await this.captainByUser(user);
        if (captain){
                const captainData = captain.getData();
                const settlement = this.game.getSettlement(captainData.x, captainData.y);
                if (settlement) result = settlement;
            }
        return ['GET_SETTLEMENT',result];
    }

    ////////////////////////////
    ////////////SHIP////////////
    ////////////////////////////


    ////////////////////////////
    ////////////SCENE///////////
    ////////////////////////////
    public getScene() {
    }

    ////////////////////////////
    ////////////TOWN////////////
    ////////////////////////////
    public getTown(){
    }

    public async getGameData(user:User){
        let captain = await this.captainByUser(user);
        return [
            'GET_GAME_DATA',
            {
                captain: captain?.getData() || null,
            }
        ]
    }

    public createShip(user: User, typeShipId: number){
        let captain = this.captains.get(user.getId());
        return [
            'UPDATE_SHIPS',
            captain
        ]
    }

    public setShip(user: User, id: number){
        let captain = this.captains.get(user.getId());
        if (captain){
            if (captain.setShip(id)) return [
                'GET_CAPTAIN',
                captain.getData()
            ];
        }
        return null;
    }

    public async exitSettlement(user: User){
        const captain = await this.captainByUser(user);
        if (captain) {
            this.game.exitSettlement(captain);
            const captainData = captain.getData();
        }
    }
}
import { Socket } from "socket.io";
import Cache from "../Cache";
import Manager, { IManager } from "../Manager"
import Captain from "./Game/Entite/Captain";
import Game from "./Game/Game";
import Ship from "./Game/Entite/Ship";
import User from "../UserManager/User";

export default class GameManager extends Manager {
    private captains = new Cache<Captain>;
    private game;
    constructor(options: IManager) {
        super(options);
        const {GET_CAPTAIN, GET_SETTLEMENT} = this.MESSAGES;
            //this.socket.on(this.MESSAGES.ADD_CAPTAIN, async (token: string, allianceId: number, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.addCaptain(user,allianceId,callback)));
            this.socket.on(this.MESSAGES.GET_CAPTAIN, async (user:User) =>this.getCaptain(user), ['auth','answer']);
            ///Получить поселение, в котором сейчас находится капитан///
            this.socket.on(GET_SETTLEMENT, 
                async (user:User) => this.getSettlement(user), ['auth','answer']);
            ///Создать дефолтный корабль///
            /*this.socket.on(this.MESSAGES.CREATE_DEFAULT_SHIP, 
                async (token: string) => 
                Auth(socket,this.mediator,token,
                    (user:User) => this.createDefaultShip(user)));*/
            /*this.socket.on(this.MESSAGES.EXIT_SETTLEMENT, 
                        async (token: string) => 
                        Auth(socket,this.mediator,token,
                            (user:User) => this.exitSettlement(user)));*/
        this.game = new Game(this.db, this.mediator);
    }

    public gameLoaded(answer: Function){
        //answer();
    }

    private async captainByUser(user: User): Promise<Captain | null>{
        let captain = this.captains.get(user.getId());
            if (!captain) {
                captain = new Captain(this.db);
                if (await captain.getByUserId(user.getId())) {
                    this.captains.set(user.getId(), captain);
                return captain;
                }
                return null;
            }
        return captain;
    }

    ////////////////////////////
    /////////CAPTAIN////////////
    ////////////////////////////

    public async addCaptain(user:User, allianceId: number, answer: Function) {
        const captain = new Captain(this.db);
        if (!await captain.getByUserId(user.getId())){
            captain.addCaptain({userId:user.getId(), 
                allianceId: allianceId,
                shipId:null, 
                x: 200, 
                y: 200});
                this.captains.set(user.getId(), captain);
            answer(captain.getData());
        }
            //по айди альянса достаем город из таблицы Town
            //у города берем координаты в X и Y
            //создаем нового капиата new Captain(this.db)
            
            //добавляем капиатана в таблицу Captain.create(user.getId(), null, X, Y)
    }

    public async getCaptain(user:User) {
        const captain = await this.captainByUser(user);
        console.log(captain);
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

    public getGameData(){

    }

    public createDefaultShip(user: User){
        let captain = this.captains.get(user.getId());
        if (captain){
        }     
    }

    /*public async exitSettlement(user: User){
        const captain = await this.captainByUser(user);
        if (captain) {
            this.game.exitSettlement(captain);
            const captainData = captain.getData();
            this.io.emit('UPDATE_CAPTAIN',{
                id: captainData.id,
                status: captainData.status,
                ship: captainData.ship,
                x: captainData.x,
                y: captainData.y
            })
        }
    }*/
}
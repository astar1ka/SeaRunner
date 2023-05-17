import { Socket } from "socket.io";
import Cache from "../Cache";
import Manager, { IManager } from "../Manager"
import Captain from "./Game/Entite/Captain";
import Game from "./Game/Game";
import User from "../UserManager/User";
import Auth from "../Auth";

export default class GameManager extends Manager {
    private captains = new Cache<Captain>;
    //private game;
    constructor(options: IManager) {
        super(options);
        this.io.on('connection',(socket:Socket) => {
            socket.on(this.MESSAGES.ADD_CAPTAIN, async (token: string, allianceId: number, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.addCaptain(user,allianceId,callback)));
            socket.on(this.MESSAGES.GET_CAPTAIN, async (token: string, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.getCaptain(user,callback)));
        })
        //this.game = new Game(this.db, this.mediator);
    }

    public gameLoaded(answer: Function){
        //answer();
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

    public async getCaptain(user:User, answer: Function) {
            let captain = this.captains.get(user.getId());
            if (!captain) {
                captain = new Captain(this.db);
                if (await captain.getByUserId(user.getId())) {
                    this.captains.set(user.getId(), captain);
                    answer(captain.getData());
                }
                else answer(null);
            }
            else answer(captain.getData());
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
}
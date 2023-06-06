import { TCaptain } from "../models/Captain";
import IOSocket from "./Socket";
import { TShip } from "../models/Ship";
import mediator from "./Mediator";

export type TSettlement = {
    id: number;
    name: string;
    type: string;
    x: number;
    y: number;
}

export default class GameManager{
    private socket!:IOSocket;
    private captains = new Map();
    private captain!: TCaptain
    private settlement!: TSettlement;
    constructor(){
        mediator.subscribe('gameManager','UPDATE_PLAYER',(captain: TCaptain) => this.getCaptain(captain));
        mediator.subscribe('gameManager','UPDATE_SETTLEMENT',(settlement: TSettlement) => this.setSettlement(settlement))
    }

    private setSettlement(settlement: TSettlement){
        if (settlement){
            this.settlement = settlement;
            this.setStatus('town');
        }
    }

    private getCaptain(captain: TCaptain){
        if (captain){
            this.captain=captain;
            console.log(captain);
            if (this.captain.status === 'town' || this.captain.status === 'port')
                this.socket.getSettlement();
        } else this.newGame();
    }

    startNewGame(id: number){
        this.socket.newGame(id);
        this.setStatus('game');
    }

    newGame(){
        this.setStatus('newGame');
    }

    start(socket:IOSocket){
        this.socket = socket;
        this.socket.getCaptain();
    }

    exit(){
    }

    setStatus(status:string){
        console.log(status);
        mediator.call('SET_GAME_STATUS', status)
    }

    getShips():TShip[]{
        return this.captain.ships;
    }

    createDefultShip(){
        this.socket.createDefaultShip();
    }

    getSettlement(){
        return this.settlement;
    }

    exitSettlement(){
        this.socket.exitSettlement();
    }

    setShip(ship: TShip){
        this.socket.setShip(ship.id);
    }
    
    createShip(typeId: number, craft: object){

    }
}
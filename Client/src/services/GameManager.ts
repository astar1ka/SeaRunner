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
            if (this.captain.status === 'town' || this.captain.status === 'port')
                this.socket.getSettlement();
        } else this.newGame()
    }

    startGame(){
        this.socket.getCaptain();
    }

    startNewGame(id: number){
        this.socket.addCaptain(id, (captain: TCaptain) => this.getCaptain(captain))
    }

    newGame(){
        this.setStatus('newGame');
    }

    start(exit:Function, setStatus: Function, socket:IOSocket){
        this.socket = socket;
        this.exit = () => exit();
        this.setStatus = (status: string) => setStatus(status);
    }

    exit(){
    }

    setStatus(status:string){
    }

    getShips():TShip[]{
        console.log(this.captain);
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

    
}
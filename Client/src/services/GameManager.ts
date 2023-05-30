import { TCaptain } from "../models/Captain";
import IOSocket from "./Socket";
import { TShip } from "../models/Ship";

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
    }

    private setSettlement(settlement: TSettlement){
        if (settlement){
            this.settlement = settlement;
            console.log(this.settlement)
            this.setStatus(this.settlement.type);
        }
    }

    private getCaptain(captain: TCaptain){
        if (captain){
            this.captain=captain;
            console.log(this.captain)
            if (this.captain.status === 'town' || this.captain.status === 'port')
                this.socket.getSettlement((settlement: TSettlement) => this.setSettlement(settlement));
        } else this.newGame()
    }

    startGame(){
        this.socket.getCaptain((captain: TCaptain) => this.getCaptain(captain));
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

        this.socket.onUpdateCaptain((captain: TCaptain)=>{
            if (captain.id == this.captain.id) {
                this.captain.x = captain.x;
                this.captain.y = captain.y;
                this.captain.ship = captain.ship;
                this.captain.status = captain.status;
            }
            else this.captains.get(captain.id);
        }
        )
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
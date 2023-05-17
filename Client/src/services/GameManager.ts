import { TCaptain } from "../models/Captain";
import SelectAllianceScreen from "../pages/gamePage/selectAllianceScreen/SelectAllianceScreen";
import IOSocket from "./Socket";
import TownUI from '../pages/gamePage/GameInterfaces/TownUI/TownUI';
import { TShip } from "../models/Ship";

export default class GameManager{
    private socket!:IOSocket;
    private captains = new Map();
    private captain!: TCaptain
    constructor(){
    }

    private getCaptain(captain: TCaptain){
        if (captain){
            this.captain=captain;
            this.setStatus((this.captain.status === 'town') ? 'town' : 'game');
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

    on(exit:Function, setStatus: Function, socket:IOSocket){
        this.socket = socket;
        this.exit = () => exit();
        this.setStatus = (status: string) => setStatus(status);
    }

    exit(){
    }

    setStatus(status:string){
    }

    getShips():TShip[]{
        return this.captain.ships;
    }
}
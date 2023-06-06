import { useState,useEffect,Fragment } from "react";

import Chat from "./chat/Chat";
import Game from "./game/Game";
import GameMenu from "./gameMenu/GameMenu";
import HelloScreen from "./helloScreen/HelloScreen";
import SelectAllianceScreen from "./selectAllianceScreen/SelectAllianceScreen";
import LoadScreen from "./loadScreen/LoadScreen";

import './GamePage.css'
import { socket } from "../../App";
import GameManager, { TSettlement } from "../../services/GameManager";
import TownUI from "./GameInterfaces/TownUI/TownUI";
import mediator from "../../services/Mediator";

export type TCaptain = {
    id: number,
    userid: number,
    allianceid: number,
    shipId: number,
    x: number,
    y: number
} | null;

type TProps = {
    setPage: Function
}

function gameScreen(gameStatus: string){
    if (gameStatus === 'newGame') 
        return <SelectAllianceScreen select={(id: number) => game.startNewGame(id)}/>
    if (gameStatus === 'town')
        return <TownUI game={game}/>
        return ''
}

const game = new GameManager();

export default function GamePage({setPage}: TProps) {
    const [gameStatus, setGameStatus] = useState('startGame');

    console.log(gameStatus);

    useEffect(() => {
        game.start(socket);
        mediator.subscribe('GamePage', 'SET_GAME_STATUS', (status: string) => {
            console.log(status);
            setGameStatus(status)
        });
        return () => mediator.unsubscribe('GamePage', 'SET_GAME_STATUS');
    }, [])

    return (<Fragment>
        {gameScreen(gameStatus)}
        <Game game={game}></Game>
    </Fragment>)
}
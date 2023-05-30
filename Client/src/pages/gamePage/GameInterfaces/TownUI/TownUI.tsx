import {useState} from 'react';
import GameLogo from "../../../elements/gameLogo/GameLogo";

import './TownUI.css';
import Trader from '../../Trader/Trader';
import HarbortUI from '../HarbortUI/HarbortUI';
import GameManager from '../../../../services/GameManager';
import WerehouseUI from '../WerehouseUI/WerehouseUI';
import TavernUI from '../TavernUI/TavernUI'

type TProps ={
    game: GameManager;
}

export default function TownUI({game}: TProps){
    const [window, setWindow] = useState('main');
    return (
    <div className='TownInterface'>
        <div className={(window === 'main') ? 'TownBackground'  : 'TownBackground --blur'}/>
        {(window ==='trader') ? 
        <Trader/> : 
        (window ==='werehouse') ?
        <WerehouseUI/> :
        (window ==='harbort') ?
        <HarbortUI game={game}/>:
        (window ==='tavern') ?
        <TavernUI/>:
        ''}
        <div className="TownManage">
        <GameLogo/>
        <h2>{game.getSettlement().name}</h2>
        <button className='ManageButton'>Торговец</button>
        <button className='ManageButton' onClick={() => setWindow('werehouse')}>Склад</button>
        <button className='ManageButton' onClick={() => setWindow('harbort')}>Верфь</button>
        <button className='ManageButton' onClick={() => setWindow('tavern')}>Таверна</button>
        <button className='ManageButton' onClick={()=>game.exitSettlement()}>В море</button>
        </div>
    </div>)
}
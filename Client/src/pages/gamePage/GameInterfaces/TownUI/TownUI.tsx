import {useState} from 'react';
import GameLogo from "../../../elements/gameLogo/GameLogo";

import './TownUI.css';
import Trader from '../../Trader/Trader';
import HarbortUI from '../HarbortUI/HarbortUI';
import GameManager from '../../../../services/GameManager';
import WerehouseUI from '../WerehouseUI/WerehouseUI';

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
        '':
        ''}
        <div className="TownManage">
        <GameLogo/>
        <h2>Роял-харборт</h2>
        <button className='ManageButton'>Торговец</button>
        <button className='ManageButton' onClick={() => setWindow('werehouse')}>Склад</button>
        <button className='ManageButton' onClick={() => setWindow('harbort')}>Верфь</button>
        <button className='ManageButton'>Таверна</button>
        <button className='ManageButton'>В море</button>
        </div>
    </div>)
}
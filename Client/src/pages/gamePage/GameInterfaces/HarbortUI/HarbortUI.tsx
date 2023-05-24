import {useState, useRef} from 'react';

import './HarbortUI.css'
import ShipDialog from './ShipDialog/ShipDialog';
import GameManager from '../../../../services/GameManager';

import next from '../../../../source/icons/next.png';
import prev from '../../../../source/icons/prev.png';

type TProps ={
    game: GameManager;
}

export default function HarbortUI({game}: TProps) {
    const [numberShip, setNumberShip]= useState(0);

    const onClickPrevHandler = () => {
        if (numberShip>0) setNumberShip(numberShip-1);
    }

    const onClickNextHandler = () => {
        if (numberShip < game.getShips().length-1) setNumberShip(numberShip+1);
    }

    return (
    <div className='HarbortUI'>
    <img className='prevShip' onClick={onClickPrevHandler} src={prev}/>
    <div className ='ShipDialogBox'>
    <ShipDialog ship={game.getShips()[numberShip]}/>
    </div>
    <img className='nextShip' onClick={onClickNextHandler} src={next}/>
    <button className='defaultShip' onClick = {() => game.createDefultShip()}></button>
    </div>
    )
}
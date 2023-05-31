import { useEffect, useState } from "react";
import GameManager from "../../../../../services/GameManager";
import ShipDialog from "../ShipDialog/ShipDialog";

import next from '../../../../../source/icons/next.png';
import prev from '../../../../../source/icons/prev.png';

import './Collection.css'

type TProps ={
    game: GameManager;
}

export default function Collection({game}:TProps){
    const [numberShip, setNumberShip] = useState(0);
    const onClickPrevHandler = () => {
        if (numberShip>0) setNumberShip(numberShip-1);
    }

    const onClickNextHandler = () => {
        if (numberShip < game.getShips().length-1) setNumberShip(numberShip+1);
    }
    return (
        <div className='collectionUI'>
        <img className='prevShip' onClick={onClickPrevHandler} src={prev}/>
        <div className ='ShipDialogBox'>
        <ShipDialog ship={game.getShips()[numberShip]} />
        </div>
        <img className='nextShip' onClick={onClickNextHandler} src={next}/>
        <button className='setShip' onClick = {() => game.setShip(game.getShips()[numberShip])}>Сменить корабль</button>
        </div>
    )
}

//<ShipDialog ship={game.getShips()[numberShip]}/>
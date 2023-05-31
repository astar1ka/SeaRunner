import React, {useState} from 'react'
import GameManager from '../../../../../services/GameManager';

import './Craft.css'

type TProps ={
    game: GameManager;
}

export default function Craft({game}: TProps){
    const [typeCraft, setTypeCraft] = useState('select');

    const selectHandler = (typeCraft:string) => setTypeCraft(typeCraft);

    if (typeCraft === 'ship'){
        return  (      
        <div className='craftUI'>
        <div className='createShip' onClick={() => game.createShip(1,{sail: null, hull: null, cannon: null})}>Создать корабль</div>
        </div>
        )
    }

    if (typeCraft === 'part'){
        return ''
    }

    return (
        <div className='craftUI'>
            <div className='selectCraft' onClick={() => selectHandler('ship')}>Создать корабль</div>
            <div className='selectCraft' onClick={() => selectHandler('part')}>Создать часть корабля</div>
        </div>
    )

}
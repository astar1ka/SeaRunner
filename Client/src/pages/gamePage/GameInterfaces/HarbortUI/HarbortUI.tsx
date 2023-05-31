import {useState, useRef} from 'react';

import './HarbortUI.css'
import GameManager from '../../../../services/GameManager';


import Header from './header/Header';
import Collection from './Collection/Collection';
import Craft from './Craft/Craft';

type TProps ={
    game: GameManager;
}

function screener(screen: string){
    if(screen === 'craft') return (game: GameManager)=>Craft({game});
    if(screen === 'shop') return (game: GameManager)=>Collection({game});
    return (game: GameManager)=>Collection({game});
}

export default function HarbortUI({game}: TProps) {

    const [screen, setScreen] = useState('collection');


    return (
        <div className='HarbortUI'>
        <Header setScreen={(screen: string) => setScreen(screen)}/>
        {screener(screen)(game)}
    </div>
    )
}
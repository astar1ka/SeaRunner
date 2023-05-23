import GameManager from '../../../../services/GameManager';
import { Fragment, useEffect, useState } from 'react';
import './WerehouseUI.css';
import berry from './images/berry.png';
import coffee from './images/coffee.jpg'

export default function WerehouseUI() {
    const [items, setItems] = useState([
    {   name: 'coffee',
        hasIMG: true,
        count: 1,
        img: <img 
                className='coffee'
                src={coffee}
                />
    
    },
    {   name: 'tea',
        hasIMG: true,
        count: 1,
        img: <img 
                className='tea'
                src={berry}
                />
    }
    ])
    
    const holdCells = [];
    for(let i = 0; i < 12; i++){
        holdCells.push(<div className='cell'></div>)
    }
    const werehouseCells = [];
    for(let i = 0; i < 24; i++){ 
        werehouseCells.push(<div className='cellWh' ></div>)
    }

    return (
        <>
            <div className='main-hold-werehouse'>
                <div className='hold-werehouse'>
                    <div className='title-hold'>Трюм</div>
                    <div className="hold-werehouse-cells">
                        {holdCells}
                    </div>
                    <button className='buttonPut'>Положить</button>
                    <button className='buttonPutAll'>Положить всё</button>
                </div>
            </div>
            <div className="werehouse">
                <div className='title-werehouse'>Склад</div> 
                <div className="werehouse-cells">
                    {werehouseCells}
                </div>
                <button className="buttonTake">Забрать</button>                
            </div>
        </>
    )
}
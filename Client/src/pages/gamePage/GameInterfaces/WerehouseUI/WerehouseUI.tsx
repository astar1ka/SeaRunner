import GameManager from '../../../../services/GameManager';
import { Fragment, useEffect, useState } from 'react';
import './WerehouseUI.css';
import berry from './images/berry.png';
import coffee from './images/coffee.jpg'
import { text } from 'stream/consumers';

export default function WerehouseUI() {
    const [items, setItems] = useState([
    {   name: 'coffee',
        hasIMG: true,
        count: 1,
        img: <img 
                className='coffee'
                src={coffee}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e)}
                draggable={true}
                id = 'coffe'
                />
    
    },
    {   name: 'tea',
        hasIMG: true,
        count: 1,
        img: <img 
                className='tea'
                src={berry}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e)}
                draggable={true}
                id = 'tea'
                />
    }
    ]);
    const img = new Image();
        img.src = "berry.png";
    function dragStartHandler(e: React.DragEvent){
        e.dataTransfer.setData('text/html', 'kek' );
        console.log(e.dataTransfer.getData('l'))
    }
    function dragEndHandler(e: React.DragEvent){

    }
    function dragOverHandler(e: React.DragEvent){

    }
    function dropHandler(e: React.DragEvent){

    }
    const holdCells = [];
    for(let i = 0; i < 12; i++){
        holdCells.push({id: i, div: <div className='cell'
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e)}
        draggable={true}
        ></div>})
    }
    const werehouseCells = [];
    for(let i = 0; i < 24; i++){ 
        werehouseCells.push(<div className='cellWh'></div>)
    }

    return (
        <div className='werehouse-interface'>
            <div className='hold-werehouse'>
                <div className='title-hold'>Трюм</div>
                <div className="hold-werehouse-cells">
                    {holdCells.map((c)=>{
                        return c.div 
                    })}
                </div>
                <button className='buttonPut'>Положить</button>
                <button className='buttonPutAll'>Положить всё</button>
            </div>
            <div className="werehouse">
                <div className='title-werehouse'>Склад</div> 
                <div className="werehouse-cells">
                    {werehouseCells}
                </div>
                <button className="buttonTake">Забрать</button>                
            </div>
        </div>
    )
}
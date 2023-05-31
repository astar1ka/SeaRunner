import boat from '../../../../assets/boat.png'

import './ShipUI.css'

type Ship = {
 attack: number;
 speed: number;
 currentHp: number;
 maxHp: number;
}

type ShipUIProps = {
    ship: Ship;
}

export default function ShipUI({ship}:ShipUIProps){
    return (
    <div className='ShipUI'>
        <img src = {boat}/>
            <h2>Атака: {ship.attack}</h2>
            <h2>Скорость: {ship.speed}</h2>
            <h2>Прочность: {ship.currentHp}/{ship.maxHp}</h2>
    </div>)
}

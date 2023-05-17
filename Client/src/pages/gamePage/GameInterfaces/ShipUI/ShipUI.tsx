import useScreen from "../../../../hooks/useScreen/useScreen";

import './ShipUI.css'

type Ship = {
 attack: number;
 speed: number;
 currentHP: number;
 maxHP: number;
}

type ShipUIProps = {
    ship: Ship;
}

export default function ShipUI({ship}:ShipUIProps){
    return (
    <div className='ShipUI'>
            <h2>Атака: {ship.attack}</h2>
            <h2>Скорость: {ship.speed}</h2>
            <h2>Прочность: {ship.currentHP}/{ship.maxHP}</h2>
    </div>)
}

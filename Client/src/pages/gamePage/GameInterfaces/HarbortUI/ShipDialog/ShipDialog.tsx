import ShipUI from "../../ShipUI/ShipUI";
import './ShipDialog.css'

import shipDefault from '../../../../../source/icons/shipDefault.png'

type Ship = {
    attack: number;
    speed: number;
    currentHp: number;
    maxHp: number;
   }

type TShipDialogProps = {
    ship:Ship | null;
}

export default function ShipDialog({ship}:TShipDialogProps){
    console.log(ship);
    if (ship)
    return (
    <div className="ShipDialog">
        <ShipUI ship={ship} />
    </div>
    );
    else
    return ( 
        <div className="ShipDialog">
        <img className='NoneShip' src={shipDefault}/>
        </div>
    )
}
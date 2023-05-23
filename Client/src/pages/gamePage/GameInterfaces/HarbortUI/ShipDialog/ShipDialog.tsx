import ShipUI from "../../ShipUI/ShipUI";
import './ShipDialog.css'

import shipDefault from '../../../../../source/icons/shipDefault.png'

type Ship = {
    attack: number;
    speed: number;
    currentHP: number;
    maxHP: number;
   }

type TShipDialogProps = {
    ship:Ship;
}

export default function ShipDialog({ship}:TShipDialogProps){
    console.log(ship);
    if (ship)
    return (
    <div className="ShipDialog">
        <ShipUI ship={ship} />
        <button/>
    </div>
    );
    else
    return     <div className="ShipDialog">
    <img className='NoneShip' src={shipDefault}/>
</div>
}
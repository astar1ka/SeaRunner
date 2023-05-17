import {useState} from 'react';
import {TShip} from './Ship';

export type TCaptain = {
    id: number,
    x: number,
    y: number,
    ship: TShip,
    status: string,
    ships: TShip []
}

export default function Captain(captain: TCaptain){
    const [id, setId] = useState(captain.id);
    const [x, setX] = useState(captain.x);
    const [y, setY] = useState(captain.y);
    const [ship, setShip] = useState(captain.ship);

    return {
        id, x, y, ship, setX, setY, setShip
    }
}


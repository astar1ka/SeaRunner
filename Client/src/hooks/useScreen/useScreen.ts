import {useState} from 'react'
import Screen from './Screen';

export default function useScreen(width: number, height: number){
    const [hide, setHide] = useState(false);

    const open = () => setHide(false);

    const close = () => setHide(true);

    const screen = () => Screen({width,height,hide,close});
    return [
        screen,
        open
    ] as const;
}
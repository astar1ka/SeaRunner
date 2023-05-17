import { useState } from 'react';
import './MainMenu.css'

export default function MainMenu(props:any) {
    const {active, setActive} = props;

    const onClickHandler = () => {
         setActive(false);
    }

    return (<div className={'mainMenu' + ((!active) ? ' inactive': '')} onClick = {onClickHandler}>
        Здесь что-то будет, но потом
        </div>)
}
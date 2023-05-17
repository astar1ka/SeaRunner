import React, { useState } from 'react';
import './HelloScreen.css'

export default function HelloScreen() {
    const [visible, setVisible] = useState(true);
    const br =(<React.Fragment><br/></React.Fragment>)

    const onClickHandler = () => {
        setVisible(false);
    }

    return (<div className={'HelloScreen' + ((!visible) ? ' inactive': '')} onClick = {onClickHandler}>
        <p>Добро пожаловать в игру Sea Runner!!!</p>
        Это тестовая версия игры и многое еще находится в разработке {br}
        {br}
        Управлние: {br}
        W - поднять паруса {br}
        S - опустить паруса {br}
        A/D - поворот корабля {br}
        R - бросить якорь {br}
        {br}
        Нажми на меня, чтобы я пропал
        </div>)
}
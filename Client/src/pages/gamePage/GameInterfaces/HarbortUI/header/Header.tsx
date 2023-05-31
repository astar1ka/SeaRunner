import React, { useState } from 'react';
import './Header.css';

type TProps = {
    setScreen: Function
}

export default function Header({setScreen}: TProps) {
    const [activeButton, setActiveButton] = useState('collection');

    const onCliclHandler = (page:string)=> {
        setScreen(page);
        setActiveButton(page);
    }

    const setClassActive = (buttonPage: string):string => {
        return (activeButton === buttonPage) ? 'active': ''
    }

    return (<div className='header'>
        <div className={'button login ' + setClassActive('collection')} onClick={() => onCliclHandler('collection')}>Коллекция</div>
        <div className={'button registration ' + setClassActive('shop')}  onClick={() => onCliclHandler('shop')}>Покупка</div>
        <div className={'button about ' + setClassActive('craft')} onClick={() => onCliclHandler('craft')}>Мастерская</div>
    </div>)
}
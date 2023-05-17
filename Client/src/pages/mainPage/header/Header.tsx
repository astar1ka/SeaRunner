import { useEffect, useRef, useState } from 'react';
import { MainPages } from '../MainPage';
import './Header.css';

type TProps = {
    setActiveScreen: Function
}

export default function Header({setActiveScreen}: TProps) {
    const [activeButton, setActiveButton] = useState(MainPages.Login);
    
    useEffect(() => console.log('header'), [])

    const onCliclHandler = (page:MainPages)=> {
        setActiveScreen(page);
        setActiveButton(page);
    }

    const setClassActive = (buttonPage: MainPages):string => {
        return (activeButton === buttonPage) ? 'active': ''
    }

    return (<div className='header'>
        <div className={'button login ' + setClassActive(MainPages.Login)} onClick={() => onCliclHandler(MainPages.Login)}>Вход</div>
        <div className={'button registration ' + setClassActive(MainPages.Registration)}  onClick={() => onCliclHandler(MainPages.Registration)}>Регистрация</div>
        <div className={'button about ' + setClassActive(MainPages.About)} onClick={() => onCliclHandler(MainPages.About)}>Об игре</div>
    </div>)
}
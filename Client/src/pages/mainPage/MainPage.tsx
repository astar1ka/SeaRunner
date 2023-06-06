//Modules
import { useState, useEffect, Fragment } from 'react';
//Components
import Header from "./header/Header";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import About from "./about/About";
//css
import './MainPage.css';
import mediator from '../../services/Mediator';

type TProps = {
    setPage: Function
}

export enum MainPages { Login, Registration, About };

export default function MainPage({setPage}: TProps) {
    const [activeScreen, setActiveScreen] = useState(MainPages.Login);

    return (
        <Fragment>
            <Header setActiveScreen={setActiveScreen} />
            {(activeScreen === MainPages.About) ?
            <About /> :
            (activeScreen === MainPages.Registration) ?
            <Registration /> :
            <Login setPage={setPage} />}
        </Fragment>
    )
}
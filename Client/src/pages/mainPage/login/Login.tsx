import { useRef, Fragment, useEffect, useState } from "react"


import './Login.css';
import { Pages, socket } from "../../../App";
import GameLogo from "../../elements/gameLogo/GameLogo";
import useError from "../../../hooks/useError";
import mediator from "../../../services/Mediator";
import { TUser } from "../../../services/Socket";

type TProps = {
    setPage: Function
}

export default function Login({ setPage }: TProps) {
    const login = useRef<HTMLInputElement>(null!);
    const password = useRef<HTMLInputElement>(null!);
    
    const [Error, setErrorText, setErrorShow] = useError();
    const [user, setUser] = useState(null as TUser);

    useEffect( () => {
        mediator.subscribe('loginPage', 'UPDATE_USER', (user: TUser) => setUser(user));
        return () => mediator.unsubscribe('loginPage', 'UPDATE_USER');
    }, [])

    useEffect(() => {
        if (user) setPage(Pages.GamePage)
    }, [user])

    const callback = (data: object | null) => {
    }

    function loginHandler() {
        if (login.current.value && password.current.value) {
            socket.login(
                login.current.value, 
                password.current.value
                )
        }
    }

    return (
        <Fragment>
            <div className={"login-image"} onClick={()=>setErrorShow(false)}>
                <div className={"login-window"}>
                    <GameLogo/>
                    <div className="inputbox">
                        <i className="icon-user"></i>
                        <input ref={login} placeholder=' ' required />
                        <label htmlFor='login'>Логин</label>
                    </div>
                    <div className="inputbox">
                        <i className="icon-lock"></i>
                        <input type="password" ref={password} placeholder=' ' required />
                        <label htmlFor='password'>Пароль</label>
                    </div>
                    <button className="loginButton" onClick={loginHandler}>Войти</button>
                    {Error}
                </div>
            </div>
        </Fragment>
    )
}
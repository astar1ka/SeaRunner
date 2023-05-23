import { useRef, Fragment } from "react"


import './Login.css';
import { Pages, socket } from "../../../App";
import GameLogo from "../../elements/gameLogo/GameLogo";
import useError from "../../../hooks/useError";

type TProps = {
    setPage: Function
}

export default function Login({ setPage }: TProps) {
    const login = useRef<HTMLInputElement>(null!);
    const password = useRef<HTMLInputElement>(null!);
    
    const [Error, setErrorText, setErrorShow] = useError();

    const callback = (data: object | null) => {
        if (data) {
            setPage(Pages.GamePage);
        }
        else {
            setErrorText('Неверный логин или пароль');
            setErrorShow(true);
        };
    }

    function loginHandler() {
        if (login.current.value && password.current.value) {
            socket.login(
                login.current.value,
                password.current.value,
                callback
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
import { useRef, useState } from 'react';
import './Registration.css';
import { socket } from '../../../App';


enum Status {Success, Fail, Registration}

export default function Registration(){
    const [statusRegistration,setStatusRegistration] = useState(Status.Registration);
    const [active, setActive] = useState(false);
    const login = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const name = useRef<HTMLInputElement | null>(null);

    const cbRegictration = (result: boolean) => {
        setStatusRegistration((result) ? Status.Success : Status.Fail);
    }

    const registrationHandler = async () => {
        if (login.current?.value && password.current?.value && name.current?.value) {
            socket.registration(login.current.value, password.current.value, name.current.value, cbRegictration)
        }
    }

    return (
        <div className="reg-image">
            <div className="reg-window">
                <h2 className="h2-reg">Представьтесь, капитан</h2>
                <div className="windowElems">
                <div>
                    
                    <div className="inputbox">
                        <i className="icon-user"></i>
                        <input ref={login} placeholder=' ' required/>    
                        <label htmlFor='login'>Логин</label>
                    </div>
                    <div className="inputbox" id="passIn"> 
                        <i className="icon-lock"></i>   
                        <input  type="password" ref={password} placeholder=' ' required/>
                        <label htmlFor='password'>Пароль</label>
                    </div>
                    <div className="inputbox">
                        <i className="icon-name"></i>
                        <input ref={name} placeholder=' ' required/>    
                        <label htmlFor='login'>Имя</label>
                    </div>
                    <button className="regButton" onClick={registrationHandler}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
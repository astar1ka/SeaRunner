import MainMenu from "./mainMenu/MainMenu";
import './GameMenu.css'
import MenuButton from "./menuButton/MenuButton";
import { useState } from "react";
import CaptainMenu from "./captainMenu/CaptainMenu";

export default function GameMenu(props:any){
    const [activeMainMenu, setActiveMainMenu] = useState(false);
    const [activeMapMenu, setActiveMapMenu] = useState(false);
    const [activeCaptainMenu, setActiveCaptainMenu] = useState(false);

    const mainMenuButtonHandler = () => {
        setActiveMainMenu(!activeMainMenu);
    }

    return (<div className='Screen'>
    <CaptainMenu 
    active = {activeCaptainMenu}
    setActive = {setActiveCaptainMenu}/>  
    <MainMenu 
    active = {activeMainMenu}
    setActive = {setActiveMainMenu}/> 
    <div className="gameMenu_window">
    <MenuButton name='captainMenu' setActive = {setActiveCaptainMenu}/>
    <MenuButton name='mapMenu'/>
    <MenuButton name='mainMenu' setActive = {setActiveMainMenu}/>
</div></div>
)
}
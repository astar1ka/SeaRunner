import logo from '../../../source/logo.png';

import './GameLogo.css'

export default function GameLogo(){
    return (
    <div className='gameLogo'>
        <img className='gameLogo --image' src={logo} />
        <h2 className="gameLogo --label">Sea Runner</h2>
    </div>)
}
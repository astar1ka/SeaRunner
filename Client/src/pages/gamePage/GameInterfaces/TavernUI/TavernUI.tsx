import './TavernUI.css';
import print from './images/print.png';
import {useState} from 'react';
import boatswain from './images/boatswain.jpg';
import cook from './images/cook.jpg';
import doctor from './images/doctor.jpg';
import gunner from './images/gunner.jpg';
import lieutenant from './images/lieutenant.jpg';
import midshipman from './images/midshipman.jpg';
import navigator from './images/navigator.png';
import overseer from './images/overseer.jpg';
import quartermaster from './images/quartermaster.jpg';



export default function TavernUI() {
    const [showCards, setShowCards] = useState(false);
    const[firstIndex, setFirstIndex] = useState<number>(0);
    const[secondIndex, setSecondIndex] = useState<number>(1);
    const[thirdIndex, setThirdIndex] = useState<number>(2);
    const crew = [boatswain, cook, doctor, gunner, lieutenant, midshipman, navigator, overseer, quartermaster];
    const announcement=()=> {
        setShowCards(true);
        
        let a = Math.floor(Math.random() * 9);
        let b = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);
        while(b == a){
            b = Math.floor(Math.random() * 9);
        }
        while(c == a || c == b){
            c = Math.floor(Math.random() * 9);
        }
        setFirstIndex(a);
        setSecondIndex(b);
        setThirdIndex(c);
    }
    return (
        <div className='tavern-interface'>
            <div className='window-recruiting'>
                {/* <div className='for-image'><img src={tavern} className='tavern-image'></img></div> */}
                <div className='cards'>
                    <div className='card'><img src={crew[firstIndex]} className='img-cards'></img></div>
                    <div className='card'><img src={crew[secondIndex]} className='img-cards'></img></div>
                    <div className='card'><img src={crew[thirdIndex]} className='img-cards'></img></div>
                </div>
                <button className='tavern-button' onClick={announcement}>Дать объявление o найме
                <img className='print' ></img></button>
            </div>
        </div>
    )
}
import { useRef, useEffect, useState, SyntheticEvent } from 'react'
import src from '../../source/icons/close.png'

import './Screen.css'

type TScreenProps = {
    width: number;
    height: number;
    hide: boolean;
    close: Function;
}

export default function Screen({ width, height, hide, close}: TScreenProps) {
    let dragging = false;
    let startX: number;
    let startY: number;
    const screen = useRef<HTMLDivElement>(null!);
    useEffect(() => {
        screen.current.style.width = `${width}vw`;
        screen.current.style.height = `${height}vh`;
        screen.current.style.setProperty("--x", `${50}px`)
        screen.current.style.setProperty("--y", `${50}px`)
    }, [])

    const mouseDownHandler = (e:SyntheticEvent<HTMLDivElement,MouseEvent>) => {
        dragging = true;
        const translateX = parseInt(screen.current.style.getPropertyValue('--x'));
        const translateY = parseInt(screen.current.style.getPropertyValue('--y'));
        startX = e.nativeEvent.pageX - translateX
        startY = e.nativeEvent.pageY - translateY
    }

    const mouseUpHandler = () => {
        dragging = false;
    }

    const mouseMoveHandler =(e:SyntheticEvent<HTMLDivElement,MouseEvent>) => {
        if(dragging){
            console.log(e.nativeEvent.pageX);
            screen.current.style.setProperty("--x", `${e.nativeEvent.pageX-startX}px`)
            screen.current.style.setProperty("--y", `${e.nativeEvent.pageY-startY}px`)
            console.log(e.nativeEvent.movementX);
        }
    }

    return (
    <div className={(hide) ? ' hide' : 'Screen'} ref={screen}>
        <div className='--top' onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}/>
        <img className='--close' onClick={() => close()} src={src}/>

    </div>)
}
import React, {useEffect} from 'react'
import WorldScene from "./Scenes/WorldScene";

export default function Game(props: any){
    const scaleWidth = window.innerWidth/window.innerHeight;
    let scene = new WorldScene('WorldScene');
        const config = {
            type: Phaser.CANVAS,
            scale: {
                mode: Phaser.Scale.ENVELOP,
                width: 600*scaleWidth,
                height: 600
            },
            parent: 'gamePage_window',
            fps: {
                target: 60,
                forceSetTimeOut: false
            },
            render: {
                pixelArt: false,
                clearBeforeRender: false
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: [
                scene
            ]
        };
        useEffect(()=>{
            const game = new Phaser.Game(config);
            return () => game.destroy(true);
        }, [])
    return(<div/>);
}
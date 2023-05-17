import WorldScene from "./Scenes/WorldScene";

export default function Game(props: any){
    const scaleWidth = window.innerWidth/window.innerHeight;
    let scene = new WorldScene('WorldScene');
        const config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                width: 512*scaleWidth,
                height: 512
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
        
        const game = new Phaser.Game(config);
    return(<div/>);
}
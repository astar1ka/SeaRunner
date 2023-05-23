import Phaser from "phaser";
import tileMap from "../../../../assets/tileMap.json"
import spriteMapSheet from '../../../../assets/spriteMap.png'
import ship from "../../../../assets/ship.png"
import cannonball from "../../../../assets/cannonBall.webp"
import explosion from "../../../../assets/explosion.webp"
import Ship from "../Source/Entites/Ship/Ship";
import ShipControl from "../Source/Control/ShipControl";

export default class WorldScene extends Phaser.Scene{
    constructor(config:string){
        super(config)
    }

    preload():void{
        /*window.addEventListener('resize', () => {
            this.scale.refresh();
        })*/
        this.load.image('spriteMapSheet', spriteMapSheet);
        this.load.tilemapTiledJSON('sea', tileMap);
        this.load.spritesheet('ship',ship,{frameWidth:256,frameHeight:256});
        this.load.image('cannonball',cannonball);
        this.load.image('explosion',explosion);
    }

    create():void{
        const sand : any[] = [];
        const map = this.make.tilemap({ key: 'sea' });
        const tiles = map.addTilesetImage('sea', 'spriteMapSheet');
        const sea = map.createLayer('sea', tiles);
        sea.forEachTile((tile) => tile.setVisible(false));
        this.data.set('sea', sea);
        this.data.set('viewTiles', []);
        this.data.set('keyW',this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W))
        this.data.set('keyS',this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S))
        const player = new Ship(this,200,200, 'ship');
        const Control = new ShipControl(player);
        Control.on();
        this.data.set('player', player);
        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setRoundPixels(true);
        setInterval(()=>{
            let cameraWidth = (this.cameras.main.width*1.5);
            let cameraHeight = (this.cameras.main.height*1.5);
            let cameraX = this.cameras.main.midPoint.x-cameraWidth/2;
            let cameraY = this.cameras.main.midPoint.y-cameraHeight/2;
            let viewTiles = this.data.get('viewTiles');
            viewTiles.forEach((tile: Phaser.Tilemaps.Tile) => tile.setVisible(false));
            viewTiles = [];
            this.data.get('sea').getTilesWithinWorldXY(cameraX,cameraY, cameraWidth,cameraHeight).forEach((tile:Phaser.Tilemaps.Tile) => {
                tile.setVisible(true);
                viewTiles.push(tile);
            })
            this.data.set('viewTiles', viewTiles);
        }, 1000);  
    }
    

    update(time: number, delta: number): void {
        const player = this.data.get('player');
        player.move();
        //player.restore();
    }
}
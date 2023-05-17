import { Scene } from "phaser";
import Ship from "./Ship";

export default class Cannonball extends Phaser.GameObjects.Sprite{
    private ship;
    private direction: number = 0;
    private distance:number = 0;
    constructor(ship: Ship, x: number, y: number) {
        super(ship.scene,x,y,'cannonball');
        this.ship = ship;
        this.visible = false;
        this.addToDisplayList();
        this.setDisplaySize(4, 4);
    }

    public fire(x:number,y:number,direction:number):void{
        this.visible = true;
        this.direction = direction;
        this.distance = 0;
        this.x = x;
        this.y = y;
        this.setTexture('explosion');
        this.setDisplaySize(16,16);
        this.move();
        setTimeout(()=> {
            this.setDisplaySize(12,12);
            setTimeout(()=> {
                this.setDisplaySize(8,8);
                setTimeout(()=> {
                    this.setDisplaySize(4,4);
                    this.setTexture('cannonball');
                }, 20);
            }, 20);
        }, 20);



    }

    public move(){
        this.x += 20 * Math.cos(this.direction);
        this.y += 20 * Math.sin(this.direction);
        this.distance +=20;
        if (this.distance < 200) setTimeout(this.move.bind(this), 20); else this.visible = false;
    }
}
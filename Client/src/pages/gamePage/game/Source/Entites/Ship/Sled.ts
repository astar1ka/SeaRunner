import { Scene } from "phaser";
import Ship from "./Ship";

export default class Sled extends Phaser.GameObjects.Sprite{
    private ship;
    constructor(ship: Ship, x: number, y: number) {
        super(ship.scene,x,y,'sled');
        this.ship = ship;
        this.addToDisplayList();
        this.setDisplaySize(128, 128);
    }
}
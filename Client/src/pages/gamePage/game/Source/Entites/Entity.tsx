import { Scene } from "phaser";

export default class Entity extends Phaser.GameObjects.Sprite {
    private selected: boolean = false;
    constructor(scene:Scene, x: number, y: number, texture: string){
        super(scene,x,y,texture);
    }

    public select():void {
        this.selected = true;
    }

    public unselect():void {
        this.selected = false;
    }
}
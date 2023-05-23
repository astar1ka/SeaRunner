import Entity from "../Entity";
import { Scene } from "phaser";
import Cannonball from "./Cannonball";

export default class Ship extends Entity {
    public snipeRight = 1;
    private cannonball1;
    private cannonball2;
    private cannonball3;
    private speed: number = 0;
    private direction: number = 0;
    private turnNumber: number = 0;
    private turnCooldown: number = 6;
    private turnCooldownDuration: number = 6;
    private canMove: boolean = true;
    private turned = {
        animated: false,
        is: false,
        counterClock: false
    };
    private moveFunctions: Function[] = [];
    constructor(scene: Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.setDisplaySize(128, 128);
        this.addToDisplayList();
        this.scene.physics.add.existing(this);
        this.cannonball1 = new Cannonball(this, this.x, this.y);
        this.cannonball2 = new Cannonball(this, this.x, this.y);
        this.cannonball3 = new Cannonball(this, this.x, this.y);
    }

    public move(): void {
        if (this.canMove) {
            this.rotate();
            this.transport();
        }
    }

    private transport(): void {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    public speedUp(){
        if (this.speed<6) this.setSpeed(this.speed+1);
    }

    public speedDown(){
        if (this.speed>1) this.setSpeed(this.speed-1);
    }

    private setSpeed(speedValue: number): void {
        this.speed = speedValue;
    }

    private rotate(): void {
        if (this.turned.is) this.turned.animated = true;
        const dRot = (this.turned.counterClock) ? -0.015 : 0.015;
        if (this.turned.animated) this.setRotation(this.rotation + dRot);
        if (this.rotation > 0.09 || this.rotation < -0.09) {
            this.turnNumber += (this.turned.counterClock) ? 1 : -1;
            if (this.turnNumber == -1) this.turnNumber = 31;
            else if (this.turnNumber == 32) this.turnNumber = 0;
            this.setFrame(this.turnNumber);
            this.setRotation(0);
            this.turned.animated = false;
            this.direction += (this.turned.counterClock) ? -.2 : .2;
            if (Math.abs(this.direction) > 3.14) this.direction = -this.direction;
        }
    }

    public stopped(): void {
        this.canMove = !this.canMove;
    }

    public turnOn(counterClock: boolean = false) {
        this.turned.counterClock = counterClock;
        this.turned.is = true;
    }

    public turnOff() {
        this.turned.is = false;
    }

    public restore(){
    }

    public fire(){
        const sin = Math.sin(this.direction);
        const cos = Math.cos(this.direction);
        this.cannonball1.fire(this.x  - 16*cos, this.y - 16*sin,this.direction + 1.57*this.snipeRight);
        this.cannonball2.fire(this.x, this.y ,this.direction + 1.57*this.snipeRight);
        this.cannonball3.fire(this.x+ 16*cos, this.y + 16*sin,this.direction + 1.57*this.snipeRight);
    }
}
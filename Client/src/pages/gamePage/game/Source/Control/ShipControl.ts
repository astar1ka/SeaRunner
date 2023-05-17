import Ship from "../Entites/Ship/Ship";

export default class ShipControl{
    private scene;
    private ship;
    private stop;
    private speedUp;
    private speedDown;
    private rotateClock;
    private rotateAntiClock;
    private leftSnipe;
    private rightSnipe;
    private attack;

    constructor(ship: Ship){
        this.scene = ship.scene;
        this.ship = ship;
        this.stop = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.speedUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.speedDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.rotateClock = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.rotateAntiClock = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.leftSnipe = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.rightSnipe = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.attack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    off(){
        this.stop.removeAllListeners();
        this.speedUp.removeAllListeners();
        this.speedDown.removeAllListeners();
        this.rotateClock.removeAllListeners();
        this.rotateAntiClock.removeAllListeners();
    }

    on(){
        this.speedUp.on('down', () => {
            this.ship.speedUp();
        })
        this.speedDown.on('down', () => {
            this.ship.speedDown();
        })
        this.stop.on('down', () => {
            this.ship.stopped();
        })
        this.rotateClock.on('down', () => {
            this.ship.turnOn(false);
        })
        this.rotateAntiClock.on('down', () => {
            this.ship.turnOn(true);
        })
        this.rotateClock.on('up', () => {
            this.ship.turnOff();
        })
        this.rotateAntiClock.on('up', () => {
            this.ship.turnOff();
        })
        this.attack.on('up', () => {
            this.ship.fire();
        })
        this.rightSnipe.on('up', () => {
            this.ship.snipeRight = 1;
        })
        this.leftSnipe.on('up', () => {
            this.ship.snipeRight = -1;
        })
    }
}
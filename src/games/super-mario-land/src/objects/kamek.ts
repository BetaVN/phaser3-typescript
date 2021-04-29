import { ISpriteConstructor } from "../interfaces/sprite.interface";
import { Enemy } from "./enemy";

export class Kamek extends Enemy {
    private targetPositionX: number
    private targetPositionY: number
    private castCooldown: number
    private currentCastCooldown: number
    private isCastAnimation: boolean
    private flameProjectileCallback: any
    constructor(param: ISpriteConstructor) {
        super(param)
        this.speed = 0
        this.dyingScoreValue = 300
        this.castCooldown = 120
        this.currentCastCooldown = 100
        this.isCastAnimation = false
        this.on("animationcomplete", this.shoot.bind(this))
    }

    protected initSprite() {
        // variables
        this.isActivated = false;
        this.isDying = false;

        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);

        // physics
        this.currentScene.physics.world.enable(this);
        this.scaleX = 16 / this.width
        this.scaleY = 20 / this.height
    }

    update(): void {
        if (!this.isDying) {
            if (this.isActivated) {
                if (this.targetPositionX > this.x) {
                    this.setFlip(true, false)
                }
                else {
                    this.setFlip(false, false)
                }
                if (
                    Phaser.Geom.Intersects.RectangleToRectangle(
                        this.getBounds(),
                        this.currentScene.cameras.main.worldView
                    )
                ) {
                    this.startCast()
                }
            } else {
                if (
                    Phaser.Geom.Intersects.RectangleToRectangle(
                        this.getBounds(),
                        this.currentScene.cameras.main.worldView
                    )
                ) {
                    this.isActivated = true;
                }
            }
        } else {
            this.body.checkCollision.none = true;
        }
    }

    public setTargetPosition(x: number, y: number): void {
        this.targetPositionX = x
        this.targetPositionY = y
    }

    public gotHit(): void {
        this.isDying = true
        this.showAndAddScore()
    }

    public isDead(): void {
        this.destroy();
    }

    public getFlameProjectileCallback(callback: any) {
        this.flameProjectileCallback = callback
    }

    private startCast() {
        if (!this.isCastAnimation) {
            this.currentCastCooldown++
            if (this.currentCastCooldown > this.castCooldown) {
                this.play("kamekCast")
                this.isCastAnimation = true
            }
        }
    }

    private shoot() {
        if (!this.isDying){
            this.flameProjectileCallback(this.targetPositionX, this.targetPositionY, this.x, this.y)
            this.isCastAnimation = false
            this.currentCastCooldown = 0
            this.setFrame(0)
        }
    }
}
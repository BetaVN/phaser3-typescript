import { ISpriteConstructor } from "../interfaces/sprite.interface";
import { Enemy } from "./enemy";

export class Bullet extends Enemy {
    private targetPositionX: number
    private targetPositionY: number
    private turnRate: number
    constructor(param: ISpriteConstructor) {
        super(param)
        this.speed = 40;
        this.turnRate = 5;
        this.dyingScoreValue = 300;
    }

    protected initSprite() {
        // variables
        this.isActivated = false;
        this.isDying = false;

        // sprite
        this.setOrigin(0.5, 0.5);
        this.setFrame(0);
        this.setAngle(180)

        // physics
        this.currentScene.physics.world.enable(this);
        this.body.setSize(14, 12);
        this.body.setGravity(0, -475);
    }

    update(): void {
        if (!this.isDying) {
            if (this.isActivated) {
                var targetAngle = Phaser.Math.Angle.Between(this.x, this.y, this.targetPositionX, this.targetPositionY)

                if (this.rotation !== targetAngle) {
                    var delta = targetAngle - this.rotation
                    if (delta > Math.PI) {
                        delta -= Math.PI * 2
                    }

                    if (delta < - Math.PI) {
                        delta += Math.PI * 2
                    }

                    if (delta > 0) {
                        this.angle += this.turnRate;
                    } else {
                        this.angle -= this.turnRate;
                    }

                    if (Math.abs(delta) < Phaser.Math.DegToRad(this.turnRate)) {
                        this.rotation = targetAngle
                    }
                }
                this.body.setVelocityX(this.speed * Math.cos(this.rotation));
                this.body.setVelocityY(this.speed * Math.sin(this.rotation));
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
            this.body.setVelocity(0, 0);
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
}
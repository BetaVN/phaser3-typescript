import { IProjectileInterface } from "../interfaces/projectile.interface";
import { Projectile } from "./projectile";

export class Flame extends Projectile {
    private targetPositionX: number
    private targetPositionY: number
    private targetAssigned: boolean
    private targetAngle: number
    constructor(param: IProjectileInterface) {
        super(param)
        this.speed = 60
        this.targetAssigned = false
    }

    protected initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);
    
        // physics
        this.currentScene.physics.world.enable(this);
        this.scaleX = 8 / this.width
        this.scaleY = 8 / this.height
        this.body.setAllowGravity(false)
    }

    update(): void {
        if (this.targetAssigned) {
            this.body.setVelocityX(this.speed * Math.cos(this.targetAngle))
            this.body.setVelocityY(this.speed * Math.sin(this.targetAngle))
        }
    }

    public assignTarget(x: number, y: number) {
        this.targetPositionX = x
        this.targetPositionY = y
        this.targetAngle = Phaser.Math.Angle.Between(this.x, this.y, this.targetPositionX, this.targetPositionY)
        this.targetAssigned = true
    }
}
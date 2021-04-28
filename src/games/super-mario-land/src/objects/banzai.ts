import { ISpriteConstructor } from "../interfaces/sprite.interface";
import { Enemy } from "./enemy";

export class Banzai extends Enemy {
    constructor(param: ISpriteConstructor) {
        super(param)
        this.speed = -40;
        this.dyingScoreValue = 600;
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
        this.body.setGravity(0, -475);
        this.scaleX = 36 / this.width
        this.scaleY = 36 / this.height
    }

    update(): void {
        if (!this.isDying) {
            if (this.isActivated) {
                this.body.setVelocityX(this.speed);
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
            this.anims.stop();
            this.body.setVelocity(0, 0);
            this.body.checkCollision.none = true;
        }
    }

    public gotHit(): void {
        this.isDying = true
        this.showAndAddScore()
    }

    public isDead(): void {
        this.destroy();
    }
}
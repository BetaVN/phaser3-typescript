import { IProjectileInterface } from "../interfaces/projectile.interface";
import { GameScene } from "../scenes/game-scene";

export class Projectile extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    protected currentScene: GameScene
    protected speed: number
    constructor(param: IProjectileInterface) {
        super(param.scene, param.x, param.y, param.texture, param.frame)

        this.currentScene = param.scene
        this.initSprite()
        this.currentScene.add.existing(this)
        
    }

    protected initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);
    
        // physics
        this.currentScene.physics.world.enable(this);
        this.body.setSize(8, 8);
    }

    public isDead() {
        this.destroy()
    }
}
import { GameScene } from "../scenes/game-scene";

export interface IProjectileInterface {
    scene: GameScene,
    x: number, 
    y: number,
    texture: string | Phaser.Textures.Texture
    frame?: string | number
}
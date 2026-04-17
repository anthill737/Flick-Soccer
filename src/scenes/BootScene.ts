import Phaser from 'phaser';

/**
 * Loads assets and transitions to the match.
 * Currently no assets, but this is where sprite sheets, audio, and fonts
 * will be loaded when we add them.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // No assets yet — the game is all geometry.
    // Future: this.load.image('ball', 'assets/ball.png');
    //         this.load.audio('kick', 'assets/kick.mp3');
  }

  create(): void {
    this.scene.start('MatchScene');
    this.scene.launch('HUDScene');
  }
}

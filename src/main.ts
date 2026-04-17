import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MatchScene } from './scenes/MatchScene';
import { HUDScene } from './scenes/HUDScene';
import { GAME_WIDTH, GAME_HEIGHT } from './config/constants';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  input: {
    activePointers: 3, // support multi-touch: joystick + flick + UI button
  },
  render: {
    antialias: true,
    pixelArt: false,
  },
  scene: [BootScene, MatchScene, HUDScene],
};

new Phaser.Game(config);

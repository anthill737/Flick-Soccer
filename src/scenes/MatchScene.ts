import Phaser from 'phaser';
import { FIELD } from '../config/constants';
import { DebugPanel } from '../debug/DebugPanel';

/**
 * The pitch. Currently just draws the field lines and shows a "scaffold ready"
 * message — the gameplay port (ball, player, keeper, defenders, flick input)
 * happens in Milestone 1.
 */
export class MatchScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MatchScene' });
  }

  create(): void {
    this.drawPitch();
    this.showWelcomeMessage();
    // DebugPanel attaches itself to the scene via input listeners, no field needed.
    new DebugPanel(this);
  }

  update(_time: number, _delta: number): void {
    // Gameplay loop will go here in Milestone 1:
    // - update ball physics
    // - update player
    // - update keeper AI
    // - update defenders
    // - check for goals
  }

  private drawPitch(): void {
    const g = this.add.graphics();

    // Grass background
    g.fillStyle(FIELD.grassColor, 1);
    g.fillRect(0, 0, FIELD.width, FIELD.height);

    // Field outline
    g.lineStyle(3, FIELD.lineColor, 1);
    g.strokeRect(20, 20, FIELD.width - 40, FIELD.height - 40);

    // Halfway line
    g.lineBetween(FIELD.width / 2, 20, FIELD.width / 2, FIELD.height - 20);

    // Center circle
    g.strokeCircle(FIELD.width / 2, FIELD.height / 2, FIELD.centerCircleRadius);
    g.fillStyle(FIELD.lineColor, 1);
    g.fillCircle(FIELD.width / 2, FIELD.height / 2, 4);

    // Left penalty box
    const boxTop = (FIELD.height - FIELD.penaltyBoxWidth) / 2;
    g.strokeRect(20, boxTop, FIELD.penaltyBoxDepth, FIELD.penaltyBoxWidth);

    // Right penalty box
    g.strokeRect(
      FIELD.width - 20 - FIELD.penaltyBoxDepth,
      boxTop,
      FIELD.penaltyBoxDepth,
      FIELD.penaltyBoxWidth
    );

    // Goals (simple rectangles for now)
    const goalTop = (FIELD.height - FIELD.goalWidth) / 2;
    g.lineStyle(4, 0xffffff, 1);
    g.strokeRect(20 - FIELD.goalDepth, goalTop, FIELD.goalDepth, FIELD.goalWidth);
    g.strokeRect(FIELD.width - 20, goalTop, FIELD.goalDepth, FIELD.goalWidth);
  }

  private showWelcomeMessage(): void {
    const msg = this.add
      .text(FIELD.width / 2, FIELD.height / 2 - 40, 'Flick Soccer — Phaser Scaffold', {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const sub = this.add
      .text(
        FIELD.width / 2,
        FIELD.height / 2 + 10,
        'Gameplay port happens in Milestone 1.\nTap top-right corner 5× for debug panel.',
        {
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '16px',
          color: '#cccccc',
          align: 'center',
        }
      )
      .setOrigin(0.5);

    // Fade out welcome text after a few seconds so it doesn't clutter the pitch.
    this.time.delayedCall(4000, () => {
      this.tweens.add({
        targets: [msg, sub],
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          msg.destroy();
          sub.destroy();
        },
      });
    });
  }
}

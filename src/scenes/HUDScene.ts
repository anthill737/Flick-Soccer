import Phaser from 'phaser';

/**
 * Overlay scene for score, shots, streak, and any other persistent UI.
 * Runs parallel to MatchScene so it doesn't get reset between matches.
 */
export class HUDScene extends Phaser.Scene {
  private scoreText?: Phaser.GameObjects.Text;
  private shotsText?: Phaser.GameObjects.Text;
  private streakText?: Phaser.GameObjects.Text;

  private score = 0;
  private shots = 0;
  private streak = 0;

  constructor() {
    super({ key: 'HUDScene' });
  }

  create(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    };

    this.scoreText = this.add.text(20, 16, 'Score: 0', style);
    this.shotsText = this.add.text(160, 16, 'Shots: 0', style);
    this.streakText = this.add.text(300, 16, 'Streak: 0', style);

    // Event listeners for gameplay updates (MatchScene will emit these).
    const gameEvents = this.game.events;
    gameEvents.on('goal', this.onGoal, this);
    gameEvents.on('shot', this.onShot, this);
    gameEvents.on('reset', this.onReset, this);
  }

  private onGoal(): void {
    this.score += 1;
    this.streak += 1;
    this.scoreText?.setText(`Score: ${this.score}`);
    this.streakText?.setText(`Streak: ${this.streak}`);
  }

  private onShot(hit: boolean): void {
    this.shots += 1;
    this.shotsText?.setText(`Shots: ${this.shots}`);
    if (!hit) {
      this.streak = 0;
      this.streakText?.setText(`Streak: ${this.streak}`);
    }
  }

  private onReset(): void {
    this.score = 0;
    this.shots = 0;
    this.streak = 0;
    this.scoreText?.setText('Score: 0');
    this.shotsText?.setText('Shots: 0');
    this.streakText?.setText('Streak: 0');
  }
}

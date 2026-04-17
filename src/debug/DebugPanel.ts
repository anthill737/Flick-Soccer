import Phaser from 'phaser';
import { BALL, FLICK, PLAYER, KEEPER, DEFENDER, DEBUG, FIELD } from '../config/constants';

/**
 * Hidden debug panel. Tap the top-right corner DEBUG.cornerTapsToOpen times
 * within DEBUG.cornerTapWindowMs to toggle it. Once open, drag sliders to live-tune
 * physics/gameplay constants. Values mutate the imported constants directly,
 * so ball.ts / keeper.ts etc. pick them up on next frame.
 *
 * When you find numbers you like, tell Claude the values and ask to bake them
 * into constants.ts permanently.
 */

interface SliderSpec {
  label: string;
  get: () => number;
  set: (v: number) => void;
  min: number;
  max: number;
  step: number;
}

export class DebugPanel {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isOpen = false;
  private tapCount = 0;
  private lastTapTime = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    if (!DEBUG.enabled) return;
    this.setupCornerTap();
  }

  private setupCornerTap(): void {
    // Invisible hit zone in top-right corner
    const zone = this.scene.add.zone(FIELD.width - 40, 40, 80, 80).setInteractive();
    zone.setDepth(1000);
    zone.on('pointerdown', () => this.onCornerTap());
  }

  private onCornerTap(): void {
    const now = this.scene.time.now;
    if (now - this.lastTapTime > DEBUG.cornerTapWindowMs) {
      this.tapCount = 0;
    }
    this.lastTapTime = now;
    this.tapCount += 1;

    if (this.tapCount >= DEBUG.cornerTapsToOpen) {
      this.tapCount = 0;
      this.toggle();
    }
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.isOpen = true;

    const sliders: SliderSpec[] = [
      // ===== Ball =====
      {
        label: 'Ball linear drag',
        get: () => BALL.linearDrag,
        set: (v) => (BALL.linearDrag = v),
        min: 0,
        max: 0.05,
        step: 0.001,
      },
      {
        label: 'Ball quadratic drag',
        get: () => BALL.quadraticDrag,
        set: (v) => (BALL.quadraticDrag = v),
        min: 0,
        max: 0.005,
        step: 0.0001,
      },
      {
        label: 'Ball max speed',
        get: () => BALL.maxSpeed,
        set: (v) => (BALL.maxSpeed = v),
        min: 3,
        max: 20,
        step: 0.1,
      },
      {
        label: 'Magnus coefficient (curl)',
        get: () => BALL.magnusCoefficient,
        set: (v) => (BALL.magnusCoefficient = v),
        min: 0,
        max: 1,
        step: 0.01,
      },
      {
        label: 'Gravity (chip arc)',
        get: () => BALL.gravity,
        set: (v) => (BALL.gravity = v),
        min: 0,
        max: 1,
        step: 0.01,
      },
      // ===== Flick =====
      {
        label: 'Flick power scale',
        get: () => FLICK.basePowerScale,
        set: (v) => (FLICK.basePowerScale = v),
        min: 0.01,
        max: 0.15,
        step: 0.001,
      },
      {
        label: 'Flick power curve',
        get: () => FLICK.powerCurve,
        set: (v) => (FLICK.powerCurve = v),
        min: 0.8,
        max: 2.0,
        step: 0.05,
      },
      // ===== Player =====
      {
        label: 'Player walk speed',
        get: () => PLAYER.walkSpeed,
        set: (v) => (PLAYER.walkSpeed = v),
        min: 0.5,
        max: 5,
        step: 0.1,
      },
      {
        label: 'Player sprint speed',
        get: () => PLAYER.sprintSpeed,
        set: (v) => (PLAYER.sprintSpeed = v),
        min: 1,
        max: 7,
        step: 0.1,
      },
      // ===== Keeper =====
      {
        label: 'Keeper reaction (ms)',
        get: () => KEEPER.reactionTimeMs,
        set: (v) => (KEEPER.reactionTimeMs = v),
        min: 50,
        max: 500,
        step: 10,
      },
      {
        label: 'Keeper dive speed',
        get: () => KEEPER.diveSpeed,
        set: (v) => (KEEPER.diveSpeed = v),
        min: 1,
        max: 10,
        step: 0.1,
      },
      {
        label: 'Keeper anticipation',
        get: () => KEEPER.anticipationFactor,
        set: (v) => (KEEPER.anticipationFactor = v),
        min: 0,
        max: 1,
        step: 0.05,
      },
      // ===== Defenders =====
      {
        label: 'Defender speed',
        get: () => DEFENDER.speed,
        set: (v) => (DEFENDER.speed = v),
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    ];

    this.container = this.scene.add.container(0, 0);
    this.container.setDepth(2000);

    // Background overlay
    const bg = this.scene.add.rectangle(0, 0, FIELD.width, FIELD.height, 0x000000, 0.75);
    bg.setOrigin(0);
    bg.setInteractive(); // catches clicks so gameplay doesn't receive them
    this.container.add(bg);

    // Panel
    const panelW = Math.min(520, FIELD.width - 40);
    const panelH = Math.min(FIELD.height - 40, 40 + sliders.length * 44 + 60);
    const panelX = (FIELD.width - panelW) / 2;
    const panelY = (FIELD.height - panelH) / 2;
    const panel = this.scene.add.rectangle(panelX, panelY, panelW, panelH, 0x1a1a1a, 0.98);
    panel.setOrigin(0);
    panel.setStrokeStyle(2, 0xffffff);
    this.container.add(panel);

    // Title
    const title = this.scene.add.text(panelX + 16, panelY + 12, 'DEBUG PANEL', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.container.add(title);

    // Close button
    const closeBtn = this.scene.add
      .text(panelX + panelW - 40, panelY + 10, '✕', {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '22px',
        color: '#ffffff',
      })
      .setInteractive();
    closeBtn.on('pointerdown', () => this.close());
    this.container.add(closeBtn);

    // Sliders
    sliders.forEach((spec, i) => {
      const y = panelY + 48 + i * 44;
      this.createSlider(spec, panelX + 16, y, panelW - 32);
    });
  }

  private createSlider(spec: SliderSpec, x: number, y: number, width: number): void {
    const labelText = this.scene.add.text(x, y, `${spec.label}: ${spec.get().toFixed(4)}`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '12px',
      color: '#cccccc',
    });
    this.container?.add(labelText);

    const trackY = y + 22;
    const track = this.scene.add.rectangle(x, trackY, width, 6, 0x444444).setOrigin(0, 0.5);
    this.container?.add(track);

    const range = spec.max - spec.min;
    const pct = (spec.get() - spec.min) / range;
    const knob = this.scene.add.circle(x + pct * width, trackY, 10, 0xffffff);
    knob.setInteractive({ draggable: true });
    this.container?.add(knob);

    this.scene.input.setDraggable(knob);
    knob.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, _dragY: number) => {
      const clampedX = Phaser.Math.Clamp(dragX, x, x + width);
      knob.x = clampedX;
      const newPct = (clampedX - x) / width;
      let newVal = spec.min + newPct * range;
      newVal = Math.round(newVal / spec.step) * spec.step;
      spec.set(newVal);
      labelText.setText(`${spec.label}: ${newVal.toFixed(4)}`);
    });
  }

  private close(): void {
    this.isOpen = false;
    this.container?.destroy();
    this.container = undefined;
  }
}

// -----------------------------------------------------------------------------
// TUNING CONSTANTS
// -----------------------------------------------------------------------------
// Central place for every number that affects how the game feels.
// When Claude says "increase the ball drag by 20%", this is the file it edits.
// The debug panel reads from here and writes back live.
// -----------------------------------------------------------------------------

// ===== Field =====
export const GAME_WIDTH = 1100;
export const GAME_HEIGHT = 640;

export const FIELD = {
  width: 1100,
  height: 640,
  lineColor: 0xffffff,
  grassColor: 0x4a8f3c,
  goalWidth: 220,
  goalDepth: 40,
  penaltyBoxWidth: 400,
  penaltyBoxDepth: 160,
  centerCircleRadius: 80,
};

// ===== Ball =====
// Ported from current index.html physics — all values tuned from play testing.
export const BALL = {
  radius: 10,
  mass: 1,
  linearDrag: 0.012, // per-frame friction on rolling
  quadraticDrag: 0.0008, // air-resistance component (applied to v^2)
  spinDecay: 0.985, // spin magnitude multiplier per frame
  magnusCoefficient: 0.18, // how strongly spin curves the ball
  gravity: 0.28, // vertical pull on chipped/lofted balls
  maxSpeed: 9.5,
  minSpeedToMove: 0.05, // below this, the ball is considered stopped
};

// ===== Flick / shooting =====
export const FLICK = {
  minDragDistance: 12, // ignore micro-flicks below this
  maxDragDistance: 180, // beyond this, power is capped
  powerCurve: 1.2, // >1 means more non-linear; harder flicks get more reward
  basePowerScale: 0.055,
  chipVerticalBoost: 0.6, // how much Z-velocity a LOB button adds
  sampleWindowMs: 120, // how far back to look when computing flick velocity
};

// ===== Player =====
export const PLAYER = {
  radius: 14,
  walkSpeed: 2.1,
  sprintSpeed: 3.5,
  acceleration: 0.25, // how fast velocity approaches target
  turnRate: 0.15,
  dribbleRadius: 22, // distance the ball stays in front of the player
  stamina: {
    max: 100,
    sprintDrainPerSec: 18,
    recoveryPerSec: 12,
    recoveryDelayMs: 800,
  },
};

// ===== Goalkeeper =====
export const KEEPER = {
  radius: 16,
  reactionTimeMs: 180,
  reactionTimeJitterMs: 80,
  diveSpeed: 5.2,
  maxDiveDistance: 90,
  anticipationFactor: 0.6, // 0 = reactive, 1 = predictive
  diveCommitmentMs: 400, // once committed, can't change direction
};

// ===== Defenders =====
export const DEFENDER = {
  radius: 14,
  speed: 2.6,
  pressureDistance: 180, // engage aggressively within this range
  containDistance: 280, // outside this, hold position
  count: 2,
  spreadFromCenter: 150,
};

// ===== Scoring / flow =====
export const SCORING = {
  goalResetDelayMs: 1500,
  streakBonusAt: 3, // streak count where bonus effects kick in
};

// ===== Debug =====
export const DEBUG = {
  enabled: true,
  showFPS: false,
  showHitboxes: false,
  cornerTapsToOpen: 5, // tap the top-right corner this many times to open
  cornerTapWindowMs: 2000,
};

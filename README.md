# Flick Soccer — Phaser + TypeScript

Mobile-first flick-based soccer game. Live at **https://anthill737.github.io/Flick-Soccer/** (main branch = current HTML version) and will be **https://anthill737.github.io/Flick-Soccer/** once `phaser-port` merges to main.

## Stack

- **Phaser 3** — game engine
- **TypeScript** (strict mode) — type safety
- **Vite** — build tool and dev server
- **GitHub Actions** — auto-builds and deploys to GitHub Pages on every push
- **ESLint + Prettier** — code quality

## First-time setup (do this once from your laptop)

You need to do these steps exactly once to bootstrap the project. After that, the phone-Claude loop handles everything.

### 1. Create the `phaser-port` branch and drop this scaffold in

From your `Flick-Soccer` repo on your laptop:

```bash
git checkout -b phaser-port
# Copy all files from this scaffold zip into the repo root
# (your existing index.html on the main branch is untouched)
git add .
git commit -m "Scaffold Phaser + TypeScript port"
git push -u origin phaser-port
```

### 2. Enable GitHub Actions as the Pages source

GitHub Pages currently serves from your main branch directly. We need to switch it to deploy from Actions.

1. Go to your repo on github.com
2. Settings → Pages
3. Under "Build and deployment", change **Source** from "Deploy from a branch" to **"GitHub Actions"**

The workflow is configured to build from the `phaser-port` branch (see `.github/workflows/deploy.yml`). Once you merge to `main` later, update the workflow's `branches: [phaser-port]` to `branches: [main]`.

### 3. Verify the pipeline works

Push any small change to the `phaser-port` branch. Go to the **Actions** tab on GitHub and watch the workflow run (takes ~60-90s). Once it finishes, open `https://anthill737.github.io/Flick-Soccer/` on your phone. You should see an empty green pitch with a "Flick Soccer — Phaser Scaffold" welcome message that fades out.

If you see that, **the entire phone-only pipeline is working** and you never need your laptop again (except for Capacitor builds later).

## The daily loop (phone-only from here on)

1. Open Claude on your phone
2. Describe what you want changed
3. Claude edits files in the repo (via GitHub's web interface or whatever tooling you use)
4. You commit on the `phaser-port` branch
5. GitHub Actions builds (watch it in the Actions tab if you want)
6. Refresh the Pages URL on your phone
7. Play

## Debug panel

Tap the top-right corner of the game 5 times within 2 seconds to open the debug panel. Drag sliders to live-tune physics. When you find numbers you like, tell Claude the values and ask to bake them into `src/config/constants.ts` permanently.

## Project structure

```
.github/workflows/
  deploy.yml            # Builds and deploys to Pages on push to phaser-port
src/
  main.ts               # Phaser game config, scene registration
  config/
    constants.ts        # Every tunable number — ball physics, player speed, AI
  scenes/
    BootScene.ts        # Asset loading (currently none)
    MatchScene.ts       # The pitch — gameplay goes here (empty for now)
    HUDScene.ts         # Score/shots/streak overlay
  debug/
    DebugPanel.ts       # Hidden tuning UI with live sliders
  entities/             # Ball, Player, Goalkeeper, Defender (Milestone 1)
  physics/              # Ball physics, collision helpers (Milestone 1)
  input/                # Flick input, joystick, buttons (Milestone 1)
index.html              # Entry point, loaded by browser
vite.config.ts          # base='/Flick-Soccer/' for Pages subpath
tsconfig.json           # Strict TypeScript
package.json            # Dependencies and scripts
```

## What's in this scaffold

- ✅ Full build + deploy pipeline
- ✅ Phaser game boots, draws an empty pitch with field lines and goals
- ✅ HUD scaffolding (score/shots/streak, wired to game events but no gameplay to trigger them yet)
- ✅ Debug panel with live sliders for every tuning constant
- ✅ TypeScript strict mode, ESLint, Prettier all configured
- ⏳ No gameplay yet — that's Milestone 1

## Milestones

**Milestone 1: Port current gameplay to Phaser.** Ball physics, player movement, keeper AI, defender AI, flick input. Goal: feels identical to the current HTML version.

**Milestones 2-6: Polish physics.** Ball depth, player depth, shooting depth, keeper depth, defender depth. See the planning doc for details.

## Local development (optional — only if you have your laptop)

```bash
npm install
npm run dev
```

Vite exposes the game on your local network, so if your phone is on the same wifi you can load `http://<your-laptop-ip>:5173` and get instant hot-reload. Much faster than the GitHub Actions cycle for rapid iteration.

```bash
npm run build      # Production build to dist/
npm run typecheck  # Check types without emitting
npm run lint       # ESLint
npm run format     # Prettier
```

## When the port is done

Change the workflow trigger from `phaser-port` to `main`, merge the branch, and delete the old `index.html` from the main branch. The Pages URL stays the same.

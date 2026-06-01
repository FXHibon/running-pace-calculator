# Agent Developer Manual (AGENTS.md)

Welcome, AI Coding Agent! This guide is designed to onboard you instantly to the **PacePulse Running Pace Calculator** codebase. It outlines the project's architecture, architectural decisions, strict constraints, and the internal mathematical model to help you make correct, aligned, and high-quality changes.

---

## 🧭 Project Architecture Overview

This is a single-page React application bundled with Vite. It features zero complex state management frameworks, choosing robust local React state because calculations are simple, fast, and entirely client-side.

### Key File Map

- [package.json](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/package.json): Project dependencies, custom scripts, and Node/npm version restrictions.
- [src/App.tsx](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/src/App.tsx): Contains the entire core UI, calculations, preset options, state definitions, and layouts.
- [src/index.css](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/src/index.css): Design system configuration, custom background gradient styling, and custom glassmorphism styles.
- [Dockerfile](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/Dockerfile): Configures the production multi-stage build. Uses a lightweight Alpine Nginx server to host static assets.
- [.github/workflows/](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/.github/workflows):
  - [ci.yml](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/.github/workflows/ci.yml): Validation pipeline (runs lint & build on Node 24).
  - [docker-publish.yml](file:///Users/hibonfrancoisxavier/fxhibon/running-pace-calculator/.github/workflows/docker-publish.yml): Production Docker image builder & publisher.

---

## ⚠️ Strict Architecture Constraints

Any modifications you make **MUST** respect the following architectural decisions:

### 1. Fixed Node.js Version (Node v24)
- **Node.js 24** is the required runtime.
- The `Dockerfile` must use `node:24-alpine` as the builder.
- The `package.json` must enforce Node `>=24` in its `"engines"` block.
- All Node-based GitHub Action jobs must use `node-version: '24'`.

### 2. Primary Git Branch (`master`)
- The default branch is **`master`** (not `main`).
- All GitHub Action triggers (`push` and `pull_request`) must target the `master` branch.

### 3. Docker Platform Support
- The Docker publishing pipeline **must** support both **`linux/amd64`** and **`linux/arm64`**.
- Never remove QEMU or Buildx setup tasks from the workflow files.
- The Dockerfile must not contain x86-specific shell binaries to preserve ARM64 cross-compatibility.

### 4. Design & Aesthetics (Premium Glassmorphism)
- The app uses a premium dark-mode theme with high-end glassmorphism and subtle neon glow effects.
- Avoid introducing bright, flat browser-default elements. Always match the established aesthetic.
- UI changes should use `motion` (Framer Motion) for fluid interactions.

---

## 🧮 Mathematical Pace Calculations

The application relies on a single source of truth for the selected pace, stored in seconds per kilometer as a number: `paceSeconds` (state).

When introducing new distance presets or calculators, use the exact mathematical logic implemented in `src/App.tsx`:

### 1. Pace Conversion (min/km)
```typescript
const mins = Math.floor(secs / 60);
const remainingSecs = secs % 60;
// Format: `${mins}:${remainingSecs.toString().padStart(2, '0')}`
```

### 2. Metric Pace to Speed (km/h)
$$Speed\ (km/h) = \frac{3600}{Pace\ (seconds/km)}$$

### 3. Metric Pace to Imperial Pace (min/mile)
```typescript
const secsPerMile = Math.round(secs / 0.621371192);
const mins = Math.floor(secsPerMile / 60);
const remainingSecs = secsPerMile % 60;
// Format: `${mins}:${remainingSecs.toString().padStart(2, '0')}`
```

### 4. Finish Time Calculation
$$Total\ Seconds = Round(Pace\ (seconds/km) \times Distance\ (km))$$
```typescript
const hrs = Math.floor(totalSecs / 3600);
const mins = Math.floor((totalSecs % 3600) / 60);
const remainingSecs = totalSecs % 60;
```

---

## 🛠 Useful Commands for Agents

Run these inside the workspace root:

- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev`
- **Execute build**: `npm run build`
- **Lint the codebase**: `npm run lint`
- **Build local Docker image**: `docker build -t running-pace-calculator .`
- **Multi-platform Docker build test**:
  `docker buildx build --platform linux/amd64,linux/arm64 -t running-pace-calculator:test .`

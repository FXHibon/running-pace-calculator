# PacePulse Running Pace Calculator 🏃‍♂️💨

PacePulse is a high-performance, interactive running pace calculator designed for athletes, coaches, and running enthusiasts. It calculates race finish times for standard distances (5K, 10K, Half Marathon, and Marathon) instantly using a smooth, interactive pace slider or pre-defined athletic pace presets. 

Built with a stunning, premium dark-mode aesthetic featuring glowing glassmorphism, fluid animations, and a responsive mobile-first layout.

---

## ✨ Features

- **Pace Conversion**: Convert easily between metric pace (`min/km`), imperial pace (`min/mile`), and speed (`km/h`).
- **Interactive Pace Slider**: Dynamically adjust pace to see immediate recalculations across all standard distances.
- **Athletic Pace Presets**: Instantly apply common target paces:
  - 🏃‍♂️ **Elite Pace** (3:30 min/km)
  - ⚡ **Tempo Run** (4:15 min/km)
  - 🏁 **Half Marathon Goal** (5:00 min/km)
  - 🏆 **Marathon Goal** (5:30 min/km)
  - 🟢 **Easy Jog** (6:30 min/km)
- **Multi-Distance Finish Time Predictor**: Calculate precise finish times for:
  - **5K Run**
  - **10K Run**
  - **Half Marathon** (21.0975 km / 13.1 miles)
  - **Marathon** (42.195 km / 26.2 miles)
- **Futuristic Dark Theme**: Features responsive design, neon blur backdrops, glassmorphism containers, and interactive micro-animations driven by Framer Motion.

---

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, CSS Custom Properties, Lucide React (Icons)
- **Animations**: Motion (formerly Framer Motion)
- **Deployment**: Docker (Multi-stage build with lightweight Alpine Nginx server)
- **CI/CD**: GitHub Actions (Lint, build, and publish multi-platform Docker images)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 24.0.0
- **npm** >= 10.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fxhibon/running-pace-calculator.git
   cd running-pace-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Compiles the production build (runs TypeScript checks and builds with Vite).
- `npm run lint`: Runs ESLint check across files.
- `npm run preview`: Previews the compiled build locally.

---

## 🐳 Docker Deployment

The application features a production-ready multi-stage `Dockerfile`.

### Build Image Locally
```bash
docker build -t running-pace-calculator .
```

### Run Container Locally
```bash
docker run -d -p 8080:80 --name running-pace-calculator running-pace-calculator
```
Access the app locally at [http://localhost:8080](http://localhost:8080).

### Multi-Platform Builds (ARM64 & AMD64)
To build the Docker image for both ARM64 and AMD64 architectures:
```bash
docker buildx build --platform linux/amd64,linux/arm64 -t fxhibon/running-pace-calculator:latest --push .
```

---

## ⚙️ GitHub Actions CI/CD

The workflows are stored in `.github/workflows/` and trigger events targeting the default branch `master`:

1. **Continuous Integration (`ci.yml`)**:
   - Triggers on every push and pull request to `master`.
   - Sets up Node.js v24.
   - Runs `npm ci`, `npm run lint`, and `npm run build` to verify code quality.

2. **Docker Publish (`docker-publish.yml`)**:
   - Triggers on every push to `master` and can be manually executed.
   - Installs QEMU and Buildx for multi-platform support.
   - Signs into Docker Hub and builds + publishes the production image for **both AMD64 and ARM64** architectures.

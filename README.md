# Keyboard Site

Keyboard-driven personal site prototype built with React, Vite, and Tailwind CSS. Navigation is optimized for WASD + E/Q inputs, with deep linking for sections and project detail views.

## Prerequisites

- Node.js 18+ (npm ships with it)
- Git
- macOS, Linux, or WSL shell (examples below use macOS commands)
- Optional: [Homebrew](https://brew.sh/) if you prefer package-manager installs
- Optional: OpenAI + Codex CLI tooling if you plan to use the Codex workflow

## Setup

1. **(Optional) Install Homebrew**

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   Follow the installer’s final instructions so `brew` is available in your shell.

2. **Install Node.js and npm**

   - Homebrew: `brew install node`
   - Alternative: download the LTS installer from [nodejs.org](https://nodejs.org/) if you prefer not to use Homebrew.

   Verify the install:

   ```bash
   node -v
   npm -v
   ```

3. **Install Git (if you do not already have it)**

   ```bash
   brew install git
   ```

   On Linux, use your distro’s package manager instead of Homebrew.

4. **(Optional) Install the OpenAI CLI** – required before `@openai/codex-cli`

   ```bash
   npm install -g openai
   openai --version
   ```

5. **(Optional) Install the Codex CLI** – only needed for the guided Codex workflow

   ```bash
   npm install -g @openai/codex-cli
   codex login
   ```

6. **Clone this repository using HTTPS**

   ```bash
   git clone https://github.com/<your-username>/keyboard-site.git
   cd keyboard-site
   ```

   Replace `<your-username>` with the account or organization that owns your fork. Use `git remote set-url origin ...` if you later swap between SSH/HTTPS.

7. **Install project dependencies**

   ```bash
   npm install
   ```

## Development

- Start the Vite dev server:

  ```bash
  npm run dev
  ```

  Vite prints a local URL (default `http://localhost:5173`).

- Build for production:

  ```bash
  npm run build
  ```

- Preview the production build locally:

  ```bash
  npm run preview
  ```

## Keyboard Controls

- `A` / `D`: move between top-level pages
- `W` / `S`: move within the current table of contents (page sections or project content)
- `E`: confirm / open the focused element (project, media section)
- `Q`: go back / close project detail

## Hash-based Links

The URL hash reflects the current page, section, and project selection. Copy the address bar to deep-link to any page or project detail view.

## Troubleshooting

- If `codex` commands fail, re-run `codex login` to refresh auth.
- Ensure the terminal can find the Node binaries (restart the shell after installing via Homebrew or update your `PATH`).
- Delete `node_modules` and retry `npm install` if dependencies become inconsistent.

## License

This project currently has no explicit license. Add one (`LICENSE` file) before publishing publicly.

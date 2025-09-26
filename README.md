# Keyboard Site

Keyboard-driven personal site prototype built with React, Vite, and Tailwind CSS. Navigation is optimized for WASD + E/Q inputs, with deep linking for sections and project detail views.

## Prerequisites

- **macOS or Linux shell** (examples below assume macOS)
- **Homebrew** for package management
- **Node.js + npm** (Node 18 or newer recommended)
- **Codex CLI** tooling for the guided coding workflow
- **Git** for version control

## Environment Setup

1. **Install Homebrew (skip if already installed):**

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   After the installer finishes, follow its `echo` instructions so `brew` is on your `PATH`.

2. **Install Node.js and npm via Homebrew:**

   ```bash
   brew install node
   ```

   Verify the versions:

   ```bash
   node -v
   npm -v
   ```

3. **Install Git (if not already available):**

   ```bash
   brew install git
   ```

4. **Install the Codex CLI:**

   ```bash
   npm install -g @openai/codex-cli
   ```

   Log in (the CLI will open a browser window to authenticate):

   ```bash
   codex login
   ```

5. **Clone this repository:**

   ```bash
   git clone git@github.com:<your-username>/keyboard-site.git
   cd keyboard-site
   ```

6. **Install project dependencies:**

   ```bash
   npm install
   ```

## Development

- **Start the dev server:**

  ```bash
  npm run dev
  ```

  Vite will display a local URL (default `http://localhost:5173`).

- **Build for production:**

  ```bash
  npm run build
  ```

- **Preview the production build:**

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
- Ensure the terminal has access to Node binaries (restart the shell after installing via Homebrew).
- Delete `node_modules` and retry `npm install` if dependencies become inconsistent.

## License

This project currently has no explicit license. Add one (`LICENSE` file) before publishing publicly.

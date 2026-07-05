# 🗝️ Dungeon Escape

A playful, neo-brutalist browser game for learning Data Structures & Algorithms.
Choose Python, Java, or C++ and clear 20 progressively harder DSA levels — the
problems stay the same across languages, so replaying in a new language is
encouraged and tracked separately.

## Project structure

```
dungeon-escape/
├── index.html                  # Vite HTML entry
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Top-level state machine (screens, progress, submit logic)
    ├── data/
    │   ├── levels.js             # All 20 levels: prompts, starter code, hints, solutions (3 languages)
    │   ├── languages.js          # Supported languages metadata
    │   └── heuristicCheck.js     # Lightweight code-submission validator
    ├── components/
    │   ├── LanguageSelect.jsx
    │   ├── LevelScreen.jsx
    │   ├── SummaryScreen.jsx
    │   ├── DungeonPath.jsx
    │   ├── HintPanel.jsx
    │   ├── SolutionPanel.jsx
    │   ├── LevelCompleteToast.jsx
    │   ├── Confetti.jsx
    │   ├── Atmosphere.jsx        # Torch + floating particle effects
    │   └── StatBadge.jsx
    └── styles/
        └── dungeon.css           # All neo-brutalist dungeon styling
```

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploy

`dist/` is a fully static site — deploy it anywhere that serves static files:

- **Vercel**: `vercel --prod` (or connect the repo; it auto-detects Vite)
- **Netlify**: drag-and-drop the `dist/` folder, or connect the repo with build
  command `npm run build` and publish directory `dist`
- **GitHub Pages**: build, then push the contents of `dist/` to a `gh-pages`
  branch (or use an action like `peaceiris/actions-gh-pages`)
- **Any static host** (S3 + CloudFront, Cloudflare Pages, Firebase Hosting,
  nginx, etc.): upload the contents of `dist/`

No environment variables, backend, or database are required — all game state
lives in memory for the current browser session.

## Notes on the code-check logic

`src/data/heuristicCheck.js` validates submissions with keyword heuristics
rather than actually executing code, since there's no sandboxed runtime here.
It's tuned to accept the real reference solutions in all three languages and
reject empty/placeholder/very short submissions. If you want strict,
real execution-based grading later, that function is the seam to swap in
something like Pyodide (client-side Python), a WebAssembly C++ runtime, or a
server-side sandboxed executor (e.g. Judge0) — the rest of the app doesn't
need to change.

## Adding or editing levels

Each entry in `src/data/levels.js` follows this shape:

```js
{
  id: 1,
  concept: "Arrays",
  title: "The Locked Vault",
  xp: 100,
  prompt: "…",
  signature: "int findMax(vector<int>& nums)",
  starter: { python: "…", java: "…", cpp: "…" },
  tests: [{ input: "…", expected: "…" }, …],
  hints: ["…", "…", "…"],
  solution: { python: "…", java: "…", cpp: "…" },
  explanation: "…",
  complexity: "O(n) time, O(1) space",
}
```

If you add a new level, also add a matching entry to the `signalGroups` map in
`heuristicCheck.js` (or rely on the generic fallback) so submissions can pass.

# Ayush Jha — AI/ML Portfolio (React + Three.js)

A full migration of the original HTML/CSS/Bootstrap portfolio into a modern,
bilingual React + Three.js single-page app with a distinctive "research lab
/ terminal" visual identity.

## Stack
- **React 19** + **Vite 8**
- **Three.js** via **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing** — interactive neural-network hero orb (bloom glow, mouse parallax, auto-rotation) plus a unique lazy-mounted ambient 3D motif behind every other section
- **Tailwind CSS v4** — near-black canvas, signature acid-lime accent, sharp-cornered "bracket" panels, bento-style grids
- **Framer Motion** — scroll reveals, magnetic buttons, animated counters, scroll progress bar, custom cursor
- **react-icons**

## Ambient 3D backgrounds
Every section (not just the Hero) has its own low-key, unique Three.js motif rendered behind the content via `SectionCanvas` (`src/components/SectionCanvas.jsx`):
- **Hero** — `NeuralOrb`: the detailed neural-network centerpiece.
- **About** — Identity Core: a slow wireframe icosahedron with a point halo.
- **Experience** — Trajectory Stream: an upward-flowing particle stream.
- **AI Expertise** — Neural Matrix: a pulsing point grid with flickering links.
- **Projects** — Drifting Shards: floating rotating octahedra.
- **Skills** — Skill Knot: a single rotating wireframe torus knot.
- **Education** — Knowledge Orbits: concentric rings with orbiting nodes.
- **Certifications** — Floating Gems: faceted shapes drifting upward.
- **Contact** — Perspective Floor: a receding terminal-style grid.

Each scene lives in `src/components/scenes/AmbientScenes.jsx`. `SectionCanvas` only mounts the underlying WebGL `<Canvas>` while the section is within 250px of the viewport (`IntersectionObserver`), uses a capped low DPR and no antialiasing, respects `prefers-reduced-motion`, and renders at low opacity behind `z-10` content so text stays fully legible.

## Design language
- Signature color: acid lime (`#d7ff3f`) on near-black, with ice-blue and coral as secondary accents — not the generic purple/cyan gradient look.
- Editorial, left-aligned section headers with `/NN` index numbers.
- Bento-style asymmetric grids for AI Expertise and Skills.
- Bracket-corner hover state on every card (sci-fi HUD detail).
- Vertical numbered dock navigation (desktop) with active-section tooltip labels; slim top bar + full-screen mobile menu.
- Custom cursor (dot + lagging ring, desktop only) and magnetic CTA buttons.
- Infinite marquee ticker of the tech stack under the hero.
- Contact section is a real interactive terminal (`src/components/InteractiveTerminal.jsx` + `src/components/Contact.jsx`) — type commands like `help`, `contact`, `resume`, `skills`, `linkedin`, `whoami` and get live responses; supports English and German command aliases, arrow-key history, and quick-command chips.

## Bilingual (EN / DE)
- Full English + German translations for every piece of UI chrome and content — nav labels, section headers, form fields, footer, and all data (bio, experience, projects, skills, education, certifications).
- Toggle lives in the top bar (desktop), mobile menu, and footer.
- Language choice persists (`localStorage`) and defaults to the browser's language on first visit.
- Add or edit copy in `src/i18n/ui.js` (chrome strings) and `src/data/content.js` (`content.en` / `content.de`).

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  components/       # UI + 3D components
  i18n/
    ui.js           # chrome strings (nav, buttons, form labels...) in en/de
    LanguageContext.jsx
  data/content.js    # content.en / content.de — bio, experience, projects, skills...
  index.css          # design tokens (Tailwind v4 @theme) + custom utilities
public/
  images/
  Ayush_Jha_Resume.pdf
```

## Deploying

`npm run build` outputs a static `dist/` folder — deploy it to GitHub Pages,
Vercel, Netlify, or any static host. For GitHub Pages specifically, set
`base: '/<repo-name>/'` in `vite.config.js` if not deploying to a root domain.

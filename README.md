# Gayathri Tulugu — Portfolio

React + Vite portfolio with a dark-lavender design system and an interactive hero.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
```

## Where things live

| What | File |
| --- | --- |
| Colours, fonts, spacing, buttons, glass cards (design tokens) | `src/index.css` |
| Hero (interactive animation + layout) | `src/components/InteractiveHero.jsx / .css` |
| Sparkle / twinkle layer | `src/components/Sparkles.jsx / .css` |
| Sections | `src/components/{About,Skills,Education,Projects,Certificates,Experience,Contact}.jsx / .css` |
| Hero animation frames (transparent WebP, 120 frames) | `public/hero-frames/` |

## Common edits

- **Project links:** in `Projects.jsx`, set `github` / `demo` on a project. A button only appears when a link is set.
- **Sparkle amount:** `<Sparkles count={26} />` in `App.jsx`.
- **Hero animation timing / frames:** the `HERO` object at the top of `InteractiveHero.jsx`.
- **Colours:** change the variables at the top of `src/index.css` — every section reads from them.
- **Resume:** replace `public/resume/Gayathri_Tulugu_Resume.pdf` with a real PDF (keep the same file name).

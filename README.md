# Justin Robinson — Portfolio Site

Next.js (App Router) + TypeScript foundation for the scroll-driven case
study experience, modeled on robin-noguier.com and built directly from
the Figma "Landing Page" file.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 — scroll to move between projects.

## How the transition works

Every project's hero image sits in a vertical filmstrip. Scroll position
(one viewport height per project) drives everything via a single progress
value in `components/ProjectScrollExperience.tsx`:

- **Filmstrip `translateY`** — moves one slot (`CARD_HEIGHT + 120px`) per project;
  active hero stays Y-centered; prev/next sit **120px** above/below the focus hero
- **Per-image opacity** — function of distance from the active index
- **Background, nav, text, dots** — linearly interpolated between current
  and next project colors

Smooth wheel scrolling via **Lenis**. Card height is `CARD_HEIGHT` (498px)
in `data/projects.ts`.

For interaction patterns from the original [Robin Noguier portfolio](https://robin-noguier.com)
build (WebGL, scroll snap, route transitions), see
[`reference/robin-noguier-technical-reference.md`](reference/robin-noguier-technical-reference.md)
— based on [Lorenzo Cadamuro's Medium write-up](https://lorenzocadamuro.medium.com/how-to-build-a-creative-portfolio-with-react-js-and-webgl-a697869f78c5).

## What's real vs. placeholder right now

| Project | Status |
|---|---|
| Camio | Real colors pulled from Figma. Needs real image at `public/images/camio-hero.jpg` |
| Reyooz | Real colors pulled from Figma. Needs real image at `public/images/reyooz-hero.jpg` |
| Barclays, Gunvor, Saxo, iPlayer, Sedition | `isPlaceholder: true` in `data/projects.ts` — colors are guesses, images render as a gradient placeholder instead of `next/image` |

To bring a project to "real" status:
1. Export the project's hero screenshot from its Figma "Project Window" instance, drop it in `public/images/`
2. Update that project's `bgColor`, `headlineColor`, `arrowColor` in `data/projects.ts` to the actual sampled values from Figma
3. Remove `isPlaceholder: true`

## Case study pages

`app/case-study/[slug]/page.tsx` is a stub — one route per project via
`generateStaticParams()`. The full body copy (About the Project,
Discovering the real problem, etc.) already exists in the Figma
"Folio / [Project] / Case Study" frames — this still needs porting
into that page template section by section.

## Not yet built

- Persistent WebGL/R3F canvas across route transitions (see technical reference)
- Scroll **snap** / Lethargy-style intent detection (Lenis smooth scroll is in; discrete snap is not)
- Real typography scale beyond the hero — body copy in case study pages needs the full type-scale tokens applied
- Custom cursor / magnetic buttons / text-split reveal (built as vanilla JS in
  the earlier `animation-patterns-demo.html` — still needs porting to React
  hooks for use across this project)

## Design tokens

`styles/tokens.css` is the Sky/Gray primitive + semantic token set built
earlier — imported globally via `app/globals.css`. Component styles
reference the semantic CSS variables (`var(--surface-base)`, etc.)
wherever they apply.

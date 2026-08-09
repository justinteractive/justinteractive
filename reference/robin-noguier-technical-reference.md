# Robin Noguier Portfolio — Technical Reference

Source: [How to Build a Creative Portfolio with React JS and WebGL](https://lorenzocadamuro.medium.com/how-to-build-a-creative-portfolio-with-react-js-and-webgl-a697869f78c5) by Lorenzo Cadamuro (Oct 2020).  
Site: [robin-noguier.com](https://robin-noguier.com) — the primary interaction reference for this project.

This doc captures **patterns from the original build** and maps them to **our stack** so we know what to borrow, what we already have, and what to defer.

---

## Their stack vs ours

| Layer | Robin Noguier (2020) | This project (now) |
|---|---|---|
| Framework | Next.js + React | Next.js 14 App Router + React + TS |
| Homepage scroll | Custom wheel handler + **Lethargy** (intent vs inertia) | Native scroll track + **Lenis** smooth scroll |
| Homepage visuals | **Three.js / R3F** — images, video, BG in WebGL | CSS filmstrip + `next/image` |
| Page transitions | Single orchestrated animation, shared canvas | Normal Next.js routes (not yet unified) |
| Animation lib | **React Spring** (`useTransition`, spring physics) | rAF + scroll-driven lerp (colors, opacity, translate) |
| Performance | **Web Workers** for 3D→screen projection + wheel snap | Not needed yet at current complexity |
| Content | Prismic CMS | Static `data/projects.ts` |

---

## Homepage scroll — key ideas from the article

1. **Snap between projects, not free scroll**  
   Wheel delta drives discrete project transitions. User should feel one “step” per intentional scroll, not continuous drift.

2. **Lethargy — distinguish intent from inertia**  
   [Lethargy](https://github.com/dragan-romic/lethargy) filters trackpad/mouse wheel so transitions start when intentional scroll *ends*, not on every micro-delta.  
   **Our note:** Lenis gives smooth feel but does not snap. Consider **Lenis Snap**, Lethargy, or a scroll-snap threshold when polish phase starts.

3. **One progress value drives everything**  
   Cadamuro dispatches a single transition progress (React Context + React Spring interpolation) so HTML and WebGL stay in sync.  
   **Our equivalent:** `clamped` scroll index + `t` in `ProjectScrollExperience.tsx` already drives background, text crossfade, filmstrip `translateY`, and dot colors — keep this single-source pattern as we add features.

4. **Exclude current item from “curtain” transitions**  
   In WebGL, `isCurrent` prop skips the active thumbnail during page-curtain effects.  
   **Our equivalent:** active filmstrip item stays at full opacity; adjacent items fade to ~40%.

---

## WebGL / R3F patterns (future)

From the article — relevant when we add persistent canvas (see README “Not yet built”):

- **Shared canvas across routes** — one `<canvas>` persists; scene reacts to route changes.
- **Treat meshes as React components** — pass props like `isCurrent`, `progress` into R3F nodes.
- **Shader effects on hover** — mouse-bound light on homepage images (their approach; we may stay CSS or add R3F later).
- **Web Workers** — only if CPU-bound (3D projection for clip-path masks, wheel handling). Unlikely needed until WebGL homepage ships.

Libraries mentioned: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [React Spring](https://www.react-spring.dev/), [Bezier easing](https://easings.net/) via easing.co.

---

## Page transition patterns (future)

- **One orchestrated timeline** for route changes — progress 0→1 shared by layout, canvas, and HTML exit/enter.
- **React Spring `useTransition`** for swapping page components with coordinated exit/enter.
- Avoid global store for *continuous* animation progress; Context + spring interpolation object worked for them.

Our case-study pages still use standard navigation. When implementing shared canvas, start with a root layout wrapper that owns canvas + transition progress.

---

## Case study scroll (inner pages)

Tyler S’s question in the article:

- Custom scroll on wheel for **full control** on content-heavy pages.
- Move only blocks **entering the viewport**; share scroll progress via Context for parallax/reveals.

Relevant when porting Figma case-study frames — not for homepage filmstrip.

---

## Practical checklist for this repo

### Already aligned
- [x] Next.js multi-page portfolio
- [x] Scroll-driven homepage with one progress driving color + filmstrip + text
- [x] Lenis for smooth wheel feel
- [x] Full-height filmstrip; active hero Y-centered; prev/next **120px** from focus hero (`CARD_GAP`)

### Next polish (from article)
- [ ] **Snap / Lethargy** — one project per scroll intent, not half-scroll stops
- [ ] **React Spring** (optional) — springy text/color transitions instead of linear lerp
- [ ] **Shared R3F canvas** — persistent WebGL across `/` ↔ `/case-study/[slug]`
- [ ] **Single transition orchestrator** — one progress for route changes
- [ ] **Viewport-bound case-study animations** — Context-shared scroll on long pages

### Defer unless needed
- Web Workers (performance was for WebGL + clip-path masking at scale)
- Prismic / CMS (static data is fine for now)

---

## Quotes worth remembering

> “Handling the wheel event, and using the delta value to snap between items, has always been tough to implement.”

> “I excluded the store from the beginning… The solution I opted for was using a global context and dispatching the React-Spring interpolation object.”

> “Designers have creativity on their side, but we, as developers, are in charge to give them cues and solutions.”

---

*Last updated: Jul 2026 — link this doc from README when tackling scroll snap, WebGL, or route transitions.*

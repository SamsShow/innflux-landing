# Innflux — Landing

Dark, scroll-interactive landing page for Innflux, a composable credit layer for emerging-market businesses.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3 (custom palette)
- Framer Motion (scroll-bound parallax, idle illustrations)
- Geist / Geist Mono / Instrument Serif

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

## Scroll interactions

Every section is tied to `useScroll` + `useTransform`:

- **Backdrop** — dot grid drifts up; halos slide and fade with scroll
- **Hero** — sphere parallax + scale + opacity, headline drops + fades
- **Metrics** — 4 columns with staircase parallax
- **How it works** — headline horizontal drift, 3 cards in scissor parallax
- **FluxScore** — title parallax; A2+ scales/fades, range bar + 4 breakdown bars fill across card's scroll window
- **Solutions** — headline parallax, cards alternate-stair
- **Case studies** — title horizontal drift, logos column-parallax
- **Big CTA** — gold halo scales with section progress
- **Footer** — giant `innflux.` mark rises into view, gold ring drifts, "lu" gradient shifts hue

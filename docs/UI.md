# UI/UX Guidelines — KingdomX

This file documents the UI/UX design system and features implemented in the frontend.

Key points:

- Framework: Next.js + TailwindCSS + Framer Motion (animations and page transitions)
- Theme engine: `ThemeProvider` stores `theme` and `palette` in `localStorage` and exposes `useTheme()` hook.
- Components:
  - `components/ui/Button.tsx` — animated, brand-aware button
  - `components/ui/Card.tsx` — card with subtle hover lift
  - `components/AIPanel.tsx` — AI suggestions UI
  - `components/TaskBoard.tsx` — real-time task board (Socket.IO)
- Pages:
  - `/login`, `/signup`, `/dashboard`, `/tasks`, `/projects`, `/settings` — all responsive and animated
- Realtime: uses Socket.IO client to listen to `task:created`, `task:updated`, `task:deleted` events

Branding:

- Footer & About pages include: "KingdomX — Founded by Muhammad Jawad, King Group of Technology"

Design goals:

- Enterprise-grade polish, responsive across devices, smooth micro-interactions, and accessible color contrasts.

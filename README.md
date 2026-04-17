# Latest News PWA

A mobile-first Progressive Web App that displays a live news feed, built from a Figma design using the Simple Design System (SDS).

## Stack

- **React 19** + Vite
- **SCSS / CSS Modules** — no Tailwind, no CSS-in-JS
- **vite-plugin-pwa** — installable PWA with service worker
- **Newsdata.io** — live US news articles
- **Vercel** — deployment target

## Design

Figma file: [claude-figma-test-news](https://www.figma.com/design/r1ujwOuoedDS8wUKoyBE9L/claude-figma-test-news)  
Design system: [Simple Design System (SDS)](https://www.figma.com/design/e2JTB9Amzu8JSWyBeCeFvz/FORKED-Simple-Design-System--Community-)

All design tokens in `src/styles/_tokens.scss` were extracted directly from Figma via the MCP server.

## Project Structure

```
src/
  assets/
  components/
    ArticleCard/      # News article card (image, title, description)
    ArticleMeta/      # Publisher name + timestamp row
    NewsFeed/         # Full feed page (header, filters, article list)
    PhoneShell/       # Desktop phone-frame wrapper
    StatusBar/        # Mobile status bar
    TagToggle/        # Horizontal category filter chips
  hooks/
    useNews.js        # Fetches live articles from Newsdata.io
  pages/
  styles/
    _tokens.scss      # Design tokens (CSS custom properties + SCSS vars)
    _reset.scss       # CSS reset
    _typography.scss  # Typography utility classes
    main.scss         # Global styles
  utils/
    formatDate.js     # Date formatting helpers
  App.jsx
  main.jsx
public/
  icons/              # PWA icons (192px, 512px)
  manifest.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). On desktop, the app renders inside a phone-shaped frame. On mobile (≤500px viewport), it goes full-screen.

## Build

```bash
npm run build
npm run preview
```

Output goes to `dist/`. The service worker is generated automatically by `vite-plugin-pwa`.

## Deployment

The project is configured for Vercel via `vercel.json`. Push to GitHub and import the repo in Vercel — no additional configuration needed.

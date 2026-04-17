# CLAUDE.md — Mobile Newsfeed PWA

This file guides AI agents working on design and code for this project.

---

## Project Overview

**Name:** Mobile Newsfeed PWA  
**Type:** Progressive Web App (mobile-first)  
**Target viewport:** 390×844 (iPhone 14 Pro); design at 390px wide  
**Stack:** React + TypeScript + Tailwind CSS (planned)  
**Design tool:** Figma — [Project file](https://www.figma.com/design/r1ujwOuoedDS8wUKoyBE9L/claude-figma-test-news)  
**Design system:** Simple Design System (SDS) by Figma — [Reference fork](https://www.figma.com/design/e2JTB9Amzu8JSWyBeCeFvz/FORKED-Simple-Design-System--Community-)

---

## Figma File Structure

| Page | Contents |
|---|---|
| Page 1 | Newsfeed screen inside a phone shell mockup |

**Key node IDs (Page 1):**
- Phone Shell: `41:2`
- Screen (390×844, clips content): `41:3`
- Scroll Content (auto-layout, HUGs vertically): `41:4`
- Tag Toggle Group: `42:55`
- Article 1 wrapper: `44:336`

---

## Simple Design System (SDS) — Component Reference

**Library key:** `lk-e0ffcff14368019c4f30f45401cd233d6cbc5f869988484192d04cbbef801fb0064ef68feaa8a2775ee4f1f05d9a4af1a6d07b2658eac4aefb7afb18728c4066`

Always import SDS components using `figma.importComponentByKeyAsync()` or `figma.importComponentSetByKeyAsync()` — never recreate them from scratch.

### Components Used in This Project

| Component | Key | Notes |
|---|---|---|
| `Card` (component set) | `a5bde480886231526d7dd890df3779dc15b52423` | Use `Asset Type=Image, Variant=Stroke, Direction=Horizontal` for news articles |
| `Tag Toggle Group` | `16bdd1a370815a1ab8c04bd4aacaf3c6fa9bfe3b` | Category filter bar at top of feed |
| `Tag Toggle` (component set) | `aa708ea694a7f3d928fc7311848243d5aef8c3e6` | Individual filter chips inside Tag Toggle Group |

### Card Component Properties

When creating a news article card instance, use these property keys with `setProperties()`:

| Property Key | Type | Usage |
|---|---|---|
| `Heading#280:0` | TEXT | Article headline |
| `Body#280:13` | TEXT | Article description/excerpt |
| `Button#113:15` | BOOLEAN | Set to `false` to hide the action button |
| `Asset#113:13` | BOOLEAN | Set to `true` to show the image |
| `Asset Type` | VARIANT | Use `"Image"` for news thumbnails |
| `Variant` | VARIANT | Use `"Stroke"` for bordered card style |
| `Direction` | VARIANT | Use `"Horizontal"` for the standard news layout |

After creating a card instance, set the Image placeholder fill:
```js
const imgFrame = cardInst.findOne(n => n.name === 'Image');
if (imgFrame) imgFrame.fills = [{ type: 'SOLID', color: { r: 0.80, g: 0.82, b: 0.85 } }];
```

### Tag Toggle Properties

Update category label text via `setProperties()` on each nested Tag Toggle instance:

```js
// Find all Tag Toggle instances inside a Tag Toggle Group
const tagToggles = tagGroupInst.findAll(n => n.type === 'INSTANCE' && n.name === 'Tag Toggle');
tagToggles[0].setProperties({ 'Label#156:33': 'All' });
tagToggles[1].setProperties({ 'Label#156:33': 'World' });
// etc.
```

The first toggle (`index 0`) is the "selected/on" state by default.

### SDS Components Available (Not Yet Used)

| Component | Key | When to use |
|---|---|---|
| `Input Field` | `c28150b04d333d34ed9d2b77abd9f2f54e1a878a` | Search field |
| `Search Field` | *(from SDS library)* | Search bar in header |
| `Tag` | `0fcd16616b41884b21451ffa4a2fc98a03093b49` | Article category badges on cards |
| `Button` | *(from SDS library)* | CTA buttons, load more |
| `Avatar` | *(from SDS library)* | Author/publisher avatar |
| `Navigation Pill List` | *(from SDS library)* | Bottom nav bar (future) |
| `Toggle right` | `6b6985679de9b7b12ce4110f7b8df55533477a9d` | Dark mode toggle, settings |
| `Card (Slot)` | `938ddbc1add07bdc6bbec6388327aa27d9d04868` | Hero/featured article card |

---

## Design Tokens

SDS uses CSS variables for tokens (light + dark mode). Map these to Tailwind or CSS custom properties:

### Colors
| Token role | SDS variable | Approx hex |
|---|---|---|
| Background | `--color-background` | `#F7F7F7` |
| Surface (card) | `--color-surface` | `#FFFFFF` |
| Text primary | `--color-foreground` | `#141414` |
| Text secondary | `--color-foreground-secondary` | `#737373` |
| Brand / interactive | `--color-brand` | Blue ramp |
| Border | `--color-border` | `#E0E0E0` |

### Typography (Inter font family)
| Style | Size | Weight | Use |
|---|---|---|---|
| Display/1 | 40px | Bold | — |
| Heading/1 | 28px | Bold | Page title "Your Latest News" |
| Heading/2 | 22px | Bold | Section headers |
| Heading/3 | 18px | Semi Bold | Article titles |
| Body/1 | 16px | Regular | Article description |
| Body/2 | 14px | Regular | Metadata, date/time |
| Label/1 | 12px | Semi Bold | Publisher name, tags |

### Spacing (4px base scale)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64`

---

## Figma → Code Workflow

### Required Flow (do not skip)

1. Run `get_design_context` on the specific node to implement
2. Run `get_screenshot` for visual reference
3. Translate the React + Tailwind output to project conventions
4. Map Figma colors → CSS variables / Tailwind tokens
5. Reuse existing components before creating new ones
6. Validate 1:1 against the Figma screenshot before marking complete

### Implementation Rules

- IMPORTANT: Only use components from the Simple Design System — do not introduce third-party UI libraries
- IMPORTANT: Never hardcode hex colors — always use SDS token variables
- Map every SDS color token to a corresponding Tailwind `theme.extend.colors` entry in `tailwind.config.js`
- Font is always `Inter` — load it from Google Fonts or bundle locally
- Cards use `fill` width inside their parent auto-layout container
- The newsfeed is a single scrollable `<main>` — do not paginate unless explicitly requested
- The Tag Toggle Group becomes a horizontally scrollable filter chip row (overflow-x: auto, no scrollbar visible)
- Each article item renders: thumbnail + title + description + publisher + timestamp

### Asset Handling

- IMPORTANT: If the Figma MCP server returns a localhost source for an image or SVG, use that source directly
- IMPORTANT: Do NOT install new icon packages — use icons provided in the SDS library
- Thumbnail images: use `object-fit: cover` inside a fixed-aspect container (e.g., 4:3 or 16:9)
- Placeholder images: use a `bg-gray-200` div until real images are wired up

---

## Newsfeed Screen — Article Data Shape

Each news article item must display:

```ts
interface Article {
  id: string;
  title: string;          // Bold headline
  description: string;    // 1–2 sentence excerpt
  thumbnail: string;      // Image URL (or placeholder)
  publisher: string;      // Publisher/source name (styled in brand color)
  publishedAt: string;    // ISO date string → display as "Today · 9:15 AM"
  category: string;       // Matches a Tag Toggle label
}
```

---

## Screen Architecture

```
Phone Shell (430×932, decorative)
└── Screen (390×844, clips content, overflow: vertical scroll)
    └── Scroll Content (VERTICAL auto-layout, HUGs height)
        ├── Status Bar (390×44)
        ├── Header (paddingH: 20, gap: 4)
        │   ├── "Your Latest News" — Inter Bold 28px
        │   └── Date string — Inter Regular 14px gray
        ├── Tag Toggle Group (SDS component, horizontal scroll)
        ├── Divider (1px, #E0E0E0)
        └── Article 1–10 (repeated)
            ├── Article Wrapper (VERTICAL, paddingH: 16)
            │   ├── Card instance (SDS, Image+Stroke+Horizontal, FILL width)
            │   └── Meta Row (HORIZONTAL, space-between)
            │       ├── Publisher — Inter Semi Bold 12px, brand blue
            │       └── "Today · HH:MM AM" — Inter Regular 12px gray
            └── Divider (1px, #E0E0E0)
```

---

## Figma Plugin API Notes (for use_figma calls)

- Always set `layoutSizingVertical = 'HUG'` AFTER `parent.appendChild(child)` for auto-layout children — not before
- Always set `layoutSizingHorizontal = 'FILL'` AFTER appending for full-width children
- When overriding text inside SDS component instances, use `setProperties()` with the exact property key (e.g. `'Heading#280:0'`) — not direct `node.characters` manipulation
- For text inside nested instances (e.g. Tag Toggle labels inside Tag Toggle Group), find the nested instance first, then call `setProperties()` on it
- The SDS Card `Body2` slot is of type `SLOT` — add children to it by appending to the slot frame node
- Colors are always in 0–1 range: `{ r: 0.80, g: 0.82, b: 0.85 }` not `{ r: 204, g: 209, b: 217 }`
- Font `Inter Semi Bold` uses the style string `"Semi Bold"` (with space) — not `"SemiBold"`

---

## Future Screens (Planned)

| Screen | Description |
|---|---|
| Article Detail | Full article reader with hero image, body text, related articles |
| Category Feed | Filtered feed for a single category |
| Settings | Dark mode toggle, notification preferences |
| Search | Search bar + results list |

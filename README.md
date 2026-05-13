# GC — Design System

A multi-axis design system for a WordPress classic theme.

## Current state

**M1 — Foundations.** Neutral primitives + minimal semantic layer, light/dark mode.

## File structure

```
tokens/
  primitives.css   Raw values (neutral ramp). Never referenced by components.
  semantic.css     What components consume. Mode handled via light-dark().
index.html         Living documentation site — open this in a browser.
```

## Viewing the system

Open `index.html` in any modern browser. No build step, no dependencies.

## Architecture

The system is designed around three axes that will be added incrementally:

| Axis | Decided by | Where it's set | Status |
|---|---|---|---|
| **Mode** (light/dark) | End user | Live toggle, `localStorage`, `<html data-mode>` | ✅ M1 |
| **Accent** (color theme) | Editor (per-post, on allowed formats) | `<body class="accent-*">` from WP custom field | ⏳ M2 |
| **Style** (how color is used) | Developer (per template/format) | `<body class="style-*">` set by template PHP | ⏳ M3 |

Tokens cascade: `Primitives → Accent → Style → Mode → Component`. Each layer adds one decision; no combinatorial explosion.

## CSS conventions

- **Primitives** use OKLCH for perceptually even scaling.
- **Mode** uses the native CSS `light-dark()` function. No duplicated `[data-mode]` blocks.
- **Components** reference only semantic tokens (`var(--bg)`, `var(--fg)`, …), never primitives.

## Roadmap

- **M1** Foundations ← *we are here*
- **M2** Accent axis (3 accents to start)
- **M3** Style axis (default / solid / tint / gradient)
- **M4** Typography system
- **M5** Component library
- **M6** Example WP templates
- **M7** Port to PHP / classic theme structure

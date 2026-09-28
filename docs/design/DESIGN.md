---
name: Modern Swiss Editorial
updatedAt: 2026-09-28
colors:
  background: "#131313"
  text-primary: "#e2e2e2"
  text-secondary: "#aaa4a5"
  border-subtle: "#4c4546"
  border-strong: "#988e90"
  accent: "oklch(74% 0.16 275)"
  accent-soft: "oklch(84% 0.09 275)"
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: clamp(64px, 9vw, 104px)
    fontWeight: "400"
    lineHeight: "0.95"
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: "400"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: -0.015em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  caption:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.5"
  label-mono:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.35"
    letterSpacing: 0.095em
  tag-mono:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: 0.035em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  section-gap: 120px
---

> `src/styles/tokens.css` is the source of truth for values. This document describes the intent behind them and was brought in line with the shipped site on 2026-09-27 (see `docs/DECISIONS.md`).

## Brand & Style

This design system is rooted in the **Swiss International Typographic Style**. It prioritizes objectivity, readability, and a strict adherence to a grid. The personality is technically confident, intellectual, and understated—designed to showcase senior-level engineering work without the distraction of "marketing" fluff.

The visual direction is **Minimalism** with an **Editorial** influence. It rejects the trend of soft shadows and rounded "bubbles" in favor of sharp lines, purposeful whitespace, and a high-contrast monochromatic base. A serif display face gives headings an editorial voice. The aesthetic should feel like a premium technical journal or a high-end architectural monograph: timeless, structured, and precise.

**Design Principles:**

- **Asymmetric Balance:** Use whitespace as a functional element to balance heavy typographic blocks.
- **Content as Interface:** Remove decorative containers; let the text and its alignment define the boundaries of the "UI."
- **Clarity over Decoration:** No gradients, no glassmorphism, and no decorative iconography.

## Colors

The palette is optimized for a high-contrast **Dark Mode** environment. The page canvas is `#131313`, and the interface sits directly on it. There are no separate surface fills; structure comes from 1px borders and spacing.

Colours are authored in OKLCH where a hue is involved, so accent tints keep consistent intensity. The accent is a periwinkle (`oklch(74% 0.16 275)`, about `#8ea0ff`), with a lighter `accent-soft` (`oklch(84% 0.09 275)`, about `#b9c6ff`) for links and secondary emphasis. Both pass WCAG AA on the canvas with wide margins.

**Usage Guidelines:**

- **Primary:** Backgrounds and structural foundations. In this dark theme, text defaults to high-contrast neutrals (whites/light grays).
- **Accent:** Interaction and orientation cues: links, focus, current navigation, markers, and the single filled primary action. Never used for large background fills.
- **Accent tints:** A 10% accent tint and a 42% accent border mark secondary actions and placeholder plates. Use them sparingly.
- **Neutral:** Shades of gray are used for secondary information and structural dividers (1px borders).
- **No gradients:** The page canvas is a flat fill. No gradient washes, in the background or on any component.

## Typography

Typography is the core of this design system. Three families, each with one role:

- **Newsreader** (serif) for headings, the header wordmark, and the project summary. It is not used for body copy.
- **IBM Plex Sans** for body text, intros, captions, and interface text.
- **IBM Plex Mono** for technical labels and metadata, to hint at the software engineering focus.

**Hierarchy Rules:**

- **Scale:** Use dramatic scale shifts (e.g., the display headline vs. body) to create hierarchy rather than color.
- **Alignment:** Stick to a rigorous left-aligned "ragged right" rag. Avoid justified text.
- **Spacing:** Headlines have tight line-heights (0.95–1.3) to feel like architectural blocks, while body text uses generous leading (1.6) for readability. Body measure is capped at 65ch.
- **Headings:** `h1` is the 48px serif page title (the home hero is larger). `h2` is the 24px serif title for a section or entry. Small mono labels are a separate style class and are not a heading level.
- **Mono Labels:** Use IBM Plex Mono, uppercase and tracked, only for categories, dates, eyebrows and tags: supplementary metadata, never the only carrier of essential information. Primary navigation, buttons, the project-page back link, continuation links, and section headings (Context, Problem, Role…) are essential UI text, not supplementary labels, and are set in IBM Plex Sans, sentence case, not all-caps mono.
- **Eyebrows:** Show an eyebrow above a heading only when it adds information the heading does not (for example the project type or the career period).

## Layout & Spacing

The layout uses a fixed **80rem (1280px) container** with a 32px gutter (16px on mobile). Content-specific grids sit inside it: a two-column Work index, and project and experience pages with a sticky section navigation in a narrow side column. Breakpoints are `56rem` and `40rem`. Columns collapse to a single column on mobile.

**Spacing Philosophy:**

- **The 8px Grid:** Margins and paddings are multiples of 8px, using the `--space-*` tokens. Small exceptions exist for compact elements (tag padding).
- **Vertical Rhythm:** Use massive `section-gap` values (120px) to separate distinct thoughts, allowing the content to breathe.
- **Rules:** Use thin 1px lines to guide the eye across the horizontal axis and separate sections.

## Elevation & Depth

This system avoids the concept of "z-index" shadows. Depth is achieved through **Tonal Layers** and **Bold Outlines**.

- **Flat Stack:** Elements do not float; they sit on the same plane or are separated by 1px solid borders.
- **High-Contrast Overlays:** Modals (the lightbox and the analytics dialog) are a solid canvas-coloured block with a sharp 1px `border-strong` outline over a dark backdrop. No blurs or soft shadows.
- **Rule Lines:** Use horizontal rules to separate sections. These should be 1px thick, providing a structural skeleton to the page that cuts through the dark background.

## Shapes

In keeping with the Swiss Style and technical precision, the roundedness is set to **0 (Sharp)**.

Every element—buttons, input fields, cards, and image containers—must have 90-degree corners. This reinforces the "grid" feel and distinguishes the portfolio from the consumer-grade "softness" of typical SaaS products.

## Components

**Buttons**

- Sharp corners, `label-mono` text, and a foreground/background pair with verified contrast. Three treatments:
  - **Primary:** solid accent fill with canvas-coloured text (one per view).
  - **Secondary:** accent tint with a 1px accent border and `accent-soft` text (header Contact, résumé download).
  - **Text action:** a mono label with a 1px accent underline rule.

**Inputs & Fields**

- Bottom-border only or a full 1px box. Labels use `label-mono` and sit above the field.
- Focus state is a 2px accent outline, offset from the element, on every focusable control.

**Cards & Containers**

- Avoid traditional cards with shadows. Instead, use "Grid Cells"—sections of the page defined by 1px borders or simply by their alignment to the column grid.
- **Work cards:** a 1px `border-subtle` outline that shifts to the accent border on hover or focus, with a typographic panel (the project name) in place of an image, then a serif title, summary, and tags. The whole card is one link.

**Lists**

- Use 1px rule lines between list items. Timelines and contact rows carry a small marker: a 12px square on the timeline (filled accent for the current role), and a 24×2 bar on contact rows.
- Project lists show a serif title with metadata (area, tags) in mono.
**Section navigation**

- A sticky side list on project and experience pages, with a 3px left bar that turns accent for the current section. It collapses to an inline row on narrow screens.

**Chips/Tags**

- Rectangular, 1px border, `tag-mono` text. Avoid background fills.

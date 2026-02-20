# Spline Brand Design Guidelines
> A comprehensive visual language reference for replicating or drawing inspiration from Spline.design's design system.

---

## 01 — Brand Overview

**Brand Name:** Spline  
**Tagline:** "The all-in-one platform for 3D and design"  
**Website:** https://spline.design  
**Product type:** Browser-based 3D design & collaboration platform  
**Aesthetic:** Dark-space premium · 3D-first · Motion-rich · Developer-adjacent

Spline's visual identity communicates creative power and futurism. The design language uses a jet-black canvas, vibrant chromatic accent colors, floating 3D geometric objects, and tight Inter typography to create a premium, immersive first impression.

---

## 02 — Color Palette

### Backgrounds & Surfaces

| Name         | Hex       | Usage                        |
|--------------|-----------|------------------------------|
| Void         | `#0A0A0A` | Primary page background      |
| Onyx         | `#111111` | Secondary background / nav   |
| Graphite     | `#161616` | Card surfaces                |
| Charcoal     | `#1E1E1E` | Hover / elevated card state  |
| Glass Stroke | `rgba(255,255,255,0.07)` | Borders, dividers, outlines |

### Text Colors

| Name            | Value                    | Usage                        |
|-----------------|--------------------------|------------------------------|
| Primary Text    | `#FFFFFF`                | Headlines, body copy         |
| Secondary Text  | `#A0A0A0`                | Subheadings, descriptions    |
| Muted Text      | `#555555`                | Labels, captions, metadata   |

### Accent Colors

| Name           | Hex       | Usage                             |
|----------------|-----------|-----------------------------------|
| Electric Blue  | `#3A7BFD` | Primary CTA, links, highlights    |
| Violet         | `#A855F7` | Gradient partner, badges          |
| Hot Pink       | `#EC4899` | Highlight accents, badges         |
| Neon Green     | `#22C55E` | Success states, active indicators |
| Solar Orange   | `#F97316` | Warmth, contrast pops             |
| Chrome Yellow  | `#EAB308` | Tags, secondary accents           |
| Cyan           | `#06B6D4` | Informational, cool accents       |

### Signature 3D Gradient Pairs (for floating objects / orbs)

Apply at **135° angle** between two high-saturation hues on a **matte dark base**:

```
Purple → Magenta:   #D946EF → #A855F7
Orange → Yellow:    #F97316 → #EAB308
Blue → Cyan:        #3A7BFD → #06B6D4
Green → Cyan:       #22C55E → #06B6D4
Pink → Orange:      #EC4899 → #F97316
Blue → Violet:      #3B82F6 → #A855F7
Green → Blue:       #22C55E → #3A7BFD
Pink → Violet:      #EC4899 → #A855F7
```

> **Rule:** Each 3D object uses exactly one gradient pair. Never use more than two hues per object. Objects always sit on `#0A0A0A` or a near-black base.

### Ambient Light / Radial Glow System

These radial gradients are layered over the black background to simulate studio lighting:

```css
/* Hero left glow — Electric Blue */
radial-gradient(ellipse 60% 50% at 20% 30%, rgba(58,123,253,0.12) 0%, transparent 70%)

/* Hero right glow — Violet */
radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168,85,247,0.10) 0%, transparent 70%)

/* Bottom atmospheric — Pink */
radial-gradient(ellipse 40% 40% at 50% 100%, rgba(236,72,153,0.08) 0%, transparent 70%)
```

---

## 03 — Typography

**Typeface:** [Inter](https://fonts.google.com/specimen/Inter) — exclusively  
**Import:** `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900`

### Type Scale

| Role        | Size  | Weight | Letter-spacing | Line-height | Color           |
|-------------|-------|--------|----------------|-------------|-----------------|
| Display     | 96px  | 900    | -0.04em        | 1.0         | White (gradient) |
| Heading 1   | 48px  | 800    | -0.03em        | 1.1         | `#FFFFFF`       |
| Heading 2   | 32px  | 700    | -0.02em        | 1.2         | `#FFFFFF`       |
| Subheading  | 20px  | 500    | -0.01em        | 1.4         | `#A0A0A0`       |
| Body        | 16px  | 400    | 0              | 1.6         | `#A0A0A0`       |
| Label / Tag | 11px  | 600    | +0.15em        | —           | `#3A7BFD`       |

### Display Headline Treatment

Large headlines (Display + H1) use a **white-to-faded gradient** clip:

```css
background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Section Labels

Always uppercase, small-caps style, Electric Blue, tight letter-spacing:

```
Format:  01 — SECTION NAME
Font:    Inter 600, 11px, letter-spacing: 0.15em, text-transform: uppercase
Color:   #3A7BFD
```

---

## 04 — Logo & Identity

### Logomark
A **conic-gradient sphere** representing infinite creative dimensions:

```css
background: conic-gradient(
  #3A7BFD 0deg,
  #A855F7 90deg,
  #EC4899 180deg,
  #22C55E 270deg,
  #3A7BFD 360deg
);
border-radius: 50%;
```

With a small **black circle cutout** at the center (approximately 40% of diameter).

### Wordmark
- Font: Inter 800
- Letter-spacing: -0.04em
- Color: `#FFFFFF` on dark backgrounds, `#000000` on white backgrounds

### Logo Usage Rules
- ✅ Use on `#0A0A0A` or pure white backgrounds only
- ✅ Minimum clearspace = height of the "S" glyph on all sides
- ✅ Keep conic gradient rotation exact — do not recolor the sphere
- ❌ Do not stretch, rotate, or recolor the wordmark
- ❌ Do not use on mid-tone grey backgrounds — contrast suffers
- ❌ Do not place drop shadows on the logomark

---

## 05 — UI Components

### Buttons

**Primary (White)**
```css
background: #FFFFFF;
color: #000000;
border-radius: 100px;      /* Full pill */
padding: 12px 24px;
font: 600 14px Inter;
/* Hover: scale(1.03) + box-shadow white glow */
```

**Accent (Gradient)**
```css
background: linear-gradient(135deg, #3A7BFD, #A855F7);
color: #FFFFFF;
border-radius: 100px;
padding: 12px 24px;
font: 600 14px Inter;
/* Hover: scale(1.03) + opacity 0.9 */
```

**Ghost (Outline)**
```css
background: transparent;
color: #FFFFFF;
border: 1px solid rgba(255,255,255,0.2);
border-radius: 100px;
padding: 12px 24px;
font: 500 14px Inter;
/* Hover: border-color rgba(255,255,255,0.5) + bg rgba(255,255,255,0.05) */
```

### Tags & Badges
```css
padding: 6px 14px;
border-radius: 100px;
font: 500 12px Inter;
border: 1px solid rgba(255,255,255,0.07);
background: #161616;
color: #A0A0A0;
```

Colored variant examples:
- Live: `color: #3A7BFD; border-color: rgba(58,123,253,0.3)`
- New: `color: #A855F7; bg: rgba(168,85,247,0.12)`
- Beta: `color: #EAB308; bg: rgba(234,179,8,0.12)`

### Border Radius Scale

| Token     | Value | Use case                    |
|-----------|-------|-----------------------------|
| `--r-sm`  | 8px   | Small chips, inputs         |
| `--r-md`  | 14px  | Cards, modals               |
| `--r-lg`  | 20px  | Large panels                |
| `--r-xl`  | 28px  | 3D object shapes, hero orbs |
| `--r-full`| 50%   | Logomark, avatars           |
| Pill      | 100px | All buttons and tags        |

### Cards / Glassmorphism
```css
background: rgba(22, 22, 22, 0.8);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 14px;
/* Hover: border-color rgba(255,255,255,0.15) + translateY(-2px) */
```

---

## 06 — Spacing System

**Base unit:** 8px  
**Rule:** All spacing values are multiples of 4 or 8.

| Token  | Value | Usage                         |
|--------|-------|-------------------------------|
| 2xs    | 4px   | Inner padding, icon gaps      |
| xs     | 8px   | Tight element spacing         |
| sm     | 12px  | Component inner padding       |
| md     | 16px  | Default gap between elements  |
| lg     | 24px  | Section sub-spacing           |
| xl     | 32px  | Component group spacing       |
| 2xl    | 48px  | Section padding               |
| 3xl    | 64px  | Large section gaps            |
| 4xl    | 80px  | Hero / page section padding   |

---

## 07 — Motion & Animation

**Philosophy:** Fast micro-responses, smooth deceleration. Never linear. Objects feel weightless.

### Easing Tokens

| Name        | Duration | Curve                            | Use Case                    |
|-------------|----------|----------------------------------|-----------------------------|
| Micro       | 150ms    | `ease-out`                       | Hover color/scale changes   |
| Standard    | 250ms    | `cubic-bezier(0.25, 0, 0, 1)`   | Element transitions         |
| Emphasis    | 400ms    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Enter animations (spring) |
| Reveal      | 600ms    | `ease`                           | Scroll-triggered reveals    |

### Stagger
Scroll-reveal elements stagger at **80ms** intervals between siblings.

### 3D Object Float
Floating objects in the hero use:
```css
animation: float 6s ease-in-out infinite alternate;
@keyframes float {
  from { transform: translateY(0px) rotate(0deg); }
  to   { transform: translateY(-20px) rotate(8deg); }
}
```

---

## 08 — Background Environments

### Primary Dark Canvas
```css
background: #0A0A0A;
```

### Hero with Ambient Lighting
```css
background:
  radial-gradient(ellipse 60% 50% at 20% 30%, rgba(58,123,253,0.12) 0%, transparent 70%),
  radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168,85,247,0.10) 0%, transparent 70%),
  radial-gradient(ellipse 40% 40% at 50% 100%, rgba(236,72,153,0.08) 0%, transparent 70%),
  #0A0A0A;
```

### Perspective Grid (Hero bottom)
```css
background:
  repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px),
  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px),
  #0A0A0A;
transform: perspective(500px) rotateX(45deg);
```

---

## 09 — Brand Voice & Tone

| Trait         | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| Empowering    | Puts creative power in the user's hands. Short, punchy commands.           |
| Direct        | No filler words. Headlines rarely exceed 6 words.                          |
| Visionary     | Frames 3D as the future of design, not a niche skill.                      |
| Collaborative | "Real-time collaboration" always front and center — designed for teams.    |
| Playful       | Floating objects, micro-animations, and 3D convey a sense of joy.          |
| Accessible    | "It's free" always lives next to the primary CTA — low barrier to entry.   |

### Copywriting Patterns

- **Hero headline:** Bold verb phrase + benefit. e.g. *"The all-in-one platform for 3D and design"*
- **CTAs:** Action-first + qualifier. e.g. *"Get started — it's free →"*
- **Feature blurbs:** One sentence, under 20 words, active voice.
- **Section headers:** Noun phrase or gerund. e.g. *"Collaborative 3D Design, ready for production"*

---

## 10 — Layout Principles

- **Max content width:** 1100px centered with `auto` margins
- **Grid:** 12-column, `gap: 24px`
- **Section vertical padding:** `80px` top and bottom
- **Hero min-height:** `100vh`, `flex` centered
- **Navbar height:** ~64px, sticky, semi-transparent blur background
- **Z-layers:** Canvas (0) → Background glows (1) → Content (2) → Floating 3D (3) → Nav (10) → Modal (100)

---

## 11 — CSS Custom Properties Reference

```css
:root {
  /* Backgrounds */
  --bg-primary:    #0a0a0a;
  --bg-secondary:  #111111;
  --bg-card:       #161616;
  --bg-card-hover: #1e1e1e;

  /* Borders */
  --border:        rgba(255,255,255,0.07);
  --border-hover:  rgba(255,255,255,0.15);

  /* Text */
  --text-primary:   #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted:     #555555;

  /* Accent Colors */
  --accent-blue:   #3a7bfd;
  --accent-purple: #a855f7;
  --accent-pink:   #ec4899;
  --accent-green:  #22c55e;
  --accent-orange: #f97316;
  --accent-yellow: #eab308;
  --accent-cyan:   #06b6d4;

  /* Border Radius */
  --radius-sm:  8px;
  --radius-md:  14px;
  --radius-lg:  20px;
  --radius-xl:  28px;

  /* Motion */
  --ease-micro:    150ms ease-out;
  --ease-standard: 250ms cubic-bezier(0.25, 0, 0, 1);
  --ease-spring:   400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-reveal:   600ms ease;
}
```

---

## 12 — LLM Prompt Starter

Use the following as a system prompt when generating UI inspired by Spline:

```
You are designing a dark-mode web UI inspired by Spline.design's visual language.

Key rules:
- Background: #0A0A0A (near-black void), not pure black
- Accent colors: Electric Blue #3A7BFD (primary), Violet #A855F7, Hot Pink #EC4899
- All text: Inter typeface only, weights 400–900
- Headlines: font-weight 800–900, letter-spacing -0.03em to -0.04em
- Buttons: full pill shape (border-radius 100px), white-filled primary or gradient accent
- Cards: background #161616, border rgba(255,255,255,0.07), border-radius 14px
- Add radial gradient ambient glows behind hero (blue left, purple right, ~10-12% opacity)
- Floating 3D accent shapes: rounded squares/hexagons with bicolor gradient fills
- Motion: hover scale(1.03), transitions 150–250ms, never linear easing
- Section labels: 11px, Inter 600, uppercase, letter-spacing 0.15em, color #3A7BFD
- Spacing: 8px base grid, section padding 80px vertical, max-width 1100px
- Brand voice: direct, empowering, short sentences, "it's free" near every CTA
```


---

## 13 — Work & Showcase

The Spline community platform presents user-generated 3D work in a **filterable card grid**. This section documents the layout pattern, card anatomy, and the 9 official use-case categories.

### 9 Use-Case Categories

| Category                  | Accent Color        | Typical Gradient Shape  |
|---------------------------|---------------------|--------------------------|
| Interactive Websites       | Electric Blue `#3A7BFD` | Rounded square       |
| Product Design             | Violet `#A855F7`    | Sphere / circle          |
| Brand & Marketing          | Hot Pink `#EC4899`  | Rounded square, rotated  |
| Gamified Experiences       | Neon Green `#22C55E`| Triangle / polygon        |
| 3D Mockups                 | Solar Orange `#F97316` | Flat rectangle (device)|
| 3D Logos                   | Chrome Yellow `#EAB308` | Rounded square + star |
| Animated Characters        | Cyan `#06B6D4`      | Circle with emoji/face   |
| 3D Icons                   | Violet `#A855F7`    | Row of small rounded sq. |
| Industrial & Manufacturing | Slate `#64748B`     | Flat rect in perspective |

### Card Anatomy

```
┌───────────────────────────────┐
│  [Thumbnail 180px height]      │  ← radial glow bg + gradient 3D shape
│    [Overlay on hover]          │  ← gradient-to-top, rgba(0,0,0,0.7)
├───────────────────────────────┤
│  CATEGORY LABEL               │  ← 10px / 600 / uppercase / #555
│  Card Title                   │  ← 14px / 700 / letter-spacing -0.01em
│  @authorhandle                │  ← 12px / #555 with @handle in #3A7BFD
└───────────────────────────────┘
```

### Card CSS Specs

```css
/* Work Card */
border-radius: 20px;               /* --radius-lg */
border: 1px solid rgba(255,255,255,0.07);
background: #161616;
overflow: hidden;
transition: border-color 0.2s,
            transform 0.25s cubic-bezier(0.25,0,0,1),
            box-shadow 0.25s;

/* Hover state */
border-color: rgba(255,255,255,0.15);
transform: translateY(-6px);
box-shadow: 0 24px 48px rgba(0,0,0,0.5);

/* Thumbnail area */
height: 180px;
background: radial-gradient(ellipse at [x%] [y%], rgba([accent],0.2) 0%, transparent 60%),
            linear-gradient(135deg, [tinted-dark], #0a0a0a);

/* Floating 3D shape — on hover */
transform: scale(1.15) rotate(10deg);
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);  /* spring */

/* Hover overlay */
position: absolute;
inset: 0;
background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
opacity: 0 → 1 on card hover;
```

### Grid Layout

```css
display: grid;
grid-template-columns: repeat(3, 1fr);   /* desktop */
gap: 16px;

/* Responsive breakpoints */
@media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
@media (max-width: 480px) { grid-template-columns: 1fr; }
```

### Category Filter Pills

Horizontally scrollable row of pill-shaped toggle buttons above the grid:

```css
/* Default state */
padding: 7px 16px;
border-radius: 100px;
font: 500 12px Inter;
border: 1px solid rgba(255,255,255,0.07);
background: #161616;
color: #A0A0A0;

/* Active / hover state */
border-color: #3A7BFD;
color: #3A7BFD;
background: rgba(58,123,253,0.08);
```

### Thumbnail Shape per Category

Each category uses a **unique 3D primitive** centered in the thumbnail:

| Category              | Shape                     | Example CSS                                 |
|-----------------------|---------------------------|---------------------------------------------|
| Interactive Websites  | Rounded rect, rotated     | `border-radius: 28px; transform: rotate(-8deg)` |
| Product Design        | Full circle               | `border-radius: 50%`                        |
| Brand & Marketing     | Rounded sq, rotated 12°   | `border-radius: 20px; transform: rotate(12deg)` |
| Gamified Experiences  | Polygon / triangle        | `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)` |
| 3D Mockups            | Wide flat rect, 3D rotated| `transform: perspective(200px) rotateY(-15deg)` |
| 3D Logos              | Rounded sq with glyph     | `border-radius: 18px` + star symbol         |
| Animated Characters   | Circle with emoji         | `border-radius: 50%` + character emoji      |
| 3D Icons              | Row of 3 small squares    | Three `44×44px border-radius: 12px` divs   |
| Industrial            | Flat rect, X-axis tilt    | `transform: perspective(200px) rotateX(10deg)` |

### LLM Prompt Addition — Work Section

Append this to the Section 12 LLM Prompt Starter for work/portfolio grid generation:

```
Work/showcase grid:
- 3-column grid (gap: 16px), responsive to 2-col then 1-col
- Each card: dark bg (#161616), border rgba(255,255,255,0.07), border-radius 20px
- Thumbnail 180px tall with a centered gradient 3D shape + matching radial glow bg
- On hover: card lifts (translateY -6px), dark gradient overlay appears, 3D shape springs (scale 1.15 + rotate 10deg)
- Card info: category label (10px uppercase muted), title (14px bold), author (@handle in blue)
- Filter pills above grid: pill buttons that turn blue-tinted on active state
- 9 categories, each with its own accent color and unique 3D shape
```

---

*Generated from visual analysis of spline.design · February 2025*

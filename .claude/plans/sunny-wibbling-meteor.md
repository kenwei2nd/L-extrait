# Context

Two problems:

1. **White flash between hero and About**: Hero's `bottomGradient` fades `transparent → var(--paper)` (white). About then has a `topFade` that fades `paper → ink`. Result: a white band sandwiched between two dark sections — jarring, not immersive.

2. **About and Globe feel disconnected**: Separate components with separate backgrounds. The user wants them blended into one continuous dark cinematic experience.

**Solution**: Fix the hero gradient endpoint to ink. Merge About + Globe into a single `DarkSection` component with one shared background, one starfield canvas, and one ink→paper transition at the very end.

---

# Architecture

## Page flow (after changes)

```
<HeroSection />      dark canvas, epilogue, CTA, fades to --ink
<DarkSection />      ONE unified dark section:
                       ├── Starfield canvas (z:0, covers everything)
                       ├── About content (z:1) — headline, stats, marquee, cards
                       └── Globe content (z:1) — eyebrow, headline, globe
                       └── bottomFade (ink → paper, 32vh)
<ShowcaseSection />  paper/light
```

---

# Changes

## 1. Fix hero transition → `var(--ink)`

**File:** `src/components/sections/Hero/HeroSection.module.css`

Change `.bottomGradient`:
```css
background: linear-gradient(to bottom, transparent 0%, var(--ink) 100%);
```

The canvas last frame dissolves into the same dark ink as DarkSection — no white flash.

---

## 2. Create `DarkSection.jsx`

**File:** `src/components/sections/Dark/DarkSection.jsx`

Single component containing all About + Globe content. Structure:

```jsx
<section className={styles.dark}>
  <Starfield />                   {/* absolute canvas, z:0 */}

  {/* — ABOUT BLOCK — */}
  <div className={styles.aboutBlock}>
    eyebrow / huge scrubbed headline / word-stagger body /
    stats row / marquee ticker / 2×2 cards
  </div>

  {/* — GLOBE BLOCK — */}
  <div className={styles.globeBlock}>
    eyebrow / headline / interactive globe (fullscreen width)
  </div>

  <div className={styles.bottomFade} />  {/* ink → paper */}
</section>
```

### Starfield

Canvas drawn once on mount. Uses a `mask-image` linear gradient so:
- Stars are *invisible* behind the About content at the top
- Stars *fade in* at ~50% down (where About ends / Globe begins)
- Stars are *fully visible* through the Globe area

```css
.starfield {
  mask-image: linear-gradient(to bottom, transparent 0%, black 55%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 55%);
}
```

This means the cards/headline render on a clean dark surface, and the universe gradually appears as you scroll toward the globe — seamless blend.

### Background

Single gradient for entire DarkSection:
```css
background: linear-gradient(
  to bottom,
  var(--ink) 0%,       /* same as hero exit */
  #070d18 60%,         /* starts going space-blue */
  #030608 100%         /* deep space at globe */
);
```

No breaks, no topFade strips, no paper flash.

### Globe sizing

Globe fills the full width of the viewport: `width: 100vw, height: 100vw` (capped to avoid excessive height). Centered with `margin: 0 auto`.

### Auto-rotate + rings

Carry over from current GlobeSection:
- `controls().autoRotate = true`, `autoRotateSpeed = 0.55`
- `controls().enableZoom = false`
- `ringsData` pulsing amber rings on city markers

### Scroll animations inside DarkSection

About headline: scroll-scrubbed opacity (same as current AboutSection — `scrub: 1.8`, `start: 'top 95%'`, `end: 'center 40%'`)

Globe: fade+scale on scroll entry (same as current GlobeSection)

Cards: alternating x-entry (same as current)

Stats counters: count-up on enter (same as current)

---

## 3. Create `DarkSection.module.css`

Key rules:

```css
.dark {
  position: relative;
  background: linear-gradient(to bottom, var(--ink) 0%, #070d18 60%, #030608 100%);
  color: var(--paper);
  overflow: hidden;
}

.starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  mask-image: linear-gradient(to bottom, transparent 0%, black 55%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 55%);
}

.aboutBlock {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px);
}

.globeBlock {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(40px, 6vh, 80px) clamp(24px, 6vw, 80px) 0;
}

.globeWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: clamp(-20px, -2vh, 0px);
}

.bottomFade {
  position: relative;
  z-index: 2;
  height: 32vh;
  background: linear-gradient(to bottom, transparent, var(--paper));
  pointer-events: none;
}
```

---

## 4. Update `App.jsx`

```jsx
import DarkSection from '@components/sections/Dark/DarkSection'

<main>
  <HeroSection />
  <DarkSection />
  <ShowcaseSection />
</main>
```

Remove `AboutSection` and `GlobeSection` imports.

---

## 5. Delete old files (or keep for reference)

`AboutSection.jsx`, `AboutSection.module.css`, `GlobeSection.jsx`, `GlobeSection.module.css` can be removed from App but kept as files.

---

# Critical files

| File | Action |
|---|---|
| `src/components/sections/Hero/HeroSection.module.css` | Change `.bottomGradient` endpoint to `var(--ink)` |
| `src/components/sections/Dark/DarkSection.jsx` | **new** — merged About + Globe |
| `src/components/sections/Dark/DarkSection.module.css` | **new** |
| `src/App.jsx` | Swap About+Globe imports for DarkSection |

---

# Verification

1. `npm run dev`
2. Load page — hero loads, scrubs through frames
3. Scroll past hero pin — canvas dissolves to dark ink, About content appears with no white flash
4. Headline materializes as you scroll (scrubbed opacity)
5. Stats count up, marquee runs, cards enter from alternating sides
6. Continue scrolling — stars gradually appear behind the lower cards
7. Globe becomes full visible: auto-rotating, rings pulsing, arcs animated
8. Globe bottom dissolves to paper — Showcase appears seamlessly

# Redesign: Video Intro + Section Reorder + Layered Deconstruction

## Context

The current site opens directly into a 500vh scroll-pinned Hero (sneaker variations carousel). The user wants to reframe the entry experience: a cinematic video introduction becomes the new first section, the existing Hero is demoted to second, and the third section is reimagined as a scroll-driven deconstruction of the shoe that hands off to a blueprint video.

This plan is **planning only** — no code is written yet. It covers two pieces:

1. **Section 1 — Video intro** (replaces current page entry)
2. **Section 3 — Layered deconstruction → blueprint** (replaces or absorbs current Tech/Materials slot)

The user is producing the video assets. Critically: the **last frame of the intro video is designed to be a wallpaper that visually becomes the Hero's starting state**, so the handoff from video → Hero must be seamless (no flash, no jump cut).

---

## Current Architecture (relevant)

- [app/page.tsx](app/page.tsx) — renders `<Hero />` then `<Features />`
- [components/hero/Hero.tsx](components/hero/Hero.tsx) — 500vh pinned hero (5 sneaker variations, ambient R3F canvas, atmospheric layers)
- [components/sections/Features.tsx](components/sections/Features.tsx) — orders 7 sections: Tech → Materials → Performance → Gallery → Designer → Sustainability → CTA
- [lib/sections.ts](lib/sections.ts) — section metadata (label "01 / 07" through "07 / 07", bg colors, glow accents, snapIndex 5–11)
- [hooks/useHeroWheelSnap.ts](hooks/useHeroWheelSnap.ts) — global wheel-snap that uses `snapIndex` (0–4 hero variations, 5–11 sections)

---

## Section 1 — Video Intro

### Behavior
- New first section on the page, sits **above** the Hero in DOM order.
- Full-viewport (`100vh`, full-bleed, no padding/letterbox).
- **Autoplay muted, plays once, no loop.** Required for browser autoplay policy: `muted`, `playsInline`, `autoplay`, `preload="auto"`.
- No overlays — no logo, no skip button, no scroll cue. Pure video.
- The video freezes on its last frame (native `<video>` behavior when `loop={false}`). That last frame is authored by the user to match the Hero's opening wallpaper, so the visual transition to Hero looks like a single continuous image when the user scrolls.
- Section is **not pinned** — it occupies a normal `100vh` slot. Scrolling down past it reveals the Hero immediately beneath, and because the last frame matches the Hero's bg, the transition reads as seamless.

### File plan
- New component: `components/intro/IntroVideo.tsx` — single `<section>` with a full-bleed `<video>` element, `object-fit: cover`, fixed aspect handled by the video file itself.
- Update [app/page.tsx](app/page.tsx) to render `<IntroVideo />` before `<Hero />`.
- **Asset already provided** by user: [Hero video/hf_20260516_085410_949327f0-eb16-4da0-8d18-3a1299ce1309.mp4](Hero video/hf_20260516_085410_949327f0-eb16-4da0-8d18-3a1299ce1309.mp4). It currently sits at the repo root, not under `public/`, so Next.js cannot serve it directly. Implementation step: move/copy it into `public/intro.mp4` (rename for clean URL) and reference via `src="/intro.mp4"`. The original folder can stay as source-of-truth or be deleted after the copy.

### Open considerations (decide at implementation time)
- **Wheel-snap interaction**: The existing `useHeroWheelSnap` hook treats hero variation 0 as snap index 0. With a video section now occupying the first viewport, we need to either (a) add the video as snap index 0 and shift everything up by one, or (b) leave the video outside the snap system entirely (free-scroll past it, snap takes over once Hero is in view). Option (b) is simpler and preserves the existing snap math.
- **Replay control**: If the user reloads or returns via back button, the video plays again. Acceptable per current spec — no skip/replay UI requested.
- **Mobile**: `playsInline` is mandatory on iOS to prevent fullscreen takeover. Aspect ratio of the user's video should be confirmed (16:9? 9:16? square?) so we know whether `object-fit: cover` will crop on portrait phones.
- **Loading**: A poster image (the first frame, exported as a still) should be set on the `<video>` so there's no black flash before playback starts.

---

## Section 3 — Layered Deconstruction → Blueprint

### Concept (per user)
Reference imagery: a real sneaker exploded into stacked layers (midsole, plate, outsole, upper) with callout labels, then morphing into a technical blueprint of the same layers (line-art, grid background, highlighted components).

The user will produce the **blueprint as a video/gif** (single frame animation). The deconstruction itself (the exploded photo with callouts) is the scroll-driven piece we build.

### Behavior
- This section replaces the current `MaterialsSection` (and likely absorbs the role of `TechSection`, since both currently cover "what's inside the shoe" — TBD with user before implementation).
- Pinned section, taller than 100vh (proposed: ~250vh) so scroll progress drives the deconstruction.
- Scroll phases:
  1. **Phase A (0–40%)** — Whole sneaker centered. Callout labels are hidden.
  2. **Phase B (40–75%)** — Sneaker layers separate vertically (upper rises, midsole drifts up, plate stays, outsole drops). Callout labels (e.g. "ENERGYRODS", "LIGHTSTRIKE PRO", "SLINGLAUNCH HEEL") fade in with connector lines, matching reference image 1.
  3. **Phase C (75–100%)** — Photo layers cross-fade into the blueprint video/gif (line-art version, grid bg, highlighted parts), matching reference image 2. Blueprint video plays once during this phase.
- Section ends, page continues to next section (Performance? Gallery? — TBD pending overall section order decision).

### File plan
- Replace [components/sections/materials/MaterialsSection.tsx](components/sections/materials/MaterialsSection.tsx) with a new design, OR create a new `components/sections/deconstruction/` folder and remove the old materials section from `Features.tsx`.
- New component: `DeconstructionSection.tsx` — pinned scroll container, GSAP timeline tied to scroll progress.
- Sub-pieces: `LayeredShoe.tsx` (stacked PNG layers with individual transforms), `Callouts.tsx` (label + connector line per part), `BlueprintVideo.tsx` (cross-fade target, plays once).
- Update [lib/sections.ts](lib/sections.ts) to renumber labels (was "02 / 07", will likely become "01 / 06" or similar depending on final section count) and adjust `snapIndex` chain.
- Update [components/sections/Features.tsx](components/sections/Features.tsx) to swap Materials for Deconstruction (and decide Tech section's fate).

### Asset checklist (user provides)
- One PNG per shoe layer (upper, midsole, plate, outsole — transparent bg, aligned to same anchor so they stack cleanly).
- Blueprint video/gif (mp4 + webm preferred). Should match the layered shoe's silhouette so the cross-fade lands cleanly.
- Optional: the assembled hero photo of the whole sneaker (Phase A) — could be composed from the same layer PNGs.

### Open considerations
- **Tech section overlap**: Current `TechSection` already does "shoe + tech callouts" with cyan accents. The new deconstruction section covers similar ground. Decision needed: drop Tech entirely, or keep it as a separate "specs" section before/after deconstruction.
- **Layer count**: Reference image 1 shows ~6 layers. The user should confirm how many parts they'll deliver.
- **Performance**: Scroll-pinned animations with multiple PNG layers are GPU-cheap, but the blueprint video on top must be preloaded so the cross-fade is instant. Consider `preload="auto"` and starting the `<video>` paused at frame 0.
- **Reduced motion**: For users with `prefers-reduced-motion`, fall back to a single static composite image of the deconstruction + blueprint side-by-side.

---

## Critical Files To Modify (when implementation begins)

| File | Change |
|------|--------|
| [app/page.tsx](app/page.tsx) | Add `<IntroVideo />` before `<Hero />` |
| [components/intro/IntroVideo.tsx](components/intro/IntroVideo.tsx) | **New** — full-bleed video, autoplay muted, plays once |
| [components/sections/deconstruction/DeconstructionSection.tsx](components/sections/deconstruction/DeconstructionSection.tsx) | **New** — pinned scroll-driven layered shoe → blueprint |
| [components/sections/Features.tsx](components/sections/Features.tsx) | Swap `MaterialsSection` (and possibly `TechSection`) for `DeconstructionSection` |
| [lib/sections.ts](lib/sections.ts) | Renumber labels and `snapIndex` to match new section count |
| [hooks/useHeroWheelSnap.ts](hooks/useHeroWheelSnap.ts) | Verify snap chain still works after section count changes |
| `public/intro.mp4` | **Move asset** — copy from `Hero video/hf_20260516_085410_*.mp4` (already provided by user) into `public/intro.mp4` so Next.js serves it |
| `public/deconstruction/*.png` and `public/blueprint.mp4` | **New assets** — user provides |

---

## Verification Plan (when built)

1. Hard reload `/` → video autoplays muted, plays once, freezes on last frame.
2. Scroll down once → Hero appears with no visible jump (last video frame matches Hero opening state).
3. Continue scrolling through Hero's 500vh → existing 5-variation experience unchanged.
4. Scroll into Section 3 → shoe layers separate over scroll, callouts fade in, then blueprint video cross-fades in and plays once.
5. Test on mobile Safari (`playsInline` autoplay), Chrome desktop, Firefox.
6. Test `prefers-reduced-motion` → static fallbacks render.
7. Check Lighthouse performance — video preload should not block LCP; consider lazy-loading the blueprint video until just before Phase C.

---

## Out of Scope (this plan)

- Sections 4–8 (Performance, Gallery, Designer, Sustainability, CTA) redesign — user said redesign goes "one section at a time"; we'll plan those in future rounds.
- Final motion timing curves and exact animation values for Section 3 — to be tuned during implementation with the real assets in hand.
- Producing the video assets themselves — user is creating them.

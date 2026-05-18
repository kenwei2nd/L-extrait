---
name: Aether site structure
description: Current section order and key implementation details for the Aether luxury aviation website
type: project
originSessionId: 67629819-524a-42db-a043-f1cd8957a310
---
React + Vite + GSAP + Lenis + Zustand project at c:\CLAUDE\Aether\aether-1

**Section order (App.jsx):**
1. HeroSection — canvas frame-sequence (274 WebP frames), pinned 600% scroll. Epilogue phase (last 1/3) freezes last frame + reveals placeholder text + bottomGradient (transparent→paper).
2. AboutSection — dark ink background, topFade strip (paper→ink). Clip-path line reveals, animated stat counters (5000/150/24), CSS marquee ticker, 2×2 card grid with alternating x-entry.
3. GlobeSection — dark ink, interactive react-globe.gl globe with 10 flight arcs between luxury cities. Country polygons from world-atlas. bottomFade (ink→paper).
4. ShowcaseSection — paper background, 3-col aircraft layout (left headline / SVG silhouette / right model info) + spec grid.

**Why:** Seamless cinematic scroll experience inspired by jeskojets.com.

**Key deps added:** react-globe.gl, world-atlas, topojson-client

**Hero gradient endpoint:** var(--paper) — AboutSection::topFade handles paper→ink transition.

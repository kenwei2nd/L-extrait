import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export function getLenis() {
  return lenis
}

/**
 * Initialize a Lenis smooth-scroll instance and wire it to GSAP's
 * ScrollTrigger so every pinned/scrubbed timeline stays in sync.
 *
 * Returns a cleanup function for use inside React effects.
 */
export function createSmoothScroll() {
  if (lenis) return () => {}

  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.0,
    smoothWheel: true,
  })

  // Bridge Lenis -> ScrollTrigger so pinned timelines scrub correctly.
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis from GSAP's ticker (single rAF loop for both).
  const tickerCallback = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  // Recalculate triggers on resize.
  const onResize = () => ScrollTrigger.refresh()
  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
    gsap.ticker.remove(tickerCallback)
    ScrollTrigger.getAll().forEach((t) => t.kill())
    lenis.destroy()
    lenis = null
  }
}

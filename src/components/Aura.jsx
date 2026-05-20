import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Aura.css'

const ASSETS = {
  one:   '/assets/aura-1.png',
  two:   '/assets/aura-2.png',
  three: '/assets/aura-3.png',
  four:  '/assets/concentration-bg.mp4',
}

export default function Aura() {
  const sectionRef = useRef(null)
  const asset1Ref  = useRef(null)
  const asset2Ref  = useRef(null)
  const asset3Ref  = useRef(null)
  const asset4Ref  = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      })

      tl.to(asset1Ref.current, { yPercent: -15, ease: 'none' }, 0)
      tl.to(asset2Ref.current, { yPercent: -30, ease: 'none' }, 0)
      tl.to(asset3Ref.current, { yPercent: -20, ease: 'none' }, 0)
      tl.to(asset4Ref.current, { yPercent: -10, ease: 'none' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="aura">
      <div className="aura__grid">

        {/* ── Left: sticky narrative ── */}
        <div className="aura__left">
          <span className="aura__eyebrow">THE CAMPAIGN</span>

          <h2 className="aura__headline">
            Leave Your<br />Mark.
          </h2>

          <p className="aura__body">
            More than a transient scent, the Extrait is a lasting imprint. Its unparalleled oil
            concentration ensures an intimate bond, gradually disclosing its complex architecture
            only through patience and deliberate wear.
          </p>
          <p className="aura__body">
            Experience the unfolding. The very mechanics of this extended interaction mirror the
            physical weight and enduring presence of the fragrance on your skin. Sillage is not
            instant; it is built.
          </p>

          <button className="aura__cta" type="button">
            <span className="aura__cta-label">Acquire the Extrait</span>
            <span className="aura__cta-glyph" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeOpacity="0.85" />
                <path
                  d="M10 4.5 L11.1 8.9 L15.5 10 L11.1 11.1 L10 15.5 L8.9 11.1 L4.5 10 L8.9 8.9 Z"
                  fill="currentColor"
                  fillOpacity="0.9"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* ── Right: 400vh parallax canvas ── */}
        <div className="aura__right">

          {/* Asset 1 — portrait, upper left, skin/intimacy */}
          <div ref={asset1Ref} className="aura__asset aura__asset--1">
            <img src={ASSETS.one} alt="" aria-hidden="true" loading="lazy" />
          </div>

          {/* Asset 2 — wide cinematic, center right, overlaps Asset 1 */}
          <div ref={asset2Ref} className="aura__asset aura__asset--2">
            <img src={ASSETS.two} alt="" aria-hidden="true" loading="lazy" />
          </div>

          {/* Asset 3 — small square, floating in negative space */}
          <div ref={asset3Ref} className="aura__asset aura__asset--3">
            <img src={ASSETS.three} alt="" aria-hidden="true" loading="lazy" />
          </div>

          {/* Asset 4 — massively tall video loop near bottom, slow reveal */}
          <div ref={asset4Ref} className="aura__asset aura__asset--4">
            <video
              src={ASSETS.four}
              autoPlay
              muted
              playsInline
              loop
              aria-hidden="true"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Aura.css'

const CARDS = [
  {
    id: 1,
    src: '/assets/aura-1.png',
    label: 'ASSET 01 — The First Trace',
    parallax: -10,
  },
  {
    id: 2,
    src: '/assets/aura-2.png',
    label: 'ASSET 02 — Intimate Diffusion',
    parallax: -28,
  },
  {
    id: 3,
    src: '/assets/aura-3.png',
    label: 'ASSET 03 — The Lasting Bond',
    parallax: -42,
  },
  {
    id: 4,
    src: '/assets/aura-portrait.mp4',
    label: 'ASSET 04 — Endless Sillage',
    parallax: -16,
    isVideo: true,
  },
]

export default function Aura() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const body1Ref = useRef(null)
  const body2Ref = useRef(null)
  const ctaRef = useRef(null)
  const chapterRef = useRef(null)
  const cardRefs = useRef([])

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Differential parallax on each card across the whole section.
      // Last ref slot is the backdrop, parallaxes slowest (background plane).
      const parallaxRates = [...CARDS.map((c) => c.parallax), -4]
      if (!reduced) {
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          gsap.to(el, {
            yPercent: parallaxRates[i],
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        })
      }

      // Narrative reveals — scrubbed as the section enters
      const narrativeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 10%',
          scrub: 1,
        },
      })
      narrativeTl
        .to(
          eyebrowRef.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2, ease: 'power2.out' },
          0
        )
        .to(
          headlineRef.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' },
          0.1
        )
        .to(
          body1Ref.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' },
          0.35
        )
        .to(
          body2Ref.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' },
          0.55
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' },
          0.75
        )

      // Chapter mark at section bottom fades in as user nears the end
      gsap.to(chapterRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 90%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="aura">
      {/* Lifestyle backdrop — full-width banner; lives OUTSIDE the grid
          so it can span the entire screen, not just the right column.
          A left-side darkening gradient keeps the narrative readable. */}
      <div
        ref={(el) => (cardRefs.current[CARDS.length] = el)}
        className="aura__backdrop"
        aria-hidden="true"
      >
        <img
          className="aura__backdrop-media"
          src="/assets/aura-lifestyle.png"
          alt=""
          loading="lazy"
        />
        <div className="aura__backdrop-shade" />
        {/* Brand statement overlaid on the lifestyle image */}
        <div className="aura__brand">
          <span className="aura__brand-eyebrow">Reimagine Sexy</span>
          <h3 className="aura__brand-mark">L&rsquo;Extrait.</h3>
        </div>
      </div>

      <div className="aura__grid">
        {/* ── Left: sticky narrative ── */}
        <div className="aura__left">
          <div className="aura__left-inner">
            <span ref={eyebrowRef} className="aura__eyebrow">
              THE CAMPAIGN
            </span>

            <h2 ref={headlineRef} className="aura__headline">
              Leave Your<br />Mark.
            </h2>

            <p ref={body1Ref} className="aura__body">
              More than a transient scent, the Extrait is a lasting imprint. Its
              unparalleled oil concentration ensures an intimate bond, gradually
              disclosing its complex architecture only through patience and
              deliberate wear.
            </p>
            <p ref={body2Ref} className="aura__body">
              Experience the unfolding. The very mechanics of this extended
              interaction mirror the physical weight and enduring presence of the
              fragrance on your skin. Sillage is not instant; it is built.
            </p>

            <button ref={ctaRef} className="aura__cta" type="button">
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
        </div>

        {/* ── Right: tall overlap-mosaic canvas ── */}
        <div className="aura__right">
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`aura__card aura__card--${card.id}`}
            >
              <span className="aura__card-label">{card.label}</span>
              {card.isVideo ? (
                <video
                  className="aura__card-media"
                  src={card.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
              ) : (
                <img
                  className="aura__card-media"
                  src={card.src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Closing finale — section title + final CTA at the very bottom */}
      <div ref={chapterRef} className="aura__finale">
        <span className="aura__chapter-title">The Aura</span>
        <button className="aura__cta aura__cta--finale" type="button">
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
    </section>
  )
}

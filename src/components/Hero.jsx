import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const videoRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Trigger the reveal class on the next frame so CSS transitions kick in.
  // Actual timing lives in the per-element transition-delay values in Hero.css.
  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Hold the video on its very last frame when it ends
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onEnded = () => {
      try {
        v.currentTime = Math.max(0, v.duration - 0.03)
        v.pause()
      } catch {}
    }
    v.addEventListener('ended', onEnded)
    return () => v.removeEventListener('ended', onEnded)
  }, [])

  return (
    <section className={`hero ${revealed ? 'is-revealed' : ''}`}>
      {/* z-0: background video — plays once, holds on last frame */}
      <video
        ref={videoRef}
        className="hero__video"
        src="/assets/hero-bg.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className="hero__vignette" aria-hidden="true" />

      {/* z-10: wordmark */}
      <h1 className="hero__wordmark">
        <span className="hero__wordmark-inner">L&rsquo;EXTRAIT</span>
      </h1>

      {/* z-20: product bottle (with reflection baked in) */}
      <div className="hero__product-wrap">
        <img
          className="hero__product"
          src="/assets/product-reflected.png"
          alt="Aurelia L'Extrait perfume bottle"
        />
      </div>

      {/* z-30: UI layer */}
      <nav className="hero__nav">
        <button className="hero__nav-link" type="button">MENU</button>
        <button className="hero__nav-link" type="button">SHOP</button>
      </nav>

      <aside className="hero__rail hero__rail--left" aria-hidden="true">
        <span className="hero__divider" />
        <p className="hero__rail-text">
          A world of<br />olfactory<br />resonance
        </p>
      </aside>

      <aside className="hero__rail hero__rail--right" aria-hidden="true">
        <p className="hero__rail-text hero__rail-text--vertical">
          AURELIA NICHE PARFUMS
        </p>
        <span className="hero__divider" />
      </aside>

      <button className="hero__cta" type="button">
        <span className="hero__cta-label">Experience the Scent</span>
        <span className="hero__cta-glyph" aria-hidden="true">
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
    </section>
  )
}

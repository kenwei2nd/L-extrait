import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '../lib/scroll.js'
import './Concentration.css'

export default function Concentration() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const loopFadeRef = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef = useRef(null)

  // Seamless restart: fade overlay to black in the final ~0.4s,
  // reset the video to start, then fade the overlay back out.
  useEffect(() => {
    const v = videoRef.current
    const overlay = loopFadeRef.current
    if (!v || !overlay) return

    const FADE_WINDOW = 0.45 // seconds before end to start fading

    const onTimeUpdate = () => {
      if (!isFinite(v.duration) || v.duration === 0) return
      const remaining = v.duration - v.currentTime
      overlay.style.opacity = remaining < FADE_WINDOW ? '1' : '0'
    }

    const onEnded = () => {
      v.currentTime = 0
      // hold black for one frame so the seek isn't visible, then fade back
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.opacity = '0'
          v.play().catch(() => {})
        })
      })
    }

    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('ended', onEnded)
    }
  }, [])

  useLayoutEffect(() => {
    const lenis = getLenis()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          onEnter: () => {
            if (lenis) lenis.options.wheelMultiplier = 0.8
          },
          onEnterBack: () => {
            if (lenis) lenis.options.wheelMultiplier = 0.8
          },
          onLeave: () => {
            if (lenis) lenis.options.wheelMultiplier = 1.0
          },
          onLeaveBack: () => {
            if (lenis) lenis.options.wheelMultiplier = 1.0
          },
        },
      })

      // 0.0 – 0.3 : crossfade hero video out, oil video in
      tl.to('.hero__video', { opacity: 0, duration: 0.3 }, 0)
      tl.to(videoRef.current, { opacity: 1, duration: 0.3 }, 0)

      // 0.25 – 0.7 : headline emerges from oil (unblur + lift)
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          ease: 'power2.out',
        },
        0.25
      )

      // 0.55 – 0.95 : body follows
      tl.to(
        bodyRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power2.out',
        },
        0.55
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="concentration">
      <video
        ref={videoRef}
        className="concentration__video"
        src="/assets/concentration-bg.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div
        ref={loopFadeRef}
        className="concentration__loop-fade"
        aria-hidden="true"
      />

      <div className="concentration__overlay" aria-hidden="true" />

      {/* Bottom seam fade — dissolves the video into black before the
          boundary with Section 3, eliminating the hard horizontal line. */}
      <div className="concentration__seam-fade" aria-hidden="true" />

      <div className="concentration__content">
        <h2 ref={headlineRef} className="concentration__headline">
          The Sillage Paradox.
        </h2>
        <p ref={bodyRef} className="concentration__body">
          A 40% oil concentration does not shout. It resonates. Unlike
          standard formulations, our Extrait sits heavily on the skin,
          trading a volatile opening for a dense, intimate scent bubble
          and a trail that lingers long after you have gone.
        </p>
      </div>
    </section>
  )
}

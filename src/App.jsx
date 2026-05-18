import { useLayoutEffect } from 'react'
import Hero from './components/Hero.jsx'
import Concentration from './components/Concentration.jsx'
import Architecture from './components/Architecture.jsx'
import { createSmoothScroll } from './lib/scroll.js'

export default function App() {
  useLayoutEffect(() => {
    const cleanup = createSmoothScroll()
    return cleanup
  }, [])

  return (
    <>
      <Hero />
      <Concentration />
      <Architecture />
    </>
  )
}

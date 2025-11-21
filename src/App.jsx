import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import OrbitProgress from './components/OrbitProgress'
import CharacterScene from './components/CharacterScene'
import ThemeToggle from './components/ThemeToggle'
import BackgroundCritters from './components/BackgroundCritters'

function App() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('work')

  useEffect(() => {
    const onProgress = (e) => {
      setProgress(e.detail.value)
      setPhase(e.detail.phase)
    }
    window.addEventListener('pomo-progress', onProgress)
    return () => window.removeEventListener('pomo-progress', onProgress)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-pink-50 to-white dark:from-[#0b1022] dark:via-[#0a0e1a] dark:to-[#080c16] transition-colors">
      <BackgroundCritters />
      {/* Stars layer */}
      <div className="pointer-events-none fixed inset-0 opacity-60 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.2),transparent_40%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500">
            Cozy Space Pomodoro
          </div>
          <ThemeToggle />
        </div>

        <Hero />

        {/* Timer Section */}
        <section className="mt-8 md:mt-10 grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
          <div className="flex items-center justify-center order-3 md:order-1">
            <CharacterScene state={phase} />
          </div>

          <div className="flex flex-col items-center order-2">
            <OrbitProgress progress={progress} mode={phase} />
            <div className="-mt-20 z-10">
              <TimerShell onPhase={setPhase} />
            </div>
          </div>

          <div className="flex items-center justify-center order-1 md:order-3">
            {/* Decorative planets */}
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="absolute w-16 md:w-20 h-16 md:h-20 rounded-full bg-amber-300/80 blur-[1px] shadow-[0_0_30px_rgba(251,191,36,0.6)] left-4 top-6 animate-pulse" />
              <div className="absolute w-10 md:w-12 h-10 md:h-12 rounded-full bg-sky-300/80 right-6 bottom-8 animate-bounce [animation-duration:3s]" />
              <div className="absolute w-12 md:w-16 h-12 md:h-16 rounded-full bg-purple-400/70 left-10 bottom-3" />
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-14 text-center text-slate-600 dark:text-slate-300">
          Built for calm focus among the stars.
        </div>
      </div>
    </div>
  )
}

function TimerShell() {
  // Loads the TimerControls lazily to keep App simple
  const [Comp, setComp] = useState(null)
  useEffect(() => {
    import('./components/TimerControls').then((m) => setComp(() => m.default))
  }, [])
  if (!Comp) return null
  return <Comp />
}

export default App

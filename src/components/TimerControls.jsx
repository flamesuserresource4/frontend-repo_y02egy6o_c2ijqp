import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react'

const defaultConfig = {
  work: 25,
  short: 5,
  long: 15,
  longEvery: 4,
}

function useSound() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio(
      'data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    )
    // The embedded data URL is a near-silent blip placeholder; in a real app you'd replace with chime
  }, [])

  const play = () => {
    if (!muted && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  return { play, muted, setMuted }
}

export default function TimerControls({ onStateChange }) {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('pomo-config')
    return saved ? JSON.parse(saved) : defaultConfig
  })

  const [phase, setPhase] = useState('work') // 'work' | 'short' | 'long'
  const [cycle, setCycle] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(config.work * 60)
  const [running, setRunning] = useState(false)
  const { play, muted, setMuted } = useSound()

  useEffect(() => {
    localStorage.setItem('pomo-config', JSON.stringify(config))
  }, [config])

  useEffect(() => {
    onStateChange?.(phase)
  }, [phase, onStateChange])

  useEffect(() => {
    let id
    if (running) {
      id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    }
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (secondsLeft === 0) {
      // advance phase
      play()
      if (phase === 'work') {
        const nextCycle = cycle + 1
        setCycle(nextCycle)
        if (nextCycle % config.longEvery === 0) {
          setPhase('long')
          setSecondsLeft(config.long * 60)
        } else {
          setPhase('short')
          setSecondsLeft(config.short * 60)
        }
      } else {
        setPhase('work')
        setSecondsLeft(config.work * 60)
      }
    }
  }, [secondsLeft])

  const totalSeconds = phase === 'work' ? config.work * 60 : phase === 'short' ? config.short * 60 : config.long * 60
  const progress = 1 - secondsLeft / totalSeconds

  const timeStr = useMemo(() => {
    const m = Math.floor(secondsLeft / 60)
    const s = secondsLeft % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }, [secondsLeft])

  const applyConfig = (next) => {
    setConfig(next)
    // if we are on matching phase, update secondsLeft accordingly (preserve running state)
    if (phase === 'work') setSecondsLeft(next.work * 60)
    if (phase === 'short') setSecondsLeft(next.short * 60)
    if (phase === 'long') setSecondsLeft(next.long * 60)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Display */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="text-sm uppercase tracking-wide text-slate-600 dark:text-slate-300">{phase === 'work' ? 'Focus' : phase === 'short' ? 'Short Break' : 'Long Break'}</div>
          <div className="mt-1 text-6xl md:text-7xl font-black text-slate-800 dark:text-white tabular-nums">{timeStr}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button onClick={() => setRunning((r) => !r)} className="rounded-full px-6 py-3 bg-indigo-600 text-white shadow hover:shadow-lg active:scale-95 transition-all flex items-center gap-2">
            {running ? <Pause size={18} /> : <Play size={18} />}
            <span className="font-semibold">{running ? 'Pause' : 'Start'}</span>
          </button>
          <button onClick={() => setSecondsLeft(totalSeconds)} className="rounded-full px-4 py-3 bg-white/70 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-100 shadow-sm hover:shadow">
            <RotateCcw size={18} />
          </button>
          <button onClick={() => setMuted((m) => !m)} className="rounded-full px-4 py-3 bg-white/70 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-100 shadow-sm hover:shadow">
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Phase Switchers */}
        <div className="flex items-center gap-2 bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full p-1">
          {[
            { key: 'work', label: 'Work' },
            { key: 'short', label: 'Short Break' },
            { key: 'long', label: 'Long Break' },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => {
                setPhase(p.key)
                setSecondsLeft((p.key === 'work' ? config.work : p.key === 'short' ? config.short : config.long) * 60)
                setRunning(false)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                phase === p.key
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-white/70 dark:hover:bg-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Config Panel */}
        <details className="group w-full">
          <summary className="flex items-center justify-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-200">
            <Settings size={18} />
            <span className="font-semibold">Customize</span>
          </summary>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { key: 'work', label: 'Work (min)' },
              { key: 'short', label: 'Short (min)' },
              { key: 'long', label: 'Long (min)' },
              { key: 'longEvery', label: 'Long every' },
            ].map((item) => (
              <div key={item.key} className="bg-white/70 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 rounded-xl p-3">
                <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">{item.label}</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={config[item.key]}
                  onChange={(e) => applyConfig({ ...config, [item.key]: Number(e.target.value) })}
                  className="w-full rounded-lg px-3 py-2 bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </motion.div>
        </details>
      </div>

      {/* Expose progress to parent via render-prop style children? Instead we'll export state via props consumer. */}
      <div className="sr-only">progress: {Math.round(progress * 100)}</div>

      {/* Hidden value for parent consumption through props is not feasible without context; instead parent can compute or replicate. Export helper: */}
      <HiddenProgress value={progress} phase={phase} />
    </div>
  )
}

function HiddenProgress({ value, phase }) {
  // Simple custom event to share progress upwards without prop drilling redesign
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('pomo-progress', { detail: { value, phase } }))
  }, [value, phase])
  return null
}

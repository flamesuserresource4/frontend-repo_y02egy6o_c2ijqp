import { motion } from 'framer-motion'

export default function OrbitProgress({ progress = 0, mode = 'work' }) {
  // progress = 0..1
  const colors = {
    work: {
      glow: 'rgba(255, 99, 132, 0.6)',
      track: 'rgba(255, 99, 132, 0.15)'
    },
    short: {
      glow: 'rgba(80, 200, 255, 0.7)',
      track: 'rgba(80, 200, 255, 0.15)'
    },
    long: {
      glow: 'rgba(180, 110, 255, 0.7)',
      track: 'rgba(180, 110, 255, 0.15)'
    }
  }

  const c = colors[mode]
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="relative w-[300px] h-[300px]">
      {/* Stardust background */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.4),transparent_45%)] blur-[1px]" />

      <svg className="absolute inset-0" viewBox="0 0 300 300">
        {/* Track */}
        <circle cx="150" cy="150" r={radius} stroke={c.track} strokeWidth="10" fill="none" />
        {/* Progress */}
        <motion.circle
          cx="150"
          cy="150"
          r={radius}
          stroke={c.glow}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          style={{ filter: 'drop-shadow(0 0 10px ' + c.glow + ')' }}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        />
      </svg>

      {/* Tiny orbiting ship */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: progress * 360 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        style={{ width: 300, height: 300 }}
      >
        <div className="absolute left-1/2 top-1/2" style={{ transform: 'rotate(0deg) translate(120px) rotate(0deg)' }}>
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
        </div>
      </motion.div>
    </div>
  )
}

import { motion } from 'framer-motion'

function Robot({ state }) {
  // state: 'work' | 'short' | 'long'
  const reading = state === 'work'
  const chilling = state !== 'work'
  return (
    <div className="relative w-56 h-56">
      {/* body */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-900 border border-white/40 dark:border-white/10 shadow-2xl"
      />
      {/* face */}
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-36 h-20 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center"
        animate={{ opacity: reading ? 1 : 0.9 }}
      >
        <div className="flex gap-3">
          <motion.div className="w-3 h-3 rounded-full bg-cyan-400" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
          <motion.div className="w-3 h-3 rounded-full bg-cyan-300" animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} />
        </div>
      </motion.div>
      {/* book */}
      {reading && (
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-16 rounded-xl bg-pink-300/90 border border-white/40" animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3 }} />
      )}
      {/* floating cat */}
      {chilling && (
        <motion.div className="absolute -right-6 bottom-6" animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4 }}>
          <div className="w-16 h-10 rounded-full bg-amber-200 border border-amber-300 shadow">
            <div className="w-3 h-3 bg-amber-300 rounded-full absolute left-2 top-3" />
            <div className="w-3 h-3 bg-amber-300 rounded-full absolute left-5 top-2" />
          </div>
        </motion.div>
      )}
      {/* planet */}
      <motion.div className="absolute -left-6 -top-4 w-14 h-14 rounded-full bg-purple-400/70 blur-[1px] shadow-[0_0_20px_rgba(168,85,247,0.6)]" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 5 }} />
    </div>
  )
}

export default function CharacterScene({ state }) {
  return (
    <div className="relative flex items-center justify-center">
      <Robot state={state} />
    </div>
  )
}

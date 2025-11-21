import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[42vh] md:h-[52vh] w-full overflow-hidden rounded-3xl">
      <div className="absolute inset-0 scale-100 md:scale-100">
        <Spline scene="https://prod.spline.design/vZX5NNlylxke-6DM/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* soft gradient overlay for mood, pointer-events-none so Spline stays interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-200/40 via-transparent to-indigo-300/40 dark:from-indigo-900/40 dark:via-transparent dark:to-purple-900/40" />

      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white drop-shadow-sm">
            Cozy Space Pomodoro
          </h1>
          <p className="mt-3 md:mt-4 text-slate-600 dark:text-slate-200 max-w-xl mx-auto">
            A gentle focus timer with friendly robots and floaty critters. Breathe, orbit, and get things done.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

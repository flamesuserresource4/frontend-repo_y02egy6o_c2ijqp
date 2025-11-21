import { motion } from 'framer-motion'

// A soft background layer of floating critters (robots/animals) that gently wander.
// Low contrast, non-interactive, responsive, respects reduced motion.
export default function BackgroundCritters() {
  const float = (dx = 0, dy = 12, duration = 10, delay = 0) => ({
    animate: { y: [0, -dy, 0], x: [0, dx, 0] },
    transition: { repeat: Infinity, duration, ease: 'easeInOut', delay },
  })

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient mist for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_90%_30%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_90%_30%,rgba(168,85,247,0.12),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.12),transparent_50%)]" />

      {/* Small scout drone */}
      <motion.div {...float(8, 10, 9, 0)} className="absolute left-[8%] top-[22%]">
        <div className="w-10 h-10 rounded-2xl bg-white/50 dark:bg-slate-700/60 border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-sm" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
      </motion.div>

      {/* Astro cat */}
      <motion.div {...float(-10, 14, 12, 1.2)} className="absolute left-[70%] top-[28%]">
        <div className="w-14 h-10 rounded-full bg-amber-100/70 border border-amber-200/70 shadow-md" />
        <div className="absolute left-2 top-3 w-3 h-3 rounded-full bg-amber-300/80" />
        <div className="absolute left-5 top-2 w-3 h-3 rounded-full bg-amber-300/80" />
      </motion.div>

      {/* Tiny service bot */}
      <motion.div {...float(12, 8, 11, 0.6)} className="absolute left-[20%] top-[65%]">
        <div className="w-8 h-8 rounded-xl bg-slate-100/60 dark:bg-slate-600/60 border border-white/40 dark:border-white/10" />
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pink-300/90 shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
      </motion.div>

      {/* Jelly alien */}
      <motion.div {...float(-14, 16, 14, 0.3)} className="absolute left-[82%] top-[70%]">
        <div className="w-8 h-12 rounded-b-full rounded-t-3xl bg-purple-300/40 dark:bg-purple-500/30 backdrop-blur-sm border border-white/20" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-10 h-3 rounded-full bg-purple-300/20 blur" />
      </motion.div>

      {/* Mini spaceship */}
      <motion.div {...float(16, 12, 13, 1.6)} className="absolute left-[40%] top-[35%]">
        <div className="w-3 h-3 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-cyan-300/60" />
      </motion.div>

      {/* Planets for parallax depth */}
      <motion.div {...float(6, 6, 18, 0)} className="absolute -left-10 top-[10%]">
        <div className="w-40 h-40 rounded-full bg-rose-300/30 dark:bg-rose-400/20 blur-[1px] shadow-[0_0_40px_rgba(244,114,182,0.35)]" />
      </motion.div>
      <motion.div {...float(-8, 8, 20, 0.8)} className="absolute -right-12 top-[55%]">
        <div className="w-48 h-48 rounded-full bg-sky-300/25 dark:bg-sky-400/20 blur-[1px] shadow-[0_0_40px_rgba(56,189,248,0.35)]" />
      </motion.div>

      {/* Reduced motion support: keep still if user prefers */}
      <style>{`@media (prefers-reduced-motion: reduce){
        .motion-reduce\:static{animation: none!important;}
      }`}</style>
    </div>
  )
}

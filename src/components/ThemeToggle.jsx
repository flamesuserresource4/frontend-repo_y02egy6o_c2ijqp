import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved ? saved === 'dark' : prefersDark
    setDark(initial)
    document.documentElement.classList.toggle('dark', initial)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-100 shadow-sm hover:shadow transition-all"
    >
      {dark ? <Moon size={16} /> : <Sun size={16} />}
      <span className="text-sm font-medium">{dark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

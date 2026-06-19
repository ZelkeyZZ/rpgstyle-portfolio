import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.9, rotate: 180 }}
      className="hud-panel rounded-full absolute right-3 top-3 z-40 flex items-center justify-center p-2 md:right-5 md:top-5"
      aria-label={isDark ? "Switch to Restored Temple (light) mode" : "Switch to Cyber-Fantasy (dark) mode"}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        {isDark ? (
          <Moon size={18} style={{ color: "var(--accent-cyan)" }} />
        ) : (
          <Sun size={18} style={{ color: "var(--accent-gold)" }} />
        )}
      </motion.span>
    </motion.button>
  )
}

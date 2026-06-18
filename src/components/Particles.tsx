import { useMemo } from "react"
import { motion } from "framer-motion"

export default function Particles() {
  const bits = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        cyan: Math.random() > 0.5,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: b.cyan ? "var(--accent-cyan)" : "var(--accent-purple)",
            boxShadow: `0 0 8px ${b.cyan ? "var(--accent-cyan)" : "var(--accent-purple)"}`,
          }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

import { motion } from "framer-motion"
import { Swords, ScrollText, Gem, Compass, ShieldUser } from "lucide-react"
import type { Section } from "../data"

const TABS: { id: Section; label: string; icon: typeof Swords; color: string }[] = [
  { id: "about", label: "Profile", icon: ShieldUser, color: "var(--accent-cyan)" },
  { id: "projects", label: "Projects", icon: ScrollText, color: "var(--accent-purple)" },
  { id: "contact", label: "Contact", icon: Gem, color: "var(--accent-gold)" },
]

export default function SideNav({
  active,
  onSelect,
}: {
  active: Section | null
  onSelect: (s: Section) => void
}) {
  return (
    <nav
      className="absolute right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 pr-3 md:pr-5"
      aria-label="Inventory navigation"
    >
      {TABS.map((t, i) => {
        const Icon = t.icon
        const isActive = active === t.id
        return (
          <motion.button
            key={t.id}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
            whileHover={{ x: -6, rotate: -1 }}
            whileTap={{ scale: 0.93, rotate: 2 }}
            onClick={() => onSelect(t.id)}
            className="hud-panel clip-bevel group relative flex w-16 flex-col items-center gap-1 px-2 py-3 md:w-20 md:py-4"
            style={{
              borderColor: isActive ? t.color : "var(--panel-edge)",
              boxShadow: isActive
                ? `0 0 24px -4px ${t.color}, inset 0 0 22px -10px ${t.color}`
                : undefined,
            }}
            aria-pressed={isActive}
          >
            {/* active gear-grind notch */}
            <motion.span
              className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r"
              animate={{ height: isActive ? 40 : 16, opacity: isActive ? 1 : 0.4 }}
              style={{ background: t.color, boxShadow: `0 0 10px ${t.color}` }}
            />
            <Icon
              size={22}
              strokeWidth={1.6}
              style={{ color: isActive ? t.color : "var(--ink-soft)" }}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.14em] md:text-xs"
              style={{ color: isActive ? t.color : "var(--ink-soft)" }}
            >
              {t.label}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}

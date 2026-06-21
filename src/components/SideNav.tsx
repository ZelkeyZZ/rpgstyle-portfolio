import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import type { Section } from "../data"
import { sidebarEntries } from "../config/navigation"

// Sidebar items are now derived directly from navigation.ts (showInSidebar: true)
const TABS = sidebarEntries

export default function SideNav({
  active,
  onSelect,
}: {
  active: Section | null
  onSelect: (s: Section) => void
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSelectItem = (id: Section) => {
    onSelect(id)
    setDrawerOpen(false)
  }

  return (
    <>
      {/* Mobile drawer toggle button */}
      <motion.button
        className="absolute bottom-3 right-3 z-40 flex h-10 w-10 items-center justify-center rounded border md:hidden"
        style={{
          borderColor: "var(--panel-edge)",
          background: "color-mix(in srgb, var(--panel) 80%, transparent)",
          boxShadow: "0 0 12px -2px var(--glow)",
        }}
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label="Toggle inventory menu"
        aria-pressed={drawerOpen}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait">
          {drawerOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={18} style={{ color: "var(--accent-cyan)" }} />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <Menu size={18} style={{ color: "var(--accent-cyan)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Drawer - appears below toggle button */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="absolute bottom-14 right-3 z-40 flex flex-col gap-2 rounded-lg border p-2 md:hidden"
            style={{
              borderColor: "var(--panel-edge)",
              background: "color-mix(in srgb, var(--panel) 95%, transparent)",
              boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.4)",
            }}
          >
            {TABS.map((t, i) => {
              const Icon = t.icon
              const isActive = active === (t.id as Section)
              return (
                <motion.button
                  key={t.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => handleSelectItem(t.id as Section)}
                  className="flex items-center gap-3 rounded px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-all active:scale-95"
                  style={{
                    borderLeft: isActive ? `3px solid ${t.color}` : "3px solid transparent",
                    background: isActive ? `color-mix(in srgb, ${t.color} 12%, transparent)` : "transparent",
                    color: isActive ? t.color : "var(--ink-soft)",
                  }}
                  whileTap={{ x: 4 }}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{t.navLabel ?? t.label}</span>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar - hidden on mobile */}
      <nav
        className="absolute right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 pr-3 md:flex md:pr-5"
        aria-label="Inventory navigation"
      >
        {TABS.map((t, i) => {
          const Icon = t.icon
          const isActive = active === (t.id as Section)
          return (
            <motion.button
              key={t.id}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
              whileHover={{ x: -6, rotate: -1 }}
              whileTap={{ scale: 0.93, rotate: 2 }}
              onClick={() => onSelect(t.id as Section)}
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
                {t.navLabel ?? t.label}
              </span>
            </motion.button>
          )
        })}
      </nav>
    </>
  )
}

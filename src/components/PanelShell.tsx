import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

export default function PanelShell({
  title,
  variant,
  onClose,
  children,
}: {
  title: string
  variant: "parchment" | "hud"
  onClose: () => void
  children: ReactNode
}) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "color-mix(in srgb, var(--bg-void) 78%, transparent)" }}
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.section
        className={`${variant === "parchment" ? "parchment" : "hud-panel scanlines"} relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg`}
        initial={{ y: 40, scale: 0.94, opacity: 0, rotateX: 8 }}
        animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ y: 30, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <header
          className="flex items-center justify-between border-b px-5 py-3"
          style={{
            borderColor: variant === "parchment" ? "var(--parchment-edge)" : "var(--panel-edge)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rotate-45"
              style={{ background: "var(--accent-gold)", boxShadow: "0 0 10px var(--accent-gold)" }}
            />
            <h2
              className={`${variant === "parchment" ? "font-serif" : "font-mono"} text-lg font-bold uppercase tracking-[0.18em] text-ink`}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="flex h-8 w-8 items-center justify-center rounded border transition-colors hover:bg-black/10"
            style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </header>

        <div className="codex-scroll overflow-y-auto px-5 py-5 md:px-7 md:py-6">{children}</div>
      </motion.section>
    </motion.div>
  )
}

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Mail, Lock, ExternalLink } from "lucide-react"
import { loot } from "../data"
import ResumeModal from "./ResumeModal"

const rarityColor: Record<string, string> = {
  Uncommon: "var(--accent-cyan)",
  Rare: "var(--accent-purple)",
  Epic: "var(--accent-gold)",
}

export default function ContactPanel() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div className="font-sans">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
        Merchant Inventory · Acquire Loot
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {loot.map((item, i) => {
          const rc = rarityColor[item.rarity]
          const Icon = item.id === "github" ? Code2 : item.id === "email" ? Mail : Lock
          const locked = item.type === "locked"
          return (
            <motion.button
              key={item.id}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (locked) setResumeOpen(true)
                else window.open(item.href, "_blank", "noopener,noreferrer")
              }}
              className={`hud-panel clip-bevel relative flex flex-col gap-2 p-4 text-left ${
                item.id === "resume" ? "sm:col-span-2" : ""
              }`}
              style={{ borderColor: rc }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-md border"
                  style={{ borderColor: rc, boxShadow: `inset 0 0 16px -6px ${rc}` }}
                >
                  <Icon size={18} style={{ color: rc }} />
                </span>
                <span
                  className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ borderColor: rc, color: rc }}
                >
                  {item.rarity}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  {item.subtitle}
                </p>
                <h3 className="font-serif text-base font-bold text-ink">{item.name}</h3>
                <p className="mt-0.5 flex items-center gap-1 font-mono text-xs" style={{ color: rc }}>
                  {item.value}
                  {!locked && <ExternalLink size={11} />}
                </p>
              </div>
              {locked && (
                <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-gold">
                  <Lock size={12} /> Unlock DLC
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  )
}

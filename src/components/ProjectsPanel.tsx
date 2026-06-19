import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, MinusCircle, Sparkles, ImageIcon, Lock } from "lucide-react"
import { quests, type Quest } from "../data"
import QuestModal from "./QuestModal"

export default function ProjectsPanel() {
  const [active, setActive] = useState<Quest | null>(null)
  const totalQuests = quests.length
  const completedQuests = quests.filter((q) => q.completed).length

  return (
    <div className="font-sans">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-ink-soft">
        Completed Quests · {completedQuests} / {totalQuests} · <span className="text-gold">Click a quest to inspect loot</span>
      </p>
      <div className="flex flex-col gap-4">
        {quests.map((q, i) => (
          <motion.article
            key={q.id}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 200, damping: 22 }}
            whileHover={{ scale: 1.015 }}
            onClick={() => setActive(q)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setActive(q)
              }
            }}
            className="group relative cursor-pointer overflow-hidden rounded-md border p-4 outline-none transition-shadow focus-visible:ring-2"
            style={{
              borderColor: "var(--parchment-edge)",
              background: "color-mix(in srgb, var(--parchment) 60%, transparent)",
            }}
          >
            <span
              className="absolute right-0 top-0 h-full w-1"
              style={{ background: q.rankColor, boxShadow: `0 0 12px ${q.rankColor}` }}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {q.completed ? (
                    <CheckCircle2 size={18} style={{ color: q.rankColor }} />
                  ) : (
                    <MinusCircle size={18} style={{ color: q.rankColor }} />
                  )}
                  <h3 className="font-serif text-lg font-bold text-ink">{q.title}</h3>
                </div>
                {!q.completed && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">In Progress</span>
                )}
              </div>
              <span
                className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ borderColor: q.rankColor, color: q.rankColor }}
              >
                {q.rank}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{q.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {q.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border px-2 py-0.5 font-mono text-[11px] text-ink-soft"
                  style={{ borderColor: "var(--parchment-edge)" }}
                >
                  {t}
                </span>
              ))}
              {q.completed ? (
                <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-gold">
                  <Sparkles size={13} /> {q.reward}
                </span>
              ) : (
                <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-ink-soft opacity-60">
                  <Lock size={13} /> Reward Locked
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-soft opacity-70 transition-opacity group-hover:opacity-100">
              <ImageIcon size={12} style={{ color: q.rankColor }} />
              {q.media?.length ?? 0} screenshots {q.repo ? "· repo available" : "· sealed repo"} → inspect
            </div>
          </motion.article>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
        Hint: glitching nodes on the map hold corrupted secrets...
      </p>

      <QuestModal quest={active} onClose={() => setActive(null)} />
    </div>
  )
}

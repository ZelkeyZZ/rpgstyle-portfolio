import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { quests } from "../data"
import type { Quest } from "../data"

interface CurrentQuestHudProps {
  onQuestClick: (quest: Quest) => void
}

export default function CurrentQuestHud({ onQuestClick }: CurrentQuestHudProps) {
  // Derived state: filter incomplete quests
  const activeQuests = quests.filter((q) => !q.completed)

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 20 }}
      className="hud-panel clip-bevel absolute left-1/2 top-1/3 z-30 -translate-x-1/2 max-w-xs px-3 py-2 md:max-w-sm md:px-4 md:py-3"
      style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
    >
      {/* Header */}
      <div className="border-b mb-2 pb-2" style={{ borderColor: "var(--panel-edge)" }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan md:text-[10px] md:tracking-[0.32em]">
          // QUEST LOG
        </p>
        <h2 className="font-serif text-sm font-bold text-gold md:text-base">
          Current Objectives
          {activeQuests.length > 0 && <span className="text-ink-soft"> ({activeQuests.length})</span>}
        </h2>
      </div>

      {/* Quest List or Empty State */}
      {activeQuests.length === 0 ? (
        <div className="space-y-1">
          <p className="text-xs text-ink-soft italic">No Active Quests</p>
          <p className="text-[9px] text-ink-soft opacity-75">Return later for new adventures.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activeQuests.map((quest, idx) => (
            <motion.button
              key={quest.id}
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 + idx * 0.05, type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => onQuestClick(quest)}
              whileHover={{ x: 4 }}
              className="w-full text-left group"
            >
              <div className="rounded border p-2 transition-all group-hover:border-accent-gold" style={{ borderColor: "var(--panel-edge)" }}>
                {/* Quest Title */}
                <div className="flex items-center gap-1.5">
                  <ChevronRight size={14} style={{ color: quest.rankColor }} className="transition-transform group-hover:translate-x-1" />
                  <h3 className="font-serif text-[11px] font-bold text-ink truncate group-hover:text-gold transition-colors md:text-xs">
                    {quest.title}
                  </h3>
                </div>

                {/* Quest Summary */}
                <p className="mt-1 text-[9px] text-ink-soft line-clamp-2 ml-5 md:text-[10px]">
                  {quest.summary}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

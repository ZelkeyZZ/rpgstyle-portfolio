import { useState, useEffect, memo, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, ChevronUp, ScrollText } from "lucide-react"
import { quests } from "../data"
import type { Quest } from "../data"

interface CurrentQuestHudProps {
  onQuestClick: (quest: Quest) => void
}

const CurrentQuestHud = memo(function CurrentQuestHud({ onQuestClick }: CurrentQuestHudProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [autoCollapseTimer, setAutoCollapseTimer] = useState<NodeJS.Timeout | null>(null)

  // Derived state: filter incomplete quests
  const activeQuests = quests.filter((q) => !q.completed)

  // Reset auto-collapse timer on interaction
  const resetAutoCollapseTimer = useCallback(() => {
    if (autoCollapseTimer) clearTimeout(autoCollapseTimer)
    
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false)
      }, 8000) // 8 second auto-collapse
      
      setAutoCollapseTimer(timer)
    }
  }, [isExpanded, autoCollapseTimer])

  // Handle quest click
  const handleQuestClick = useCallback((quest: Quest) => {
    onQuestClick(quest)
    setIsExpanded(false)
  }, [onQuestClick])

  // Handle toggle
  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev)
    resetAutoCollapseTimer()
  }, [resetAutoCollapseTimer])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false)
      }
    }
    
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isExpanded])

  // Auto-collapse timer effect
  useEffect(() => {
    if (isExpanded) {
      resetAutoCollapseTimer()
    }
    
    return () => {
      if (autoCollapseTimer) clearTimeout(autoCollapseTimer)
    }
  }, [isExpanded])

  return (
    <div className="absolute left-3 top-20 z-30 md:left-5 md:top-24">
      {/* Minimized Button */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={handleToggle}
            className="hud-panel clip-bevel flex items-center gap-2 px-3 py-2 transition-all hover:border-accent-gold active:scale-95"
            style={{ borderColor: "var(--panel-edge)" }}
            aria-label={`Open quest tracker. ${activeQuests.length} active quest${activeQuests.length !== 1 ? "s" : ""}`}
          >
            <ScrollText size={16} style={{ color: "var(--accent-gold)" }} />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-soft md:text-xs">
              {activeQuests.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Panel */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ scale: 0.9, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="hud-panel clip-bevel absolute top-full left-0 mt-2 max-h-96 w-72 max-w-[calc(100vw-1.5rem)] overflow-hidden flex flex-col md:w-80"
            style={{ borderColor: "var(--panel-edge)" }}
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between border-b p-3" style={{ borderColor: "var(--panel-edge)" }}>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan">
                  // QUEST LOG
                </p>
                <h2 className="font-serif text-sm font-bold text-gold">
                  Current Objectives
                </h2>
              </div>
              <button
                onClick={handleToggle}
                className="p-1 rounded transition-colors hover:bg-black/20"
                aria-label="Close quest tracker"
              >
                <ChevronUp size={18} style={{ color: "var(--ink-soft)" }} />
              </button>
            </div>

            {/* Quest List or Empty State */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {activeQuests.length === 0 ? (
                <div className="space-y-1 py-4 text-center">
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
                      transition={{ delay: idx * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                      onClick={() => handleQuestClick(quest)}
                      whileHover={{ x: 4 }}
                      className="w-full text-left group"
                    >
                      <div className="rounded border p-2 transition-all group-hover:border-accent-gold" style={{ borderColor: "var(--panel-edge)" }}>
                        {/* Quest Title */}
                        <div className="flex items-center gap-1.5">
                          <ChevronRight size={14} style={{ color: quest.rankColor }} className="transition-transform group-hover:translate-x-1" />
                          <h3 className="font-serif text-[11px] font-bold text-ink truncate group-hover:text-gold transition-colors">
                            {quest.title}
                          </h3>
                        </div>

                        {/* Quest Summary */}
                        <p className="mt-1 text-[9px] text-ink-soft line-clamp-2 ml-5">
                          {quest.summary}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default CurrentQuestHud

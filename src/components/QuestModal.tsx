import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ExternalLink, ChevronLeft, ChevronRight, Sparkles, FolderGit2, Lock, ChevronDown } from "lucide-react"
import type { Quest } from "../data"
import { OptimizedImage, OptimizedVideo } from "./OptimizedImage"

type TabType = "overview" | "challenge" | "solution" | "architecture" | "lessons"

export default function QuestModal({ quest, onClose }: { quest: Quest | null; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const media = quest?.media ?? []
  const hasMedia = media.length > 0

  // Tabs only show if content exists
  const tabs: { id: TabType; label: string; content: boolean }[] = [
    { id: "overview", label: "Overview", content: true },
    { id: "challenge", label: "Challenge", content: !!quest?.challenge },
    { id: "solution", label: "Solution", content: !!quest?.solution },
    { id: "architecture", label: "Architecture", content: !!quest?.architecture },
    { id: "lessons", label: "Lessons", content: !!quest?.lessonsLearned && quest.lessonsLearned.length > 0 },
  ].filter((t) => t.content)

  useEffect(() => {
    if (!quest) return
    setIndex(0)
    setActiveTab("overview")
    setExpandedAccordion(null)
  }, [quest?.id])

  useEffect(() => {
    if (!quest) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % Math.max(media.length, 1))
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + media.length) % Math.max(media.length, 1))
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
    }
  }, [quest?.id, media.length, onClose])

  const current = media[index]

  return (
    <AnimatePresence>
      {quest && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "color-mix(in srgb, var(--bg-void) 82%, transparent)" }}
            onClick={onClose}
          />
          <motion.div
            className="hud-panel scanlines relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ borderColor: quest.rankColor }}
          >
            {/* header */}
            <div
              className="flex items-start justify-between gap-3 border-b p-4"
              style={{ borderColor: "var(--panel-edge)" }}
            >
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: quest.rankColor }}
                >
                  {quest.rank} Quest
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-ink">{quest.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded border"
                style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
                aria-label="Close quest"
              >
                <X size={14} />
              </button>
            </div>

            {/* tab navigation */}
            {tabs.length > 1 && (
              <div
                className="flex gap-0 border-b overflow-x-auto px-4 py-0"
                style={{ borderColor: "var(--panel-edge)" }}
              >
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-3 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors"
                    style={{
                      borderColor: activeTab === tab.id ? quest!.rankColor : "transparent",
                      color: activeTab === tab.id ? quest!.rankColor : "var(--ink-soft)",
                    }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* scroll body */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {/* media viewer - only show on overview tab */}
                {hasMedia && activeTab === "overview" && (
                  <motion.div
                    key="media-gallery"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="relative overflow-hidden rounded-md border"
                      style={{ borderColor: "var(--panel-edge)", background: "color-mix(in srgb,#000 35%,transparent)" }}
                    >
                      <div className="relative aspect-video w-full">
                        {current.type === "video" ? (
                          <OptimizedVideo
                            key={`video-${current.src}`}
                            src={current.src}
                            className="h-full w-full object-cover"
                            preload="metadata"
                          />
                        ) : (
                          <OptimizedImage
                            key={`image-${current.src}`}
                            src={current.src}
                            alt={current.caption ?? `${quest.title} screenshot ${index + 1}`}
                            className="h-full w-full object-cover"
                            quality="high"
                          />
                        )}

                        {media.length > 1 && (
                          <>
                            <button
                              onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
                              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm"
                              style={{
                                borderColor: "var(--panel-edge)",
                                background: "color-mix(in srgb, var(--bg-void) 60%, transparent)",
                                color: "var(--ink)",
                              }}
                              aria-label="Previous media"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={() => setIndex((i) => (i + 1) % media.length)}
                              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm"
                              style={{
                                borderColor: "var(--panel-edge)",
                                background: "color-mix(in srgb, var(--bg-void) 60%, transparent)",
                                color: "var(--ink)",
                              }}
                              aria-label="Next media"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </div>

                      {current.caption && (
                        <p className="border-t px-3 py-2 font-mono text-[11px] text-ink-soft" style={{ borderColor: "var(--panel-edge)" }}>
                          {current.caption}
                        </p>
                      )}
                    </div>

                    {/* thumbnail dots - only show on overview tab */}
                    {media.length > 1 && (
                      <div className="mt-3 flex items-center justify-center gap-2">
                        {media.map((_, i) => (
                          <button
                            key={`dot-${i}`}
                            onClick={() => setIndex(i)}
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: i === index ? 20 : 8,
                              background: i === index ? quest.rankColor : "var(--panel-edge)",
                              boxShadow: i === index ? `0 0 8px ${quest.rankColor}` : "none",
                            }}
                            aria-label={`Go to media ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

              {/* TAB: Overview */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {quest.details ?? quest.summary}
                    </p>
                  </div>

                  {/* tech + reward */}
                  <div className="flex flex-wrap items-center gap-2">
                    {quest.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border px-2 py-0.5 font-mono text-[11px] text-ink-soft"
                        style={{ borderColor: "var(--panel-edge)" }}
                      >
                        {t}
                      </span>
                    ))}
                    {quest.completed ? (
                      <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-gold">
                        <Sparkles size={13} /> {quest.reward}
                      </span>
                    ) : (
                      <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-ink-soft opacity-60">
                        <Lock size={13} /> Reward Locked
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB: Challenge */}
              {activeTab === "challenge" && quest.challenge && (
                <motion.div
                  key="challenge"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <h4 className="font-serif text-sm font-bold text-gold mb-2">The Problem</h4>
                  <p className="text-sm leading-relaxed text-ink-soft">{quest.challenge}</p>
                </motion.div>
              )}

              {/* TAB: Solution */}
              {activeTab === "solution" && quest.solution && (
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <h4 className="font-serif text-sm font-bold text-accent-cyan mb-2">The Answer</h4>
                  <p className="text-sm leading-relaxed text-ink-soft">{quest.solution}</p>
                </motion.div>
              )}

              {/* TAB: Architecture */}
              {activeTab === "architecture" && quest.architecture && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 space-y-3"
                >
                  {quest.architecture.overview && (
                    <div>
                      <h4 className="font-serif text-sm font-bold text-accent-purple mb-2">Overview</h4>
                      <p className="text-sm leading-relaxed text-ink-soft">{quest.architecture.overview}</p>
                    </div>
                  )}

                  {/* Components accordion */}
                  {quest.architecture.components && quest.architecture.components.length > 0 && (
                    <div>
                      <motion.button
                        onClick={() =>
                          setExpandedAccordion(expandedAccordion === "components" ? null : "components")
                        }
                        className="flex w-full items-center gap-2 px-3 py-2 rounded border transition-colors"
                        style={{
                          borderColor: "var(--panel-edge)",
                          background:
                            expandedAccordion === "components"
                              ? "color-mix(in srgb, var(--accent-purple) 10%, transparent)"
                              : "transparent",
                        }}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${expandedAccordion === "components" ? "rotate-180" : ""}`}
                        />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wide">Components</span>
                      </motion.button>
                      <AnimatePresence>
                        {expandedAccordion === "components" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-2 ml-4 space-y-1 border-l-2 pl-3" style={{ borderColor: "var(--accent-purple)" }}>
                              {quest.architecture.components.map((comp, i) => (
                                <li key={i} className="text-xs text-ink-soft">
                                  • {comp}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Technical Notes accordion */}
                  {quest.architecture.technicalNotes && quest.architecture.technicalNotes.length > 0 && (
                    <div>
                      <motion.button
                        onClick={() =>
                          setExpandedAccordion(expandedAccordion === "notes" ? null : "notes")
                        }
                        className="flex w-full items-center gap-2 px-3 py-2 rounded border transition-colors"
                        style={{
                          borderColor: "var(--panel-edge)",
                          background:
                            expandedAccordion === "notes"
                              ? "color-mix(in srgb, var(--accent-cyan) 10%, transparent)"
                              : "transparent",
                        }}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${expandedAccordion === "notes" ? "rotate-180" : ""}`}
                        />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wide">Technical Notes</span>
                      </motion.button>
                      <AnimatePresence>
                        {expandedAccordion === "notes" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-2 ml-4 space-y-1 border-l-2 pl-3" style={{ borderColor: "var(--accent-cyan)" }}>
                              {quest.architecture.technicalNotes.map((note, i) => (
                                <li key={i} className="text-xs text-ink-soft">
                                  • {note}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB: Lessons Learned */}
              {activeTab === "lessons" && quest.lessonsLearned && quest.lessonsLearned.length > 0 && (
                <motion.div
                  key="lessons"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <h4 className="font-serif text-sm font-bold text-gold mb-3">Key Takeaways</h4>
                  <ul className="space-y-2">
                    {quest.lessonsLearned.map((lesson, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-soft">
                        <span className="shrink-0 text-accent-purple font-bold">→</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* footer / repo */}
            <div
              className="border-t p-4"
              style={{ borderColor: "var(--panel-edge)" }}
            >
              {quest.repo ? (
                <a
                  href={quest.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 font-mono text-sm font-bold uppercase tracking-wider transition-transform hover:scale-[1.02]"
                  style={{
                    borderColor: quest.rankColor,
                    color: quest.rankColor,
                    background: `color-mix(in srgb, ${"var(--accent-cyan)"} 0%, transparent)`,
                    boxShadow: `0 0 16px color-mix(in srgb, ${"var(--bg-void)"} 0%, transparent)`,
                  }}
                >
                  <FolderGit2 size={16} /> Loot Repository <ExternalLink size={14} />
                </a>
              ) : (
                <p className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-soft"
                  style={{ borderColor: "var(--panel-edge)" }}
                >
                  Repository sealed · Proprietary / Client-owned loot
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

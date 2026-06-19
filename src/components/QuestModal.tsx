import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ExternalLink, ChevronLeft, ChevronRight, Sparkles, FolderGit2, Lock } from "lucide-react"
import type { Quest } from "../data"
import { OptimizedImage, OptimizedVideo } from "./OptimizedImage"

export default function QuestModal({ quest, onClose }: { quest: Quest | null; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const media = quest?.media ?? []
  const hasMedia = media.length > 0

  useEffect(() => {
    setIndex(0)
  }, [quest])

  useEffect(() => {
    if (!quest) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % Math.max(media.length, 1))
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + media.length) % Math.max(media.length, 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [quest, media.length, onClose])

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

            {/* scroll body */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* media viewer */}
              {hasMedia && (
                <div
                  className="relative overflow-hidden rounded-md border"
                  style={{ borderColor: "var(--panel-edge)", background: "color-mix(in srgb,#000 35%,transparent)" }}
                >
                  <div className="relative aspect-video w-full">
                    {current.type === "video" ? (
                      <OptimizedVideo
                        key={current.src}
                        src={current.src}
                        className="h-full w-full object-cover"
                        preload="metadata"
                      />
                    ) : (
                      <OptimizedImage
                        key={current.src}
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
              )}

              {/* thumbnail dots */}
              {media.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {media.map((_, i) => (
                    <button
                      key={i}
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

              {/* description */}
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {quest.details ?? quest.summary}
              </p>

              {/* tech + reward */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
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

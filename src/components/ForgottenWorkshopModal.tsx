import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import type { ForgottenProject } from "../data/forgottenProjects"
import { OptimizedImage, OptimizedVideo } from "./OptimizedImage"

type TabType = "overview" | "reason" | "lessons"

const statusColors: Record<string, { badge: string; accent: string }> = {
  abandoned: { badge: "var(--accent-gold)", accent: "text-yellow-600" },
  cancelled: { badge: "var(--accent-purple)", accent: "text-purple-600" },
  lost: { badge: "#888888", accent: "text-gray-500" },
  prototype: { badge: "var(--accent-cyan)", accent: "text-cyan-600" },
}

const statusLabels: Record<string, string> = {
  abandoned: "ABANDONED",
  cancelled: "CANCELLED",
  lost: "LOST SOURCE",
  prototype: "PROTOTYPE",
}

export default function ForgottenWorkshopModal({
  project,
  onClose,
}: {
  project: ForgottenProject | null
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const [mediaIndex, setMediaIndex] = useState(0)

  // Tabs show based on content
  const tabs: { id: TabType; label: string; content: boolean }[] = [
    { id: "overview", label: "Overview", content: true },
    { id: "reason", label: "Why Abandoned", content: !!project?.reasonAbandoned },
    { id: "lessons", label: "Lessons", content: !!project?.lessonsLearned && project.lessonsLearned.length > 0 },
  ].filter((t) => t.content)

  useEffect(() => {
    if (!project) return
    setActiveTab("overview")
    setExpandedAccordion(null)
    setMediaIndex(0)
  }, [project?.id])

  if (!project) return null

  const statusColor = statusColors[project.status]
  const media = project.evidence?.media ?? []
  const hasMedia = media.length > 0
  const notes = project.evidence?.notes ?? []
  const currentMedia = hasMedia ? media[mediaIndex] : null

  return (
    <AnimatePresence>
      {project && (
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
            style={{ borderColor: statusColor.badge }}
          >
            {/* header */}
            <div
              className="flex items-start justify-between gap-3 border-b p-4"
              style={{ borderColor: "var(--panel-edge)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider rounded border"
                    style={{ color: statusColor.badge, borderColor: statusColor.badge }}
                  >
                    {statusLabels[project.status]}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">{project.year}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-ink">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded border"
                style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
                aria-label="Close"
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
                      borderColor: activeTab === tab.id ? statusColor.badge : "transparent",
                      color: activeTab === tab.id ? statusColor.badge : "var(--ink-soft)",
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
                {/* TAB: Overview */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-sm leading-relaxed text-ink-soft">{project.summary}</p>
                    </div>

                    {/* technologies */}
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border px-2 py-0.5 font-mono text-[11px] text-ink-soft"
                          style={{ borderColor: "var(--panel-edge)" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* media gallery */}
                    {hasMedia && (
                      <div className="mt-4 space-y-3">
                        <div
                          className="relative overflow-hidden rounded-md border"
                          style={{ borderColor: "var(--panel-edge)", background: "color-mix(in srgb,#000 35%,transparent)" }}
                        >
                          <div className="relative aspect-video w-full">
                            {currentMedia?.type === "video" ? (
                              <OptimizedVideo
                                key={`video-${currentMedia.src}`}
                                src={currentMedia.src}
                                className="h-full w-full object-cover"
                                preload="metadata"
                              />
                            ) : (
                              <OptimizedImage
                                key={`image-${currentMedia?.src}`}
                                src={currentMedia?.src ?? ""}
                                alt={currentMedia?.caption ?? `${project.title} screenshot`}
                                className="h-full w-full object-cover"
                                quality="high"
                              />
                            )}

                            {media.length > 1 && (
                              <>
                                <button
                                  onClick={() => setMediaIndex((i) => (i - 1 + media.length) % media.length)}
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
                                  onClick={() => setMediaIndex((i) => (i + 1) % media.length)}
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

                          {currentMedia?.caption && (
                            <p className="border-t px-3 py-2 font-mono text-[11px] text-ink-soft" style={{ borderColor: "var(--panel-edge)" }}>
                              {currentMedia.caption}
                            </p>
                          )}
                        </div>

                        {/* media dots */}
                        {media.length > 1 && (
                          <div className="flex items-center justify-center gap-2">
                            {media.map((_, i) => (
                              <button
                                key={`dot-${i}`}
                                onClick={() => setMediaIndex(i)}
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: i === mediaIndex ? 20 : 8,
                                  background: i === mediaIndex ? statusColor.badge : "var(--panel-edge)",
                                  boxShadow: i === mediaIndex ? `0 0 8px ${statusColor.badge}` : "none",
                                }}
                                aria-label={`Go to media ${i + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* development notes */}
                    {notes.length > 0 && (
                      <div className="mt-4 p-3 rounded border" style={{ borderColor: "var(--panel-edge)" }}>
                        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                          Development Notes
                        </h4>
                        <ul className="space-y-1">
                          {notes.map((note, i) => (
                            <li key={i} className="text-xs text-ink-soft flex items-start gap-2">
                              <span className="shrink-0 text-accent-gold">•</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!hasMedia && notes.length === 0 && (
                      <div className="mt-4 p-3 rounded border italic" style={{ borderColor: "var(--panel-edge)" }}>
                        <p className="text-xs text-ink-soft">
                          No surviving media or development notes remain—only memories of what once was.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB: Why Abandoned */}
                {activeTab === "reason" && project.reasonAbandoned && (
                  <motion.div
                    key="reason"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-serif text-sm font-bold mb-3" style={{ color: statusColor.badge }}>
                      What Happened
                    </h4>
                    <p className="text-sm leading-relaxed text-ink-soft">{project.reasonAbandoned}</p>
                  </motion.div>
                )}

                {/* TAB: Lessons Learned */}
                {activeTab === "lessons" && project.lessonsLearned && project.lessonsLearned.length > 0 && (
                  <motion.div
                    key="lessons"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-serif text-sm font-bold text-gold mb-3">Key Takeaways</h4>
                    <ul className="space-y-2">
                      {project.lessonsLearned.map((lesson, i) => (
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

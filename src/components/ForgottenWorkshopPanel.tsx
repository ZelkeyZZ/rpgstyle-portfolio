import { useState } from "react"
import { motion } from "framer-motion"
import { forgottenProjects } from "../data/forgottenProjects"
import ForgottenWorkshopModal from "./ForgottenWorkshopModal"

const statusColors: Record<string, { badge: string }> = {
  abandoned: { badge: "var(--accent-gold)" },
  cancelled: { badge: "var(--accent-purple)" },
  lost: { badge: "#888888" },
  prototype: { badge: "var(--accent-cyan)" },
}

const statusLabels: Record<string, string> = {
  abandoned: "ABANDONED",
  cancelled: "CANCELLED",
  lost: "LOST",
  prototype: "PROTOTYPE",
}

export default function ForgottenWorkshopPanel() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header description */}
      <div className="p-4 rounded border" style={{ borderColor: "var(--panel-edge)" }}>
        <p className="text-sm leading-relaxed text-ink-soft">
          A museum of unfinished creations. These projects were abandoned, cancelled, lost to time, or remained prototypes. 
          Each tells a story of learning, ambition, and the realities of software development.
        </p>
      </div>

      {/* Projects grid */}
      <div className="space-y-3">
        {forgottenProjects.map((project, i) => {
          const statusColor = statusColors[project.status]
          return (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedProject(project)}
              className="w-full text-left p-3 rounded border transition-all hover:scale-102"
              style={{
                borderColor: "var(--panel-edge)",
                background: "color-mix(in srgb, var(--panel) 40%, transparent)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-ink mb-1">{project.title}</h4>
                  <p className="text-xs text-ink-soft line-clamp-2">{project.summary}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span
                    className="px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded border"
                    style={{ color: statusColor.badge, borderColor: statusColor.badge }}
                  >
                    {statusLabels[project.status]}
                  </span>
                  <span className="font-mono text-[9px] text-ink-soft">{project.year}</span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Stats */}
      <div className="mt-6 p-3 rounded border text-center" style={{ borderColor: "var(--panel-edge)" }}>
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          {forgottenProjects.length} Projects Preserved
        </p>
      </div>

      {/* Modal */}
      <ForgottenWorkshopModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

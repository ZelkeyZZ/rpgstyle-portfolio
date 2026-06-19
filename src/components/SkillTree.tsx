import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  Database,
  Server,
  Wrench,
  Gamepad2,
  Palette,
  Zap,
  Cpu,
  Monitor,
  Layers,
  FileJson,
  GitBranch,
  Shield,
  Smartphone,
  RotateCw,
  BookOpen,
  Hammer,
  Network,
  X,
} from "lucide-react"
import { journey } from "../data"

type Skill = {
  id: string
  name: string
  icon: typeof Code
  category: "frontend" | "backend" | "game" | "system" | "design" | "tools"
  proficiency: "beginner" | "intermediate" | "advanced" | "expert"
  experience: string
  projects: string[]
  yearIntroduced: number
}

// Map skills across all journey milestones
const SKILL_TREE: Skill[] = [
  // Frontend
  {
    id: "html-css",
    name: "HTML/CSS",
    icon: Code,
    category: "frontend",
    proficiency: "expert",
    experience: "Since 2015 — 10 years",
    projects: ["ICCES", "Barcode Label Generator", "My Portfolio"],
    yearIntroduced: 2015,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: Zap,
    category: "frontend",
    proficiency: "advanced",
    experience: "Since 2017 — 8 years",
    projects: ["Barcode Label Generator", "My Portfolio"],
    yearIntroduced: 2017,
  },
  {
    id: "react",
    name: "React",
    icon: FileJson,
    category: "frontend",
    proficiency: "advanced",
    experience: "Since 2024 — 1+ years",
    projects: ["My Portfolio"],
    yearIntroduced: 2024,
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: Palette,
    category: "frontend",
    proficiency: "advanced",
    experience: "Since 2024 — 1+ years",
    projects: ["My Portfolio"],
    yearIntroduced: 2024,
  },

  // Backend
  {
    id: "php",
    name: "PHP",
    icon: Server,
    category: "backend",
    proficiency: "advanced",
    experience: "Since 2015 — 8 years",
    projects: ["ICCES", "Private Server"],
    yearIntroduced: 2015,
  },
  {
    id: "mysql",
    name: "MySQL/Database",
    icon: Database,
    category: "backend",
    proficiency: "advanced",
    experience: "Since 2015 — 8 years",
    projects: ["ICCES", "Private Server"],
    yearIntroduced: 2015,
  },
  {
    id: "authentication",
    name: "Auth Systems",
    icon: Shield,
    category: "backend",
    proficiency: "intermediate",
    experience: "Since 2020 — 5 years",
    projects: ["ICCES"],
    yearIntroduced: 2020,
  },

  // Game Development
  {
    id: "unity",
    name: "Unity",
    icon: Gamepad2,
    category: "game",
    proficiency: "expert",
    experience: "Since 2021 — 4 years",
    projects: ["Esco Slot Pharmachine", "Cell Processing Isolator 3D"],
    yearIntroduced: 2021,
  },
  {
    id: "csharp",
    name: "C#",
    icon: Code,
    category: "game",
    proficiency: "advanced",
    experience: "Since 2021 — 4 years",
    projects: ["Esco Slot Pharmachine", "Cell Processing Isolator 3D"],
    yearIntroduced: 2021,
  },
  {
    id: "3d-graphics",
    name: "3D Graphics",
    icon: Layers,
    category: "game",
    proficiency: "intermediate",
    experience: "Since 2022 — 3 years",
    projects: ["Cell Processing Isolator 3D"],
    yearIntroduced: 2022,
  },
  {
    id: "2d-game-dev",
    name: "2D Game Dev",
    icon: Monitor,
    category: "game",
    proficiency: "advanced",
    experience: "Since 2021 — 4 years",
    projects: ["Esco Slot Pharmachine"],
    yearIntroduced: 2021,
  },

  // System & Infrastructure
  {
    id: "port-forwarding",
    name: "Port Forwarding",
    icon: Network,
    category: "system",
    proficiency: "intermediate",
    experience: "Since 2015 — 10 years",
    projects: ["Private Server"],
    yearIntroduced: 2015,
  },
  {
    id: "xampp",
    name: "XAMPP/Local Server",
    icon: Server,
    category: "system",
    proficiency: "advanced",
    experience: "Since 2015 — 8 years",
    projects: ["ICCES", "Private Server"],
    yearIntroduced: 2015,
  },
  {
    id: "pc-hardware",
    name: "PC Hardware",
    icon: Cpu,
    category: "system",
    proficiency: "intermediate",
    experience: "Since 2017 — 8 years",
    projects: ["PC Building", "Troubleshooting"],
    yearIntroduced: 2017,
  },

  // Design & Tools
  {
    id: "adobe-tools",
    name: "Adobe Flash",
    icon: Palette,
    category: "design",
    proficiency: "intermediate",
    experience: "Since 2019 — 6 years",
    projects: ["Animation Competition"],
    yearIntroduced: 2019,
  },
  {
    id: "modding",
    name: "Game Modding",
    icon: Wrench,
    category: "tools",
    proficiency: "intermediate",
    experience: "Since 2017 — 8 years",
    projects: ["Minecraft Mods", "Cryofall"],
    yearIntroduced: 2017,
  },
  {
    id: "git",
    name: "Git/GitHub",
    icon: GitBranch,
    category: "tools",
    proficiency: "advanced",
    experience: "Since 2021 — 4 years",
    projects: ["All Projects"],
    yearIntroduced: 2021,
  },
  {
    id: "android",
    name: "Android Dev",
    icon: Smartphone,
    category: "tools",
    proficiency: "intermediate",
    experience: "Since 2022 — 3 years",
    projects: ["Esco Slot Pharmachine"],
    yearIntroduced: 2022,
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    icon: Hammer,
    category: "design",
    proficiency: "beginner",
    experience: "Since 2024 — 1+ years",
    projects: ["Resin Printing"],
    yearIntroduced: 2024,
  },
]

const CATEGORY_INFO = {
  frontend: { label: "Frontend", color: "var(--accent-cyan)" },
  backend: { label: "Backend", color: "var(--accent-purple)" },
  game: { label: "Game Dev", color: "var(--accent-gold)" },
  system: { label: "System", color: "var(--accent-cyan)" },
  design: { label: "Design", color: "var(--accent-purple)" },
  tools: { label: "Tools", color: "var(--accent-gold)" },
}

const PROFICIENCY_MAP = {
  beginner: { label: "Beginner", width: 25, color: "rgba(255, 255, 255, 0.4)" },
  intermediate: { label: "Intermediate", width: 55, color: "rgba(255, 255, 255, 0.6)" },
  advanced: { label: "Advanced", width: 80, color: "rgba(255, 255, 255, 0.85)" },
  expert: { label: "Expert", width: 100, color: "rgba(255, 255, 255, 1)" },
}

export default function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  // Group skills by category
  const groupedSkills = SKILL_TREE.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="font-sans">
      <h3 className="mb-4 font-serif text-sm font-bold uppercase tracking-[0.22em] text-ink">
        Interactive Skill Tree
      </h3>

      {/* Skill Grid by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, skills]) => {
          const catInfo = CATEGORY_INFO[category as keyof typeof CATEGORY_INFO]
          return (
            <motion.div key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-0.5 w-8 rounded-full"
                  style={{ background: catInfo.color }}
                />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: catInfo.color }}>
                  {catInfo.label}
                </h4>
              </div>

              {/* Skill Nodes */}
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                {skills.map((skill) => {
                  const Icon = skill.icon
                  const prof = PROFICIENCY_MAP[skill.proficiency]

                  return (
                    <motion.button
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden rounded-lg border p-3 text-left transition-all hover:shadow-lg"
                      style={{
                        borderColor: catInfo.color,
                        background: "color-mix(in srgb, var(--bg-void) 60%, transparent)",
                      }}
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                        style={{ background: catInfo.color, filter: "blur(12px)" }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="mb-2 flex items-center justify-between">
                          <Icon size={18} style={{ color: catInfo.color }} />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-soft">
                            {skill.proficiency}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-ink">{skill.name}</p>

                        {/* Mini proficiency bar */}
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/40">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: catInfo.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${prof.width}%` }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          />
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ background: "color-mix(in srgb, var(--bg-void) 80%, transparent)" }}
            onClick={() => setSelectedSkill(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md rounded-lg border p-6 sm:p-8"
              style={{ borderColor: "var(--parchment-edge)", background: "var(--hud-bg)" }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded border"
                style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
              >
                <X size={14} />
              </button>

              {/* Header */}
              <div className="mb-4 flex items-start gap-3">
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: CATEGORY_INFO[selectedSkill.category].color,
                    color: "var(--bg-void)",
                  }}
                >
                  {<selectedSkill.icon size={24} />}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink">{selectedSkill.name}</h2>
                  <p
                    className="text-xs uppercase tracking-wider font-mono"
                    style={{ color: CATEGORY_INFO[selectedSkill.category].color }}
                  >
                    {CATEGORY_INFO[selectedSkill.category].label}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-4 rounded-md border p-3" style={{ borderColor: "var(--parchment-edge)" }}>
                <p className="text-xs uppercase tracking-wider text-ink-soft font-mono">Experience</p>
                <p className="mt-1 text-sm text-ink">{selectedSkill.experience}</p>
              </div>

              {/* Proficiency */}
              <div className="mb-4">
                <p className="mb-2 text-xs uppercase tracking-wider text-ink-soft font-mono">
                  Proficiency
                </p>
                <div className="mb-2 h-2 overflow-hidden rounded-full border" style={{ borderColor: "var(--parchment-edge)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: CATEGORY_INFO[selectedSkill.category].color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${PROFICIENCY_MAP[selectedSkill.proficiency].width}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-ink">{PROFICIENCY_MAP[selectedSkill.proficiency].label}</p>
              </div>

              {/* Projects Used In */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-ink-soft font-mono">
                  Projects Used In
                </p>
                <div className="space-y-1">
                  {selectedSkill.projects.map((project) => (
                    <div
                      key={project}
                      className="rounded-md border px-2 py-1"
                      style={{ borderColor: "var(--accent-gold)", background: "color-mix(in srgb, var(--accent-gold) 12%, transparent)" }}
                    >
                      <p className="text-xs text-ink-soft">{project}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useRef, useEffect } from "react"
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
  frontend: { label: "Frontend", color: "#00d9ff" },
  backend: { label: "Backend", color: "#ff006e" },
  game: { label: "Game Dev", color: "#ffbe0b" },
  system: { label: "System", color: "#00d9ff" },
  design: { label: "Design", color: "#ff006e" },
  tools: { label: "Tools", color: "#ffbe0b" },
}

const PROFICIENCY_MAP = {
  beginner: { label: "Beginner", width: 25, color: "rgba(255, 255, 255, 0.4)" },
  intermediate: { label: "Intermediate", width: 55, color: "rgba(255, 255, 255, 0.6)" },
  advanced: { label: "Advanced", width: 80, color: "rgba(255, 255, 255, 0.85)" },
  expert: { label: "Expert", width: 100, color: "rgba(255, 255, 255, 1)" },
}

// Cyberpunk glow animation styles
const glowStyle = (color: string) => ({
  textShadow: `0 0 10px ${color}, 0 0 20px ${color}88`,
  boxShadow: `0 0 20px ${color}, inset 0 0 10px ${color}44`,
})

export default function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
      {/* Scanline effect overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-5" style={{
        backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)"
      }} />

      <style>{`
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes cyber-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        .cyber-node {
          animation: cyber-pulse 3s ease-in-out infinite;
        }
        .cyber-node:hover {
          animation: cyber-glow 0.3s ease-in-out;
        }
      `}</style>

      <h3 className="mb-6 font-mono text-sm font-bold uppercase tracking-[0.22em]" style={{ color: "#00d9ff", textShadow: "0 0 10px #00d9ff" }}>
        ▼ NEURAL SKILL MATRIX
      </h3>

      {/* Skill Grid by Category */}
      <div ref={containerRef} className="space-y-8">
        {Object.entries(groupedSkills).map(([category, skills]) => {
          const catInfo = CATEGORY_INFO[category as keyof typeof CATEGORY_INFO]
          return (
            <motion.div 
              key={category} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Category header with glowing underline */}
              <div className="mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: catInfo.color, boxShadow: `0 0 10px ${catInfo.color}` }} />
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: catInfo.color, textShadow: `0 0 8px ${catInfo.color}88` }}>
                  {catInfo.label} PROTOCOL
                </h4>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${catInfo.color}, transparent)` }} />
              </div>

              {/* Skill Nodes - Cyberpunk Grid */}
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill, idx) => {
                  const Icon = skill.icon
                  const prof = PROFICIENCY_MAP[skill.proficiency]

                  return (
                    <motion.button
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08, duration: 0.3 }}
                      className="cyber-node relative group overflow-hidden transition-all duration-300"
                      style={{
                        border: `2px solid ${catInfo.color}`,
                        background: "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.8), rgba(0,0,0,0.95))",
                        boxShadow: `0 0 15px ${catInfo.color}44, inset 0 0 15px ${catInfo.color}22`,
                        padding: "12px",
                        borderRadius: "2px",
                      }}
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300" style={{ background: catInfo.color, filter: "blur(20px)" }} />
                      
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />
                      <div className="absolute top-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />
                      <div className="absolute bottom-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />
                      <div className="absolute bottom-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="mb-3 flex items-center justify-between">
                          <Icon size={16} style={{ color: catInfo.color, filter: "drop-shadow(0 0 4px " + catInfo.color + ")" }} />
                          <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: catInfo.color, opacity: 0.7 }}>
                            {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white mb-2" style={{ textShadow: "0 0 4px rgba(0,0,0,0.8)" }}>{skill.name}</p>

                        {/* Proficiency bar with glow */}
                        <div className="h-1 overflow-hidden" style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${catInfo.color}44` }}>
                          <motion.div
                            className="h-full"
                            style={{ 
                              background: catInfo.color,
                              boxShadow: `0 0 8px ${catInfo.color}`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${prof.width}%` }}
                            transition={{ delay: 0.2 + idx * 0.08, duration: 0.8, ease: "easeOut" }}
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

      {/* Skill Details Modal - Cyberpunk Style */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
            style={{ background: "rgba(0, 0, 0, 0.85)" }}
            onClick={() => setSelectedSkill(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md p-6 sm:p-8"
              style={{
                border: `2px solid ${CATEGORY_INFO[selectedSkill.category].color}`,
                background: "radial-gradient(circle at 30% 30%, rgba(0,20,40,0.95), rgba(0,0,0,0.98))",
                boxShadow: `0 0 30px ${CATEGORY_INFO[selectedSkill.category].color}66, inset 0 0 20px ${CATEGORY_INFO[selectedSkill.category].color}22`,
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3" style={{ border: `2px solid ${CATEGORY_INFO[selectedSkill.category].color}` }} />
              <div className="absolute top-0 right-0 w-3 h-3" style={{ border: `2px solid ${CATEGORY_INFO[selectedSkill.category].color}` }} />
              <div className="absolute bottom-0 left-0 w-3 h-3" style={{ border: `2px solid ${CATEGORY_INFO[selectedSkill.category].color}` }} />
              <div className="absolute bottom-0 right-0 w-3 h-3" style={{ border: `2px solid ${CATEGORY_INFO[selectedSkill.category].color}` }} />

              {/* Close button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center hover:opacity-100 transition-opacity"
                style={{ color: CATEGORY_INFO[selectedSkill.category].color }}
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <div
                  className="p-3 flex-shrink-0"
                  style={{
                    background: CATEGORY_INFO[selectedSkill.category].color,
                    color: "black",
                    boxShadow: `0 0 15px ${CATEGORY_INFO[selectedSkill.category].color}`,
                  }}
                >
                  {<selectedSkill.icon size={24} />}
                </div>
                <div>
                  <h2 className="font-mono text-lg font-bold text-white mb-1" style={{ textShadow: `0 0 10px ${CATEGORY_INFO[selectedSkill.category].color}` }}>
                    {selectedSkill.name}
                  </h2>
                  <p className="text-xs uppercase tracking-widest font-mono" style={{ color: CATEGORY_INFO[selectedSkill.category].color }}>
                    [{CATEGORY_INFO[selectedSkill.category].label}]
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-4 p-3" style={{ border: `1px solid ${CATEGORY_INFO[selectedSkill.category].color}44`, background: "rgba(0,0,0,0.4)" }}>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-mono mb-1">─ Experience</p>
                <p className="text-sm text-gray-200 font-mono">{selectedSkill.experience}</p>
              </div>

              {/* Proficiency */}
              <div className="mb-4">
                <p className="mb-2 text-xs uppercase tracking-wider text-gray-400 font-mono">─ Proficiency Level</p>
                <div className="mb-2 h-2 overflow-hidden" style={{ border: `1px solid ${CATEGORY_INFO[selectedSkill.category].color}44`, background: "rgba(0,0,0,0.6)" }}>
                  <motion.div
                    className="h-full"
                    style={{ 
                      background: CATEGORY_INFO[selectedSkill.category].color,
                      boxShadow: `0 0 10px ${CATEGORY_INFO[selectedSkill.category].color}`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${PROFICIENCY_MAP[selectedSkill.proficiency].width}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-gray-400 font-mono">{PROFICIENCY_MAP[selectedSkill.proficiency].label}</p>
              </div>

              {/* Projects Used In */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-gray-400 font-mono">─ Active In Projects</p>
                <div className="space-y-1">
                  {selectedSkill.projects.map((project) => (
                    <div
                      key={project}
                      className="px-2 py-1 text-xs text-gray-300 font-mono"
                      style={{
                        border: `1px solid ${CATEGORY_INFO[selectedSkill.category].color}44`,
                        background: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {'>'} {project}
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

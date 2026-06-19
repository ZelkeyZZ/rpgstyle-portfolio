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
  Lock,
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
  prerequisites?: string[]
  position?: { x: number; y: number }
}

// Flowchart-style positioning constants
const NODE_WIDTH = 100
const NODE_HEIGHT = 100
const H_GAP = 50  // Horizontal gap between nodes in same row
const V_GAP = 140  // Vertical gap between rows

// Map skills with flowchart positions
const SKILL_TREE: Skill[] = [
  // FRONTEND BRANCH (row 0)
  {
    id: "html",
    name: "HTML",
    icon: Code,
    category: "frontend",
    proficiency: "expert",
    experience: "Since 2015 — 10 years",
    projects: ["ICCES", "Barcode Label Generator", "My Portfolio"],
    yearIntroduced: 2015,
    prerequisites: [],
    position: { x: 0, y: 0 },
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
    prerequisites: ["html"],
    position: { x: 2, y: 0 },
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
    prerequisites: ["javascript"],
    position: { x: 4, y: 0 },
  },
  
  // FRONTEND BRANCH - CSS BRANCH (row 1, branching from HTML)
  {
    id: "css",
    name: "CSS",
    icon: Palette,
    category: "frontend",
    proficiency: "advanced",
    experience: "Since 2024 — 1+ years",
    projects: ["Barcode Label Generator", "My Portfolio"],
    yearIntroduced: 2024,
    prerequisites: ["html"],
    position: { x: 0, y: 1 },
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
    prerequisites: ["css"],
    position: { x: 2, y: 1 },
  },

  // BACKEND BRANCH (row 2)
  {
    id: "php",
    name: "PHP",
    icon: Server,
    category: "backend",
    proficiency: "advanced",
    experience: "Since 2015 — 8 years",
    projects: ["ICCES", "Private Server"],
    yearIntroduced: 2015,
    prerequisites: [],
    position: { x: 0, y: 2 },
  },
  {
    id: "xampp",
    name: "XAMPP/Local Server",
    icon: Server,
    category: "backend",
    proficiency: "advanced",
    experience: "Since 2015 — 8 years",
    projects: ["ICCES", "Private Server"],
    yearIntroduced: 2015,
    prerequisites: [],
    position: { x: 2, y: 2 },
  },
  {
    id: "port-forwarding",
    name: "Port Forwarding",
    icon: Network,
    category: "backend",
    proficiency: "intermediate",
    experience: "Since 2015 — 10 years",
    projects: ["Private Server"],
    yearIntroduced: 2015,
    prerequisites: ["xampp"],
    position: { x: 4, y: 2 },
  },

  // BACKEND BRANCH - DB ROW (row 3, below PHP/XAMPP)
  {
    id: "mysql",
    name: "MySQL/Database",
    icon: Database,
    category: "backend",
    proficiency: "advanced",
    experience: "Since 2015 — 8 years",
    projects: ["ICCES", "Private Server"],
    yearIntroduced: 2015,
    prerequisites: ["xampp"],
    position: { x: 2, y: 3 },
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
    prerequisites: ["php", "mysql"],
    position: { x: 3.5, y: 3 },
  },

  // GAME DEV BRANCH (row 4)
  {
    id: "csharp",
    name: "C#",
    icon: Code,
    category: "game",
    proficiency: "advanced",
    experience: "Since 2021 — 4 years",
    projects: ["Esco Slot Pharmachine", "Cell Processing Isolator 3D"],
    yearIntroduced: 2021,
    prerequisites: [],
    position: { x: 0, y: 4 },
  },
  {
    id: "unity",
    name: "Unity ENGINE",
    icon: Gamepad2,
    category: "game",
    proficiency: "expert",
    experience: "Since 2021 — 4 years",
    projects: ["Esco Slot Pharmachine", "Cell Processing Isolator 3D"],
    yearIntroduced: 2021,
    prerequisites: ["csharp"],
    position: { x: 2, y: 4 },
  },
  {
    id: "2d-game-dev",
    name: "2D",
    icon: Monitor,
    category: "game",
    proficiency: "advanced",
    experience: "Since 2021 — 4 years",
    projects: ["Esco Slot Pharmachine"],
    yearIntroduced: 2021,
    prerequisites: ["unity"],
    position: { x: 4, y: 4 },
  },

  // GAME DEV BRANCH - 3D/ANDROID (row 5, below Unity/2D)
  {
    id: "3d-graphics",
    name: "3D",
    icon: Layers,
    category: "game",
    proficiency: "intermediate",
    experience: "Since 2022 — 3 years",
    projects: ["Cell Processing Isolator 3D"],
    yearIntroduced: 2022,
    prerequisites: ["unity"],
    position: { x: 2, y: 5 },
  },
  {
    id: "android",
    name: "Android",
    icon: Smartphone,
    category: "tools",
    proficiency: "intermediate",
    experience: "Since 2022 — 3 years",
    projects: ["Esco Slot Pharmachine"],
    yearIntroduced: 2022,
    prerequisites: ["unity"],
    position: { x: 4, y: 5 },
  },

  // SYSTEM BRANCH (row 6)
  {
    id: "pc-hardware",
    name: "PC Hardware",
    icon: Cpu,
    category: "system",
    proficiency: "intermediate",
    experience: "Since 2017 — 8 years",
    projects: ["PC Building", "Troubleshooting"],
    yearIntroduced: 2017,
    prerequisites: [],
    position: { x: 0, y: 6 },
  },

  // TOOLS & DESIGN BRANCH (row 7)
  {
    id: "modding",
    name: "Game Modding",
    icon: Wrench,
    category: "tools",
    proficiency: "intermediate",
    experience: "Since 2017 — 8 years",
    projects: ["Minecraft Mods", "Cryofall"],
    yearIntroduced: 2017,
    prerequisites: [],
    position: { x: 0, y: 7 },
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
    prerequisites: [],
    position: { x: 2, y: 7 },
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
    prerequisites: [],
    position: { x: 4, y: 7 },
  },
  {
    id: "adobe-tools",
    name: "Adobe Flash",
    icon: Palette,
    category: "design",
    proficiency: "intermediate",
    experience: "Since 2019 — 6 years",
    projects: ["Animation Competition"],
    yearIntroduced: 2019,
    prerequisites: [],
    position: { x: 6, y: 7 },
  },
]

// Branch information for visual grouping
const BRANCHES: Array<{
  name: string
  category: string
  color: string
  yStart: number
  yEnd: number
}> = [
  { name: "FRONTEND", category: "frontend", color: "#1f8a8a", yStart: -0.5, yEnd: 1.5 },
  { name: "BACKEND", category: "backend", color: "#ff006e", yStart: 1.7, yEnd: 3.7 },
  { name: "GAME DEV", category: "game", color: "#7a5cc4", yStart: 3.9, yEnd: 5.7 },
  { name: "SYSTEM", category: "system", color: "#ffffff", yStart: 5.9, yEnd: 6.5 },
  { name: "TOOLS & DESIGN", category: "tools", color: "#2df16f", yStart: 6.7, yEnd: 7.7 },
]

const CATEGORY_INFO = {
  frontend: { label: "Frontend", color: "#1f8a8a" },
  backend: { label: "Backend", color: "#ff006e" },
  game: { label: "Game Dev", color: "#7a5cc4" },
  system: { label: "System", color: "#ffffff" },
  design: { label: "Design", color: "#2df16f" },
  tools: { label: "Tools", color: "#ffbe0b" },
}

const PROFICIENCY_MAP = {
  beginner: { label: "Beginner", width: 25, color: "rgba(255, 255, 255, 0.4)" },
  intermediate: { label: "Intermediate", width: 55, color: "rgba(255, 255, 255, 0.6)" },
  advanced: { label: "Advanced", width: 80, color: "rgba(255, 255, 255, 0.85)" },
  expert: { label: "Expert", width: 100, color: "rgba(255, 255, 255, 1)" },
}

// Spacing for flowchart layout
const GRID_X = 80  // Horizontal grid unit (NODE_WIDTH + H_GAP)
const GRID_Y = 150  // Vertical grid unit (NODE_HEIGHT + V_GAP)

export default function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set())
  const svgRef = useRef<SVGSVGElement>(null)

  // Get the color for a skill
  const getSkillColor = (skill: Skill) => CATEGORY_INFO[skill.category].color

  // Check if a skill's prerequisites are met
  const isSkillLocked = (skill: Skill, skillMap: Map<string, Skill>) => {
    if (!skill.prerequisites || skill.prerequisites.length === 0) return false
    return skill.prerequisites.some((prereqId) => {
      const prereqSkill = skillMap.get(prereqId)
      return prereqSkill ? isSkillLocked(prereqSkill, skillMap) : false
    })
  }

  // Highlight skill and its dependencies
  const handleSkillHover = (skill: Skill, skillMap: Map<string, Skill>) => {
    const highlighted = new Set<string>()
    highlighted.add(skill.id)

    // Add prerequisites
    const addPrereqs = (skillId: string) => {
      const skill = skillMap.get(skillId)
      if (skill?.prerequisites) {
        skill.prerequisites.forEach((prereqId) => {
          if (!highlighted.has(prereqId)) {
            highlighted.add(prereqId)
            addPrereqs(prereqId)
          }
        })
      }
    }

    // Add dependents
    const addDependents = (skillId: string) => {
      skillMap.forEach((s) => {
        if (s.prerequisites?.includes(skillId) && !highlighted.has(s.id)) {
          highlighted.add(s.id)
          addDependents(s.id)
        }
      })
    }

    addPrereqs(skill.id)
    addDependents(skill.id)
    setHighlightedIds(highlighted)
  }

  const skillMap = new Map(SKILL_TREE.map((s) => [s.id, s]))

  return (
    <div className="font-sans">
      <style>{`
        @keyframes branch-pulse {
          0%, 100% { stroke-width: 1.5px; filter: drop-shadow(0 0 2px currentColor); }
          50% { stroke-width: 2px; filter: drop-shadow(0 0 4px currentColor); }
        }
        .branch-line { animation: branch-pulse 2.5s ease-in-out infinite; }
        @keyframes cyber-node-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.15); }
        }
        .cyber-node-active { animation: cyber-node-glow 0.4s ease-out; }
      `}</style>

      <h3 className="mb-6 font-mono text-sm font-bold uppercase tracking-[0.22em]" style={{ color: "#00d9ff", textShadow: "0 0 10px #00d9ff" }}>
        ▼ BRANCHING NEURAL MATRIX
      </h3>

      {/* Flowchart Tree Container */}
      <div className="relative overflow-x-auto pb-4">
        <div className="relative" style={{ minWidth: "max-content", minHeight: "1200px" }}>
          {/* Branch Separators and Labels */}
          {BRANCHES.map((branch, idx) => (
            <div key={branch.name} className="absolute w-full pointer-events-none" style={{ top: `${branch.yStart * GRID_Y}px`, height: `${(branch.yEnd - branch.yStart) * GRID_Y}px` }}>
              {/* Branch Background */}
              <div className="absolute inset-0 opacity-5" style={{ background: branch.color }} />
              
              {/* Branch Label */}
              <div className="absolute left-0 top-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: branch.color, textShadow: `0 0 8px ${branch.color}88` }}>
                {branch.name}
              </div>

              {/* Branch Divider Line */}
              {idx < BRANCHES.length - 1 && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${branch.color}44, transparent)`,
                  }}
                />
              )}
            </div>
          ))}

          {/* Connection Lines SVG - Straight bars and vertical drops */}
          <svg
            ref={svgRef}
            className="absolute top-0 left-0 pointer-events-none"
            width="100%"
            height="1200"
            style={{ filter: "drop-shadow(0 0 8px rgba(46, 230, 230, 0.3))" }}
          >
            <defs>
              <marker id="arrowCyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#2ee6e6" opacity="0.6" />
              </marker>
              <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#a974ff" opacity="0.6" />
              </marker>
              <marker id="arrowGold" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#f5c451" opacity="0.6" />
              </marker>
            </defs>
            {/* Draw straight connection bars (horizontal and vertical) */}
            {SKILL_TREE.map((skill) => {
              if (!skill.prerequisites || skill.prerequisites.length === 0) return null
              return skill.prerequisites.map((prereqId) => {
                const prereqSkill = skillMap.get(prereqId)
                if (!prereqSkill || !skill.position || !prereqSkill.position) return null

                const fromX = prereqSkill.position.x * GRID_X + NODE_WIDTH / 2
                const fromY = prereqSkill.position.y * GRID_Y + NODE_HEIGHT / 2
                const toX = skill.position.x * GRID_X + NODE_WIDTH / 2
                const toY = skill.position.y * GRID_Y + NODE_HEIGHT / 2

                const isHighlighted = highlightedIds.has(skill.id) || highlightedIds.has(prereqId)
                const lineColor = highlightedIds.size > 0 && !isHighlighted ? "rgba(46, 230, 230, 0.15)" : getSkillColor(prereqSkill)
                const strokeWidth = highlightedIds.size > 0 && isHighlighted ? 8 : 6

                // Calculate connection path: horizontal from source, vertical to target, horizontal to destination
                const midX = (fromX + toX) / 2

                if (skill.position.y === prereqSkill.position.y) {
                  // Same row - straight horizontal line
                  return (
                    <line
                      key={`${prereqId}-${skill.id}`}
                      x1={fromX}
                      y1={fromY}
                      x2={toX}
                      y2={toY}
                      stroke={lineColor}
                      strokeWidth={strokeWidth}
                      className={isHighlighted ? "branch-line" : ""}
                    />
                  )
                } else {
                  // Different rows - L-shaped path (horizontal then vertical)
                  const pathData = `M ${fromX} ${fromY} L ${toX} ${fromY} L ${toX} ${toY}`
                  return (
                    <path
                      key={`${prereqId}-${skill.id}`}
                      d={pathData}
                      stroke={lineColor}
                      strokeWidth={strokeWidth}
                      fill="none"
                      className={isHighlighted ? "branch-line" : ""}
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  )
                }
              })
            })}
          </svg>

          {/* Skill Nodes */}
          <div className="relative" style={{ height: "1200px" }}>
            {SKILL_TREE.map((skill, idx) => {
              if (!skill.position) return null
              const isLocked = isSkillLocked(skill, skillMap)
              const isHighlighted = highlightedIds.size === 0 || highlightedIds.has(skill.id)
              const catInfo = CATEGORY_INFO[skill.category]

              return (
                <motion.button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => handleSkillHover(skill, skillMap)}
                  onMouseLeave={() => setHighlightedIds(new Set())}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="cyber-node-active absolute group overflow-hidden transition-all duration-300"
                  style={{
                    left: `${skill.position.x * GRID_X}px`,
                    top: `${skill.position.y * GRID_Y}px`,
                    width: `${NODE_WIDTH}px`,
                    height: `${NODE_HEIGHT}px`,
                    border: `2px solid ${catInfo.color}`,
                    background: isLocked 
                      ? "radial-gradient(circle at 30% 30%, rgba(100,80,100,0.6), rgba(40,40,60,0.8))"
                      : "radial-gradient(circle at 30% 30%, rgba(0,40,60,0.8), rgba(0,0,20,0.95))",
                    boxShadow: isHighlighted 
                      ? `0 0 20px ${catInfo.color}, inset 0 0 15px ${catInfo.color}44`
                      : `0 0 10px ${catInfo.color}22, inset 0 0 8px ${catInfo.color}11`,
                    opacity: isHighlighted ? 1 : 0.5,
                  }}
                >
                  {/* Inner glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300" 
                    style={{ background: catInfo.color, filter: "blur(20px)" }} 
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />
                  <div className="absolute top-0 right-0 w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />
                  <div className="absolute bottom-0 left-0 w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />
                  <div className="absolute bottom-0 right-0 w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ border: `1px solid ${catInfo.color}` }} />

                  {/* Lock icon overlay for locked skills */}
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40">
                      <Lock size={20} style={{ color: catInfo.color, opacity: 0.8 }} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-2">
                    <div className="mb-1 flex items-center justify-center">
                      {skill.icon && <skill.icon size={18} style={{ color: isLocked ? "#aaa" : catInfo.color, filter: `drop-shadow(0 0 3px ${catInfo.color})` }} />}
                    </div>
                    <p 
                      className="text-[10px] font-bold text-center leading-tight" 
                      style={{ 
                        color: isLocked ? "#999" : "#fff",
                        textShadow: `0 0 3px ${catInfo.color}88`,
                      }}
                    >
                      {skill.name}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Skill Details Modal */}
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
              className="relative w-full max-w-md max-h-[80vh] overflow-y-auto p-6 sm:p-8"
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

              {/* Prerequisites */}
              {selectedSkill.prerequisites && selectedSkill.prerequisites.length > 0 && (
                <div className="mb-4 p-3" style={{ border: `1px solid ${CATEGORY_INFO[selectedSkill.category].color}44`, background: "rgba(0,0,0,0.4)" }}>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-mono mb-2">─ Prerequisites</p>
                  <div className="space-y-1">
                    {selectedSkill.prerequisites.map((prereqId) => {
                      const prereq = skillMap.get(prereqId)
                      return (
                        <div key={prereqId} className="text-xs text-gray-300 font-mono flex items-center gap-2">
                          <span style={{ color: CATEGORY_INFO[prereq?.category || "frontend"].color }}>◆</span>
                          {prereq?.name}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

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

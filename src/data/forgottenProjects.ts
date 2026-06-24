export type ForgottenProjectStatus = "abandoned" | "cancelled" | "lost" | "prototype"

export interface ForgottenProject {
  id: string
  title: string
  year: string
  status: ForgottenProjectStatus
  summary: string
  reasonAbandoned: string
  lessonsLearned: string[]
  technologies: string[]
  evidence?: {
    screenshots?: string[]
    videos?: string[]
    notes?: string
  }
}

export const forgottenProjects: ForgottenProject[] = [
  {
    id: "fp1",
    title: "Dungeon Master's Companion",
    year: "2019",
    status: "abandoned",
    summary: "A digital tool for tabletop RPG dungeon masters to manage encounters, NPCs, and campaign notes in real-time during play sessions.",
    reasonAbandoned: "Scope grew beyond initial planning—attempted to add real-time collaboration features which exposed architectural limitations. Pivoted efforts to other projects before establishing proper MVP.",
    lessonsLearned: [
      "MVP discipline is critical; feature creep killed momentum early",
      "Architecture decisions made early cascade throughout project—rushed foundation caused technical debt",
      "Tabletop community has established tools (Roll20, Foundry); differentiation would require significant investment",
      "Real-time sync is harder than anticipated; websocket management required more expertise than initially estimated",
    ],
    technologies: ["React", "Node.js", "WebSocket", "MongoDB"],
  },
  {
    id: "fp2",
    title: "Procedural Dungeon Generator",
    year: "2020",
    status: "prototype",
    summary: "A procedural generation system for creating infinite game-ready dungeon layouts with walkable paths, room placement, and enemy spawn logic.",
    reasonAbandoned: "Proof of concept worked but the generated dungeons lacked coherent design—had no narrative flow or intentional pacing. Moving procedural generation to production would require procedural storytelling which was out of scope.",
    lessonsLearned: [
      "Procedural generation ≠ good game design; algorithmic output lacks human intention",
      "Spawn logic without narrative design creates confusing player experiences",
      "Consider the full feature chain early; generation alone doesn't solve level design",
    ],
    technologies: ["C#", "Unity", "Graph Theory", "Algorithms"],
  },
  {
    id: "fp3",
    title: "Source Code Archaeology",
    year: "2018",
    status: "lost",
    summary: "A git visualization tool showing project evolution over time through commit history as an interactive 3D timeline.",
    reasonAbandoned: "Hard drive failed; backup strategy was inadequate. The project existed in a pre-GitHub era and version control was locally managed.",
    lessonsLearned: [
      "Backup strategy is non-negotiable; losing months of work is preventable",
      "Cloud storage wasn't adopted early enough in career—this was humbling",
      "Learned discipline around version control redundancy that shaped future practices",
    ],
    technologies: ["Electron", "Three.js", "Git", "JavaScript"],
    evidence: {
      notes: "Project concept was to visualize git history as a 3D branching timeline. Early screenshots showed promise but weren't preserved.",
    },
  },
  {
    id: "fp4",
    title: "Language Learning Game",
    year: "2021",
    status: "cancelled",
    summary: "Mobile game teaching vocabulary through grid-based word puzzles with spaced repetition and daily challenges.",
    reasonAbandoned: "Classroom research partnership fell through due to institutional approval delays. Without research backing and user base, continuing felt directionless. App store competition in language learning is saturated.",
    lessonsLearned: [
      "B2B partnerships introduce complexity; institutional timelines are much longer than anticipated",
      "Educational market is highly competitive; differentiation requires research validation",
      "Launched on app store but monetization strategy was unclear; free-to-play market is brutal without backing",
      "Constraints breed creativity; working within educational requirements forced elegant design decisions",
    ],
    technologies: ["Flutter", "Firebase", "Dart", "Spaced Repetition Algorithm"],
  },
  {
    id: "fp5",
    title: "Weather Prediction Dashboard",
    year: "2022",
    status: "abandoned",
    summary: "Machine learning weather forecasting system ingesting NOAA data with interactive map visualizations and historical pattern analysis.",
    reasonAbandoned: "ML model accuracy plateaued below useful thresholds; feature engineering hit diminishing returns. Real-time weather APIs became more accessible, reducing competitive advantage.",
    lessonsLearned: [
      "ML projects require different success metrics; 85% accuracy isn't good enough if end-users expect 95%+",
      "Feature engineering has limits; garbage data in, garbage predictions out",
      "Sometimes buying an existing API is better ROI than building from scratch",
      "Data science requires more domain expertise than anticipated; weather meteorology knowledge gap",
    ],
    technologies: ["Python", "TensorFlow", "React", "NOAA API"],
  },
]

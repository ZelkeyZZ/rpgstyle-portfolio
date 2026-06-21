export type AchievementId = string

export interface Achievement {
  id: AchievementId
  name: string
  description: string
  icon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  secret: boolean
  unlockedAt?: number
}

export const ACHIEVEMENTS: Record<AchievementId, Omit<Achievement, "unlockedAt">> = {
  // Main Achievements (viewing portfolio sections)
  first_visit: {
    id: "first_visit",
    name: "Welcome Traveler",
    description: "Visited the portfolio for the first time",
    icon: "🌟",
    rarity: "common",
    secret: false,
  },
  view_overview: {
    id: "view_overview",
    name: "Character Profile",
    description: "Viewed your character overview and lore",
    icon: "📜",
    rarity: "common",
    secret: false,
  },
  view_attributes: {
    id: "view_attributes",
    name: "Stat Tracker",
    description: "Explored the attribute matrix",
    icon: "📊",
    rarity: "common",
    secret: false,
  },
  view_skills: {
    id: "view_skills",
    name: "Skill Analyst",
    description: "Viewed the branching neural matrix (skill tree)",
    icon: "🧠",
    rarity: "common",
    secret: false,
  },
  view_achievements: {
    id: "view_achievements",
    name: "Achievement Hunter",
    description: "Discovered the achievements tab",
    icon: "🏆",
    rarity: "uncommon",
    secret: false,
  },

  // Project-based Achievements
  first_production_project: {
    id: "first_production_project",
    name: "First Production Project",
    description: "Viewed the ICCES project - your first real-world application",
    icon: "🚀",
    rarity: "rare",
    secret: false,
  },
  unity_developer: {
    id: "unity_developer",
    name: "Unity Developer",
    description: "Explored Unity game development projects",
    icon: "🎮",
    rarity: "rare",
    secret: false,
  },
  built_private_server: {
    id: "built_private_server",
    name: "Server Architect",
    description: "Discovered the private server project",
    icon: "🖥️",
    rarity: "rare",
    secret: false,
  },
  full_stack_master: {
    id: "full_stack_master",
    name: "Full Stack Developer",
    description: "Viewed a full-stack application project",
    icon: "🔗",
    rarity: "rare",
    secret: false,
  },
  portfolio_builder: {
    id: "portfolio_builder",
    name: "Portfolio Creator",
    description: "Built this portfolio in React and Three Fiber",
    icon: "💻",
    rarity: "epic",
    secret: false,
  },

  // Skill Tree Achievements
  explore_frontend: {
    id: "explore_frontend",
    name: "Frontend Specialist",
    description: "Hovered over all skills in the Frontend branch",
    icon: "🎨",
    rarity: "uncommon",
    secret: false,
  },
  explore_backend: {
    id: "explore_backend",
    name: "Backend Expert",
    description: "Hovered over all skills in the Backend branch",
    icon: "⚙️",
    rarity: "uncommon",
    secret: false,
  },
  explore_gamedev: {
    id: "explore_gamedev",
    name: "Game Developer",
    description: "Hovered over all skills in the Game Dev branch",
    icon: "👾",
    rarity: "uncommon",
    secret: false,
  },
  explore_system: {
    id: "explore_system",
    name: "System Admin",
    description: "Hovered over all skills in the System branch",
    icon: "🔧",
    rarity: "uncommon",
    secret: false,
  },
  master_of_all: {
    id: "master_of_all",
    name: "Master of All",
    description: "Hovered over all skills in every branch",
    icon: "⭐",
    rarity: "epic",
    secret: false,
  },

  // Tab Exploration Achievements
  tab_master: {
    id: "tab_master",
    name: "Tab Master",
    description: "Visited all four tabs in the About panel",
    icon: "📑",
    rarity: "uncommon",
    secret: false,
  },
  speed_runner: {
    id: "speed_runner",
    name: "Speed Runner",
    description: "Viewed all tabs within 30 seconds",
    icon: "⚡",
    rarity: "rare",
    secret: true,
  },

  // Secret Achievements
  easter_egg_collector: {
    id: "easter_egg_collector",
    name: "???",
    description: "???",
    icon: "🥚",
    rarity: "legendary",
    secret: true,
  },
  skill_click_master: {
    id: "skill_click_master",
    name: "???",
    description: "???",
    icon: "✨",
    rarity: "legendary",
    secret: true,
  },
  hidden_achievement: {
    id: "hidden_achievement",
    name: "???",
    description: "???",
    icon: "🎭",
    rarity: "legendary",
    secret: true,
  },

  // Engagement Achievements
  curious_explorer: {
    id: "curious_explorer",
    name: "Curious Explorer",
    description: "Clicked on 5 different skill nodes",
    icon: "🔍",
    rarity: "uncommon",
    secret: false,
  },
  thorough_reviewer: {
    id: "thorough_reviewer",
    name: "Thorough Reviewer",
    description: "Viewed all skill details (clicked 15+ skills)",
    icon: "📚",
    rarity: "rare",
    secret: false,
  },

  // Unlock all achievement (meta)
  achievement_completionist: {
    id: "achievement_completionist",
    name: "Completionist",
    description: "Unlocked all achievements (or most of them)",
    icon: "👑",
    rarity: "legendary",
    secret: false,
  },
}
export type ForgottenProjectStatus = "abandoned" | "cancelled" | "lost" | "prototype"

export type EvidenceItem = {
  type: "image" | "video"
  src: string
  caption?: string
}

export interface ForgottenProject {
  id: string
  title: string
  year: string
  status: ForgottenProjectStatus
  summary: string
  reasonAbandoned: string[]
  techChallenges: string[]
  lessonsLearned: string[]
  technologies: string[]
  evidence?: {
    media?: EvidenceItem[]
    notes?: string[]
  }
}

export const forgottenProjects: ForgottenProject[] = [
  {
    id: "fp1",
    title: "Untitled Game",
    year: "2024",
    status: "cancelled",
    summary: "An attempt to recreate the Fast & Furynuts minigame from Honkai: Star Rail using Unity. The goal was to understand and reproduce the game's physics-driven gameplay mechanics.",
    reasonAbandoned: [
      "The project never reached a functional state.",
      " Rather than continuing to build on an unstable foundation, development was paused with the intention of potentially restarting from scratch in the future."],
    techChallenges: [
      "The project relied heavily on physics interactions that I didn't fully understand at the time.",
      " While I was able to begin implementing systems, I struggled to accurately reproduce the movement and collision behaviors required for the gameplay loop.",
      " As development progressed, the codebase became increasingly experimental and difficult to continue."],
    lessonsLearned: [
      "Understanding the underlying mechanics is just as important as reproducing visuals.",
      "Physics-heavy games require planning and prototyping before full implementation.",
      "Sometimes restarting is more effective than patching a weak foundation.",
      "Technical limitations are often knowledge limitations, not tool limitations.",
    ],
    technologies: ["C#", "Unity", "2D Game", "PC"],
    evidence: {
      media: [
        { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/untitled-game.png?height=600&width=900", caption: "Testing Phase" }
      ],
      notes: [
        "Implemented Features",
        "Customizable clickable sprites",
        "Sound effect system",
        "Dynamic gradient backgrounds",
        "Hidden sprite-specific easter eggs",
        "Core clicker gameplay loop",
      ]
    }
  },
  {
    id: "fp2",
    title: "Tap It",
    year: "2024",
    status: "prototype",
    summary: "An Android clicker game inspired by Banana on Steam. Players repeatedly tap customizable objects to earn progress while discovering hidden interactions and visual variations",
    reasonAbandoned: [
      "Development slowed due to balancing a full-time job with personal projects. ",
      "As time passed, priorities shifted, development momentum was lost, and eventually my Google Play Developer account expired before the project could be released."],
    techChallenges: [
      "The biggest challenge was implementing mobile monetization. ",
      "I was able to complete the gameplay systems, but struggled to fully integrate ad-removal purchases and the monetization flow required for release.",
      " I also experimented with video backgrounds but never reached a stable implementation."],
    lessonsLearned: [
      "Shipping a product is more than gameplay programming.",
      "Monetization systems often require as much attention as gameplay features.",
      "Small projects still need clear timelines and milestones.",
      "Maintaining development momentum is one of the hardest parts of solo projects.",
    ],
    technologies: ["C#", "Unity", "2D Game", "Android"],
    evidence: {
      media: [
        { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/tapit.png?height=600&width=900", caption: "Gameplay" },
        { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/tapit-1.png?height=600&width=900", caption: "Source Code" },
      ],
      notes: [
        "Implemented Features",
        "Customizable clickable sprites",
        "Sound effect system",
        "Dynamic gradient backgrounds",
        "Hidden sprite-specific easter eggs",
        "Core clicker gameplay loop",
      ]
    }
  },
]

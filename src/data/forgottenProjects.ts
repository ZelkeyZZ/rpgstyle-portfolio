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
    title: "Tap It",
    year: "2019",
    status: "prototype",
    summary: "An Android clicker game inspired by Banana on Steam. Players repeatedly tap customizable objects to earn progress while discovering hidden interactions and visual variations",
    reasonAbandoned: [
      "Development slowed due to balancing a full-time job with personal projects.", 
      "As time passed, priorities shifted, development momentum was lost, and eventually my Google Play Developer account expired before the project could be released."],
    lessonsLearned: [
      "MVP discipline is critical; feature creep killed momentum early",
      "Architecture decisions made early cascade throughout project—rushed foundation caused technical debt",
      "Tabletop community has established tools (Roll20, Foundry); differentiation would require significant investment",
      "Real-time sync is harder than anticipated; websocket management required more expertise than initially estimated",
    ],
    technologies: ["C#", "Unity", "2D Game", "Android"],
    evidence: {
      media: [
        { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/ICCES/refs/heads/main/images/screenshots/Loginpage.png?height=600&width=900", caption: "Login Page" },
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

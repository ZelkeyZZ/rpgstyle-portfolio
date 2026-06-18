export type Section = "about" | "projects" | "contact"

export const character = {
  name: "ZelkeyZZ",
  className: "Software & Web Developer / IT Specialist (Uncertified Lv.99)",
  level: "3 Years Exp.",
  attributes: [
    {
      key: "INT",
      label: "Intelligence",
      value: 88,
      desc: "Core Web Dev, React, Tailwind CSS, PHP.",
      color: "var(--accent-cyan)",
    },
    {
      key: "DEX",
      label: "Dexterity",
      value: 79,
      desc: "Troubleshooting, IT Infrastructure, Dedicated Server Hosting.",
      color: "var(--accent-purple)",
    },
    {
      key: "VIT",
      label: "Vitality",
      value: 95,
      desc: "Resilience (Surviving Layoffs, Adaptive Lifelong Learner).",
      color: "var(--accent-gold)",
    },
  ],
  lore: `"Fascinated with tech and videogames since childhood. Entered the coding realm post-high school by building a self-hosted private game server. Spent 3 epic years as a Software Developer in a Life Science Company before a corporate Layoff event triggered a temporary class-change to 'Mall Inventory Assistant' to sustain livelihood. Currently seeking a portal back into a tech company guild."`,
}

export type QuestMedia = { type: "image" | "video"; src: string; caption?: string }

export type Quest = {
  id: string
  title: string
  rank: string
  rankColor: string
  summary: string
  tech: string[]
  reward: string
  details?: string
  repo?: string
  media?: QuestMedia[]
  completed?: boolean
}

export const quests: Quest[] = [
  {
    id: "q1",
    title: "ICCES",
    rank: "Capstone",
    rankColor: "var(--accent-purple)",
    summary:
      "A web-based System tailored for Informatics College; to digitize and automate institutional clearance tracking.",
    tech: ["Web System", "Database", "Workflow"],
    reward: "+ Degree Unlocked",
    details:
      "A centralized web platform that completely eliminates the traditional campus paper chase. Graduating students upload institutional requirements to a digital dashboard, department heads review and sign off via a sequential approval queue, and a real-time progress tracker exposes administrative bottlenecks—slashing clearance processing from days to minutes.",
    repo: "https://github.com/ZelkeyZZ/ICCES",
    completed: true,
    media: [
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/ICCES/refs/heads/main/images/screenshots/Loginpage.png?height=600&width=900", caption: "Login Page" },
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/ICCES/refs/heads/main/images/screenshots/Overview.png?height=600&width=900", caption: "Dashboard" },
    ],
  },
  {
    id: "q2",
    title: "Esco Slot Pharmachine",
    rank: "Professional",
    rankColor: "var(--accent-gold)",
    summary:
      "An interactive, promotional Slot Machine game built in Unity for ESCO Life Sciences.",
    tech: ["Unity", "2D", "C#"],
    reward: "+ Industry XP",
    details:
      "An Android kiosk gamification framework that drives exhibition engagement by distributing branded corporate merchandise. Users interact with a vertical token-matching grid that mathematically checks symbol alignments against a custom reward matrix, instantly awarding physical items like keychains, tote bags, and pens based on tailored win-rate probabilities.",
    completed: true,
    media: [
      { type: "image", src: "/assets/ESPM.png?height=600&width=900", caption: "In-game Screenshots" },
      { type: "video", src: "/assets/ESPM-Demo.mp4?height=600&width=900", caption: "Live Demo" },
    ],
  },
  {
    id: "q3",
    title: "Cell Processing Isolator 3D Configurator",
    rank: "Professional",
    rankColor: "var(--accent-gold)",
    summary:
      "A production Unity application for ESCO Life Sciences to showcase custom laboratory equipment and products to potential clients.",
    tech: ["Unity", "3D", "C#"],
    reward: "+ Industry XP",
    details:
      "A shipped, client-facing Unity app for ESCO Life Sciences. Sales teams could rotate, configure, and customize laboratory equipment in real-time 3D to pitch tailored builds to potential clients.",
    completed: true,
    media: [
      { type: "image", src: "/assets/cpi-1.png?height=600&width=900", caption: "Home Menu" },
      { type: "image", src: "/assets/cpi-2.png?height=600&width=900", caption: "Brochure" },
      { type: "image", src: "/assets/cpi-3.png?height=600&width=900", caption: "Video Scene" },
      { type: "video", src: "/assets/CPI3D-Demo.mp4?height=600&width=900", caption: "Live Demo" },
    ],
  },
  {
    id: "q4",
    title: "Barcode Level Generator",
    rank: "Boredom",
    rankColor: "var(--accent-cyan)",
    summary:
      "A lightweight client-side web tool, I made when I was bored.",
    tech: ["HTML", "JS", "CSS"],
    reward: "+ Creative XP",
    details:
      "A client-side web tool for product label generation. By parsing an 8-digit SKU and prefix CSV database, the system mathematically computes EAN-13 check digits to render scannable barcodes instantly.",
    repo: "https://github.com/ZelkeyZZ/barcode-label-generator",
    completed: true,
    media: [
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/barcode-label-generator/refs/heads/main/assets/screenshot/Interface.png?height=600&width=900", caption: "interface" },
    ],
  },
]

export type Corrupt = {
  id: string;
  revealedTitle: string;
  revealedText: string
}

export const corrupted = [
  {
    id: "c1",
    revealedTitle: "[REDACTED] AutoClicker 3000",
    revealedText:
      "A 'productivity tool' that mostly clicked through cookie banners and farmed daily login rewards. Shelved after it became sentient about Mondays.",
  },
  {
    id: "c2",
    revealedTitle: "Project: Coffee-Driven Compiler",
    revealedText:
      "An experiment to measure if code quality correlates with caffeine intake. Results were inconclusive but the commit messages got increasingly poetic.",
  },
  {
    id: "c3",
    revealedTitle: "The Layoff Survival Cookbook (App)",
    revealedText:
      "A budget meal planner built during the 'Mall Inventory Assistant' arc. Still ships great ramen optimization algorithms.",
  },
]

export const loot = [
  {
    id: "github",
    name: "GitHub Repository",
    subtitle: "Weapon Link",
    value: "@ZelkeyZZ",
    href: "https://github.com/ZelkeyZZ",
    type: "link" as const,
    rarity: "Rare",
  },
  {
    id: "email",
    name: "Email Scroll",
    subtitle: "Summon Developer",
    value: "zelkey.zz@gmail.com",
    href: "mailto:zelkey.zz@gmail.com",
    type: "link" as const,
    rarity: "Uncommon",
  },
  {
    id: "resume",
    name: "The Professional Resume",
    subtitle: "Locked DLC",
    value: "Epic Loot — Access Required",
    href: "https://drive.google.com/file/d/1ZynSxW6f1bq4TWu0Cu1ZC_4Kf3a80gfS/view",
    type: "locked" as const,
    rarity: "Epic",
  },
]

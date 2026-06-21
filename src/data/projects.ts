import type { Quest } from "./types"

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
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/ESPM.png?height=600&width=900", caption: "In-game Screenshots" },
      { type: "video", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/espm-demo.mp4?height=600&width=900", caption: "Live Demo" },
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
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/cpi-1.png?height=600&width=900", caption: "Home Menu" },
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/cpi-2.png?height=600&width=900", caption: "Brochure" },
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/cpi-3.png?height=600&width=900", caption: "Video Scene" },
      { type: "video", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/cpi3d-demo.mp4?height=600&width=900", caption: "Live Demo" },
    ],
  },
  {
    id: "q4",
    title: "Barcode Label Generator",
    rank: "Boredom",
    rankColor: "var(--accent-cyan)",
    summary:
      "A lightweight client-side web tool, I made when I was bored.",
    tech: ["HTML", "JS", "CSS"],
    reward: "+ Tool Unlock",
    details:
      "A client-side web tool for product label generation. By parsing an 8-digit SKU and prefix CSV database, the system mathematically computes EAN-13 check digits to render scannable barcodes instantly.",
    repo: "https://github.com/ZelkeyZZ/barcode-label-generator",
    completed: true,
    media: [
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/barcode-label-generator/refs/heads/main/assets/screenshot/Interface.png?height=600&width=900", caption: "interface" },
    ],
  },
  {
    id: "q5",
    title: "My Portfolio",
    rank: "Thinker",
    rankColor: "var(--accent-white)",
    summary:
      "A rpg-style portfolio, is where you are right now.",
    tech: ["React(Vite)", "TailwindCSS", "Typescript"],
    reward: "+ Presence XP",
    details:
      "A long time project that I'm working on, it is still incomplete.",
    repo: "https://github.com/ZelkeyZZ/rpgstyle-portfolio",
    completed: false,
    media: [
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/rpg-portfolio.png?height=600&width=900", caption: "interface" },
    ],
  },
]

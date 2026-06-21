export type Section = "about" | "projects" | "contact" | "journey"

export type JourneyMilestone = {
  id: string
  year: string
  title: string
  description: string
  color: string
  skills?: string[]
}

export const journey: JourneyMilestone[] = [
  {
    id: "j1",
    year: "2006",
    title: "Growing Up with Computers",
    description: "Raised in a family-owned cybercafé, I spent countless hours around computers, helping manage customer sessions, maintaining PCs, and learning how technology connected people. This was also where my passion for gaming began.",
    color: "var(--accent-cyan)",
    skills: ["PC Hardware", "Customer Ops", "Gaming"],
  },
  {
    id: "j2",
    year: "2015-2016",
    title: "Private Server & Self-Hosting Discovery",
    description: "Self-hosted a dedicated AQWorlds private server using port forwarding before VPS hosting was common. This sparked my interest in web technologies, databases, and backend systems.",
    color: "var(--accent-purple)",
    skills: ["PHP", "MySQL", "Port Forwarding", "Self-Hosting", "XAMPP"],
  },
  {
    id: "j3",
    year: "2017",
    title: "First Custom PC Build",
    description: "Saved money and built my first gaming PC from scratch. Spent countless hours troubleshooting hardware, installing operating systems, configuring drivers, upgrading components, and learning how computers work beyond the software layer.",
    color: "var(--accent-cyan)",
    skills: ["PC Building", "Hardware", "Windows", "Troubleshooting"],
  },
  {
    id: "j4",
    year: "2017-2018",
    title: "Modding & Reverse Engineering",
    description: "Explored game modding for Minecraft, Cryofall, and other titles. Experimented with game modifications, automation tools, and cheat development, gaining deeper insights into how software and game systems function behind the scenes.",
    color: "var(--accent-gold)",
    skills: ["Modding", "Reverse Engineering", "Scripting"],
  },
  {
    id: "j5",
    year: "2019",
    title: "Animation Competition Champion",
    description: "Volunteered to enter in an animation competition and earned 1st Place. Despite not being a traditional artist, I created action-packed stickman fight animation that showcased creativity and persistence.",
    color: "var(--accent-cyan)",
    skills: ["Animation", "Creativity", "Adobe Flash"],
  },
  {
    id: "j6",
    year: "2020-2021",
    title: "Capstone Full-Stack Development",
    description: "Built a complete web-based capstone system featuring authentication, dashboards, email verification, and database integration. Applied years of self-taught web development knowledge and successfully graduated through the project.",
    color: "var(--accent-purple)",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "XAMPP"],
  },
  {
    id: "j7",
    year: "2021",
    title: "Junior Software Developer Intern",
    description: "Joined Esco Life Sciences as a Junior Software Developer Intern. Learned Unity and C# from the ground up while contributing to internal software projects and adapting to professional development workflows.",
    color: "var(--accent-gold)",
    skills: ["Unity", "C#", "Software Development"],
  },
  {
    id: "j8",
    year: "2022-2023",
    title: "Professional Software Developer",
    description: "Hired full-time by Esco Life Sciences. Developed two production applications used in trade shows and exhibitions: a Slot Machine Minigame and a 3D Product Configurator. Both projects were built under strict deadlines using Unity.",
    color: "var(--accent-cyan)",
    skills: ["Unity", "C#", "2D/3D", "Android", "Client Projects"],
  },
  {
    id: "j9",
    year: "2023",
    title: "Career Detour",
    description: "Following company layoffs, transitioned into an Inventory Assistant role. Although my professional development career paused, my passion for technology and software never disappeared.",
    color: "var(--accent-purple)",
    skills: ["Adaptability", "Resilience", "Operations"],
  },
  {
    id: "j10",
    year: "2025",
    title: "Return to Building",
    description: "Started coding again while continuing to work as an Inventory Assistant. Built a lightweight barcode label generator using HTML, CSS, and JavaScript, and began creating personal projects to sharpen development skills.",
    color: "var(--accent-gold)",
    skills: ["JavaScript", "HTML", "CSS", "Tool Development"],
  },
  {
    id: "j11",
    year: "Current",
    title: "3D Printing Adventure",
    description: "Developed an interest in resin 3D printing and purchased a resin printer to learn the craft. Currently exploring printing, post-processing, and the possibility of turning the hobby into a small creative business with my girlfriend.",
    color: "var(--accent-white)",
    skills: ["3D Printing", "Resin Printing", "Maker Culture"],
  },
]

export const character = {
  name: "ZelkeyZZ",
  className: "Software Developer • Unity Developer • Tech Explorer",
  subClass: "Inventsistant",
  level: "3 Years Exp.",
  attributes: [
    {
      key: "CRTV",
      label: "Creativity",
      value: 84,
      desc: "Animation, UI Design, Game Development, and Problem Solving",
      color: "var(--accent-cyan)",
    },
    {
      key: "TECH",
      label: "Technical Mastery",
      value: 89,
      desc: "Web Development, Unity, Databases, Networking, and Self-Hosting",
      color: "var(--accent-purple)",
    },
    {
      key: "GRIT",
      label: "Resilience",
      value: 95,
      desc: "Learning Through Challenges, Career Detours, and Continuous Growth",
      color: "var(--accent-gold)",
    },
  ],
  lore: `"I'm someone who learns by building. From growing up in a cybercafé and running private game servers, to creating web applications, developing Unity software, building custom PCs, and now exploring resin 3D printing, I've always been drawn to understanding how things work. While my current day job is outside the tech industry, I continue to create projects, learn new tools, and work toward returning to a professional software development role."`,
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
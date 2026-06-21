import type { Quest } from "./types"

export const quests: Quest[] = [
  {
    id: "q1",
    title: "ICCES",
    rank: "Capstone",
    rankColor: "var(--accent-purple)",
    summary:
      "A web-based System tailored for Informatics College; to digitize and automate institutional clearance tracking.",
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    reward: "+ Degree Unlocked",
    details:
      "A centralized web platform that completely eliminates the traditional campus paper chase. Graduating students upload institutional requirements to a digital dashboard, department heads review and sign off via a sequential approval queue, and a real-time progress tracker exposes administrative bottlenecks—slashing clearance processing from days to minutes.",
    challenge:
      "The college's manual clearance process required students to physically visit 5+ departments, each maintaining separate paper logs. This caused processing delays of 2-3 weeks and bottlenecks when any department fell behind. The system needed to coordinate multi-stage approvals with real-time visibility.",
    solution:
      "Implemented a sequential approval workflow where each department had dedicated dashboards to review pending clearances. The system enforces validation rules at each stage, automatically notifies department heads of pending approvals, and provides a real-time progress tracker for students. Email notifications trigger at critical milestones.",
    architecture: {
      overview:
        "Three-tier architecture: Laravel backend handles business logic and approvals, MySQL stores institutional data and clearance state, Bootstrap frontend provides responsive UI across devices.",
      components: [
        "Authentication & Authorization (role-based access)",
        "Clearance Workflow Engine (sequential approvals)",
        "Real-time Progress Tracker",
        "Email Notification System",
        "Department Dashboard",
        "Student Portal",
      ],
      technicalNotes: [
        "Implemented database transactions to ensure approval consistency",
        "Used Laravel's eloquent ORM for clean data modeling",
        "Integrated Mailtrap for reliable email notifications during staging/production",
        "Implemented audit logs for compliance tracking",
      ],
    },
    lessonsLearned: [
      "User feedback early in development would have shaped the workflow—initially didn't include resubmission capability",
      "Email reliability is critical for user adoption; spent significant effort on deliverability",
      "Real-time updates dramatically improved user confidence vs. polling for status",
      "Permission modeling at scale required careful SQL optimization",
    ],
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
    tech: ["Unity", "C#", "Android"],
    reward: "+ Industry XP",
    details:
      "An Android kiosk gamification framework that drives exhibition engagement by distributing branded corporate merchandise. Users interact with a vertical token-matching grid that mathematically checks symbol alignments against a custom reward matrix, instantly awarding physical items like keychains, tote bags, and pens based on tailored win-rate probabilities.",
    challenge:
      "ESCO needed to increase engagement at trade shows while distributing branded merchandise efficiently. The previous static booth approach had low engagement. Goal: create an interactive experience that tracks inventory, enforces fair reward distribution, and captures user interest in real-time.",
    solution:
      "Built a touch-based slot machine game where players spin reels and win merchandise based on probability-weighted outcomes. The backend tracks inventory and enforces win limits per user to ensure fair distribution. A configurable reward matrix allows ESCO to adjust prize probabilities and inventory allocations without code changes.",
    architecture: {
      overview:
        "Unity 2D game client with networked backend. Game logic validates spins locally, communicates with server for reward adjudication and inventory updates. Includes admin panel for real-time configuration.",
      components: [
        "Reel animation system (smooth, physics-based spinning)",
        "Probability engine (weighted outcome determination)",
        "Inventory management (tracks available prizes)",
        "Network communication (spin requests, reward validation)",
        "Admin dashboard (configure probabilities, view real-time stats)",
        "User tracking (enforce win limits)",
      ],
      technicalNotes: [
        "Implemented probability weighting using weighted random selection algorithm",
        "Used Object Pooling for reel animation performance optimization",
        "Networked communication with retry logic for kiosk reliability",
        "Admin panel built with simple web interface for non-technical ESCO staff",
      ],
    },
    lessonsLearned: [
      "Fairness and transparency in gambling mechanics are critical; clearly communicate probability to prevent negative perception",
      "Kiosk reliability issues (network drops, crashes) required robust error recovery and offline fallbacks",
      "Animation quality dramatically affects perceived fairness—subtle physics-based reel movement improved reception",
      "Real-time analytics during events allowed quick adjustments to reward probabilities based on inventory levels",
    ],
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
    tech: ["Unity", "C#", "3D Graphics"],
    reward: "+ Industry XP",
    details:
      "A shipped, client-facing Unity app for ESCO Life Sciences. Sales teams could rotate, configure, and customize laboratory equipment in real-time 3D to pitch tailored builds to potential clients.",
    challenge:
      "ESCO sells highly customizable laboratory equipment with hundreds of configuration permutations. Sales reps needed a way to show clients realistic equipment visualizations without relying on brochures or CAD software. Solution needed to run on tablets in the field with offline capability.",
    solution:
      "Built a 3D configurator where sales reps select options (airflow type, material, features) and instantly see the configured equipment rendered in 3D. The app supports rotating, zooming, and capturing screenshots to email clients. Offline mode allows operation without internet in remote locations.",
    architecture: {
      overview:
        "Unity 3D engine with modular asset system. Configuration system toggles equipment components in/out based on selections. Real-time rendering pipeline with lighting optimization for tablet performance.",
      components: [
        "Configuration UI (option selection)",
        "3D Scene manager (equipment loading and display)",
        "Asset pooling system (efficient component loading)",
        "Lighting and materials pipeline (quality optimization)",
        "Screenshot capture (client sharing)",
        "Offline data persistence (cached configurations)",
      ],
      technicalNotes: [
        "Used prefab variants to manage equipment configuration permutations efficiently",
        "Implemented LOD (Level of Detail) system to maintain 60fps on iPad tablets",
        "Built custom shader for subtle highlighting of changed components",
        "Integrated file-based persistence for offline operation and configuration history",
      ],
    },
    lessonsLearned: [
      "Managing large numbers of 3D assets requires careful planning—asset bundle strategy became critical for storage",
      "Field testing revealed UI needs to be touch-optimized and larger; desktop UX assumptions failed on tablets",
      "Offline functionality is non-negotiable in field sales applications; connectivity is unreliable",
      "Performance profiling showed lighting was the bottleneck; baked lighting reduced overhead significantly",
    ],
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
    tech: ["HTML", "JavaScript", "CSS"],
    reward: "+ Tool Unlock",
    details:
      "A client-side web tool for product label generation. By parsing an 8-digit SKU and prefix CSV database, the system mathematically computes EAN-13 check digits to render scannable barcodes instantly.",
    challenge:
      "Manual barcode generation was tedious and error-prone. EAN-13 check digit calculation requires a specific algorithm that's easy to get wrong. Needed a quick tool that works offline and requires zero setup.",
    solution:
      "Built a browser-based generator that accepts SKU input, automatically computes the EAN-13 check digit using the standard algorithm, and renders a scannable barcode using a canvas. Supports batch generation from CSV and instant PDF export.",
    architecture: {
      overview:
        "Pure client-side implementation with no backend. Canvas rendering for barcode visualization. CSV parsing for batch operations.",
      components: [
        "SKU input interface",
        "EAN-13 check digit calculation",
        "Canvas barcode renderer",
        "CSV parser (batch import)",
        "PDF exporter",
      ],
      codeSnippets: [
        {
          label: "EAN-13 Check Digit Algorithm",
          code: "function calculateCheckDigit(sku) {\n  let sum = 0;\n  for (let i = 0; i < sku.length; i++) {\n    sum += parseInt(sku[i]) * (i % 2 === 0 ? 1 : 3);\n  }\n  return (10 - (sum % 10)) % 10;\n}",
          language: "javascript",
        },
      ],
      technicalNotes: [
        "Implemented standard EAN-13 checksum algorithm (GS1 standard)",
        "Canvas API for efficient barcode rendering",
        "Used jsbarcode library was evaluated but overkill for simple use case",
      ],
    },
    lessonsLearned: [
      "Sometimes the simplest solution is the best; this tool required minimal code but solved a real need",
      "Batch operations are unexpectedly valuable; CSV import became the most-used feature",
      "Offline-first design meant zero deployment hassle—just share the HTML file",
    ],
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
    tech: ["React", "Vite", "TypeScript", "TailwindCSS", "Framer Motion"],
    reward: "+ Presence XP",
    details:
      "An ongoing project to build an engaging, gamified portfolio that showcases both technical work and personality. The portfolio uses RPG game mechanics to create an immersive browsing experience.",
    challenge:
      "Traditional portfolios are static and forgettable. Recruiters see hundreds of standard layouts. Needed a way to stand out while authentically representing my personality and technical depth. Also wanted to explore creative web design and demonstrate full-stack capabilities.",
    solution:
      "Built an RPG-style world with interactive character positioning, quest logs (projects), real-time terminal, achievement tracking, and theme switching. Used Framer Motion for smooth animations and responsive design for mobile. Architecture focuses on scalable component systems.",
    architecture: {
      overview:
        "React component-based architecture with TypeScript. Vite for fast development and optimized builds. Navigation registry pattern for centralized route/panel management. Responsive design system with CSS custom properties for theming.",
      components: [
        "Scene: Interactive 2D world with player movement",
        "Navigation Registry: Single source of truth for routing",
        "Panel Shell: Reusable modal system with variants",
        "Terminal: Command-line interface (easter egg functionality)",
        "Achievement System: Persistent progress tracking",
        "Theme System: Light/Dark mode toggle",
      ],
      technicalNotes: [
        "Implemented registry pattern to eliminate hardcoded conditionals and improve scalability",
        "Used Framer Motion for consistent, performant animations across the app",
        "Custom hook (usePlayerController) abstracts movement logic for reusability",
        "Responsive design tested across 320px to desktop viewports with mobile drawer navigation",
        "Built achievement system with localStorage persistence",
      ],
    },
    lessonsLearned: [
      "Creative design doesn't sacrifice usability—spent significant time on mobile responsiveness",
      "Registry patterns dramatically improve code maintainability as the app grows",
      "Animations should enhance UX, not distract; moved to performance-optimized transforms",
      "Personality in portfolios works! Interactive demos are better than static descriptions for recruiting",
    ],
    repo: "https://github.com/ZelkeyZZ/rpgstyle-portfolio",
    completed: false,
    media: [
      { type: "image", src: "https://raw.githubusercontent.com/ZelkeyZZ/rpgstyle-portfolio/refs/heads/main/public/assets/rpg-portfolio.png?height=600&width=900", caption: "interface" },
    ],
  },
]

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import type { Section } from "./data"
import { useTheme } from "./useTheme"
import { useAchievements } from "./hooks/useAchievements"
import Scene from "./components/Scene"
import SideNav from "./components/SideNav"
import ThemeToggle from "./components/ThemeToggle"
import HeroHud from "./components/HeroHud"
import PanelShell from "./components/PanelShell"
import AboutPanel from "./components/AboutPanel"
import ProjectsPanel from "./components/ProjectsPanel"
import ContactPanel from "./components/ContactPanel"
import JourneyTimeline from "./components/JourneyTimeline"
import Terminal from "./components/Terminal"

export default function App() {
  const { isDark, toggle } = useTheme()
  const { unlockAchievement, isUnlocked } = useAchievements()
  const [active, setActive] = useState<Section | null>(null)

  const handleProjectClick = (projectId: string, projectTitle: string) => {
    // Project-specific achievements
    const PROJECT_ACHIEVEMENTS: Record<string, string> = {
      icces: "first_production_project",
      "esco-slot": "unity_developer",
      "private-server": "server_architect",
      "barcode-label": "full_stack_developer",
      "my-portfolio": "portfolio_master",
    }

    const achievementId = PROJECT_ACHIEVEMENTS[projectId]
    if (achievementId && !isUnlocked(achievementId)) {
      unlockAchievement(achievementId)
    }
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-void text-ink">
      {/* World / isometric scene with avatar navigation */}
      <Scene active={active} onOpen={setActive} />

      {/* Top-left identity HUD */}
      <HeroHud isDark={isDark} />

      {/* Theme toggle */}
      <ThemeToggle isDark={isDark} onToggle={toggle} />

      {/* Right inventory-tab navigation */}
      <SideNav active={active} onSelect={(s) => setActive((cur) => (cur === s ? null : s))} />

      {/* Interactive command terminal */}
      <Terminal />

      {/* Content panels */}
      <AnimatePresence mode="wait">
        {active === "about" && (
          <PanelShell key="about" title="Character Sheet" variant="parchment" onClose={() => setActive(null)}>
            <AboutPanel />
          </PanelShell>
        )}
        {active === "projects" && (
          <PanelShell key="projects" title="Quest Log" variant="parchment" onClose={() => setActive(null)}>
            <ProjectsPanel onProjectClick={handleProjectClick} />
          </PanelShell>
        )}
        {active === "contact" && (
          <PanelShell key="contact" title="Loot Shop // DLC Store" variant="hud" onClose={() => setActive(null)}>
            <ContactPanel />
          </PanelShell>
        )}
        {active === "journey" && (
          <PanelShell key="journey" title="Character Journal" variant="parchment" onClose={() => setActive(null)}>
            <JourneyTimeline />
          </PanelShell>
        )}
      </AnimatePresence>
    </main>
  )
}

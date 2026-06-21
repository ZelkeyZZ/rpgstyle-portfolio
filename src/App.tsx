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
import Terminal from "./components/Terminal"
import { panelRegistry } from "./config/panelRegistry"

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

      {/* Content panels — driven by panelRegistry */}
      <AnimatePresence mode="wait">
        {active && (() => {
          const entry = panelRegistry[active]
          if (!entry) return null
          const PanelComponent = entry.component
          const extraProps =
            active === "projects"
              ? { onProjectClick: handleProjectClick }
              : entry.props ?? {}
          return (
            <PanelShell
              key={active}
              title={entry.title}
              variant={entry.variant}
              onClose={() => setActive(null)}
            >
              <PanelComponent {...extraProps} />
            </PanelShell>
          )
        })()}
      </AnimatePresence>
    </main>
  )
}

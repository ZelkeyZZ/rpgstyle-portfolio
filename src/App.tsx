import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import type { Section } from "./data"
import { useTheme } from "./useTheme"
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
  const [active, setActive] = useState<Section | null>(null)

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
            <ProjectsPanel />
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

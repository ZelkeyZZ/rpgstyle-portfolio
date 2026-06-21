import type { ComponentType } from "react"
import type { Section } from "../data"
import AboutPanel from "../components/AboutPanel"
import ProjectsPanel from "../components/ProjectsPanel"
import ContactPanel from "../components/ContactPanel"
import JourneyTimeline from "../components/JourneyTimeline"

export type PanelShellVariant = "parchment" | "hud"

export type PanelEntry = {
  /** The panel component to render inside PanelShell */
  component: ComponentType<any>
  /** PanelShell title string */
  title: string
  /** PanelShell visual variant */
  variant: PanelShellVariant
  /** Props forwarded directly to the panel component */
  props?: Record<string, unknown>
}

/**
 * Maps every Section id to its panel configuration.
 * To add a new panel: create the component, then add one entry here.
 * No other file needs to change.
 */
export const panelRegistry: Record<Section, PanelEntry> = {
  about: {
    component: AboutPanel,
    title: "Character Sheet",
    variant: "parchment",
  },
  projects: {
    component: ProjectsPanel,
    title: "Quest Log",
    variant: "parchment",
  },
  contact: {
    component: ContactPanel,
    title: "Loot Shop // DLC Store",
    variant: "hud",
  },
  journey: {
    component: JourneyTimeline,
    title: "Character Journal",
    variant: "parchment",
  },
}

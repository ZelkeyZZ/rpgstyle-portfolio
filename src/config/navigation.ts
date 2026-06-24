import {
  ScrollText,
  ShieldUser,
  BookOpenText,
  LoaderPinwheel,
  AlertTriangle,
  ArchiveX,
} from "lucide-react"
import type { Section } from "../data"
import type { ComponentType } from "react"
import type { PanelShellVariant } from "./panelRegistry"
import AboutPanel from "../components/AboutPanel"
import ProjectsPanel from "../components/ProjectsPanel"
import ContactPanel from "../components/ContactPanel"
import JourneyTimeline from "../components/JourneyTimeline"
import ForgottenWorkshopPanel from "../components/ForgottenWorkshopPanel"

/**
 * Navigation Entry: Single Source of Truth for all nav + map data.
 * 
 * Each section entry defines:
 * - World-map positioning and display (label, icon, color, x, y)
 * - Sidebar display (navLabel, showInSidebar)
 * - Panel configuration (panel component, title, variant)
 */
export interface NavigationEntry {
  id: Section
  /** World-map tooltip label */
  label: string
  /** Short label for sidebar UI (falls back to label) */
  navLabel?: string
  /** Lucide icon component */
  icon: ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
  /** World-map X position (percentage) */
  x: number
  /** World-map Y position (percentage) */
  y: number
  /** Color theme for UI elements */
  color: string
  /** Whether to show in sidebar navigation */
  showInSidebar: boolean
  /** Panel component to render */
  panelComponent: ComponentType<any>
  /** PanelShell title */
  panelTitle: string
  /** PanelShell visual variant */
  panelVariant: PanelShellVariant
  /** Props to pass to the panel component */
  panelProps?: Record<string, unknown>
}

/**
 * Corrupted data node entry (world-map only, no sidebar)
 */
export interface CorruptedNodeEntry {
  id: string
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
  x: number
  y: number
  color: string
}

/**
 * Single Source of Truth: All navigable sections.
 * Add, modify, or remove entries here — no other files need changes.
 */
export const navigationEntries: NavigationEntry[] = [
  {
    id: "about",
    label: "Character Shrine",
    navLabel: "Profile",
    icon: ShieldUser,
    x: 15,
    y: 30,
    color: "var(--accent-cyan)",
    showInSidebar: true,
    panelComponent: AboutPanel,
    panelTitle: "Character Sheet",
    panelVariant: "parchment",
  },
  {
    id: "projects",
    label: "Quest Obelisk",
    navLabel: "Projects",
    icon: ScrollText,
    x: 20,
    y: 25,
    color: "var(--accent-purple)",
    showInSidebar: true,
    panelComponent: ProjectsPanel,
    panelTitle: "Quest Log",
    panelVariant: "parchment",
  },
  {
    id: "journey",
    label: "The Archive",
    navLabel: "Journey",
    icon: BookOpenText,
    x: 10,
    y: 40,
    color: "var(--accent-white)",
    showInSidebar: false,
    panelComponent: JourneyTimeline,
    panelTitle: "Character Journal",
    panelVariant: "parchment",
  },
  {
    id: "contact",
    label: "Nexus Portal",
    navLabel: "Contact",
    icon: LoaderPinwheel,
    x: 15,
    y: 52,
    color: "var(--accent-gold)",
    showInSidebar: true,
    panelComponent: ContactPanel,
    panelTitle: "The Gateway",
    panelVariant: "hud",
  },
  {
    id: "forgotten-workshop",
    label: "Forgotten Workshop",
    navLabel: "Forgotten",
    icon: ArchiveX,
    x: 75,
    y: 60,
    color: "#d4a574",
    showInSidebar: false,
    panelComponent: ForgottenWorkshopPanel,
    panelTitle: "Forgotten Workshop",
    panelVariant: "parchment",
  },
]

/**
 * World-map only corrupted nodes (no sidebar or panel)
 */
export const corruptedNodeEntries: CorruptedNodeEntry[] = [
  {
    id: "c1",
    label: "DATA CORRUPTED",
    icon: AlertTriangle,
    x: 16,
    y: 72,
    color: "var(--accent-purple)",
  },
  {
    id: "c2",
    label: "DATA CORRUPTED",
    icon: AlertTriangle,
    x: 46,
    y: 66,
    color: "var(--accent-cyan)",
  },
  {
    id: "c3",
    label: "DATA CORRUPTED",
    icon: AlertTriangle,
    x: 88,
    y: 36,
    color: "var(--accent-gold)",
  },
]

/**
 * Derived: Sidebar-visible entries only (filtered by showInSidebar)
 */
export const sidebarEntries = navigationEntries.filter((e) => e.showInSidebar)

/**
 * Derived: All world-map nodes (sections + corrupted)
 */
export const allWorldNodes = [
  ...navigationEntries.map((e) => ({
    id: e.id,
    label: e.label,
    navLabel: e.navLabel,
    x: e.x,
    y: e.y,
    icon: e.icon,
    kind: "section" as const,
    color: e.color,
  })),
  ...corruptedNodeEntries.map((c) => ({
    id: c.id,
    label: c.label,
    x: c.x,
    y: c.y,
    icon: c.icon,
    kind: "corrupt" as const,
    color: c.color,
  })),
]

/**
 * Convenience: Get a navigation entry by Section id
 */
export function getNavigationEntry(id: Section): NavigationEntry | undefined {
  return navigationEntries.find((e) => e.id === id)
}

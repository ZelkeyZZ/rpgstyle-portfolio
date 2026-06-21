import {
  ScrollText,
  AlertTriangle,
  ShieldUser,
  BookOpenText,
  LoaderPinwheel,
} from "lucide-react"
import type { Section } from "../data"

export type NodeKind = "section" | "corrupt"

export type NodeDef = {
  id: string
  /** World-map tooltip label */
  label: string
  /** Short label used in nav UI (falls back to label if omitted) */
  navLabel?: string
  x: number
  y: number
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
  kind: NodeKind
  color: string
}

import type React from "react"

/** All interactive world-map nodes. Add new entries here — no other file needs to change. */
export const nodeRegistry: NodeDef[] = [
  {
    id: "about",
    label: "Character Shrine",
    navLabel: "Profile",
    x: 15,
    y: 30,
    icon: ShieldUser,
    kind: "section",
    color: "var(--accent-cyan)",
  },
  {
    id: "projects",
    label: "Quest Obelisk",
    navLabel: "Projects",
    x: 20,
    y: 25,
    icon: ScrollText,
    kind: "section",
    color: "var(--accent-purple)",
  },
  {
    id: "journey",
    label: "The Archive",
    navLabel: "Journey",
    x: 10,
    y: 40,
    icon: BookOpenText,
    kind: "section",
    color: "var(--accent-white)",
  },
  {
    id: "contact",
    label: "Nexus Portal",
    navLabel: "Contact",
    x: 15,
    y: 52,
    icon: LoaderPinwheel,
    kind: "section",
    color: "var(--accent-gold)",
  },
  {
    id: "c1",
    label: "DATA CORRUPTED",
    x: 16,
    y: 72,
    icon: AlertTriangle,
    kind: "corrupt",
    color: "var(--accent-purple)",
  },
  {
    id: "c2",
    label: "DATA CORRUPTED",
    x: 46,
    y: 66,
    icon: AlertTriangle,
    kind: "corrupt",
    color: "var(--accent-cyan)",
  },
  {
    id: "c3",
    label: "DATA CORRUPTED",
    x: 88,
    y: 36,
    icon: AlertTriangle,
    kind: "corrupt",
    color: "var(--accent-gold)",
  },
]

/** Convenience: only section-kind nodes, typed as Section */
export const sectionNodes = nodeRegistry.filter(
  (n): n is NodeDef & { id: Section } => n.kind === "section",
)

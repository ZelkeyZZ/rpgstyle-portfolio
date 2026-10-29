/**
 * NodeRegistry is now a thin adapter layer on top of navigation.ts.
 * This maintains backward compatibility while centralizing navigation data.
 */

import { allWorldNodes } from "./navigation"

export type NodeKind = "section" | "corrupt"

export type NodeDef = {
  id: string
  label: string
  navLabel?: string
  x: number
  y: number
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
  kind: NodeKind
  color: string
}

import type React from "react"
import type { Section } from "../data"

/**
 * All interactive world-map nodes, derived from navigation.ts.
 * This is a backward-compatible re-export — consumers can still import from here.
 */
export const nodeRegistry: NodeDef[] = allWorldNodes as NodeDef[]

/** Convenience: only section-kind nodes, typed as Section */
export const sectionNodes = nodeRegistry.filter(
  (n): n is NodeDef & { id: Section } => n.kind === "section",
)

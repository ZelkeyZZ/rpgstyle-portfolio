/**
 * PanelRegistry is now a thin adapter on top of navigation.ts.
 * This maintains backward compatibility while centralizing navigation data.
 */

import type { ComponentType } from "react"
import type { Section } from "../data"
import { navigationEntries } from "./navigation"

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
 * Maps every Section id to its panel configuration, derived from navigation.ts.
 * This is a backward-compatible re-export — consumers can still import from here.
 */
export const panelRegistry: Record<Section, PanelEntry> = Object.fromEntries(
  navigationEntries.map((entry) => [
    entry.id,
    {
      component: entry.panelComponent,
      title: entry.panelTitle,
      variant: entry.panelVariant,
      props: entry.panelProps,
    },
  ]),
) as Record<Section, PanelEntry>

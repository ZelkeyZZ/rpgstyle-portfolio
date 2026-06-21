import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ScrollText, AlertTriangle, ShieldUser, BookOpenText, LoaderPinwheel } from "lucide-react"
import type { Section } from "../data"
import { corrupted } from "../data"
import Particles from "./Particles"
import CorruptedModal from "./CorruptedModal"
import { usePlayerController } from "../hooks/usePlayerController"

type NodeDef = {
  id: Section | string
  label: string
  x: number // percentage
  y: number
  icon: typeof Swords
  kind: "section" | "corrupt"
  color: string
}

const NODES: NodeDef[] = [
  { id: "about", label: "Character Shrine", x: 15, y: 30, icon: ShieldUser, kind: "section", color: "var(--accent-cyan)" },
  { id: "projects", label: "Quest Obelisk", x: 20, y: 25, icon: ScrollText, kind: "section", color: "var(--accent-purple)" },
  { id: "journey", label: "The Archive", x: 10, y: 40, icon: BookOpenText, kind: "section", color: "var(--accent-white)" },
  { id: "contact", label: "Nexus Portal", x: 15, y: 52, icon: LoaderPinwheel, kind: "section", color: "var(--accent-gold)" },
  { id: "c1", label: "DATA CORRUPTED", x: 16, y: 72, icon: AlertTriangle, kind: "corrupt", color: "var(--accent-purple)" },
  { id: "c2", label: "DATA CORRUPTED", x: 46, y: 66, icon: AlertTriangle, kind: "corrupt", color: "var(--accent-cyan)" },
  { id: "c3", label: "DATA CORRUPTED", x: 88, y: 36, icon: AlertTriangle, kind: "corrupt", color: "var(--accent-gold)" },
]

export default function Scene({
  active,
  onOpen,
}: {
  active: Section | null
  onOpen: (s: Section) => void
}) {
  const fieldRef = useRef<HTMLDivElement>(null)
  const { position, moveTo, handleClickMove } = usePlayerController(fieldRef)
  const [openCorrupt, setOpenCorrupt] = useState<string | null>(null)
  const [solved, setSolved] = useState<Record<string, boolean>>({})

  const handleSolved = useCallback((id: string) => {
    setSolved((s) => ({ ...s, [id]: true }))
  }, [])

  const triggerNode = (n: NodeDef) => {
    // walk avatar toward node, then activate
    moveTo({ x: n.x, y: Math.min(92, n.y + 8) })
    setTimeout(() => {
      if (n.kind === "section") onOpen(n.id as Section)
      else setOpenCorrupt(n.id)
    }, 320)
  }

  return (
    <div
      ref={fieldRef}
      onClick={handleClickMove}
      className="iso-grid scanlines absolute inset-0 cursor-crosshair overflow-hidden"
      style={{ backgroundColor: "var(--bg-void)" }}
    >
      {/* depth gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 18%, transparent 30%, color-mix(in srgb, var(--bg-void) 92%, #000) 100%)",
        }}
      />
      <Particles />

      {/* Ambient ruined-temple silhouette band */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--panel-edge), transparent)" }}
      />

      {/* Interactive nodes */}
      {NODES.map((n) => {
        const Icon = n.icon
        const isCorrupt = n.kind === "corrupt"
        const isSolved = solved[n.id]
        return (
          <button
            key={n.id}
            onClick={(e) => {
              e.stopPropagation()
              triggerNode(n)
            }}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-label={n.label}
          >
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-xl border float-bob ${
                isCorrupt && !isSolved ? "glitch" : ""
              }`}
              style={{
                borderColor: n.color,
                background: "color-mix(in srgb, var(--panel) 80%, transparent)",
                boxShadow: `0 0 22px -4px ${n.color}, inset 0 0 18px -8px ${n.color}`,
              }}
            >
              <span
                className="absolute inset-0 rounded-xl pulse-ring"
                style={{ ["--glow" as string]: `color-mix(in srgb, ${n.color} 50%, transparent)` }}
              />
              <Icon size={22} style={{ color: n.color }} strokeWidth={1.6} />
            </div>
            <span
              className="mt-2 block whitespace-nowrap text-center text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: isCorrupt && !isSolved ? n.color : "var(--ink-soft)" }}
            >
              {isCorrupt && isSolved ? "RESTORED" : n.label}
            </span>
          </button>
        )
      })}

      {/* Avatar */}
      <motion.div
        className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
        animate={{ left: `${position.x}%`, top: `${position.y}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      >
        <div className="relative flex flex-col items-center">
          <div
            className="h-10 w-10 rounded-full border-2"
            style={{
              borderColor: "var(--accent-cyan)",
              background:
                "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--accent-cyan) 70%, #fff), color-mix(in srgb, var(--accent-purple) 80%, #000))",
              boxShadow: "0 0 26px -2px var(--glow), 0 0 0 6px color-mix(in srgb, var(--accent-cyan) 14%, transparent)",
            }}
          />
          {/* ground shadow / selection ring */}
          <div
            className="-mt-1 h-3 w-12 rounded-[100%]"
            style={{ background: "color-mix(in srgb, var(--accent-cyan) 30%, transparent)", filter: "blur(3px)" }}
          />
        </div>
      </motion.div>

      {/* Controls hint */}
      {active === null && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft glow-text">
            Click to travel · WASD / Arrows to move · Tap a glowing node
          </p>
        </div>
      )}

      <CorruptedModal
        data={corrupted.find((c) => c.id === openCorrupt) ?? null}
        onClose={() => setOpenCorrupt(null)}
        onSolved={handleSolved}
        isSolved={openCorrupt ? solved[openCorrupt] ?? false : false}
      />
    </div>
  )
}

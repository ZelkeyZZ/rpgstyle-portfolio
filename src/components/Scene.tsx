import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ScrollText, Swords, Gem, AlertTriangle } from "lucide-react"
import type { Section } from "../data"
import { corrupted } from "../data"
import Particles from "./Particles"
import CorruptedModal from "./CorruptedModal"

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
  { id: "about", label: "Character Shrine", x: 28, y: 40, icon: Swords, kind: "section", color: "var(--accent-cyan)" },
  { id: "projects", label: "Quest Obelisk", x: 60, y: 30, icon: ScrollText, kind: "section", color: "var(--accent-purple)" },
  { id: "contact", label: "Merchant Vault", x: 74, y: 62, icon: Gem, kind: "section", color: "var(--accent-gold)" },
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
  const [pos, setPos] = useState({ x: 50, y: 78 })
  const [openCorrupt, setOpenCorrupt] = useState<string | null>(null)
  const [solved, setSolved] = useState<Record<string, boolean>>({})
  const keys = useRef<Set<string>>(new Set())

  // WASD / Arrow continuous movement
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) {
        keys.current.add(k)
      }
    }
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase())
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  useEffect(() => {
    let raf = 0
    const step = () => {
      const k = keys.current
      if (k.size) {
        setPos((p) => {
          let { x, y } = p
          const spd = 0.8
          if (k.has("w") || k.has("arrowup")) y -= spd
          if (k.has("s") || k.has("arrowdown")) y += spd
          if (k.has("a") || k.has("arrowleft")) x -= spd
          if (k.has("d") || k.has("arrowright")) x += spd
          return { x: Math.max(4, Math.min(96, x)), y: Math.max(8, Math.min(92, y)) }
        })
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const moveToClick = useCallback((e: React.MouseEvent) => {
    const rect = fieldRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x: Math.max(4, Math.min(96, x)), y: Math.max(8, Math.min(92, y)) })
  }, [])

  const handleSolved = useCallback((id: string) => {
    setSolved((s) => ({ ...s, [id]: true }))
  }, [])

  const triggerNode = (n: NodeDef) => {
    // walk avatar toward node, then activate
    setPos({ x: n.x, y: Math.min(92, n.y + 8) })
    setTimeout(() => {
      if (n.kind === "section") onOpen(n.id as Section)
      else setOpenCorrupt(n.id)
    }, 320)
  }

  return (
    <div
      ref={fieldRef}
      onClick={moveToClick}
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
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
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
      />
    </div>
  )
}
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TerminalSquare, X } from "lucide-react"
import { character, quests, loot } from "../data"
import { useAchievements } from "../hooks/useAchievements"
import ResumeModal from "./ResumeModal"
import { ACHIEVEMENTS } from "../types/achievements"

type LineKind = "system" | "input" | "output" | "error" | "success"
type Line = { id: number; kind: LineKind; text: string }

const PROMPT = "guest@zelkeyzz:~$"

const lineColor: Record<LineKind, string> = {
  system: "var(--ink-soft)",
  input: "var(--accent-cyan)",
  output: "var(--ink)",
  error: "var(--accent-purple)",
  success: "var(--accent-gold)",
}

let _id = 0
const mkLine = (kind: LineKind, text: string): Line => ({ id: _id++, kind, text })

const BOOT: Line[] = [
  mkLine("system", "ZelkeyOS v0.99 [build: cyber-fantasy]"),
  mkLine("system", "Booting guest shell... access granted."),
  mkLine("system", 'Type "/help" to list available commands.'),
]

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>(BOOT)
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState<number | null>(null)
  const [resumeOpen, setResumeOpen] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // auto-scroll to bottom on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, open])

  // focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(t)
    }
  }, [open])

  const push = (newLines: Line[]) => setLines((prev) => [...prev, ...newLines])

  const runCommand = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return

    push([mkLine("input", `${PROMPT} ${cmd}`)])
    setHistory((h) => [...h, cmd])
    setHistIndex(null)

    // normalize: allow with or without leading slash
    const normalized = cmd.toLowerCase().replace(/^\//, "")

    switch (normalized) {
      case "help":
        push([
          mkLine("system", "Available commands:"),
          mkLine("output", "  /help      Returns available commands."),
          mkLine("output", "  /about     Shows character sheet."),
          mkLine("output", "  /projects  Lists projects in quest log."),
          mkLine("output", "  /contact   Shows contact information."),
          mkLine("output", "  /resume    Unlock the professional resume (DLC)."),
          mkLine("output", "  /skills    Displays attribute stats."),
          mkLine("output", "  /whoami    Prints current identity."),
          mkLine("output", "  /clear     Clears the terminal."),
        ])
        break

      case "about": {
        push([
          mkLine("system", "=== CHARACTER SHEET ==="),
          mkLine("success", `>> ${character.name}`),
          mkLine("output", `CLASS: ${character.className}`),
          mkLine("output", `LEVEL: ${character.level}`),
          mkLine("system", "--- Attribute Matrix ---"),
          ...character.attributes.map((a) =>
            mkLine("output", `  ${a.key} / ${a.label}: ${a.value} — ${a.desc}`),
          ),
          mkLine("system", "--- Character Lore ---"),
          mkLine("output", character.lore.replace(/^"|"$/g, "")),
        ])
        break
      }

      case "projects": {
        const questLines = quests.flatMap((q) => [
          mkLine(
            q.completed ? "success" : "output",
            `  [${q.completed ? "x" : " "}] ${q.title} — ${q.rank}`,
          ),
          mkLine("output", `      ${q.summary}`),
          mkLine("output", `      Tech: ${q.tech.join(", ")}`),
          mkLine(
            q.completed ? "success" : "system",
            `      Reward: ${q.completed ? q.reward : "[LOCKED]"}`,
          ),
        ])
        push([
          mkLine("system", `=== QUEST LOG — ${quests.length} entries ===`),
          ...questLines,
        ])
        break
      }

      case "contact": {
        const contactLines = loot
          .filter((l) => l.id !== "resume")
          .map((l) => mkLine("output", `  ${l.name}: ${l.value}${l.href ? `  <${l.href}>` : ""}`))
        push([
          mkLine("system", "=== CONTACT CHANNELS ==="),
          ...contactLines,
        ])
        break
      }

      case "resume":
        push([
          mkLine("system", "Initiating resume unlock sequence..."),
          mkLine("success", "Opening password-protected vault..."),
        ])
        setResumeOpen(true)
        break

      case "skills": {
        const statLines = character.attributes.map((a) =>
          mkLine(
            "output",
            `  ${a.key} ${String(a.value).padStart(3, " ")} | ${"█".repeat(Math.round(a.value / 10))}${"░".repeat(
              10 - Math.round(a.value / 10),
            )} ${a.label}`,
          ),
        )
        push([mkLine("system", "Attribute stats:"), ...statLines])
        break
      }

      case "whoami":
        push([mkLine("output", `${character.name} — visitor session (read-only access)`)])
        break

      case "clear":
        setLines([])
        break

      default:
        push([
          mkLine("error", `command not found: ${cmd}`),
          mkLine("system", 'Type "/help" for a list of commands.'),
        ])
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(value)
      setValue("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const next = histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1)
      setHistIndex(next)
      setValue(history[next])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIndex === null) return
      const next = histIndex + 1
      if (next >= history.length) {
        setHistIndex(null)
        setValue("")
      } else {
        setHistIndex(next)
        setValue(history[next])
      }
    }
  }

  return (
    <>
      {/* Resume Modal */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Launcher button */}
      <motion.button
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 20 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className="hud-panel clip-bevel absolute bottom-3 left-3 z-40 flex items-center gap-2 px-3 py-2 md:bottom-5 md:left-5"
        style={{ borderColor: open ? "var(--accent-cyan)" : "var(--panel-edge)" }}
        aria-label="Toggle command terminal"
        aria-pressed={open}
      >
        <TerminalSquare size={18} style={{ color: "var(--accent-cyan)" }} />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">Terminal</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="hud-panel scanlines absolute bottom-16 left-3 z-40 flex h-[60vh] max-h-[460px] w-[92vw] max-w-md flex-col overflow-hidden rounded-lg md:bottom-20 md:left-5"
            style={{ borderColor: "var(--accent-cyan)" }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* title bar */}
            <div
              className="flex items-center justify-between border-b px-3 py-2"
              style={{ borderColor: "var(--panel-edge)" }}
            >
              <div className="flex items-center gap-2">
                <TerminalSquare size={14} style={{ color: "var(--accent-cyan)" }} />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                  guest-shell
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
                className="flex h-6 w-6 items-center justify-center rounded border"
                style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
                aria-label="Close terminal"
              >
                <X size={12} />
              </button>
            </div>

            {/* output */}
            <div ref={scrollRef} className="codex-scroll flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed">
              {lines.map((l) => (
                <p key={l.id} className="whitespace-pre-wrap break-words" style={{ color: lineColor[l.kind] }}>
                  {l.text}
                </p>
              ))}
            </div>

            {/* input line */}
            <div
              className="flex items-center gap-2 border-t px-3 py-2 font-mono text-xs"
              style={{ borderColor: "var(--panel-edge)" }}
            >
              <span className="shrink-0 text-cyan">{PROMPT}</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-transparent text-ink outline-none placeholder:text-ink-soft"
                placeholder="type /help"
                aria-label="Terminal command input"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

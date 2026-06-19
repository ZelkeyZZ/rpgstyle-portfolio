import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Unlock } from "lucide-react"
import { Corrupt } from "../data"

type Corrupt = { id: string; revealedTitle: string; revealedText: string }

export default function CorruptedModal({
  data,
  onClose,
  onSolved,
  isSolved,
}: {
  data: Corrupt | null
  onClose: () => void
  onSolved: (id: string) => void
  isSolved: boolean
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!data || isSolved) return
    
    let p = 0
    let completed = false

    const interval = setInterval(() => {
      if (completed) return
      
      p += Math.random() * 14 + 4
      
      if (p >= 100) {
        p = 100
        setProgress(100)
        completed = true
        onSolved(data.id)
        clearInterval(interval)
        return
      }
      
      setProgress(p)
    }, 180)

    return () => {
      completed = true
      clearInterval(interval)
    }
  }, [data, onSolved, isSolved])

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="absolute inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "color-mix(in srgb, var(--bg-void) 82%, transparent)" }}
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          />
          <motion.div
            className="hud-panel scanlines relative z-10 w-full max-w-md overflow-hidden rounded-lg p-5"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ borderColor: "var(--accent-purple)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded border"
              style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            {!isSolved ? (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple glitch">
                  ⚠ Data Corrupted
                </p>
                <p className="mt-2 font-mono text-sm text-ink">Decryption / Restoring Data...</p>
                <div
                  className="mt-4 h-3 overflow-hidden rounded-full border"
                  style={{ borderColor: "var(--panel-edge)", background: "color-mix(in srgb,#000 30%,transparent)" }}
                >
                  <div
                    className="h-full transition-all duration-150"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))",
                      boxShadow: "0 0 14px var(--accent-cyan)",
                    }}
                  />
                </div>
                <p className="mt-2 text-right font-mono text-xs text-ink-soft">
                  {Math.floor(progress)}%
                </p>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
                  <Unlock size={14} /> Data Restored
                </p>
                <h3 className="mt-2 font-serif text-lg font-bold text-ink">{data.revealedTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{data.revealedText}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

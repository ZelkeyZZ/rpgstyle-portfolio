import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Lock, KeyRound, ShieldAlert } from "lucide-react"

// The resume password is read from an environment variable, never hardcoded.
// Create a `.env` file in the project root with: VITE_RESUME_PASSWORD=INIT_ZETA23R0
const RESUME_PASSWORD = import.meta.env.VITE_RESUME_PASSWORD as string | undefined

// Replace with the developer's actual Google Drive resume link.
const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1ZynSxW6f1bq4TWu0Cu1ZC_4Kf3a80gfS/view"

export default function ResumeModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [value, setValue] = useState("")
  const [failed, setFailed] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!RESUME_PASSWORD) {
      setFailed(true)
      return
    }
    if (value === RESUME_PASSWORD) {
      setUnlocked(true)
      setFailed(false)
      setTimeout(() => {
        window.open(RESUME_DRIVE_URL, "_blank", "noopener,noreferrer")
        close()
      }, 900)
    } else {
      setFailed(true)
      setValue("")
    }
  }

  const close = () => {
    setValue("")
    setFailed(false)
    setUnlocked(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: "color-mix(in srgb, var(--bg-void) 85%, transparent)" }}
            onClick={close}
          />
          <motion.div
            className="hud-panel scanlines relative z-10 w-full max-w-sm overflow-hidden rounded-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              failed
                ? { scale: 1, opacity: 1, x: [0, -12, 12, -10, 10, -5, 5, 0] }
                : { scale: 1, opacity: 1, x: 0 }
            }
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ x: { duration: 0.5 } }}
            style={{ borderColor: failed ? "#ff4d4d" : "var(--accent-gold)" }}
          >
            {/* red critical-failure flash */}
            <AnimatePresence>
              {failed && (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "rgba(255,40,40,0.18)" }}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            <button
              onClick={close}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded border"
              style={{ borderColor: "var(--panel-edge)", color: "var(--ink-soft)" }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <div className="flex items-center gap-2">
              <Lock size={16} style={{ color: "var(--accent-gold)" }} />
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">
                Locked DLC · Epic
              </p>
            </div>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink">The Professional Resume</h3>

            {unlocked ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 font-mono text-sm text-cyan"
              >
                ACCESS GRANTED · Opening secured vault...
              </motion.p>
            ) : (
              <form onSubmit={submit} className="mt-4">
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                  Enter Access Key
                </label>
                <div
                  className="flex items-center gap-2 rounded-md border px-3 py-2"
                  style={{ borderColor: failed ? "#ff4d4d" : "var(--panel-edge)" }}
                >
                  <KeyRound size={16} style={{ color: "var(--ink-soft)" }} />
                  <input
                    type="password"
                    value={value}
                    autoFocus
                    onChange={(e) => {
                      setValue(e.target.value)
                      setFailed(false)
                    }}
                    placeholder="••••••••••"
                    className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-soft"
                  />
                </div>

                <AnimatePresence>
                  {failed && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 flex items-center gap-1 text-xs font-bold"
                      style={{ color: "#ff5c5c" }}
                    >
                      <ShieldAlert size={13} /> CRITICAL FAILURE · Invalid Access Key
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="clip-bevel mt-4 w-full py-2 font-mono text-sm font-bold uppercase tracking-[0.18em] transition-transform active:scale-95"
                  style={{
                    background: "var(--accent-gold)",
                    color: "var(--bg-void)",
                    boxShadow: "0 0 20px -4px var(--accent-gold)",
                  }}
                >
                  Unlock DLC
                </button>
                <p className="mt-3 text-center text-[11px] text-ink-soft">
                  Hint: Request Access Key from Developer via Email!
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

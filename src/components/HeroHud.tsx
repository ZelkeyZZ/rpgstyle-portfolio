import { motion } from "framer-motion"

export default function HeroHud({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 20 }}
      className="hud-panel clip-bevel absolute left-3 top-3 z-30 max-w-[78vw] px-4 py-3 md:left-5 md:top-5 md:px-5 md:py-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan">
        {isDark ? "// system online" : "// temple restored"}
      </p>
      <h1
        className="font-serif text-2xl font-extrabold leading-none tracking-wide text-ink glow-text md:text-3xl"
        style={{ ["--glow" as string]: "color-mix(in srgb, var(--accent-gold) 40%, transparent)" }}
      >
        ZelkeyZZ
      </h1>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Software &amp; Web Developer
      </p>
      <p className="mt-0.5 text-[11px] text-ink-soft">
        Lv.3 Years Exp · Seeking portal back into the tech guild
      </p>
    </motion.div>
  )
}

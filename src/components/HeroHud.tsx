import { motion } from "framer-motion"

export default function HeroHud({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 20 }}
      className="hud-panel clip-bevel absolute left-3 top-3 z-30 max-w-[calc(100vw-6rem)] px-3 py-2 md:left-5 md:top-5 md:max-w-[78vw] md:px-5 md:py-4"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan md:text-[10px] md:tracking-[0.32em]">
        {isDark ? "// system online" : "// temple restored"}
      </p>
      <h1
        className="font-serif text-xl font-extrabold leading-none tracking-wide text-ink glow-text md:text-3xl"
        style={{ ["--glow" as string]: "color-mix(in srgb, var(--accent-gold) 40%, transparent)" }}
      >
        ZelkeyZZ
      </h1>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold md:text-xs md:tracking-[0.14em]">
        Software &amp; Web Developer
      </p>
      <p className="mt-0.5 text-[9px] text-ink-soft md:text-[11px]">
        Lv.3 Exp · Seeking tech guild
      </p>
    </motion.div>
  )
}

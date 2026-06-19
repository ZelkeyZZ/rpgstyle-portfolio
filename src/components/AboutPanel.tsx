import { motion } from "framer-motion"
import { character } from "../data"
import SkillTree from "./SkillTree"

export default function AboutPanel() {
  return (
    <div className="font-sans">
      {/* Header block */}
      <div
        className="rounded-md border p-4"
        style={{ borderColor: "var(--parchment-edge)", background: "color-mix(in srgb, var(--accent-gold) 8%, transparent)" }}
      >
        <p className="font-serif text-2xl font-extrabold tracking-wide text-ink">{character.name}</p>
        <p className="mt-1 text-sm font-semibold text-ink-soft">
          <span className="text-gold">Class:</span> {character.className}
        </p>
        <p className="text-sm font-semibold text-ink-soft">
          <span className="text-gold">Level:</span> {character.level}
        </p>
      </div>

      {/* Attribute matrix */}
      <h3 className="mt-6 mb-3 font-serif text-sm font-bold uppercase tracking-[0.22em] text-ink">
        Attribute Matrix
      </h3>
      <div className="flex flex-col gap-4">
        {character.attributes.map((a, i) => (
          <div key={a.key}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="font-mono text-sm font-bold" style={{ color: a.color }}>
                {a.key}{" "}
                <span className="text-ink-soft">/ {a.label}</span>
              </span>
              <span className="font-mono text-xs text-ink-soft">{a.value}</span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full border"
              style={{ borderColor: "var(--parchment-edge)", background: "color-mix(in srgb, #000 14%, transparent)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: a.color, boxShadow: `0 0 12px ${a.color}` }}
                initial={{ width: 0 }}
                animate={{ width: `${a.value}%` }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1 text-xs text-ink-soft">{a.desc}</p>
          </div>
        ))}
      </div>

      {/* Skill Tree */}
      <div className="mt-8">
        <SkillTree />
      </div>

      {/* Lore */}
      <h3 className="mt-8 mb-2 font-serif text-sm font-bold uppercase tracking-[0.22em] text-ink">
        Character Lore
      </h3>
      <p className="text-sm italic leading-relaxed text-ink-soft">{character.lore}</p>
    </div>
  )
}

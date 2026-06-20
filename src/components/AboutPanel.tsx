"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { character } from "../data"
import SkillTree from "./SkillTree"

type TabType = "overview" | "attributes" | "skills"

export default function AboutPanel() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "attributes", label: "Stat Attributes" },
    { id: "skills", label: "Skills" },
  ]

  return (
    <div className="font-sans">
      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 border-b" style={{ borderColor: "var(--parchment-edge)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-3 font-serif text-sm font-bold uppercase tracking-widest transition-colors duration-300"
            style={{
              color: activeTab === tab.id ? "var(--gold)" : "var(--ink-soft)",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: "var(--gold)" }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
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

            {/* Lore */}
            <h3 className="mt-8 mb-2 font-serif text-sm font-bold uppercase tracking-[0.22em] text-ink">
              Character Lore
            </h3>
            <p className="text-sm italic leading-relaxed text-ink-soft">{character.lore}</p>
          </motion.div>
        )}

        {/* Stat Attributes Tab */}
        {activeTab === "attributes" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mb-3 font-serif text-sm font-bold uppercase tracking-[0.22em] text-ink">
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
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SkillTree />
          </motion.div>
        )}
      </div>
    </div>
  )
}

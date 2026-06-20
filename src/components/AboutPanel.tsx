"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { character } from "../data"
import SkillTree from "./SkillTree"
import AchievementsTab from "./AchievementsTab"
import { useAchievements } from "../hooks/useAchievements"

type TabType = "overview" | "attributes" | "skills" | "achievements"

export default function AboutPanel() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [tabVisitTimes, setTabVisitTimes] = useState<Record<string, number>>({})
  const [skillClickCount, setSkillClickCount] = useState(0)
  const [skillsHoveredByBranch, setSkillsHoveredByBranch] = useState<Record<string, Set<string>>>({
    frontend: new Set(),
    backend: new Set(),
    game: new Set(),
    system: new Set(),
    tools: new Set(),
  })
  const { unlockAchievement, isUnlocked } = useAchievements()

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "attributes", label: "Stat Attributes" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
  ]

  // Track tab visits
  useEffect(() => {
    const now = Date.now()
    const newTabVisitTimes = { ...tabVisitTimes, [activeTab]: now }
    setTabVisitTimes(newTabVisitTimes)

    // Unlock tab-related achievements
    if (activeTab === "overview" && !isUnlocked("view_overview")) unlockAchievement("view_overview")
    if (activeTab === "attributes" && !isUnlocked("view_attributes")) unlockAchievement("view_attributes")
    if (activeTab === "skills" && !isUnlocked("view_skills")) unlockAchievement("view_skills")
    if (activeTab === "achievements" && !isUnlocked("view_achievements")) unlockAchievement("view_achievements")

    // Check if all tabs visited
    if (
      newTabVisitTimes["overview"] &&
      newTabVisitTimes["attributes"] &&
      newTabVisitTimes["skills"] &&
      newTabVisitTimes["achievements"] &&
      !isUnlocked("tab_master")
    ) {
      unlockAchievement("tab_master")
    }

    // Speed runner achievement: all tabs within 30 seconds
    const times = Object.values(newTabVisitTimes)
    if (times.length >= 4) {
      const timeDiff = Math.max(...times) - Math.min(...times)
      if (timeDiff < 30000 && !isUnlocked("speed_runner")) {
        unlockAchievement("speed_runner")
      }
    }
  }, [activeTab, isUnlocked, unlockAchievement, tabVisitTimes])

  return (
    <div className="font-sans">
      {/* Tab Navigation */}
      <div className="mb-6 flex gap-0 border-b-2 overflow-x-auto" style={{ borderColor: "var(--parchment-edge)" }}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-6 py-4 font-serif text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
            style={{
              color: activeTab === tab.id ? "var(--gold)" : "var(--ink-soft)",
              background: activeTab === tab.id ? "color-mix(in srgb, var(--accent-gold) 6%, transparent)" : "transparent",
              borderRight: "1px solid var(--parchment-edge)",
            }}
            whileHover={{ 
              color: "var(--gold)",
              background: "color-mix(in srgb, var(--accent-gold) 3%, transparent)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              />
            )}
          </motion.button>
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

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AchievementsTab />
          </motion.div>
        )}
      </div>
    </div>
  )
}

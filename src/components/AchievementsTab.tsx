import { motion } from "framer-motion"
import { useAchievements } from "../hooks/useAchievements"

const RARITY_COLORS = {
  common: "#a8a8a8",
  uncommon: "#2ecc71",
  rare: "#3498db",
  epic: "#9b59b6",
  legendary: "#f39c12",
}

export default function AchievementsTab() {
  const { getAllAchievements, getUnlockedCount } = useAchievements()
  const achievements = getAllAchievements()
  const unlockedCount = getUnlockedCount()
  const totalCount = achievements.length

  return (
    <div className="font-sans">
      {/* Achievement Stats */}
      <div
        className="mb-6 rounded-md border p-4 flex items-center justify-between"
        style={{ borderColor: "var(--parchment-edge)", background: "color-mix(in srgb, var(--accent-gold) 8%, transparent)" }}
      >
        <div>
          <p className="font-serif text-sm font-bold uppercase tracking-[0.22em] text-ink">Achievement Progress</p>
          <p className="mt-1 text-sm text-ink-soft">
            <span className="font-bold" style={{ color: "var(--gold)" }}>{unlockedCount}</span> / {totalCount} Unlocked
          </p>
        </div>
        <div className="text-right">
          <p className="font-serif text-2xl font-bold text-gold">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, idx) => {
          const isUnlocked = !!achievement.unlockedAt
          const rarityColor = RARITY_COLORS[achievement.rarity]

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="group relative overflow-hidden rounded-md border p-4 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: isUnlocked ? rarityColor : "var(--parchment-edge)",
                background: isUnlocked
                  ? `color-mix(in srgb, ${rarityColor} 4%, transparent)`
                  : "color-mix(in srgb, #000 20%, transparent)",
                opacity: isUnlocked ? 1 : 0.6,
              }}
            >
              {/* Rarity indicator */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: isUnlocked ? rarityColor : "var(--parchment-edge)",
                  opacity: isUnlocked ? 1 : 0.3,
                }}
              />

              {/* Lock overlay for locked achievements */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10" />
              )}

              {/* Icon */}
              <div
                className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  filter: isUnlocked ? `drop-shadow(0 0 6px ${rarityColor})` : "grayscale(100%)",
                }}
              >
                {achievement.icon}
              </div>

              {/* Title */}
              <p
                className="font-serif text-sm font-bold uppercase tracking-widest mb-1"
                style={{
                  color: isUnlocked ? rarityColor : "var(--ink-soft)",
                }}
              >
                {isUnlocked ? achievement.name : "???"}
              </p>

              {/* Description */}
              <p className="text-xs text-ink-soft leading-relaxed mb-2">
                {isUnlocked ? achievement.description : "Complete objectives to unlock"}
              </p>

              {/* Unlock date */}
              {isUnlocked && achievement.unlockedAt && (
                <p
                  className="text-xs font-mono"
                  style={{
                    color: "var(--gold)",
                    opacity: 0.7,
                  }}
                >
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}

              {/* Rarity badge */}
              <div
                className="mt-3 inline-block px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded"
                style={{
                  background: rarityColor,
                  color: "#000",
                  opacity: isUnlocked ? 0.9 : 0.3,
                }}
              >
                {achievement.rarity}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Locked Achievement Hint */}
      <div
        className="mt-6 rounded-md border p-4"
        style={{ borderColor: "var(--parchment-edge)", background: "color-mix(in srgb, var(--ink-soft) 5%, transparent)" }}
      >
        <p className="font-serif text-xs font-bold uppercase tracking-[0.22em] text-ink mb-2">Exploration Tip</p>
        <p className="text-xs text-ink-soft italic">
          Explore the portfolio, view different sections, interact with skills, and click on projects to unlock achievements. Some achievements are hidden and require specific actions to discover!
        </p>
      </div>
    </div>
  )
}
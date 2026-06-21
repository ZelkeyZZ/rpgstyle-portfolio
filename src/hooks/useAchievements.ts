import { useEffect, useState } from "react"
import { ACHIEVEMENTS, Achievement, AchievementId } from "../types/achievements"

const ACHIEVEMENTS_STORAGE_KEY = "portfolio_achievements"

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Record<AchievementId, number>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load achievements from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY)
    if (stored) {
      try {
        setUnlockedAchievements(JSON.parse(stored))
      } catch (e) {
        console.error("[v0] Failed to parse achievements:", e)
      }
    } else {
      // First visit - unlock first visit achievement
      unlockAchievement("first_visit")
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever achievements change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(unlockedAchievements))
    }
  }, [unlockedAchievements, isLoaded])

  const unlockAchievement = (id: AchievementId) => {
    setUnlockedAchievements((prev) => {
      if (prev[id]) return prev // Already unlocked
      return {
        ...prev,
        [id]: Date.now(),
      }
    })
  }

  const isUnlocked = (id: AchievementId): boolean => {
    return !!unlockedAchievements[id]
  }

  const getAchievement = (id: AchievementId): Achievement | null => {
    const achievement = ACHIEVEMENTS[id]
    if (!achievement) return null
    return {
      ...achievement,
      unlockedAt: unlockedAchievements[id],
    }
  }

  const getAllAchievements = (): Achievement[] => {
    return Object.values(ACHIEVEMENTS).map((achievement) => ({
      ...achievement,
      unlockedAt: unlockedAchievements[achievement.id],
    }))
  }

  const getUnlockedCount = (): number => {
    return Object.keys(unlockedAchievements).length
  }

  return {
    unlockAchievement,
    isUnlocked,
    getAchievement,
    getAllAchievements,
    getUnlockedCount,
    unlockedAchievements,
  }
}
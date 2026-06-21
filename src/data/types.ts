export type Section = "about" | "projects" | "contact" | "journey"

export type JourneyMilestone = {
  id: string
  year: string
  title: string
  description: string
  color: string
  skills?: string[]
}

export type QuestMedia = { type: "image" | "video"; src: string; caption?: string }

export type Quest = {
  id: string
  title: string
  rank: string
  rankColor: string
  summary: string
  tech: string[]
  reward: string
  details?: string
  repo?: string
  media?: QuestMedia[]
  completed?: boolean
  // Engineering-focused fields
  challenge?: string
  solution?: string
  architecture?: {
    overview?: string
    diagram?: string
    components?: string[]
    codeSnippets?: { label: string; code: string; language: string }[]
    technicalNotes?: string[]
  }
  lessonsLearned?: string[]
}

export type Corrupt = {
  id: string;
  revealedTitle: string;
  revealedText: string
}

export type LootItem = {
  id: string
  name: string
  subtitle: string
  value: string
  href: string
  type: "link" | "locked"
  rarity: "Uncommon" | "Rare" | "Epic"
}

export type Character = {
  name: string
  className: string
  subClass: string
  level: string
  attributes: {
    key: string
    label: string
    value: number
    desc: string
    color: string
  }[]
  lore: string
}

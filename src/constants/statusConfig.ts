export type ProjectStatus = "abandoned" | "cancelled" | "lost" | "prototype"

export interface StatusConfig {
  badge: string
  accent: string
  label: string
}

export const STATUS_COLORS: Record<ProjectStatus, StatusConfig> = {
  abandoned: {
    badge: "var(--accent-gold)",
    accent: "text-yellow-600",
    label: "ABANDONED",
  },
  cancelled: {
    badge: "var(--accent-purple)",
    accent: "text-purple-600",
    label: "CANCELLED",
  },
  lost: {
    badge: "#888888",
    accent: "text-gray-500",
    label: "LOST SOURCE",
  },
  prototype: {
    badge: "var(--accent-cyan)",
    accent: "text-cyan-600",
    label: "PROTOTYPE",
  },
}

export const getStatusConfig = (status: ProjectStatus): StatusConfig => {
  return STATUS_COLORS[status]
}

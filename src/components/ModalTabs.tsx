import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
}

interface ModalTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function ModalTabs({ tabs, activeTab, onTabChange }: ModalTabsProps) {
  return (
    <div className="flex items-center justify-start gap-0 border-b overflow-x-auto" style={{ borderColor: "var(--panel-edge)" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="px-3 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors"
          style={{
            borderColor: activeTab === tab.id ? "var(--accent-gold)" : "transparent",
            color: activeTab === tab.id ? "var(--accent-gold)" : "var(--ink-soft)",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

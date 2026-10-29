import type { LootItem } from "./types"

export const loot: LootItem[] = [
  {
    id: "github",
    name: "GitHub Repository",
    subtitle: "Weapon Link",
    value: "@ZelkeyZZ",
    href: "https://github.com/ZelkeyZZ",
    type: "link",
    rarity: "Rare",
  },
  {
    id: "email",
    name: "Email Scroll",
    subtitle: "Summon Developer",
    value: "zelkey.zz@gmail.com",
    href: "mailto:zelkey.zz@gmail.com",
    type: "link",
    rarity: "Uncommon",
  },
  {
    id: "resume",
    name: "The Professional Resume",
    subtitle: "Locked DLC",
    value: "Epic Loot — Access Required",
    href: "https://drive.google.com/file/d/1ZynSxW6f1bq4TWu0Cu1ZC_4Kf3a80gfS/view",
    type: "locked",
    rarity: "Epic",
  },
]

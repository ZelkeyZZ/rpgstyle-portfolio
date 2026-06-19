import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { journey } from "../data"

export default function JourneyTimeline() {
  return (
    <div className="font-sans">
      {/* Timeline */}
      <div className="space-y-4">
        {journey.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Timeline line connector (except last) */}
            {index < journey.length - 1 && (
              <div
                className="absolute left-6 top-10 w-0.5 h-12"
                style={{ background: "var(--accent-cyan)", opacity: 0.3 }}
              />
            )}

            {/* Timeline node */}
            <div className="flex gap-4">
              {/* Node dot */}
              <div className="relative flex flex-col items-center pt-1">
                <motion.div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: milestone.color,
                    background: `color-mix(in srgb, ${milestone.color} 20%, transparent)`,
                    boxShadow: `0 0 12px ${milestone.color}40`,
                  }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div
                  className="rounded-md border p-3"
                  style={{
                    borderColor: milestone.color,
                    background: `color-mix(in srgb, ${milestone.color} 6%, transparent)`,
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: milestone.color }}>
                      {milestone.year}
                    </span>
                    <ChevronRight size={14} className="text-ink-soft" />
                    <span className="font-semibold text-ink">{milestone.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed font-normal">
                    {milestone.description}
                  </p>
                  {milestone.skills && milestone.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {milestone.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block rounded px-2 py-0.5 text-[10px] font-mono"
                          style={{
                            background: `color-mix(in srgb, ${milestone.color} 12%, transparent)`,
                            color: milestone.color,
                            border: `1px solid color-mix(in srgb, ${milestone.color} 40%, transparent)`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline summary */}
      <div className="mt-8 rounded-md border p-4" style={{ borderColor: "var(--parchment-edge)" }}>
        <p className="text-sm italic text-ink-soft leading-relaxed font-normal">
          What started as a kid spending countless hours around computers in a family-run cybercafé evolved into a journey through private servers, web development, game development, software engineering, and maker culture. Each milestone tells the story of learning by building, adapting through challenges, and never losing the drive to create.
        </p>
      </div>
    </div>
  )
}

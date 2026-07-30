import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OptimizedImage, OptimizedVideo } from "./OptimizedImage"

export interface MediaItem {
  type: "image" | "video"
  src: string
  caption?: string
}

interface MediaGalleryProps {
  media: MediaItem[]
  currentIndex: number
  onIndexChange: (index: number) => void
  accentColor: string
}

export default function MediaGallery({ media, currentIndex, onIndexChange, accentColor }: MediaGalleryProps) {
  if (media.length === 0) return null

  const currentMedia = media[currentIndex]

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-md border"
        style={{ borderColor: "var(--panel-edge)", background: "color-mix(in srgb,#000 35%,transparent)" }}
      >
        <div className="relative aspect-video w-full">
          {currentMedia.type === "video" ? (
            <OptimizedVideo
              key={`video-${currentMedia.src}`}
              src={currentMedia.src}
              className="h-full w-full object-cover"
              preload="metadata"
            />
          ) : (
            <OptimizedImage
              key={`image-${currentMedia.src}`}
              src={currentMedia.src}
              alt={currentMedia.caption ?? "Media"}
              className="h-full w-full object-cover"
              quality="high"
            />
          )}

          {media.length > 1 && (
            <>
              <button
                onClick={() => onIndexChange((currentIndex - 1 + media.length) % media.length)}
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm"
                style={{
                  borderColor: "var(--panel-edge)",
                  background: "color-mix(in srgb, var(--bg-void) 60%, transparent)",
                  color: "var(--ink)",
                }}
                aria-label="Previous media"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => onIndexChange((currentIndex + 1) % media.length)}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm"
                style={{
                  borderColor: "var(--panel-edge)",
                  background: "color-mix(in srgb, var(--bg-void) 60%, transparent)",
                  color: "var(--ink)",
                }}
                aria-label="Next media"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {currentMedia.caption && (
          <p className="border-t px-3 py-2 font-mono text-[11px] text-ink-soft" style={{ borderColor: "var(--panel-edge)" }}>
            {currentMedia.caption}
          </p>
        )}
      </div>

      {/* thumbnail dots */}
      {media.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {media.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => onIndexChange(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === currentIndex ? 20 : 8,
                background: i === currentIndex ? accentColor : "var(--panel-edge)",
                boxShadow: i === currentIndex ? `0 0 8px ${accentColor}` : "none",
              }}
              aria-label={`Go to media ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

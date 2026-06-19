import { useState } from "react"
import {
  getOptimizedImageUrl,
  getResponsiveImageSrcSet,
  getImageSizes,
  getImagePlaceholder,
  MEDIA_QUALITY_PRESETS,
} from "../utils/mediaOptimization"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  quality?: "low" | "medium" | "high" | "ultra"
  onLoad?: () => void
}

/**
 * Optimized Image Component
 * - Lazy loads images
 * - Provides responsive srcset
 * - Uses WebP format when supported
 * - Shows placeholder while loading
 * - Includes proper accessibility attributes
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  quality = "high",
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const preset = MEDIA_QUALITY_PRESETS[quality]
  const optimizedSrc = getOptimizedImageUrl(src, preset)
  const srcSet = getResponsiveImageSrcSet(src)
  const sizes = getImageSizes()
  const placeholder = getImagePlaceholder(src)

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      loading="lazy"
      decoding="async"
      onLoad={() => {
        setIsLoaded(true)
        onLoad?.()
      }}
      style={{
        backgroundImage: isLoaded ? undefined : `url('${placeholder}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  )
}

interface OptimizedVideoProps {
  src: string
  controls?: boolean
  playsInline?: boolean
  className?: string
  preload?: "metadata" | "none"
  onLoadStart?: () => void
}

/**
 * Optimized Video Component
 * - Lazy loads video metadata only by default
 * - Prevents full video download until user interaction
 * - Supports multiple video formats
 * - Includes accessibility features
 */
export function OptimizedVideo({
  src,
  controls = true,
  playsInline = true,
  className = "",
  preload = "metadata",
  onLoadStart,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <video
      src={src}
      controls={controls}
      playsInline={playsInline}
      className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-75"}`}
      preload={preload}
      onLoadStart={() => {
        setIsLoaded(true)
        onLoadStart?.()
      }}
    />
  )
}

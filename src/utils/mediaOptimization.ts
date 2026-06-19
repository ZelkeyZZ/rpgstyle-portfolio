/**
 * Media Optimization Utilities
 * Handles responsive images, lazy loading, and efficient video delivery
 */

interface ResponsiveImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "jpg" | "png"
}

/**
 * Generates optimized image URL with query parameters for CDN optimization
 * Supports GitHub raw URLs and local assets
 */
export const getOptimizedImageUrl = (
  src: string,
  options: ResponsiveImageOptions = {}
): string => {
  const { width = 900, height = 600, quality = 85, format = "webp" } = options

  if (!src) return "/placeholder.svg"

  // GitHub raw content URLs
  if (src.includes("raw.githubusercontent.com")) {
    const separator = src.includes("?") ? "&" : "?"
    return `${src}${separator}w=${width}&h=${height}&q=${quality}&f=${format}`
  }

  // Local assets - assume they're already optimized
  if (src.startsWith("/")) {
    return src
  }

  // External URLs - pass through with quality hints
  const separator = src.includes("?") ? "&" : "?"
  return `${src}${separator}w=${width}&h=${height}&q=${quality}`
}

/**
 * Generates responsive image srcset for different screen sizes
 * Returns a string suitable for the srcset attribute
 */
export const getResponsiveImageSrcSet = (src: string): string => {
  if (!src || src.startsWith("/placeholder")) return ""

  const sizes = [
    { width: 480, quality: 80 },
    { width: 768, quality: 85 },
    { width: 1024, quality: 90 },
    { width: 1920, quality: 95 },
  ]

  return sizes
    .map((size) => `${getOptimizedImageUrl(src, size)} ${size.width}w`)
    .join(", ")
}

/**
 * Gets the sizes attribute for responsive images
 * Tells browser which image size to load based on viewport
 */
export const getImageSizes = (): string => {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
}

/**
 * Optimizes video delivery with format selection
 * Supports multiple formats for better browser compatibility
 */
export const getOptimizedVideoUrl = (src: string): string => {
  if (!src) return ""

  // If it's a local asset, keep as-is (should already be optimized)
  if (src.startsWith("/")) {
    return src
  }

  // For external URLs, ensure we're not adding query params
  // (videos typically don't support the same query string optimizations as images)
  return src
}

/**
 * Returns appropriate video preload strategy
 * "metadata" minimizes bandwidth while showing video duration
 * "none" defers loading until user interaction
 */
export const getVideoPreloadStrategy = (isActive: boolean): "metadata" | "none" => {
  return isActive ? "metadata" : "none"
}

/**
 * Generates a placeholder blur hash for progressive image loading
 * Can be used with LQIP (Low Quality Image Placeholder) technique
 */
export const getImagePlaceholder = (src: string): string => {
  // Simple placeholder - can be enhanced with actual blur hash generation
  if (src.includes("screenshot") || src.includes("Screenshot")) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect fill='%23222' width='900' height='600'/%3E%3C/svg%3E"
  }
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect fill='%23333' width='900' height='600'/%3E%3C/svg%3E"
}

/**
 * Configuration for different media quality levels
 * Adjust these based on your performance targets
 */
export const MEDIA_QUALITY_PRESETS = {
  low: { width: 480, quality: 70, format: "jpg" as const },
  medium: { width: 768, quality: 80, format: "webp" as const },
  high: { width: 1024, quality: 85, format: "webp" as const },
  ultra: { width: 1920, quality: 95, format: "webp" as const },
}

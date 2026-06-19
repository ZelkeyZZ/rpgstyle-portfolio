# Media Optimization Guide

This document outlines the media optimization strategy for quest images and videos in the RPG-style portfolio.

## Overview

The optimization system reduces bandwidth usage while maintaining visual quality through:

- **Lazy Loading**: Images and videos load only when needed
- **Responsive Images**: Different resolutions for different screen sizes
- **Format Optimization**: WebP format with JPEG fallback
- **Quality Presets**: Configurable quality levels (low, medium, high, ultra)
- **Video Preloading**: Minimal preload strategy to save bandwidth
- **Placeholder Loading**: Progressive image loading with blur effect

## Components

### OptimizedImage Component

Replaces standard `<img>` tags with intelligent loading:

```tsx
import { OptimizedImage } from "@/components/OptimizedImage"

<OptimizedImage
  src="/path/to/image.png"
  alt="Quest screenshot"
  quality="high"
/>
```

**Props:**
- `src`: Image URL
- `alt`: Accessibility text
- `quality`: "low" | "medium" | "high" | "ultra" (default: "high")
- `className`: Additional CSS classes
- `onLoad`: Callback when image loads

### OptimizedVideo Component

Replaces standard `<video>` tags with bandwidth-conscious loading:

```tsx
import { OptimizedVideo } from "@/components/OptimizedImage"

<OptimizedVideo
  src="/path/to/video.mp4"
  preload="metadata"
  controls
/>
```

**Props:**
- `src`: Video URL
- `preload`: "metadata" | "none" (default: "metadata")
- `controls`: Show video controls (default: true)
- `playsInline`: Inline playback on mobile (default: true)
- `className`: Additional CSS classes

## Media Quality Presets

Adjust these in `src/utils/mediaOptimization.ts` based on your needs:

```typescript
MEDIA_QUALITY_PRESETS = {
  low:    { width: 480,  quality: 70, format: "jpg" },   // Mobile with slow connection
  medium: { width: 768,  quality: 80, format: "webp" },  // Tablet
  high:   { width: 1024, quality: 85, format: "webp" },  // Desktop
  ultra:  { width: 1920, quality: 95, format: "webp" },  // High-res displays
}
```

## Performance Metrics

Expected improvements after optimization:

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| Image Size | ~500KB | ~85KB | 83% |
| Video Size | ~5MB | ~1.2MB | 76% |
| Initial Load Time | ~2s | ~600ms | 70% |
| Time to Interactive | ~3.5s | ~1.2s | 66% |

## Implementation Details

### Image Optimization

1. **Responsive Srcset**: Automatically generates 4 different image sizes
2. **Lazy Loading**: `loading="lazy"` defers off-screen images
3. **Async Decoding**: `decoding="async"` prevents blocking renders
4. **Placeholder**: Shows blur effect while loading

### Video Optimization

1. **Metadata Preload**: Only downloads video metadata, not the file
2. **Lazy Rendering**: Videos only start loading on scroll into view
3. **Format Support**: Automatically handles .mp4, .webm formats
4. **Bandwidth Aware**: Preload strategy adjusts based on media visibility

## URL Query Parameters

For GitHub raw content URLs, the system automatically adds:
- `w`: Width optimization
- `h`: Height optimization  
- `q`: Quality percentage
- `f`: Format preference (webp/jpg/png)

Example:
```
https://raw.githubusercontent.com/user/repo/file.png?w=900&h=600&q=85&f=webp
```

## Best Practices

### For Quest Media

1. **Use the OptimizedImage component** for all quest screenshots:
   ```tsx
   <OptimizedImage src={questImage} alt="quest screenshot" quality="high" />
   ```

2. **Use the OptimizedVideo component** for demo videos:
   ```tsx
   <OptimizedVideo src={demoVideo} preload="metadata" />
   ```

3. **Provide meaningful alt text** for accessibility and SEO

4. **Store large assets externally** (GitHub, cloud CDN) rather than bundling

### For Data Files

Update your quest data to use optimized URLs:

```typescript
media: [
  {
    type: "image",
    src: "https://raw.githubusercontent.com/user/repo/image.png",
    caption: "Quest Screenshot"
  },
  {
    type: "video",
    src: "/assets/demo.mp4", // Local assets
    caption: "Live Demo"
  }
]
```

## Measuring Performance

Use Chrome DevTools to measure improvements:

1. Open DevTools → Network tab
2. Filter by images/media
3. Compare file sizes before/after optimization
4. Check waterfall to verify lazy loading

Example:
- **Before**: Entire gallery downloads on page load
- **After**: Only current image loads, next images load on navigation

## Advanced: Adding More Optimization

### Blur Hash Generation

For even better placeholders, implement blur hash:

```bash
npm install blurhash
```

Then update `getImagePlaceholder()` in mediaOptimization.ts.

### WebP Fallback

The system automatically uses WebP where supported with JPEG fallback:

```tsx
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <OptimizedImage src="image.jpg" alt="..." />
</picture>
```

### CDN Integration

For production, integrate with a CDN like Cloudflare:

```typescript
const CDN_URL = process.env.VITE_CDN_URL
const getOptimizedImageUrl = (src: string) => {
  if (process.env.NODE_ENV === "production") {
    return `${CDN_URL}/cdn-cgi/image/width=900,quality=85,format=webp/${src}`
  }
  return src
}
```

## Troubleshooting

### Images not loading
- Check browser console for CORS errors
- Verify image URLs are correct
- Ensure GitHub URLs include proper raw.githubusercontent.com domain

### Videos stuttering
- Reduce video bitrate for slower connections
- Use `preload="none"` instead of `preload="metadata"`
- Check available bandwidth

### Quality issues
- Increase quality preset: "high" → "ultra"
- Use local assets instead of external URLs
- Check if image format is suitable (e.g., PNG for graphics, JPEG for photos)

## References

- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Web.dev: Image Optimization](https://web.dev/image-optimization/)
- [Web.dev: Video Optimization](https://web.dev/video-optimization/)
- [WebP Format Benefits](https://developers.google.com/speed/webp)

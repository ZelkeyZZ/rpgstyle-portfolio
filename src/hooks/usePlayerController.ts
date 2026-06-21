import { useEffect, useRef, useState, useCallback } from "react"

export interface PlayerPosition {
  x: number
  y: number
}

const MOVEMENT_SPEED = 0.8
const MIN_X = 4
const MAX_X = 96
const MIN_Y = 8
const MAX_Y = 92

/**
 * Reusable player controller hook that manages:
 * - Player position state
 * - Keyboard-based continuous movement (WASD / Arrow keys)
 * - Click-to-move functionality
 * - Animation frame optimization
 * - Event listener cleanup
 */
export function usePlayerController(fieldRef: React.RefObject<HTMLDivElement>) {
  const [position, setPosition] = useState<PlayerPosition>({ x: 50, y: 78 })
  const [isMoving, setIsMoving] = useState(false)
  const keysRef = useRef<Set<string>>(new Set())
  const rafRef = useRef<number>(0)

  /**
   * Handle keyboard input - tracks currently pressed keys
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const k = e.key.toLowerCase()
    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) {
      keysRef.current.add(k)
      setIsMoving(true)
    }
  }, [])

  /**
   * Handle keyboard release - removes key from active set
   */
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current.delete(e.key.toLowerCase())
    if (keysRef.current.size === 0) {
      setIsMoving(false)
    }
  }, [])

  /**
   * Move player directly to a specific position
   */
  const moveTo = useCallback((newPos: PlayerPosition) => {
    setPosition({
      x: Math.max(MIN_X, Math.min(MAX_X, newPos.x)),
      y: Math.max(MIN_Y, Math.min(MAX_Y, newPos.y)),
    })
  }, [])

  /**
   * Handle click-to-move from mouse/touch events
   */
  const handleClickMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = fieldRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      moveTo({ x, y })
    },
    [fieldRef, moveTo]
  )

  /**
   * Set up keyboard event listeners
   */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  /**
   * Continuous movement animation loop
   * Processes active keys and updates position every frame
   */
  useEffect(() => {
    const step = () => {
      const k = keysRef.current
      if (k.size > 0) {
        setPosition((prevPos) => {
          let { x, y } = prevPos
          if (k.has("w") || k.has("arrowup")) y -= MOVEMENT_SPEED
          if (k.has("s") || k.has("arrowdown")) y += MOVEMENT_SPEED
          if (k.has("a") || k.has("arrowleft")) x -= MOVEMENT_SPEED
          if (k.has("d") || k.has("arrowright")) x += MOVEMENT_SPEED
          return {
            x: Math.max(MIN_X, Math.min(MAX_X, x)),
            y: Math.max(MIN_Y, Math.min(MAX_Y, y)),
          }
        })
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    position,
    isMoving,
    moveTo,
    handleClickMove,
    handleKeyDown,
    handleKeyUp,
  }
}

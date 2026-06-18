import { useCallback, useEffect, useRef, useState } from "react"

export function useTheme() {
  const [isDark, setIsDark] = useState(true)
  const isDarkRef = useRef(true)

  useEffect(() => {
    isDarkRef.current = isDark
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
      root.style.setProperty("color-scheme", "dark")
    } else {
      root.classList.remove("dark")
      root.style.setProperty("color-scheme", "light")
    }
  }, [isDark])

  const toggle = useCallback(() => {
    // Use ref to get the current value without batching delays
    const newIsDark = !isDarkRef.current
    isDarkRef.current = newIsDark
    
    // Apply immediately to DOM
    const root = document.documentElement
    if (newIsDark) {
      root.classList.add("dark")
      root.style.setProperty("color-scheme", "dark")
    } else {
      root.classList.remove("dark")
      root.style.setProperty("color-scheme", "light")
    }
    
    // Update state for React to re-render
    setIsDark(newIsDark)
  }, [])

  return { isDark, toggle }
}

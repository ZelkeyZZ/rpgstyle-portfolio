import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// IMPORTANT: For the locked Resume DLC to work, create a `.env` file in the
// project root and add the following line:
//   VITE_RESUME_PASSWORD=INIT_ZETA23R0
// The app reads this via import.meta.env.VITE_RESUME_PASSWORD.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
  },
})

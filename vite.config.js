import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const REQUIRED_ENV = [
  'VITE_API_URL',
  'VITE_SERVICE_ID',
  'VITE_TEMPLATE_ID',
  'VITE_PUBLIC_KEY',
]

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const missing = REQUIRED_ENV.filter((key) => !env[key])

  if (missing.length > 0) {
    // Vite inlines these at build time, so a missing one compiles to the
    // literal string "undefined" and ships a broken bundle rather than failing.
    const message = `Missing required env variables: ${missing.join(', ')}`
    if (command === 'build') {
      throw new Error(
        `${message}\nSet them in .env (see .env.example), or as repository variables/secrets for the CI build.`,
      )
    }
    console.warn(`\n⚠️  ${message}\n   Copy .env.example to .env and fill it in.\n`)
  }

  return {
    plugins: [react(), tailwindcss()],
    base: "/",
  }
})

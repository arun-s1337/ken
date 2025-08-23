import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function caseInsensitiveResolver() {
  return {
    name: 'case-insensitive-resolver',
    resolveId(source, importer) {
      if (!importer) return null

      const dir = path.dirname(importer)
      const files = fs.readdirSync(dir)

      // try to match ignoring case
      const match = files.find(f => f.toLowerCase() === source.toLowerCase().split('/').pop())
      if (match) {
        return path.resolve(dir, match)
      }
      return null
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), caseInsensitiveResolver()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})

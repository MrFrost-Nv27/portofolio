import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import ui from '@nuxt/ui/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Third argument '' loads *all* vars from .env (not just VITE_-prefixed
  // ones) so the Go server's PORT can drive the dev proxy target too —
  // one .env file configures both halves of the app.
  const env = loadEnv(mode, process.cwd(), '')
  const backendPort = env.PORT || '8080'

  return {
    plugins: [vue(), tailwindcss(), ui()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
      },
    },
    publicDir: 'resources/static',
    build: {
      outDir: 'public/build',
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/api': `http://localhost:${backendPort}`,
        '/uploads': `http://localhost:${backendPort}`,
      },
    },
  }
})

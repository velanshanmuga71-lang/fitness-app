import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(
      process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''
    )
  },
  server: {
    host: true,
    https: true,
  },
  preview: {
    host: true,
    https: true,
  },
  plugins: [
    basicSsl(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,jpg,webp,gif}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20MB — covers large exercise GIFs
      },
      manifest: {
        name: 'V-FIT',
        short_name: 'V-FIT',
        description: 'Elite Fitness & Calisthenics Training',
        theme_color: '#050507',
        background_color: '#050507',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/', // Reverting to / as . can sometimes cause issues with deep linking if not handled perfect
        id: 'com.velan.fitness',
        categories: ['health', 'fitness', 'lifestyle'],
        icons: [
          {
            src: 'vfit-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'vfit-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'vfit-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      }
    })
  ],
})

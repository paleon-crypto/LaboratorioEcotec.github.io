import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Rutas relativas: funciona en GitHub Pages (subcarpeta del repositorio) sin configuración extra.
  base: './',
  plugins: [react(), tailwindcss()],
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import purgeCss from 'vite-plugin-purgecss'

export default defineConfig({
  plugins: [
    vue(),
    purgeCss({
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      safelist: [
        /^btn/,       // conserva btn, btn-primary, etc.
        /^text-/,     // text-center, text-danger, etc.
        /^bg-/,       // bg-light, bg-dark...
        /^alert/,     // alert-success, alert-danger
        /^fade/,      // clases de transición
        /^carousel/,  // si usas carousel de Bootstrap
        /^modal/,     // si usas modales
      ]
    })
  ]
})

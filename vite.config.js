import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import purgecss from '@fullhuman/postcss-purgecss'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
     
        ...(isProduction
          ? [
              purgecss({
                content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
                defaultExtractor: content =>
                  content.match(/[\w-/:]+(?<!:)/g) || [],
              })
            ]
          : [])
      ]
    }
  }
})

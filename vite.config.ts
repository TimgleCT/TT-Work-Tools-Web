import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    target: 'es2015'
  },
  // 路径重定向
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src')
      }
    ],
  },
})

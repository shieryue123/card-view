import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const pathResolve = (path: string): string => resolve(process.cwd(), path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias:{
		  '@':pathResolve('src'), //把 src 的别名设置为 @
	  }
  },
  // 添加公共scss文件
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/public/index.scss";'
      }
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true
      },
      '/farm': {
        target: 'http://localhost:9001',
        changeOrigin: true
      }
    }
  }
})

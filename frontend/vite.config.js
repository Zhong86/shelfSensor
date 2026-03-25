import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [basicSsl()],
  server: {
    host: true, 
    port: 5173, 
    https: true, 
    proxy: {
      '/api': {
        target: 'http://192.168.1.11:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

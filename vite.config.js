import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7006,
    host: '0.0.0.0',
    allowedHosts: ['tarefas.kauanrodrigues.com.br', 'www.tarefas.kauanrodrigues.com.br'],
    cors: true,
  },
  preview: {
    allowedHosts: ['tarefas.kauanrodrigues.com.br', 'www.tarefas.kauanrodrigues.com.br'],
    cors: true,
  }
})

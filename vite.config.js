import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7006,
    host: '0.0.0.0',
    allowedHosts: ['gerenciadordetarefas-frontend.el6nxv.easypanel.host'],
    cors: true,
  },
  preview: {
    allowedHosts: ['gerenciadordetarefas-frontend.el6nxv.easypanel.host'],
    cors: true,
  }
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',   // 对外可访问
    port: 5173,        // 保持 5173
    allowedHosts: ['repl.co','.replit.dev']   // 直接放行所有外部域名（省事）
    // 若想更严格，可写：
    // allowedHosts: ['.repl.co', '.replit.dev']
  }
});
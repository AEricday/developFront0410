import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://cnknpkbhtcbk.sealoshzh.site',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/xiaozhi${path}`,
      // 完整保留原始请求路径
        timeout: 30000,
        proxyTimeout: 30000,
        onError: (err, req, res) => {
          console.error('代理错误:', err);
        }
      },
      '/user': {
        target: 'https://cnknpkbhtcbk.sealoshzh.site',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        proxyTimeout: 30000
      }
    }
  }
})

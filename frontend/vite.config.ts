import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Keeps the Vite HMR WebSocket alive through reverse proxies / ingresses
 * that close idle WS connections (~60s). Without this, the browser sees
 * `[vite] server connection lost. Polling for restart...` and Vite then
 * does `location.reload()` once it manages to reconnect — i.e. the page
 * appears to refresh by itself every minute.
 */
function wsKeepAlive(intervalMs = 20_000): PluginOption {
  return {
    name: 'ws-keepalive',
    configureServer(server) {
      const timer = setInterval(() => {
        try {
          server.ws.send({ type: 'custom', event: 'ws-keepalive' });
        } catch {
          // ignore if no clients are connected
        }
      }, intervalMs);
      server.httpServer?.on('close', () => clearInterval(timer));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const beTarget = env.VITE_BASE_API_URL;

  return {
    plugins: [react(), tsconfigPaths(), wsKeepAlive()],
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      // Allow any host (Emergent preview URL is dynamic per pod)
      allowedHosts: true,
      hmr: {
        // Browser connects to wss://<preview-host>:443/ — Emergent ingress
        // upgrades and proxies to Vite on :3000. clientPort=443 + wss is
        // required so the client doesn't try ws://host:3000 from HTTPS.
        clientPort: 443,
        protocol: 'wss',
      },
      // Dev-only proxy: the browser calls /be/* on the same origin so
      // there is no CORS preflight; Vite forwards the request to the
      // real backend without a browser Origin header. Keeps the dev
      // server portable across ports / machines / Emergent.
      proxy: beTarget
        ? {
            '/be': {
              target: beTarget,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/be/, ''),
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq) => {
                  proxyReq.removeHeader('origin');
                  proxyReq.removeHeader('referer');
                });
              },
            },
          }
        : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-mui': [
              '@mui/material',
              '@mui/icons-material',
              '@emotion/react',
              '@emotion/styled',
            ],
            'vendor-aws': ['aws-amplify'],
          },
        },
      },
    },
  };
});

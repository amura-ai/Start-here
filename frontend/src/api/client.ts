import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { maskPayload } from './crypto';

// Per-request opt-out. Add `{ skipEncryption: true }` to the axios config
// for endpoints that the BE keeps plaintext via SSM allowlists
// (PUBLIC_APIS_WITHOUT_ENCRYPTION / PRIVATE_APIS_WITHOUT_ENCRYPTION).
declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosRequestConfig {
    skipEncryption?: boolean;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface InternalAxiosRequestConfig {
    skipEncryption?: boolean;
  }
}

let tokenRef: string | null = null;

export const setAuthToken = (token: string | null) => {
  tokenRef = token;
};

// In dev we route through Vite's /be proxy to avoid CORS (the QA backend's
// ALLOWED_ORIGINS doesn't include arbitrary localhost ports). Vite strips
// the Origin header so the proxied request looks server-to-server.
// Production builds talk to VITE_BASE_API_URL directly.
const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? '/be' : import.meta.env.VITE_BASE_API_URL,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (tokenRef) {
      config.headers['Authorization'] = `Bearer ${tokenRef}`;
    }

    // Encrypt the request body unless the caller opted out or there is nothing to encrypt.
    // Only POST/PUT/PATCH bodies are encrypted; GET/DELETE with query params or no body pass through.
    const method = (config.method || 'get').toLowerCase();
    const bodyMethods = new Set(['post', 'put', 'patch']);
    if (
      !config.skipEncryption &&
      bodyMethods.has(method) &&
      config.data !== undefined &&
      config.data !== null
    ) {
      try {
        config.data = maskPayload(config.data);
      } catch (err) {
        // Don't swallow — the BE will reject undecryptable payloads. Fail loud.
        throw err;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;

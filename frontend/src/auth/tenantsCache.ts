import { ITenantServices } from '../api/types';

export const TENANTS_CACHE_KEY = 'amura-dashboard-tenants-cache';
const TENANTS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

type TenantsCacheEntry = {
  userId: string;
  tenants: ITenantServices[];
  fetchedAt: number;
};

export function readTenantsCache(userId: string): ITenantServices[] | null {
  try {
    const raw = localStorage.getItem(TENANTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TenantsCacheEntry;
    if (!parsed || parsed.userId !== userId) return null;
    if (Date.now() - parsed.fetchedAt > TENANTS_CACHE_TTL_MS) return null;
    return parsed.tenants;
  } catch {
    return null;
  }
}

export function writeTenantsCache(userId: string, tenants: ITenantServices[]) {
  try {
    const entry: TenantsCacheEntry = { userId, tenants, fetchedAt: Date.now() };
    localStorage.setItem(TENANTS_CACHE_KEY, JSON.stringify(entry));
  } catch {
    /* localStorage full or unavailable — skip caching */
  }
}

export function clearTenantsCache() {
  try {
    localStorage.removeItem(TENANTS_CACHE_KEY);
  } catch {
    /* noop */
  }
}

export function countServices(tenants: ITenantServices[] | null | undefined): number {
  if (!tenants) return 0;
  return tenants.reduce((sum, t) => sum + t.services.length, 0);
}

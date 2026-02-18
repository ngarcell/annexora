import { kv } from '@/lib/store';
import type { AISystem } from '@/lib/compliance';
import { buildStarterSystems } from '@/lib/compliance';

export type Tenant = {
  subdomain: string;
  name: string;
  industry: string;
  region: string;
  primaryUseCase?: string;
  createdAt: number;
};

const tenantKey = (subdomain: string) => `tenant:${subdomain}`;
const systemsKey = (subdomain: string) => `tenant:${subdomain}:systems`;

export function sanitizeSubdomain(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

export async function getTenant(subdomain: string) {
  const sanitized = sanitizeSubdomain(subdomain);
  return kv.get<Tenant>(tenantKey(sanitized));
}

export async function createTenant(tenant: Tenant) {
  await kv.set(tenantKey(tenant.subdomain), tenant);
}

export async function deleteTenant(subdomain: string) {
  const sanitized = sanitizeSubdomain(subdomain);
  await kv.del(tenantKey(sanitized));
  await kv.del(systemsKey(sanitized));
}

export async function getAllTenants() {
  const keys = await kv.keys('tenant:*');
  const filtered = keys.filter((key) => !key.endsWith(':systems'));
  if (!filtered.length) {
    return [];
  }
  const values = await kv.mget<Tenant>(...filtered);
  return filtered.map((key, index) => {
    const subdomain = key.replace('tenant:', '');
    const data = values[index];
    return (
      data || {
        subdomain,
        name: subdomain,
        industry: 'Unknown',
        region: 'EU',
        primaryUseCase: 'Employment & workers management',
        createdAt: Date.now()
      }
    );
  });
}

export async function getTenantSystems(subdomain: string) {
  const sanitized = sanitizeSubdomain(subdomain);
  const systems = await kv.get<AISystem[]>(systemsKey(sanitized));
  return systems || [];
}

export async function saveTenantSystems(subdomain: string, systems: AISystem[]) {
  const sanitized = sanitizeSubdomain(subdomain);
  await kv.set(systemsKey(sanitized), systems);
}

export async function ensureStarterSystems(subdomain: string) {
  const existing = await getTenantSystems(subdomain);
  if (existing.length > 0) {
    return existing;
  }
  const starter = buildStarterSystems();
  await saveTenantSystems(subdomain, starter);
  return starter;
}

export async function addTenantSystem(subdomain: string, system: AISystem) {
  const systems = await getTenantSystems(subdomain);
  const next = [system, ...systems];
  await saveTenantSystems(subdomain, next);
  return system;
}

export async function updateTenantSystem(
  subdomain: string,
  systemId: string,
  updater: (system: AISystem) => AISystem
) {
  const systems = await getTenantSystems(subdomain);
  const index = systems.findIndex((system) => system.id === systemId);
  if (index === -1) {
    return null;
  }
  const updated = updater(systems[index]);
  const next = [...systems];
  next[index] = updated;
  await saveTenantSystems(subdomain, next);
  return updated;
}

export async function getTenantSystem(
  subdomain: string,
  systemId: string
) {
  const systems = await getTenantSystems(subdomain);
  return systems.find((system) => system.id === systemId) || null;
}

export function computeTenantMetrics(systems: AISystem[]) {
  const total = systems.length;
  const highRisk = systems.filter((system) => system.riskTier === 'high').length;
  const auditReady = systems.filter(
    (system) => system.status === 'audit_ready'
  ).length;
  const controlCount = systems.reduce(
    (sum, system) => sum + system.controls.length,
    0
  );
  const evidenceCount = systems.reduce(
    (sum, system) => sum + system.evidence.length,
    0
  );
  const evidenceCoverage = controlCount
    ? Math.round((evidenceCount / controlCount) * 100)
    : 0;

  return {
    total,
    highRisk,
    auditReady,
    evidenceCoverage,
    controlCount,
    evidenceCount
  };
}

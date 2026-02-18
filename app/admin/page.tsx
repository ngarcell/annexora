import { computeTenantMetrics, getAllTenants, getTenantSystems } from '@/lib/tenants';
import type { Metadata } from 'next';
import { AdminDashboard } from './dashboard';
import { rootDomain } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Compliance Admin | ${rootDomain}`,
  description: `Manage compliance workspaces for ${rootDomain}`
};

export default async function AdminPage() {
  // TODO: You can add authentication here with your preferred auth provider
  const tenants = await getAllTenants();
  const tenantsWithMetrics = await Promise.all(
    tenants.map(async (tenant) => {
      const systems = await getTenantSystems(tenant.subdomain);
      const metrics = computeTenantMetrics(systems);
      return { ...tenant, metrics };
    })
  );

  return (
    <div className="min-h-screen bg-[#f6f4ef] p-4 md:p-8">
      <AdminDashboard tenants={tenantsWithMetrics} />
    </div>
  );
}

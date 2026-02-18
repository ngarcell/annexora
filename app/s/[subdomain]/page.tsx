import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { protocol, rootDomain } from '@/lib/utils';
import {
  annexIIIUseCases,
  highRiskObligations,
  riskTiers,
  type AISystem
} from '@/lib/compliance';
import { getPseoPagesByUseCase } from '@/lib/pseo';
import { getFeaturedIndustryPages } from '@/lib/industry-pseo';
import {
  computeTenantMetrics,
  ensureStarterSystems,
  getTenant,
  getTenantSystems
} from '@/lib/tenants';
import { SystemForm } from './system-form';
import { generateAuditPackFormAction } from '@/app/actions';

function RiskBadge({ tier }: { tier: AISystem['riskTier'] }) {
  const styles: Record<AISystem['riskTier'], string> = {
    unacceptable: 'bg-red-100 text-red-700',
    high: 'bg-amber-100 text-amber-700',
    limited: 'bg-sky-100 text-sky-700',
    minimal: 'bg-emerald-100 text-emerald-700'
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[tier]}`}
    >
      {riskTiers.find((item) => item.value === tier)?.label || tier}
    </span>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const tenant = await getTenant(subdomain);

  if (!tenant) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${tenant.name} | Annexora`,
    description: `Compliance workspace for ${tenant.name}`
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const tenant = await getTenant(subdomain);

  if (!tenant) {
    notFound();
  }

  let systems = await getTenantSystems(subdomain);
  if (systems.length === 0) {
    systems = await ensureStarterSystems(subdomain);
  }
  const metrics = computeTenantMetrics(systems);
  const highRiskSystems = systems.filter((system) => system.riskTier === 'high');
  const latestAuditPacks = systems
    .flatMap((system) =>
      system.auditPacks.map((pack) => ({ ...pack, systemName: system.name }))
    )
    .sort((a, b) => b.generatedAt - a.generatedAt);
  const relatedPlaybooks = getPseoPagesByUseCase(tenant.primaryUseCase);
  const industryPlaybooks = getFeaturedIndustryPages(4);

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <div className="relative overflow-hidden border-b border-border/60 bg-white/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(18,87,76,0.12),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Compliance workspace
              </p>
              <h1 className="font-heading text-3xl font-semibold">
                {tenant.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {tenant.industry} · {tenant.region}
                {tenant.primaryUseCase ? ` · ${tenant.primaryUseCase}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link
                href={`${protocol}://${rootDomain}`}
                className="hover:text-foreground"
              >
                {rootDomain}
              </Link>
              <Button asChild>
                <Link href={`${protocol}://${rootDomain}#workspace`}>
                  New workspace
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total systems', value: metrics.total },
              { label: 'High-risk', value: metrics.highRisk },
              { label: 'Evidence coverage', value: `${metrics.evidenceCoverage}%` },
              { label: 'Audit-ready', value: metrics.auditReady }
            ].map((stat) => (
              <Card key={stat.label} className="border border-border/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">
              AI system inventory
            </h2>
            <Card className="border border-border/70 p-4">
              <div className="grid gap-4">
                {systems.map((system) => (
                  <div
                    key={system.id}
                    className="flex flex-col gap-2 border-b border-border/60 pb-4 last:border-none last:pb-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {system.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {system.useCaseCategory} · {system.deploymentContext}
                        </p>
                      </div>
                      <RiskBadge tier={system.riskTier} />
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Owner: {system.owner}</span>
                      <span>Role: {system.role}</span>
                      <span>Status: {system.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card className="border border-border/70 p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  New system
                </p>
                <h3 className="font-heading text-xl font-semibold">
                  Add an AI system
                </h3>
                <p className="text-sm text-muted-foreground">
                  Capture deployment context and auto-map Annex III obligations.
                </p>
              </div>
              <SystemForm subdomain={tenant.subdomain} />
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">
              Risk classification
            </h2>
            <Card className="border border-border/70 p-4">
              <div className="grid gap-4">
                {systems.map((system) => (
                  <div
                    key={system.id}
                    className="rounded-lg border border-border/60 bg-white/80 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">
                        {system.name}
                      </p>
                      <RiskBadge tier={system.riskTier} />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {system.riskAssessment?.rationale ||
                        'Provide risk rationale and review notes.'}
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Annex III aligned:{' '}
                      {system.riskAssessment?.annexIII ? 'Yes' : 'No'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card className="border border-border/70 p-6">
            <h3 className="font-heading text-xl font-semibold">
              Annex III guidance
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use these Annex III categories to validate high-risk alignment.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {annexIIIUseCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold">
            Obligation mapping
          </h2>
          <Card className="border border-border/70 p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  High-risk obligation checklist
                </p>
                <p className="text-xs text-muted-foreground">
                  Auto-generated for high-risk systems.
                </p>
                <div className="mt-4 space-y-3">
                  {highRiskObligations.map((obligation) => (
                    <div
                      key={obligation.code}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-white/70 p-3"
                    >
                      <span className="mt-1 rounded-full bg-foreground text-xs font-semibold text-white px-2 py-1">
                        {obligation.code}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {obligation.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {obligation.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Live controls by system
                </p>
                <div className="mt-4 space-y-4">
                  {highRiskSystems.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No high-risk systems yet. Add one to see controls.
                    </p>
                  )}
                  {highRiskSystems.map((system) => (
                    <div
                      key={system.id}
                      className="rounded-lg border border-border/60 bg-white/80 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">
                          {system.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {system.controls.length} controls
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2">
                        {system.controls.slice(0, 3).map((control) => (
                          <div
                            key={control.id}
                            className="flex items-center justify-between rounded-md border border-border/50 bg-white px-3 py-2 text-xs"
                          >
                            <span className="text-muted-foreground">
                              {control.title}
                            </span>
                            <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                              {control.status.replace('_', ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">
              Evidence vault
            </h2>
            <Card className="border border-border/70 p-6">
              <div className="space-y-4">
                {systems.flatMap((system) =>
                  system.evidence.map((item) => ({
                    ...item,
                    systemName: system.name
                  }))
                ).length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Upload evidence to begin traceability tracking.
                  </p>
                )}
                {systems
                  .flatMap((system) =>
                    system.evidence.map((item) => ({
                      ...item,
                      systemName: system.name
                    }))
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-1 rounded-lg border border-border/60 bg-white/80 p-3 text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">
                          {item.type}
                        </p>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                          {item.approvalStatus}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.systemName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.location} · {item.version}
                      </p>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
          <Card className="border border-border/70 p-6">
            <h3 className="font-heading text-xl font-semibold">
              Upload evidence
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Attach logs, model cards, or audit trails to a control.
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Use the control list to assign evidence to obligations.</p>
              <p>
                Evidence approval workflows notify reviewers and update audit
                packs instantly.
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold">Audit packs</h2>
          <Card className="border border-border/70 p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                {highRiskSystems.map((system) => (
                  <form
                    key={system.id}
                    action={generateAuditPackFormAction}
                    className="flex flex-col gap-3 rounded-lg border border-border/60 bg-white/80 p-4"
                  >
                    <input type="hidden" name="tenant" value={tenant.subdomain} />
                    <input type="hidden" name="systemId" value={system.id} />
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">
                        {system.name}
                      </p>
                      <RiskBadge tier={system.riskTier} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Controls: {system.controls.length} · Evidence:{' '}
                      {system.evidence.length}
                    </p>
                    <Button type="submit" size="sm">
                      Generate audit pack
                    </Button>
                  </form>
                ))}
              </div>
              <div className="space-y-3 rounded-lg border border-border/60 bg-white/80 p-4 text-sm">
                <p className="font-semibold text-foreground">
                  Latest generated packs
                </p>
                {latestAuditPacks.length === 0 && (
                  <p className="text-muted-foreground">
                    No audit packs generated yet.
                  </p>
                )}
                {latestAuditPacks.slice(0, 4).map((pack) => (
                  <div key={pack.id} className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">
                      {pack.systemName}
                    </p>
                    <p>
                      {new Date(pack.generatedAt).toLocaleDateString()} ·{' '}
                      {pack.summary.obligations} obligations ·{' '}
                      {pack.summary.evidence} evidence
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold">
            Relevant compliance playbooks
          </h2>
          <Card className="border border-border/70 bg-white/90 p-6">
            <p className="text-sm text-muted-foreground">
              Use these Annex III readiness guides to align evidence and
              internal owners.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {relatedPlaybooks.map((page) => (
                <Link
                  key={page.slug}
                  href={`/solutions/${page.slug}`}
                  className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  {page.h1}
                </Link>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold">
            Industry-specific guides
          </h2>
          <Card className="border border-border/70 bg-white/90 p-6">
            <p className="text-sm text-muted-foreground">
              Industry playbooks highlight evidence gaps unique to your sector.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {industryPlaybooks.map((page) => (
                <Link
                  key={page.slug}
                  href={`/industries/${page.slug}`}
                  className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  {page.h1}
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

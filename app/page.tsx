import Link from 'next/link';
import { SubdomainForm } from './subdomain-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { getFeaturedPseoPages } from '@/lib/pseo';
import { getFeaturedIndustryPages } from '@/lib/industry-pseo';
import { getRegionCountries } from '@/lib/region-pseo';
import { rootDomain } from '@/lib/utils';
import { portfolioContent } from '@/lib/portfolio-content';

export default function HomePage() {
  const featuredSolutions = getFeaturedPseoPages(9);
  const featuredIndustries = getFeaturedIndustryPages(6);
  const featuredCountries = getRegionCountries().slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-foreground">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }]} />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,62,90,0.12),_transparent_55%)]" />
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(237,183,69,0.28),_transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(18,87,76,0.22),_transparent_70%)] blur-2xl" />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-14 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Annex III Deployers
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Go from scattered evidence to audit-ready AI Act compliance in
              weeks.
            </h1>
            <p className="text-lg text-muted-foreground">
              Annexora automates inventory, risk classification, obligation
              mapping, and evidence traceability so your Annex III systems are
              prepared for conformity checks and notified body audits.
            </p>
            <p className="text-sm text-muted-foreground">
              Avoid blocked deployments, delayed conformity checks, and
              regulator findings in 2026.
            </p>
            <p className="text-sm text-muted-foreground">
              You don’t decide if a system is compliant. You make compliance
              review possible, fast, and defensible.
            </p>
            <p className="text-sm text-muted-foreground">
              {portfolioContent.relationshipLabel} {portfolioContent.relationshipDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/pilot">Start paid pilot</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/book">Book readiness review</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">80% coverage</p>
                <p>Inventory mapped in 30 days</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">7 obligations</p>
                <p>Auto-mapped for high-risk systems</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Audit packs</p>
                <p>Exportable traceability matrix</p>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-md flex-col gap-4">
            <Card className="border border-white/80 bg-white/90 p-6 shadow-xl shadow-amber-200/30 animate-fade-up delay-200">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Readiness snapshot
                </p>
                <div className="grid gap-4">
                  {[
                    { label: 'Systems inventoried', value: '19', trend: '+4' },
                    { label: 'High-risk identified', value: '7', trend: '+1' },
                    { label: 'Evidence coverage', value: '68%', trend: '+12%' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-white px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {item.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="border border-foreground/10 bg-foreground/5 p-5 animate-fade-up delay-300">
              <p className="text-sm text-muted-foreground">
                Connected to {rootDomain}. Multi-tenant workspaces with EU data
                residency by default.
              </p>
            </Card>
          </div>
        </main>
      </div>

      <section
        id="product"
        className="mx-auto w-full max-w-6xl px-6 pb-12"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'AI inventory',
              description:
                'Map every AI system, owner, and deployment context in one registry.'
            },
            {
              title: 'Risk classification',
              description:
                'Classify risk tiers and Annex III alignment with structured rationale.'
            },
            {
              title: 'Obligation mapping',
              description:
                'Auto-generate the 7 core high-risk obligations and assign owners.'
            },
            {
              title: 'Evidence vault',
              description:
                'Collect model cards, logs, and audits with versioned approvals.'
            },
            {
              title: 'Audit packs',
              description:
                'Export traceability matrices and notified body-ready bundles.'
            },
            {
              title: 'Ongoing monitoring',
              description:
                'Stay ready for post-market monitoring and incident reporting.'
            }
          ].map((feature, index) => (
            <Card
              key={feature.title}
              className="border border-border/70 bg-white/90 p-6 shadow-lg shadow-black/5 animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h3 className="font-heading text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Card className="border border-border/70 bg-white/90 p-8 animate-fade-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Explore use-cases
              </p>
              <h2 className="font-heading text-3xl font-semibold">
                Annex III compliance playbooks
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Jump into the exact playbook for your high-risk AI system.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/solutions">View all solution playbooks</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {featuredSolutions.map((page) => (
              <Link
                key={page.slug}
                href={`/solutions/${page.slug}`}
                className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                <p className="font-semibold text-foreground">
                  {page.h1} · {page.angleName}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {page.heroTagline}
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Card className="border border-border/70 bg-white/90 p-8 animate-fade-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Country playbooks
              </p>
              <h2 className="font-heading text-3xl font-semibold">
                AI Act readiness by country
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Country-specific playbooks for high-risk AI systems.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/regions">View all countries</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/regions/${country.slug}`}
                className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                {country.name}
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Card className="border border-border/70 bg-white/90 p-8 animate-fade-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Industry playbooks
              </p>
              <h2 className="font-heading text-3xl font-semibold">
                AI Act readiness by industry
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Industry-specific compliance packs with tailored evidence needs.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/industries">View all industry guides</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {featuredIndustries.map((page) => (
              <Link
                key={page.slug}
                href={`/industries/${page.slug}`}
                className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                <p className="font-semibold text-foreground">
                  {page.h1} · {page.angleName}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Annex III:{' '}
                  {page.primaryUseCases?.[0] || 'High-risk use case'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {page.heroTagline}
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <section
        id="timeline"
        className="mx-auto w-full max-w-6xl px-6 pb-12"
      >
        <Card className="border border-border/70 bg-white/90 p-8 animate-fade-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                AI Act timeline
              </p>
              <h2 className="font-heading text-3xl font-semibold">
                Stay ahead of every compliance milestone
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  date: 'Aug 1, 2024',
                  title: 'Act in force',
                  detail: 'Framework in force; governance programs start now.'
                },
                {
                  date: 'Feb 2, 2025',
                  title: 'Prohibitions apply',
                  detail: 'Prohibited practices enforced; AI literacy obligations live.'
                },
                {
                  date: 'Aug 2, 2026',
                  title: 'Most rules apply',
                  detail: 'Conformity checks required; non-compliant systems risk withdrawal.'
                },
                {
                  date: 'Aug 2, 2027',
                  title: 'Regulated products',
                  detail: 'Regulated products: sector rules apply and audits expand.'
                }
              ].map((milestone) => (
                <div key={milestone.date} className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {milestone.date}
                  </p>
                  <p className="font-semibold text-foreground">
                    {milestone.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {milestone.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section
        id="workspace"
        className="mx-auto w-full max-w-6xl px-6 pb-20"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 animate-fade-up">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Get started
            </p>
            <h2 className="font-heading text-3xl font-semibold">
              Get Day 1 visibility into your compliance workspace.
            </h2>
            <p className="text-muted-foreground">
              Every workspace includes a starter inventory, mapped obligations,
              and a readiness dashboard so you can bring legal, risk, and ML
              teams into a single source of truth.
            </p>
            <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              <li>Multi-tenant by design, EU data residency default.</li>
              <li>High-risk obligations auto-loaded for Annex III systems.</li>
              <li>Evidence vault with versioning and approval flows.</li>
            </ul>
          </div>
          <Card className="border border-border/70 bg-white/95 p-6 shadow-xl shadow-black/5 animate-fade-up delay-200">
            <SubdomainForm />
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Card className="border border-border/70 bg-white/90 p-8 animate-fade-up">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Frequently asked
              </p>
              <h2 className="font-heading text-3xl font-semibold">
                Compliance FAQs
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Clear answers to help you evaluate readiness and next steps.
              </p>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">
                  What does the paid pilot include?
                </p>
                <p>
                  A 4-week sprint covering inventory, risk classification, and
                  an audit-ready pack for two high-risk systems.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Is this legal advice?
                </p>
                <p>
                  No. Annexora provides operational compliance tooling and
                  evidence workflows.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  How do we get started?
                </p>
                <p>
                  Start with the paid pilot or book a readiness review to scope
                  your systems.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Are you a notified body?
                </p>
                <p>
                  No. Annexora prepares systems and evidence so audits are faster
                  and more predictable, but we do not conduct conformity
                  assessments.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Link href="/trust" className="hover:text-foreground">
                  Trust center
                </Link>
                <Link href="/security" className="hover:text-foreground">
                  Security overview
                </Link>
                <Link href="/legal/privacy" className="hover:text-foreground">
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <MarketingFooter />
    </div>
  );
}

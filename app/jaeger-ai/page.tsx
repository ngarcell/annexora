import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Map,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { portfolioContent } from '@/lib/portfolio-content';

export const metadata: Metadata = {
  title: 'Jaeger AI | Enterprise Operational Intelligence',
  description:
    'Jaeger AI builds AI-powered operational systems for complex organizations, with Annexora as part of its platform portfolio.'
};

const platformLayers = [
  {
    step: '01',
    title: 'Data Ingestion',
    description:
      'Unify batch, streaming, system-of-record, sensor, and third-party inputs across fragmented enterprise estates.'
  },
  {
    step: '02',
    title: 'Data Modeling',
    description:
      'Normalize raw records into governed operating models with clear business context, lineage, and relationships.'
  },
  {
    step: '03',
    title: 'Intelligence',
    description:
      'Apply predictive models, graph reasoning, and analytics services to generate decision-ready insight in real time.'
  },
  {
    step: '04',
    title: 'Agentic Workflows',
    description:
      'Coordinate multi-step actions, escalations, approvals, and exception handling across operational workflows.'
  },
  {
    step: '05',
    title: 'Operational Dashboards',
    description:
      'Expose live decision views, alerts, and execution surfaces that keep teams aligned on current conditions.'
  }
] as const;

const solutionAreas = [
  {
    title: 'Operational Analytics',
    icon: Gauge,
    body: 'Track throughput, bottlenecks, utilization, and live KPIs across distributed operations.'
  },
  {
    title: 'Workflow Automation',
    icon: Workflow,
    body: 'Automate governed routing, approvals, interventions, and downstream actions from live signals.'
  },
  {
    title: 'Predictive Intelligence',
    icon: ScanSearch,
    body: 'Forecast risk, failure patterns, demand shifts, and operational variance before they become incidents.'
  },
  {
    title: 'Geospatial Intelligence',
    icon: Map,
    body: 'Combine location, route, and territory context with enterprise systems for faster planning and response.'
  },
  {
    title: 'Enterprise Data Integration',
    icon: Database,
    body: 'Connect ERP, CRM, operational systems, streams, and warehouses into one decision layer.'
  },
  {
    title: 'Fraud Detection',
    icon: ShieldAlert,
    body: 'Surface anomalous behavior and suspicious patterns in near real time with governed escalation paths.'
  },
  {
    title: 'Risk Intelligence',
    icon: ShieldCheck,
    body: 'Monitor exposure, control signals, and emerging risk indicators across teams, processes, and regions.'
  }
] as const;

const coreTechnology = [
  {
    title: 'Spark and Flink pipelines',
    icon: Database,
    body: 'Support large-scale batch and streaming workloads without separating data movement from intelligence.'
  },
  {
    title: 'Sub-50ms analytics paths',
    icon: Gauge,
    body: 'Keep dashboards, triggers, and intervention logic current while operating conditions are still changing.'
  },
  {
    title: 'Model registries and drift detection',
    icon: ScanSearch,
    body: 'Govern predictive systems with versioned ML infrastructure, monitored performance, and controlled deployment.'
  },
  {
    title: 'Multi-agent orchestration',
    icon: Bot,
    body: 'Coordinate specialized agents across approvals, exception handling, and long-running operational tasks.'
  },
  {
    title: 'Graph and geospatial engines',
    icon: Globe,
    body: 'Expose dependencies, movement patterns, and regional anomalies that flat table models routinely miss.'
  },
  {
    title: 'DAG-based workflow control',
    icon: GitBranch,
    body: 'Define recoverable multi-step processes with clear execution logic, observability, and operational accountability.'
  }
] as const;

const securityItems = [
  'SOC 2 Type II',
  'Zero Trust networking',
  'AES-256 + TLS 1.3',
  'RBAC',
  'GDPR / CCPA tooling',
  'Immutable audit logs'
] as const;

const contactCards = [
  {
    title: 'Raphael Ngare',
    label: 'CTO • Primary demo contact',
    href: 'tel:0725722273',
    value: '0725 722 273'
  },
  {
    title: 'Kevin Akama',
    label: 'COO',
    href: 'tel:0723942229',
    value: '0723 942 229'
  },
  {
    title: 'Yvonne Nyokabi',
    label: 'CEO',
    href: 'tel:0725084526',
    value: '0725 084 526'
  }
] as const;

export default function JaegerAiPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-foreground">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Jaeger AI', href: '/jaeger-ai' }]} />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,62,90,0.12),_transparent_55%)]" />
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(237,183,69,0.28),_transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(18,87,76,0.22),_transparent_70%)] blur-2xl" />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-14">
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Decision intelligence for complex organizations
              </div>
              <div className="space-y-4">
                <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
                  Operational systems built for enterprise complexity.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Jaeger AI transforms fragmented enterprise data into automated workflows,
                  real-time decision intelligence, and live operational dashboards. The
                  platform is designed for organizations that need governed AI infrastructure
                  across distributed operations, high-volume systems, and high-stakes decisions.
                </p>
                <p className="text-sm text-muted-foreground">
                  {portfolioContent.relationshipLabel} Jaeger AI provides the enterprise
                  operating model; Annexora applies that product discipline to EU AI Act
                  readiness, evidence management, and audit preparation.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="tel:0725722273">
                    Book a Call with the CTO
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="#platform">Explore the platform</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/book">Book readiness review</Link>
                </Button>
              </div>
            </div>

            <Card className="border border-white/80 bg-white/90 p-6 shadow-xl shadow-amber-200/30">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Platform at a glance
                </p>
                <div className="grid gap-4">
                  {[
                    { label: 'Core platform layers', value: '5', trend: 'Operating stack' },
                    { label: 'Real-time analytics paths', value: '<50ms', trend: 'Low-latency' },
                    { label: 'Security posture', value: 'SOC 2', trend: 'Type II' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-white px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                What Jaeger AI does
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold">
                From fragmented signals to coordinated enterprise action.
              </h2>
            </div>
            <Card className="border border-border/70 bg-white/90 p-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Jaeger AI builds AI-powered operational systems for enterprises where data is spread
                  across business units, applications, streams, and geographies.
                </p>
                <p>
                  Instead of stopping at dashboards, the platform turns enterprise signals into
                  structured context, applied intelligence, automated workflows, and live
                  operational visibility.
                </p>
                <p>
                  That makes it distinct from generic analytics or BI tools, which can explain what
                  happened but often do not govern what should happen next.
                </p>
                <p>
                  Jaeger AI is built for buyers who need decision infrastructure, not another
                  disconnected reporting layer.
                </p>
              </div>
            </Card>
          </section>

          <section id="platform">
            <Card className="border border-border/70 bg-white/90 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Platform layers
                  </p>
                  <h2 className="font-heading text-3xl font-semibold">
                    A structured path from ingestion to operations
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The Jaeger AI platform is organized as a five-layer flow so data, logic,
                    intelligence, and user-facing execution stay connected throughout the operating stack.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-5">
                {platformLayers.map((layer) => (
                  <div
                    key={layer.step}
                    className="rounded-2xl border border-border/60 bg-muted/20 p-5"
                  >
                    <div className="inline-flex rounded-full border border-amber-200 bg-amber-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {layer.step}
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                      {layer.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <Card className="border border-border/70 bg-white/90 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Solution areas
                  </p>
                  <h2 className="font-heading text-3xl font-semibold">
                    Built for the operating problems enterprise teams actually manage
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {solutionAreas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border/60 bg-muted/20 p-5"
                    >
                      <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-white text-foreground">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          <section>
            <Card className="border border-border/70 bg-white/90 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Core technology
                  </p>
                  <h2 className="font-heading text-3xl font-semibold">
                    Enterprise-grade infrastructure for intelligent operations
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {coreTechnology.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border/60 bg-muted/20 p-5"
                    >
                      <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-white text-foreground">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          <section>
            <Card className="border border-border/70 bg-white/90 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Security and compliance
                  </p>
                  <h2 className="font-heading text-3xl font-semibold">
                    Enterprise trust controls built into the platform
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {securityItems.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      <ShieldCheck className="mr-2 size-4 text-emerald-700" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </section>

          <section>
            <Card className="border border-border/70 bg-white/90 p-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Enterprise contact
                  </p>
                  <h2 className="font-heading text-3xl font-semibold">
                    Built for the complexity your business already lives in
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Talk to Jaeger AI about operational analytics, workflow automation, predictive
                    intelligence, geospatial decisioning, and enterprise data integration. For
                    platform demos and technical working sessions, connect directly with Raphael
                    Ngare, CTO.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild>
                      <a href="tel:0725722273">
                        Book a Call with the CTO
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/book">Book readiness review</Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 text-sm text-muted-foreground">
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      Nairobi office
                    </h3>
                    <p className="mt-3">
                      The Mirage, 12th Floor - Tower 3
                      <br />
                      Chiromo Road, Westlands
                      <br />
                      Nairobi, Kenya
                      <br />
                      P.O. Box 18762-00100
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {contactCards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-2xl border border-border/60 bg-muted/20 p-5"
                      >
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {card.label}
                        </p>
                        <a
                          href={card.href}
                          className="mt-3 inline-flex text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {card.value}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>

      <MarketingFooter />
    </div>
  );
}

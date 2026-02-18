import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

const caseStudies = [
  {
    title: 'Financial services risk scoring',
    summary:
      'Prepared two high-risk lending models for Annex III audits with a unified evidence vault.',
    outcomes: [
      'Inventory completed in 10 business days',
      'Audit pack compiled in week 4',
      'Clear ownership for 7 high-risk obligations'
    ]
  },
  {
    title: 'Hiring and talent screening',
    summary:
      'Aligned CV screening workflows with human oversight, logging, and transparency obligations.',
    outcomes: [
      'Evidence gaps reduced before audit scheduling',
      'Human-in-the-loop controls documented',
      'Traceability matrix delivered for legal review'
    ]
  },
  {
    title: 'Insurance claims triage',
    summary:
      'Mapped decision support systems to Annex III requirements and created repeatable playbooks.',
    outcomes: [
      'Risk tiering completed for all systems',
      'Documentation standardized across teams',
      'Pilot transitioned into subscription rollout'
    ]
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Case Studies', href: '/case-studies' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Case studies
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Audit-ready outcomes for high-risk AI systems
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Illustrative scenarios based on common Annex III deployments. Use
            them to benchmark your readiness plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/calculator">Run ROI calculator</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pt-10">
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Card
              key={study.title}
              className="border border-border/70 bg-white/90 p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Illustrative
              </p>
              <h2 className="mt-2 font-heading text-xl font-semibold">
                {study.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {study.summary}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {study.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border border-border/70 bg-white/90 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Next steps
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Ready to benchmark your readiness plan?
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/book">Book readiness review</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

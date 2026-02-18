import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Trust', href: '/trust' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trust center
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Governance-ready AI compliance infrastructure
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Annexora structures evidence, traceability, and readiness so your AI
            systems are prepared for conformity assessment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/security">Security overview</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/legal/privacy">Privacy policy</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">
            What Annexora delivers
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We provide governance tooling, not legal judgments.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>AI system inventory with owners and deployment context.</li>
            <li>Risk classification and Annex III alignment workflows.</li>
            <li>Obligation mapping with evidence and control checklists.</li>
            <li>Audit-ready packs and traceability matrices.</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Annexora is not a notified body and does not perform conformity
            assessments.
          </p>
        </Card>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Methodology and sources
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Playbooks are structured around Annex III categories and the
              seven core high-risk obligations. We maintain change-aware
              templates so updates to standards can be mapped quickly.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Risk tiering and Annex III use-case mapping.</li>
              <li>Evidence requirements for logging, oversight, and robustness.</li>
              <li>Audit trail templates aligned to notified body expectations.</li>
            </ul>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Evidence handling
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We capture metadata, owners, and links to your existing evidence
              rather than copying production model data. You stay in control of
              source documents.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Versioned evidence items with owner approvals.</li>
              <li>Audit trail visibility across changes and reviews.</li>
              <li>Exportable audit packs for notified body pre-assessment.</li>
            </ul>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Security and privacy posture
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We prioritize least-privilege access, documented workflows, and
              transparent data handling for compliance teams.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <Link href="/security">Read security overview</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/legal/privacy">Privacy policy</Link>
              </Button>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">Contact</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Need security details, procurement materials, or a readiness
              review? Reach us directly.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>
                Email:{' '}
                <a className="underline" href="mailto:hello@annexora.com">
                  hello@annexora.com
                </a>
              </p>
              <p>
                Next steps:{' '}
                <Link href="/book" className="underline">
                  Book readiness review
                </Link>
              </p>
            </div>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

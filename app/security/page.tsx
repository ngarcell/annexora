import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Security', href: '/security' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Security
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Security overview for Annexora
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Built for compliance teams that need audit-ready, defensible
            workflows without exposing sensitive model data.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/trust">Visit trust center</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/book">Book readiness review</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pt-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Data handling principles
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Annexora focuses on evidence metadata, approvals, and traceability.
              Source documents remain under your control.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Minimal data collection: owners, context, and evidence links.</li>
              <li>No need to ingest production model weights or raw datasets.</li>
              <li>Explicit retention controls scoped per pilot and rollout.</li>
            </ul>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Access and auditability
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We design for least-privilege access and transparent audit
              trails.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Admin access protected with Basic Auth.</li>
              <li>Immutable audit pack exports for external review.</li>
              <li>Activity logging and versioned evidence approvals.</li>
            </ul>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Infrastructure notes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Annexora runs on managed infrastructure with standard encryption in
              transit and secure secret management. We can share deployment
              details during procurement.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Need a deeper review? We can provide a tailored security
              questionnaire response on request.
            </p>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Privacy and legal
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              See how we handle contact data, pilots, and evidence metadata.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <Link href="/legal/privacy">Privacy policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/legal/terms">Terms of service</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

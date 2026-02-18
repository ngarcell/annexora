import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Legal', href: '/legal' }, { name: 'Privacy Policy', href: '/legal/privacy' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Privacy policy
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            How we handle data
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This policy describes what data we collect, why we collect it, and
            how you can reach us with questions.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pt-10">
        <div className="space-y-6">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Data we collect
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Contact details submitted through lead or pilot forms.</li>
              <li>Workspace metadata such as industry, region, and use case.</li>
              <li>Evidence metadata and approvals (not raw model data).</li>
            </ul>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              How we use data
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>To respond to readiness reviews and pilot requests.</li>
              <li>To deliver audit-ready documentation and traceability.</li>
              <li>To improve playbooks and evidence workflows.</li>
            </ul>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Sharing and retention
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We only share data with service providers required to operate the
              platform. Retention timelines are scoped to each pilot or
              subscription agreement.
            </p>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Your rights
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You can request access, updates, or deletion of your information.
              Contact us to coordinate any data requests.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Email:{' '}
                <a className="underline" href="mailto:hello@annexora.com">
                  hello@annexora.com
                </a>
              </p>
              <p className="mt-2">
                Related: <Link href="/legal/terms" className="underline">Terms of service</Link>
              </p>
            </div>
          </Card>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

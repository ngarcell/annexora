import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { PilotForm } from './pilot-form';

const priceDisplay =
  process.env.NEXT_PUBLIC_PILOT_PRICE_DISPLAY || '€15,000';

export default function PilotPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Pilot', href: '/pilot' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Paid pilot
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            EU AI Act readiness sprint
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            4-week pilot for 2 high-risk systems. Inventory, risk
            classification, and audit-ready pack included.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            You don’t decide if a system is compliant. You make compliance
            review possible, fast, and defensible.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/book">Book readiness review</Link>
            </Button>
            {bookingUrl && (
              <Button variant="outline" asChild>
                <a href={bookingUrl} target="_blank" rel="noreferrer">
                  Schedule a call
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Card className="border border-border/70 bg-white/90 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Price
              </p>
              <p className="mt-2 text-4xl font-semibold text-foreground">
                {priceDisplay}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                100% upfront, fixed scope, fast delivery.
              </p>
            </Card>

            <Card className="border border-border/70 bg-white/90 p-6">
              <h2 className="font-heading text-xl font-semibold">
                What you get
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>AI system inventory for 2 high-risk systems</li>
                <li>Risk classification + Annex III mapping</li>
                <li>Obligation checklist with owners</li>
                <li>Evidence vault setup</li>
                <li>Audit-ready pack (traceability matrix)</li>
              </ul>
            </Card>

            <Card className="border border-border/70 bg-white/90 p-6">
              <h2 className="font-heading text-xl font-semibold">
                Timeline
              </h2>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p>Week 1: Inventory + risk tiering</p>
                <p>Week 2: Obligation mapping + controls</p>
                <p>Week 3: Evidence collection + reviews</p>
                <p>Week 4: Audit pack + readiness review</p>
              </div>
              <div className="mt-4">
                <Button variant="secondary" asChild>
                  <Link href="/pilot/terms">View terms</Link>
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <PilotForm />
            <Card className="border border-border/70 bg-white/90 p-6">
              <p className="text-sm text-muted-foreground">
                Need more than 2 systems? Start with the pilot and expand into
                an annual subscription after delivery.
              </p>
            </Card>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">
                  Is the pilot refundable?
                </p>
                <p className="mt-1">
                  Payments are non-refundable once delivery starts.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  What do you need from us?
                </p>
                <p className="mt-1">
                  System documentation, owners, and access to existing policies
                  and logs within five business days.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Can we expand the scope?
                </p>
                <p className="mt-1">
                  Yes. We can add systems during the pilot or transition into a
                  subscription plan after delivery.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Trust & methodology
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pilot delivery maps Annex III use cases to evidence checklists and
              audit-ready traceability.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Annexora is not a notified body and does not perform conformity
              assessments.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Not legal advice. Always consult qualified counsel for formal
              assessments.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" asChild size="sm">
                <Link href="/trust">Trust center</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/pilot/terms">Pilot terms</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

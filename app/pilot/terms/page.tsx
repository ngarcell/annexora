import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';

export default function PilotTermsPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Pilot terms
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            EU AI Act pilot scope & limitations
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Clear scope and expectations for the 4-week paid pilot.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6 space-y-4 text-sm text-muted-foreground">
          <p>
            Scope: Inventory, risk classification, obligation mapping, and one
            audit-ready pack for up to two high-risk AI systems.
          </p>
          <p>
            You don’t decide if a system is compliant. You make compliance
            review possible, fast, and defensible.
          </p>
          <p>
            Out of scope: Full legal review, notified body assessments, and
            on-site audits.
          </p>
          <p>
            Customer inputs: Provide access to system documentation, owners, and
            any existing policies within five business days.
          </p>
          <p>
            Refunds: Payments are non-refundable once delivery has started.
          </p>
        </Card>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/pilot">Back to pilot</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/book">Talk to us</Link>
          </Button>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">
                  Can we change the scope?
                </p>
                <p className="mt-1">
                  Yes. We can extend the pilot for additional systems with an
                  agreed add-on scope.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  What if we are not ready with documents?
                </p>
                <p className="mt-1">
                  The pilot requires prompt access to system owners and
                  documentation to stay within the 4-week window.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Pricing & delivery
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              View the full pricing and delivery breakdown for pilots and
              subscriptions.
            </p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

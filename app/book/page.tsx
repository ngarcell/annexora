import Link from 'next/link';
import { LeadForm } from './lead-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { getFeaturedPseoPages } from '@/lib/pseo';
import { getFeaturedIndustryPages } from '@/lib/industry-pseo';

export default function BookPage() {
  const featuredSolutions = getFeaturedPseoPages(6).map((page) => ({
    slug: page.slug,
    label: `${page.h1} · ${page.angleName}`,
    href: `/solutions/${page.slug}`
  }));

  const featuredIndustries = getFeaturedIndustryPages(4).map((page) => ({
    slug: page.slug,
    label: `${page.h1} · ${page.angleName}`,
    href: `/industries/${page.slug}`
  }));
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Readiness review
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Book an EU AI Act readiness review
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We will map your high-risk systems, highlight evidence gaps, and
            prepare a conformity-ready audit pack.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            You don’t decide if a system is compliant. You make compliance
            review possible, fast, and defensible.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/pricing">View pricing</Link>
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
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <LeadForm />
          <div className="space-y-6">
            <Card className="border border-border/70 bg-white/90 p-6">
              <h2 className="font-heading text-xl font-semibold">
                What happens next
              </h2>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>We confirm your Annex III use cases and system owners.</p>
                <p>We scope evidence gaps and audit-ready deliverables.</p>
                <p>We propose a pilot timeline and delivery plan.</p>
              </div>
            </Card>
            <Card className="border border-border/70 bg-white/90 p-6">
              <h2 className="font-heading text-xl font-semibold">
                Explore Annex III playbooks
              </h2>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                {featuredSolutions.map((page) => (
                  <Link
                    key={page.slug}
                    href={page.href}
                    className="hover:text-foreground"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Industry-specific guides
                </p>
                <div className="mt-3 grid gap-2">
                  {featuredIndustries.map((page) => (
                    <Link
                      key={page.slug}
                      href={page.href}
                      className="hover:text-foreground"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  Ready to move faster? Start a paid pilot and get an audit-ready
                  pack in 4 weeks.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <Link href="/pilot">Start paid pilot</Link>
                  </Button>
                  <Button variant="secondary" asChild size="sm">
                    <Link href="/pricing">View pricing</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Is the readiness review paid?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The review is a scoping call to confirm systems, owners, and
                  evidence gaps before a paid pilot.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  What should I prepare?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Bring system documentation, owners, and any existing risk or
                  model documentation.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  How quickly can we start?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Most pilots can begin within two weeks of the review call.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Trust & methodology
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Readiness reviews align Annex III use cases to evidence and
              obligation checklists for audit preparation.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Annexora is not a notified body and does not perform conformity
              assessments.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Not legal advice. Always consult qualified counsel for formal
              assessments.
            </p>
            <div className="mt-4">
              <Button variant="secondary" asChild size="sm">
                <Link href="/trust">Trust center</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

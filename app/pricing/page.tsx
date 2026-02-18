import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { getFeaturedPseoPages } from '@/lib/pseo';
import { getFeaturedIndustryPages } from '@/lib/industry-pseo';
import { getRegionCountries } from '@/lib/region-pseo';

export const metadata: Metadata = {
  title: 'Pricing | Annexora',
  description:
    'Transparent pricing for EU AI Act readiness. Paid pilot delivery, subscription options, and how Annexora works.'
};

const priceDisplay =
  process.env.NEXT_PUBLIC_PILOT_PRICE_DISPLAY || '€15,000';

const faqItems = [
  {
    question: 'Why start with a paid pilot?',
    answer:
      'The pilot compresses discovery, classification, and audit-pack delivery into four weeks so you can de-risk a full rollout.'
  },
  {
    question: 'What happens after the pilot?',
    answer:
      'We convert the workspace into a subscription plan sized to your system count, evidence volume, and audit timeline.'
  },
  {
    question: 'Is the price all-inclusive?',
    answer:
      'The pilot is fixed-scope for two high-risk systems. Additional systems can be added with a scoped add-on or subscription.'
  },
  {
    question: 'Do you provide legal advice?',
    answer:
      'No. Annexora delivers operational compliance tooling and evidence workflows. Legal review stays with qualified counsel.'
  }
];

export default function PricingPage() {
  const featuredSolutions = getFeaturedPseoPages(4);
  const featuredIndustries = getFeaturedIndustryPages(4);
  const featuredCountries = getRegionCountries().slice(0, 4);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Pricing', href: '/pricing' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Pricing & delivery
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Clear pricing for EU AI Act readiness
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start with a fixed-scope paid pilot and expand into a compliance
            operating system once your evidence workflows are validated.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/book">Book readiness review</Link>
            </Button>
            {bookingUrl && (
              <Button variant="outline" size="lg" asChild>
                <a href={bookingUrl} target="_blank" rel="noreferrer">
                  Schedule a call
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-10">
        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-border/70 bg-white/90 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Paid pilot (4 weeks)
            </p>
            <p className="mt-2 text-4xl font-semibold text-foreground">
              {priceDisplay}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Two high-risk systems, inventory + classification + audit pack.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Avoid audit delays, rework, and evidence scramble costs by
              centralizing traceability early.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Inventory and ownership mapping</li>
              <li>Risk tiering + Annex III alignment</li>
              <li>Obligation checklist with owners</li>
              <li>Evidence vault setup + approvals</li>
              <li>Audit-ready pack delivered in week 4</li>
            </ul>
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">
                Estimate readiness savings
              </p>
              <p className="mt-1">
                Run a 60-second ROI calculator to quantify audit-prep savings.
              </p>
              <Link
                href="/calculator"
                className="mt-2 inline-flex items-center text-xs font-semibold text-foreground hover:text-foreground/80"
              >
                Open ROI calculator →
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/pilot">Start paid pilot</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/pilot/terms">View pilot terms</Link>
              </Button>
            </div>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Subscription (post-pilot)
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
              Compliance OS for every high-risk system
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pricing scales with system count, evidence volume, and audit
              complexity. We scope this during the pilot.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Unlimited system inventory and controls</li>
              <li>Evidence workflows + audit pack automation</li>
              <li>Role-based access + immutable audit trail</li>
              <li>Incident tracking and post-market monitoring readiness</li>
              <li>Integration options for MLOps and logging stacks</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <Link href="/book">Request a scope call</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/solutions">Browse playbooks</Link>
              </Button>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-2xl font-semibold">
              How the pilot works
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                Week 1: Inventory systems, confirm Annex III use cases, and map
                owners.
              </p>
              <p>
                Week 2: Risk classification, obligation mapping, and control
                assignment.
              </p>
              <p>
                Week 3: Evidence collection, approvals, and gap remediation.
              </p>
              <p>
                Week 4: Audit-ready pack, traceability matrix, and readiness
                review.
              </p>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              What you deliver
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We work with your legal, compliance, and ML owners to capture the
              evidence you already have and highlight what is missing.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Evidence checklist by obligation and owner</p>
              <p>Traceability matrix with linked artifacts</p>
              <p>Audit-ready pack for notified body review</p>
              <p>Executive summary of high-risk gaps</p>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Trust & methodology
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Annexora playbooks are derived from EU AI Act Annex III categories
              and high-risk obligations. We maintain a review checklist and
              update guidance as standards evolve.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Annexora is not a notified body and does not perform conformity
              assessments. We prepare evidence so audits are faster and more
              predictable.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              You don’t decide if a system is compliant. You make compliance
              review possible, fast, and defensible.
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
                <Link href="/security">Security overview</Link>
              </Button>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <p className="text-sm font-semibold text-foreground">
                    {item.question}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-lg font-semibold">
              Annex III playbooks
            </h2>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {featuredSolutions.map((page) => (
                <Link
                  key={page.slug}
                  href={`/solutions/${page.slug}`}
                  className="block hover:text-foreground"
                >
                  {page.h1} · {page.angleName}
                </Link>
              ))}
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-lg font-semibold">
              Industry guides
            </h2>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {featuredIndustries.map((page) => (
                <Link
                  key={page.slug}
                  href={`/industries/${page.slug}`}
                  className="block hover:text-foreground"
                >
                  {page.h1} · {page.angleName}
                </Link>
              ))}
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-lg font-semibold">
              Country playbooks
            </h2>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {featuredCountries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/regions/${country.slug}`}
                  className="block hover:text-foreground"
                >
                  {country.name}
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

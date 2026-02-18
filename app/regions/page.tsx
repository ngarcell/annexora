import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { RegionsDirectory } from './regions-directory';
import { getRegionCountries, getRegionPages } from '@/lib/region-pseo';

export default function RegionsIndexPage() {
  const countries = getRegionCountries();
  const pages = getRegionPages();

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Country playbooks
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            AI Act readiness by country
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Country-specific compliance guides for high-risk AI systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pt-10">
        <Suspense
          fallback={
            <Card className="border border-border/70 bg-white/90 p-6">
              <p className="text-sm text-muted-foreground">
                Loading filters and playbooks...
              </p>
            </Card>
          }
        >
          <RegionsDirectory countries={countries} pages={pages} />
        </Suspense>
      </main>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Build on country guidance
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Combine country playbooks with Annex III and industry guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/solutions">View Annex III playbooks</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/industries">Browse industries</Link>
              </Button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <Link href="/pricing" className="hover:text-foreground">
              Pricing and delivery details
            </Link>
            <Link href="/book" className="hover:text-foreground">
              Readiness review intake
            </Link>
            <Link href="/solutions" className="hover:text-foreground">
              Annex III playbooks
            </Link>
            <Link href="/industries" className="hover:text-foreground">
              Industry guides
            </Link>
          </div>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Are these country playbooks legal advice?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No. They provide operational guidance for evidence readiness,
                  not formal legal opinions.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  How do you create country-specific guidance?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We adapt Annex III obligations to local discovery keywords and
                  enforcement expectations for each market.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  We operate across multiple countries. Where do we start?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Begin with the primary market and expand using the same
                  evidence vault across regions.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Trust & methodology
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Country playbooks are derived from EU AI Act risk tiers, Annex III
              categories, and local discovery patterns.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Not legal advice. Always consult qualified counsel for formal
              assessments.
            </p>
          </Card>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

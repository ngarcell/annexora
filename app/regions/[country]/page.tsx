import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { RegionCountryDirectory } from '../region-country-directory';
import {
  getRegionCountries,
  getRegionPagesByCountry
} from '@/lib/region-pseo';

export async function generateStaticParams() {
  return getRegionCountries().map((country) => ({ country: country.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const match = getRegionCountries().find((item) => item.slug === country);
  if (!match) {
    return {
      title: 'Country playbook not found',
      description: 'Country playbook not found.'
    };
  }

  return {
    title: `EU AI Act compliance in ${match.name}`,
    description: `Country-specific AI Act readiness guides for ${match.name}.`
  };
}

export default async function RegionCountryPage({
  params
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const match = getRegionCountries().find((item) => item.slug === country);
  if (!match) {
    notFound();
  }

  const pages = getRegionPagesByCountry(match.slug);

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Country playbooks
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            {match.name} AI Act compliance
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ready-to-use compliance playbooks for high-risk AI systems in{' '}
            {match.name}.
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
          <RegionCountryDirectory pages={pages} countryName={match.name} />
        </Suspense>
      </main>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Explore more guidance
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Pair {match.name} playbooks with Annex III and industry
                checklists.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/solutions">Annex III playbooks</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/industries">Industry guides</Link>
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
                  What is included in each country playbook?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Each playbook includes obligations, evidence requirements, and
                  audit gaps tailored to {match.name} discovery patterns.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Can you cover multiple countries?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yes. We build a shared evidence vault and map country-specific
                  deltas on top of the core obligations.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Is this legal advice?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No. ActaOS provides operational readiness tooling, not legal
                  counsel.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Trust & methodology
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Country playbooks adapt EU AI Act obligations to {match.name}{' '}
              discovery and audit expectations.
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

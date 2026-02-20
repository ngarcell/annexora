import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingFooter } from '@/components/marketing-footer';
import { MarketingNav } from '@/components/marketing-nav';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import {
  getHighIntentCountriesList,
  getHighIntentIndustriesList,
  getHighIntentRoles,
  getHighIntentTotals
} from '@/lib/high-intent-pseo';

export const metadata: Metadata = {
  title: 'EU AI Act High-Intent Playbooks | Annexora',
  description:
    '3,888 high-intent EU AI Act pages for deployer and provider teams by country, industry, intent, and artifact.'
};

export default function HighIntentIndexPage() {
  const totals = getHighIntentTotals();
  const countries = getHighIntentCountriesList();
  const industries = getHighIntentIndustriesList();
  const roles = getHighIntentRoles();

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd
        items={[{ name: 'Home', href: '/' }, { name: 'EU AI Act', href: '/eu-ai-act' }]}
      />

      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            High-intent pSEO architecture
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            EU AI Act deployer and provider playbooks
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fully indexable, contextual pages covering country, industry, intent,
            artifacts, and obligation hubs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/book">Book readiness review</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-10">
        <section className="grid gap-4 md:grid-cols-4">
          <Card className="border border-border/70 bg-white/90 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total pages
            </p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {totals.total}
            </p>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Country x industry x intent x role
            </p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {totals.countryIndustryIntentRole}
            </p>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Country x artifact x role
            </p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {totals.countryArtifactRole}
            </p>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Industry/artifact + hubs
            </p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {totals.industryArtifactRole + totals.roleObligationHub}
            </p>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">Country hubs</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse all country-specific high-intent pages with static pagination.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              {countries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/eu-ai-act/${country.slug}`}
                  className="hover:text-foreground"
                >
                  {country.name}
                </Link>
              ))}
            </div>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">Industry hubs</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Industry-specific catalog for deployer and provider workflows.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/eu-ai-act/industries/${industry.slug}`}
                  className="hover:text-foreground"
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          </Card>
        </section>

        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">Role obligation hubs</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            28 obligation/article hubs for each role, optimized for execution and
            commercial intent.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            {roles.map((role) => (
              <Link
                key={role.slug}
                href={`/eu-ai-act/hubs/${role.slug}`}
                className="hover:text-foreground"
              >
                {role.name} hubs
              </Link>
            ))}
          </div>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

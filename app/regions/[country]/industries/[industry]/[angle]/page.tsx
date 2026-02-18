import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { rootDomain, protocol } from '@/lib/utils';
import {
  getRegionPage,
  getRegionPages
} from '@/lib/region-pseo';

export async function generateStaticParams() {
  return getRegionPages().map((page) => ({
    country: page.countrySlug,
    industry: page.industrySlug,
    angle: page.angleSlug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; industry: string; angle: string }>;
}): Promise<Metadata> {
  const { country, industry, angle } = await params;
  const page = getRegionPage(country, industry, angle);

  if (!page) {
    return {
      title: 'Regional playbook not found',
      description: 'Regional compliance playbook not found.'
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path
    }
  };
}

function jsonLdForPage(page: ReturnType<typeof getRegionPage>) {
  if (!page) return null;
  const baseUrl = `${protocol}://${rootDomain}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    url: `${baseUrl}${page.path}`,
    provider: {
      '@type': 'Organization',
      name: 'Annexora',
      url: baseUrl
    },
    areaServed: page.country,
    serviceType: 'AI compliance readiness'
  };
}

export default async function RegionPlaybookPage({
  params
}: {
  params: Promise<{ country: string; industry: string; angle: string }>;
}) {
  const { country, industry, angle } = await params;
  const page = getRegionPage(country, industry, angle);

  if (!page) {
    notFound();
  }

  const auditGaps = page.obligations.slice(0, 3).map((item) => {
    const title = item.split(':')[0]?.trim() || 'core obligation';
    return `Gaps in ${title.toLowerCase()} evidence.`;
  });
  const jsonLd = jsonLdForPage(page);

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Regions', href: '/regions' }, { name: page.country, href: `/regions/${page.countrySlug}` }, { name: page.title, href: page.path }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Country playbook
            </p>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              {page.country} · {page.industry}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {page.heroTagline}
            </p>
          </div>
          <Button asChild>
            <Link href="/pilot">Start paid pilot</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pt-10">
        <div className="rounded-lg border border-border/70 bg-white/90 p-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/regions" className="hover:text-foreground">
              Regions
            </Link>
            <span>/</span>
            <Link
              href={`/regions/${page.countrySlug}`}
              className="hover:text-foreground"
            >
              {page.country}
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.industry}</span>
            <span>/</span>
            <span className="text-foreground">{page.angle}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/regions?country=${page.countrySlug}`}
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              More in {page.country}
            </Link>
            <Link
              href={`/regions?industry=${page.industrySlug}`}
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              More {page.industry}
            </Link>
            <Link
              href={`/regions?angle=${page.angleSlug}`}
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              More {page.angle}
            </Link>
          </div>
        </div>
        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-2xl font-semibold">
            Why it is high risk
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {page.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This playbook ensures {page.industry.toLowerCase()} teams in{' '}
            {page.country} can meet EU AI Act expectations with verified evidence.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {page.painPoints.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Methodology: Annex III category mapping plus high-risk obligation
            checklists. Not legal advice.
          </p>
        </Card>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Obligations we map
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {page.obligations.slice(0, 5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Evidence you will need
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {page.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Outcomes you get
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {page.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Common audit gaps
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {auditGaps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              {page.faq.map((item) => (
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
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Related country playbooks
            </h2>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {page.relatedPaths.map((path) => (
                <Link
                  key={path}
                  href={path}
                  className="block hover:text-foreground"
                >
                  {path.split('/').slice(-2).join(' · ').replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Search phrases we cover
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              These country-specific keywords guide how teams discover this
              playbook.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {page.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md border border-border/60 bg-muted/30 px-3 py-2"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Card>
        </section>

        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Ready for an audit pack?
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Book a readiness review and map your evidence gaps in days.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/pilot">Start paid pilot</Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <MarketingFooter />

      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </div>
  );
}

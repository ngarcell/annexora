import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import {
  getFeaturedIndustryPages,
  getIndustryPage,
  getIndustryPages,
  getRelatedUseCasePages
} from '@/lib/industry-pseo';
import { getRegionPagesByIndustry } from '@/lib/region-pseo';
import { rootDomain, protocol } from '@/lib/utils';

export async function generateStaticParams() {
  return getIndustryPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);

  if (!page) {
    return {
      title: 'Industry playbook not found',
      description: 'Industry compliance playbook not found.'
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/industries/${page.slug}`
    },
    robots: {
      index: false,
      follow: true
    }
  };
}

function jsonLdForPage(page: ReturnType<typeof getIndustryPage>) {
  if (!page) return null;
  const baseUrl = `${protocol}://${rootDomain}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    url: `${baseUrl}/industries/${page.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Annexora',
      url: baseUrl
    },
    areaServed: 'EU',
    serviceType: 'AI compliance readiness'
  };
}

export default async function IndustryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustryPage(slug);

  if (!page) {
    notFound();
  }

  const auditGaps = page.obligations.slice(0, 3).map((item) => {
    const title = item.split(':')[0]?.trim() || 'core obligation';
    return `Gaps in ${title.toLowerCase()} evidence.`;
  });
  const relatedUseCases = getRelatedUseCasePages(page.primaryUseCases);
  const featuredIndustries = getFeaturedIndustryPages(12).filter(
    (item) => item.industrySlug !== page.industrySlug
  );
  const regionalPages = getRegionPagesByIndustry(page.industrySlug).slice(0, 6);
  const jsonLd = jsonLdForPage(page);

  const relatedUseCaseGroups = Array.from(
    relatedUseCases.reduce(
      (map, item) => {
        if (!map.has(item.useCaseSlug)) {
          map.set(item.useCaseSlug, {
            slug: item.useCaseSlug,
            name: item.useCaseName,
            summary: item.useCaseSummary,
            angles: [] as { name: string; slug: string }[]
          });
        }
        const group = map.get(item.useCaseSlug)!;
        if (!group.angles.find((angle) => angle.slug === item.slug)) {
          group.angles.push({ name: item.angleName, slug: item.slug });
        }
        return map;
      },
      new Map<
        string,
        {
          slug: string;
          name: string;
          summary: string;
          angles: { name: string; slug: string }[];
        }
      >()
    )
  ).map(([, value]) => value);

  const relatedIndustryGroups = Array.from(
    page.relatedSlugs
      .map((related) => getIndustryPage(related))
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .filter((item) => item.industrySlug !== page.industrySlug)
      .reduce(
        (map, item) => {
          if (!map.has(item.industrySlug)) {
            map.set(item.industrySlug, {
              slug: item.industrySlug,
              name: item.industryName,
              summary: item.industrySummary,
              angles: [] as { name: string; slug: string }[]
            });
          }
          const group = map.get(item.industrySlug)!;
          if (!group.angles.find((angle) => angle.slug === item.slug)) {
            group.angles.push({ name: item.angleName, slug: item.slug });
          }
          return map;
        },
        new Map<
          string,
          {
            slug: string;
            name: string;
            summary: string;
            angles: { name: string; slug: string }[];
          }
        >()
      )
  ).map(([, value]) => value);

  const additionalIndustryGroups = Array.from(
    featuredIndustries.reduce(
      (map, item) => {
        if (map.has(item.industrySlug)) {
          return map;
        }
        if (
          relatedIndustryGroups.find((group) => group.slug === item.industrySlug)
        ) {
          return map;
        }
        map.set(item.industrySlug, {
          slug: item.industrySlug,
          name: item.industryName,
          summary: item.industrySummary,
          angles: [{ name: item.angleName, slug: item.slug }]
        });
        return map;
      },
      new Map<
        string,
        {
          slug: string;
          name: string;
          summary: string;
          angles: { name: string; slug: string }[];
        }
      >()
    )
  )
    .map(([, value]) => value)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Industries', href: '/industries' }, { name: page.h1, href: `/industries/${page.slug}` }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Industry playbook
            </p>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              {page.h1}
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
            <Link href="/industries" className="hover:text-foreground">
              Industries
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.industryName}</span>
            <span>/</span>
            <span className="text-foreground">{page.angleName}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/industries?industry=${page.industrySlug}`}
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              More {page.industryName}
            </Link>
            <Link
              href={`/industries?angle=${page.angleSlug}`}
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              More {page.angleName}
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Pricing & delivery
            </Link>
          </div>
        </div>
        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-2xl font-semibold">
            Why this industry is high risk
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {page.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Annexora aligns {page.h1.toLowerCase()} with EU AI Act obligations and
            gives stakeholders the evidence they need for audit readiness.
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
            <p className="mt-2 text-sm text-muted-foreground">
              Auto-generated obligations aligned to Annex III.
            </p>
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
            <p className="mt-2 text-sm text-muted-foreground">
              Capture these artifacts to support audit readiness.
            </p>
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
              Related industry playbooks
            </h2>
            <div className="mt-4 space-y-4">
              {relatedIndustryGroups.map((group) => (
                <div
                  key={group.slug}
                  className="rounded-lg border border-border/60 bg-muted/30 p-4"
                >
                  <Link
                    href={`/industries/${group.angles[0]?.slug || ''}`}
                    className="text-sm font-semibold text-foreground hover:underline"
                  >
                    {group.name}
                  </Link>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {group.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.angles.map((angle) => (
                      <Link
                        key={angle.slug}
                        href={`/industries/${angle.slug}`}
                        className="rounded-full border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {angle.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Related Annex III playbooks
            </h2>
            <div className="mt-4 space-y-4">
              {relatedUseCaseGroups.map((group) => (
                <div
                  key={group.slug}
                  className="rounded-lg border border-border/60 bg-muted/30 p-4"
                >
                  <Link
                    href={`/solutions/${group.angles[0]?.slug || ''}`}
                    className="text-sm font-semibold text-foreground hover:underline"
                  >
                    {group.name}
                  </Link>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {group.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.angles.map((angle) => (
                      <Link
                        key={angle.slug}
                        href={`/solutions/${angle.slug}`}
                        className="rounded-full border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {angle.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              More industries
            </h2>
            <div className="mt-4 space-y-4">
              {additionalIndustryGroups.map((group) => (
                <div
                  key={group.slug}
                  className="rounded-lg border border-border/60 bg-muted/30 p-4"
                >
                  <Link
                    href={`/industries/${group.angles[0]?.slug || ''}`}
                    className="text-sm font-semibold text-foreground hover:underline"
                  >
                    {group.name}
                  </Link>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {group.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.angles.map((angle) => (
                      <Link
                        key={angle.slug}
                        href={`/industries/${angle.slug}`}
                        className="rounded-full border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {angle.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Country-specific playbooks
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore readiness guides tailored to country requirements.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {regionalPages.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="block hover:text-foreground"
                >
                  {item.country} · {item.angle}
                </Link>
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

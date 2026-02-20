import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { getPseoPage, getPseoPages } from '@/lib/pseo';
import { isPrioritySolutionSlug } from '@/lib/indexing-policy';
import { rootDomain, protocol } from '@/lib/utils';

export async function generateStaticParams() {
  return getPseoPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPseoPage(slug);

  if (!page) {
    return {
      title: 'Solution not found',
      description: 'Compliance solution not found.'
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/solutions/${page.slug}`
    },
    robots: {
      index: isPrioritySolutionSlug(page.slug),
      follow: true
    }
  };
}

function jsonLdForPage(page: ReturnType<typeof getPseoPage>) {
  if (!page) return null;
  const baseUrl = `${protocol}://${rootDomain}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    url: `${baseUrl}/solutions/${page.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Annexora',
      url: baseUrl
    },
    areaServed: 'EU',
    serviceType: 'AI compliance readiness'
  };
}

export default async function SolutionPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPseoPage(slug);

  if (!page) {
    notFound();
  }

  const auditGaps = page.obligations.slice(0, 3).map((item) => {
    const title = item.split(':')[0]?.trim() || 'core obligation';
    return `Gaps in ${title.toLowerCase()} evidence.`;
  });
  const useCasePages = getPseoPages()
    .filter((item) => item.useCaseSlug === page.useCaseSlug)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 8);
  const focusAreaPages = getPseoPages()
    .filter((item) => item.angleSlug === page.angleSlug)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 8);
  const jsonLd = jsonLdForPage(page);

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Solutions', href: '/solutions' }, { name: page.h1, href: `/solutions/${page.slug}` }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Solutions
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
            <Link href="/solutions" className="hover:text-foreground">
              Solutions
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.useCaseName}</span>
            <span>/</span>
            <span className="text-foreground">{page.angleName}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/solutions?useCase=${page.useCaseSlug}`}
              className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              More {page.useCaseName}
            </Link>
            <Link
              href={`/solutions?angle=${page.angleSlug}`}
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
            Why it is high risk
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {page.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This Annexora playbook focuses on {page.heroTagline.toLowerCase()} so
            your team can move from scattered evidence to audit-ready controls.
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
              Annexora auto-maps Annex III obligations and assigns accountable
              owners.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {page.obligations.slice(0, 5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Outcomes you get
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Evidence-backed results that align to audit expectations.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {page.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Evidence you will need
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Collect the right documentation and logs before conformity
              reviews.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {page.obligations.slice(0, 3).map((item) => (
                <li key={item}>{`Evidence for ${item.toLowerCase()}.`}</li>
              ))}
            </ul>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Common audit gaps
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Address these gaps early to avoid audit delays.
            </p>
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
              Related playbooks
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Same use case
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {page.useCaseName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {useCasePages.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/solutions/${item.slug}`}
                      className="rounded-full border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {item.angleName}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Same focus area
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {page.angleName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {focusAreaPages.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/solutions/${item.slug}`}
                      className="rounded-full border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {item.useCaseName}
                    </Link>
                  ))}
                </div>
              </div>
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

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingFooter } from '@/components/marketing-footer';
import { MarketingNav } from '@/components/marketing-nav';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import {
  getHighIntentCountry,
  getHighIntentPagesByCountry,
  getHighIntentTotals
} from '@/lib/high-intent-pseo';

export const COUNTRY_HUB_PAGE_SIZE = 24;

type CountryHubViewProps = {
  countrySlug: string;
  pageNumber: number;
};

function paginate<T>(items: T[], pageNumber: number, pageSize: number) {
  const start = (pageNumber - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function CountryHubView({ countrySlug, pageNumber }: CountryHubViewProps) {
  const country = getHighIntentCountry(countrySlug);
  if (!country) {
    notFound();
  }

  const pages = getHighIntentPagesByCountry(countrySlug).sort((a, b) =>
    a.path.localeCompare(b.path)
  );

  const totalPages = Math.max(1, Math.ceil(pages.length / COUNTRY_HUB_PAGE_SIZE));

  if (pageNumber < 1 || pageNumber > totalPages) {
    notFound();
  }

  const paged = paginate(pages, pageNumber, COUNTRY_HUB_PAGE_SIZE);
  const totals = getHighIntentTotals();
  const currentPath =
    pageNumber === 1
      ? `/eu-ai-act/${country.slug}`
      : `/eu-ai-act/${country.slug}/page/${pageNumber}`;

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'EU AI Act', href: '/eu-ai-act' },
          { name: country.name, href: currentPath }
        ]}
      />

      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Country high-intent hub
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            {country.name} EU AI Act pages
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {pages.length} indexable pages for deployer/provider intent across
            industries, artifacts, and obligation workflows.
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
        <Card className="border border-border/70 bg-white/90 p-6">
          <p className="text-sm text-muted-foreground">
            This hub contributes to the 3,888-page architecture ({totals.total} total
            pages) and is fully static for crawl and index efficiency.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link href="/eu-ai-act" className="hover:text-foreground">
              Back to EU AI Act index
            </Link>
            <Link href="/eu-ai-act/hubs/deployer" className="hover:text-foreground">
              Deployer hubs
            </Link>
            <Link href="/eu-ai-act/hubs/provider" className="hover:text-foreground">
              Provider hubs
            </Link>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {paged.map((page) => (
            <Card key={page.path} className="border border-border/70 bg-white/90 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {page.cluster}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{page.h1}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{page.description}</p>
              <Link
                href={page.path}
                className="mt-3 inline-flex text-sm font-semibold text-foreground hover:underline"
              >
                View playbook
              </Link>
            </Card>
          ))}
        </div>

        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Page {pageNumber} of {totalPages}
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const href =
                  page === 1
                    ? `/eu-ai-act/${country.slug}`
                    : `/eu-ai-act/${country.slug}/page/${page}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-md border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {page}
                  </Link>
                );
              })}
            </div>
          </div>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

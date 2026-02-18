'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Country } from '@/lib/pseo-data';
import type { RegionPage } from '@/lib/region-pseo';

type CountryGroup = {
  country: Country;
  pages: RegionPage[];
  industries: { name: string; slug: string; samplePath: string }[];
};

type DirectoryProps = {
  countries: Country[];
  pages: RegionPage[];
};

function buildCountryGroups(
  countries: Country[],
  pages: RegionPage[]
): CountryGroup[] {
  const map = new Map<string, CountryGroup>();
  countries.forEach((country) => {
    map.set(country.slug, {
      country,
      pages: [],
      industries: []
    });
  });

  pages.forEach((page) => {
    const group = map.get(page.countrySlug);
    if (!group) {
      return;
    }
    group.pages.push(page);
    if (!group.industries.find((item) => item.slug === page.industrySlug)) {
      group.industries.push({
        name: page.industry,
        slug: page.industrySlug,
        samplePath: page.path
      });
    }
  });

  return Array.from(map.values()).sort((a, b) =>
    a.country.name.localeCompare(b.country.name)
  );
}

export function RegionsDirectory({ countries, pages }: DirectoryProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const [angle, setAngle] = useState('');

  const countryGroups = useMemo(
    () => buildCountryGroups(countries, pages),
    [countries, pages]
  );

  const industries = useMemo(() => {
    const map = new Map<string, string>();
    pages.forEach((page) => {
      if (!map.has(page.industrySlug)) {
        map.set(page.industrySlug, page.industry);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [pages]);

  const angles = useMemo(() => {
    const map = new Map<string, string>();
    pages.forEach((page) => {
      if (!map.has(page.angleSlug)) {
        map.set(page.angleSlug, page.angle);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [pages]);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const c = searchParams.get('country') || '';
    const i = searchParams.get('industry') || '';
    const a = searchParams.get('angle') || '';
    setQuery(q);
    setCountry(c);
    setIndustry(i);
    setAngle(a);
  }, [searchParams]);

  const filteredPages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pages.filter((page) => {
      if (country && page.countrySlug !== country) {
        return false;
      }
      if (industry && page.industrySlug !== industry) {
        return false;
      }
      if (angle && page.angleSlug !== angle) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = [
        page.country,
        page.industry,
        page.angle,
        page.description,
        page.heroTagline
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [pages, query, country, industry, angle]);

  const showGrouped = !query && !country && !industry && !angle;

  return (
    <div className="flex flex-col gap-6">
      <Card className="border border-border/70 bg-white/90 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Navigate by country
            </p>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Country playbooks organized for fast discovery
            </h2>
            <p className="text-sm text-muted-foreground">
              Filter by country, industry, or focus area to find the right
              compliance playbook.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link href="/solutions" className="hover:text-foreground">
              Annex III playbooks
            </Link>
            <Link href="/industries" className="hover:text-foreground">
              Industry guides
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing & delivery
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end">
          <div className="space-y-2">
            <label
              htmlFor="region-search"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Search
            </label>
            <Input
              id="region-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country, industry, or focus area"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="region-country"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Country
            </label>
            <select
              id="region-country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground"
            >
              <option value="">All countries</option>
              {countries.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="region-industry"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Industry
            </label>
            <select
              id="region-industry"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground"
            >
              <option value="">All industries</option>
              {industries.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="region-angle"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Focus area
            </label>
            <select
              id="region-angle"
              value={angle}
              onChange={(event) => setAngle(event.target.value)}
              className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground"
            >
              <option value="">All focus areas</option>
              {angles.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('');
                setCountry('');
                setIndustry('');
                setAngle('');
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredPages.length} playbooks available
        </div>
        {showGrouped && (
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {countryGroups.map((group) => (
              <a
                key={group.country.slug}
                href={`#country-${group.country.slug}`}
                className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 hover:text-foreground"
              >
                {group.country.name}
              </a>
            ))}
          </div>
        )}
      </Card>

      {showGrouped ? (
        <div className="space-y-6">
          {countryGroups.map((group) => (
            <Card
              key={group.country.slug}
              id={`country-${group.country.slug}`}
              className="border border-border/70 bg-white/90 p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {group.country.region}
                  </p>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {group.country.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {group.pages.length} playbooks across{' '}
                    {group.industries.length} industries.
                  </p>
                </div>
                <Button variant="secondary" asChild>
                  <Link href={`/regions/${group.country.slug}`}>
                    View country playbooks
                  </Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.industries.slice(0, 8).map((item) => (
                  <Link
                    key={item.slug}
                    href={item.samplePath}
                    className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPages.map((page) => (
            <Card
              key={page.id}
              className="border border-border/70 bg-white/90 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {page.country} · {page.industry}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {page.angle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {page.description}
              </p>
              <Link
                href={page.path}
                className="mt-3 inline-flex text-sm font-semibold text-foreground hover:underline"
              >
                View playbook
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

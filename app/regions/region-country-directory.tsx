'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { RegionPage } from '@/lib/region-pseo';

type DirectoryProps = {
  pages: RegionPage[];
  countryName: string;
};

export function RegionCountryDirectory({
  pages,
  countryName
}: DirectoryProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [angle, setAngle] = useState('');

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
    const i = searchParams.get('industry') || '';
    const a = searchParams.get('angle') || '';
    setQuery(q);
    setIndustry(i);
    setAngle(a);
  }, [searchParams]);

  const filteredPages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pages.filter((page) => {
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
        page.industry,
        page.angle,
        page.description,
        page.heroTagline
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [pages, query, industry, angle]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="border border-border/70 bg-white/90 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {countryName} playbooks
            </p>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Filter by industry or focus area
            </h2>
            <p className="text-sm text-muted-foreground">
              Use filters to narrow down to the exact compliance playbook you
              need.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link href="/regions" className="hover:text-foreground">
              All countries
            </Link>
            <Link href="/industries" className="hover:text-foreground">
              Industry guides
            </Link>
            <Link href="/solutions" className="hover:text-foreground">
              Annex III playbooks
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-end">
          <div className="space-y-2">
            <label
              htmlFor="country-search"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Search
            </label>
            <Input
              id="country-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search industries, focus areas, or keywords"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="country-industry"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Industry
            </label>
            <select
              id="country-industry"
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
              htmlFor="country-angle"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Focus area
            </label>
            <select
              id="country-angle"
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
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPages.map((page) => (
          <Card
            key={page.id}
            className="border border-border/70 bg-white/90 p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {page.industry}
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
    </div>
  );
}

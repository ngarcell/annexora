'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { IndustryPage } from '@/lib/industry-pseo';

type IndustryGroup = {
  name: string;
  slug: string;
  summary: string;
  primaryUseCases: string[];
  pages: IndustryPage[];
  angles: { name: string; slug: string; pageSlug: string }[];
};

type DirectoryProps = {
  pages: IndustryPage[];
};

function buildIndustryGroups(pages: IndustryPage[]): IndustryGroup[] {
  const map = new Map<string, IndustryGroup>();

  pages.forEach((page) => {
    if (!map.has(page.industrySlug)) {
      map.set(page.industrySlug, {
        name: page.industryName,
        slug: page.industrySlug,
        summary: page.industrySummary,
        primaryUseCases: page.primaryUseCases,
        pages: [],
        angles: []
      });
    }

    const group = map.get(page.industrySlug)!;
    group.pages.push(page);

    if (!group.angles.find((angle) => angle.slug === page.angleSlug)) {
      group.angles.push({
        name: page.angleName,
        slug: page.angleSlug,
        pageSlug: page.slug
      });
    }
  });

  return Array.from(map.values());
}

export function IndustriesDirectory({ pages }: DirectoryProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [angle, setAngle] = useState('');

  const industryGroups = useMemo(
    () => buildIndustryGroups(pages),
    [pages]
  );

  const angles = useMemo(() => {
    const map = new Map<string, string>();
    pages.forEach((page) => {
      if (!map.has(page.angleSlug)) {
        map.set(page.angleSlug, page.angleName);
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
        page.h1,
        page.description,
        page.heroTagline,
        page.industryName,
        page.angleName
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [pages, query, industry, angle]);

  const showGrouped = !query && !industry && !angle;

  return (
    <div className="flex flex-col gap-6">
      <Card className="border border-border/70 bg-white/90 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Navigate by industry
            </p>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Industry playbooks organized for faster discovery
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse by sector, filter by focus area, or jump to an industry
              section below.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link href="/solutions" className="hover:text-foreground">
              Annex III playbooks
            </Link>
            <Link href="/regions" className="hover:text-foreground">
              Country playbooks
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing & delivery
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-end">
          <div className="space-y-2">
            <label
              htmlFor="industry-search"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Search
            </label>
            <Input
              id="industry-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search industries, angles, or keywords"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="industry-filter"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Industry
            </label>
            <select
              id="industry-filter"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground"
            >
              <option value="">All industries</option>
              {industryGroups.map((group) => (
                <option key={group.slug} value={group.slug}>
                  {group.name} ({group.pages.length})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="industry-angle"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Focus area
            </label>
            <select
              id="industry-angle"
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
        {showGrouped && (
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {industryGroups.map((group) => (
              <a
                key={group.slug}
                href={`#industry-${group.slug}`}
                className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 hover:text-foreground"
              >
                {group.name}
              </a>
            ))}
          </div>
        )}
      </Card>

      {showGrouped ? (
        <div className="space-y-6">
          {industryGroups.map((group) => (
            <Card
              key={group.slug}
              id={`industry-${group.slug}`}
              className="border border-border/70 bg-white/90 p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Industry playbook
                  </p>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {group.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {group.summary}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Annex III:{' '}
                    {group.primaryUseCases?.[0] || 'High-risk use case'}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setIndustry(group.slug)}
                >
                  View {group.pages.length} playbooks
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.angles.map((angleItem) => (
                  <Link
                    key={angleItem.slug}
                    href={`/industries/${angleItem.pageSlug}`}
                    className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {angleItem.name}
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
              key={page.slug}
              className="border border-border/70 bg-white/90 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {page.industryName}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {page.h1} · {page.angleName}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {page.description}
              </p>
              <Link
                href={`/industries/${page.slug}`}
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

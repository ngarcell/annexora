'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { PseoPage } from '@/lib/pseo';

type UseCaseGroup = {
  name: string;
  slug: string;
  summary: string;
  pages: PseoPage[];
  angles: { name: string; slug: string; pageSlug: string }[];
};

type DirectoryProps = {
  pages: PseoPage[];
};

function buildUseCaseGroups(pages: PseoPage[]): UseCaseGroup[] {
  const map = new Map<string, UseCaseGroup>();

  pages.forEach((page) => {
    if (!map.has(page.useCaseSlug)) {
      map.set(page.useCaseSlug, {
        name: page.useCaseName,
        slug: page.useCaseSlug,
        summary: page.useCaseSummary,
        pages: [],
        angles: []
      });
    }

    const group = map.get(page.useCaseSlug)!;
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

export function SolutionsDirectory({ pages }: DirectoryProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [useCase, setUseCase] = useState('');
  const [angle, setAngle] = useState('');

  const useCaseGroups = useMemo(
    () => buildUseCaseGroups(pages),
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
    const c = searchParams.get('useCase') || '';
    const a = searchParams.get('angle') || '';
    setQuery(q);
    setUseCase(c);
    setAngle(a);
  }, [searchParams]);

  const filteredPages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pages.filter((page) => {
      if (useCase && page.useCaseSlug !== useCase) {
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
        page.useCaseName,
        page.angleName
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [pages, query, useCase, angle]);

  const showGrouped = !query && !useCase && !angle;

  return (
    <div className="flex flex-col gap-6">
      <Card className="border border-border/70 bg-white/90 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Navigate by use case
            </p>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Find the right Annex III playbook faster
            </h2>
            <p className="text-sm text-muted-foreground">
              Search by use case, filter by focus area, or jump to a category
              below.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link href="/industries" className="hover:text-foreground">
              Browse industry guides
            </Link>
            <Link href="/regions" className="hover:text-foreground">
              View country playbooks
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing & delivery
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-end">
          <div className="space-y-2">
            <label
              htmlFor="solution-search"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Search
            </label>
            <Input
              id="solution-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search use cases, angles, or keywords"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="solution-usecase"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Use case
            </label>
            <select
              id="solution-usecase"
              value={useCase}
              onChange={(event) => setUseCase(event.target.value)}
              className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground"
            >
              <option value="">All use cases</option>
              {useCaseGroups.map((group) => (
                <option key={group.slug} value={group.slug}>
                  {group.name} ({group.pages.length})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="solution-angle"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Focus area
            </label>
            <select
              id="solution-angle"
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
                setUseCase('');
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
            {useCaseGroups.map((group) => (
              <a
                key={group.slug}
                href={`#use-case-${group.slug}`}
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
          {useCaseGroups.map((group) => (
            <Card
              key={group.slug}
              id={`use-case-${group.slug}`}
              className="border border-border/70 bg-white/90 p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Annex III category
                  </p>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {group.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {group.summary}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setUseCase(group.slug)}
                >
                  View {group.pages.length} playbooks
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.angles.map((angleItem) => (
                  <Link
                    key={angleItem.slug}
                    href={`/solutions/${angleItem.pageSlug}`}
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
                {page.useCaseName}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {page.h1} · {page.angleName}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {page.description}
              </p>
              <Link
                href={`/solutions/${page.slug}`}
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

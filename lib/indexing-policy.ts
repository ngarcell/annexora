import { getPseoPages } from '@/lib/pseo';

export const INDEXABLE_URL_TARGET = 4000;
export const PRIORITY_SOLUTION_PAGE_COUNT = 56;

const prioritySolutionSlugs = (() => {
  const slugs = getPseoPages()
    .map((page) => page.slug)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, PRIORITY_SOLUTION_PAGE_COUNT);

  return new Set(slugs);
})();

export function getPrioritySolutionSlugs() {
  return prioritySolutionSlugs;
}

export function isPrioritySolutionSlug(slug: string) {
  return prioritySolutionSlugs.has(slug);
}

export function getPrioritySolutionPaths() {
  return Array.from(prioritySolutionSlugs)
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => `/solutions/${slug}`);
}

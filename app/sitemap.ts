import type { MetadataRoute } from 'next';
import { getPseoPages } from '@/lib/pseo';
import {
  getHighIntentCountriesList,
  getHighIntentIndustriesList,
  getHighIntentPages,
  getHighIntentRoles
} from '@/lib/high-intent-pseo';
import {
  getPrioritySolutionPaths,
  INDEXABLE_URL_TARGET
} from '@/lib/indexing-policy';
import { protocol, rootDomain } from '@/lib/utils';

const LAST_MODIFIED = new Date('2026-02-20T00:00:00.000Z');
const ESSENTIAL_STATIC_ROUTES = [
  '',
  '/book',
  '/solutions',
  '/industries',
  '/regions',
  '/pricing',
  '/pilot',
  '/pilot/terms',
  '/trust',
  '/security',
  '/case-studies',
  '/calculator',
  '/legal',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies'
];

function buildEntries(): MetadataRoute.Sitemap {
  const baseUrl = `${protocol}://${rootDomain}`;
  const highIntentPages = getHighIntentPages();
  const highIntentCountries = getHighIntentCountriesList();
  const highIntentIndustries = getHighIntentIndustriesList();
  const highIntentRoles = getHighIntentRoles();
  const prioritySolutionPaths = getPrioritySolutionPaths();

  const tier1 = highIntentPages.map((page) => page.path);
  const tier2 = [
    '/eu-ai-act',
    ...highIntentCountries.map((country) => `/eu-ai-act/${country.slug}`),
    ...highIntentIndustries.map(
      (industry) => `/eu-ai-act/industries/${industry.slug}`
    ),
    ...highIntentRoles.map((role) => `/eu-ai-act/hubs/${role.slug}`)
  ];
  const tier3 = ESSENTIAL_STATIC_ROUTES;
  const tier4 = prioritySolutionPaths;
  const tier5 = getPseoPages()
    .map((page) => `/solutions/${page.slug}`)
    .sort((a, b) => a.localeCompare(b));

  const orderedCandidates = [...tier1, ...tier2, ...tier3, ...tier4, ...tier5];

  const picked = new Set<string>();
  const prioritizedPaths: string[] = [];
  for (const path of orderedCandidates) {
    if (!picked.has(path)) {
      picked.add(path);
      prioritizedPaths.push(path);
    }
    if (prioritizedPaths.length === INDEXABLE_URL_TARGET) {
      break;
    }
  }

  if (prioritizedPaths.length !== INDEXABLE_URL_TARGET) {
    throw new Error(
      `Indexable URL target mismatch: expected ${INDEXABLE_URL_TARGET}, got ${prioritizedPaths.length}.`
    );
  }

  return prioritizedPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: LAST_MODIFIED
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return buildEntries();
}

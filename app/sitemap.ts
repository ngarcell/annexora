import type { MetadataRoute } from 'next';
import { getPseoPages } from '@/lib/pseo';
import { getIndustryPages } from '@/lib/industry-pseo';
import { getRegionCountries, getRegionPages } from '@/lib/region-pseo';
import { protocol, rootDomain } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `${protocol}://${rootDomain}`;
  const staticRoutes = [
    '',
    '/admin',
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
  const pages = getPseoPages();
  const industryPages = getIndustryPages();
  const regionPages = getRegionPages();
  const regionCountries = getRegionCountries();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...pages.map((page) => ({
      url: `${baseUrl}/solutions/${page.slug}`,
      lastModified: new Date()
    })),
    ...industryPages.map((page) => ({
      url: `${baseUrl}/industries/${page.slug}`,
      lastModified: new Date()
    })),
    ...regionCountries.map((country) => ({
      url: `${baseUrl}/regions/${country.slug}`,
      lastModified: new Date()
    })),
    ...regionPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date()
    }))
  ];
}

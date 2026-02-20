import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getHighIntentCountriesList,
  getHighIntentCountry,
  getHighIntentPagesByCountry
} from '@/lib/high-intent-pseo';
import { COUNTRY_HUB_PAGE_SIZE, CountryHubView } from '../../country-hub-view';

export async function generateStaticParams() {
  const params: { country: string; page: string }[] = [];

  getHighIntentCountriesList().forEach((country) => {
    const pageCount = Math.max(
      1,
      Math.ceil(getHighIntentPagesByCountry(country.slug).length / COUNTRY_HUB_PAGE_SIZE)
    );

    for (let page = 2; page <= pageCount; page += 1) {
      params.push({ country: country.slug, page: String(page) });
    }
  });

  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; page: string }>;
}): Promise<Metadata> {
  const { country, page } = await params;
  const match = getHighIntentCountry(country);
  if (!match) {
    return {
      title: 'Country hub page not found',
      description: 'Country hub page not found.'
    };
  }

  return {
    title: `${match.name} EU AI Act pages - page ${page}`,
    description: `Paginated static high-intent pages for ${match.name}.`,
    alternates: {
      canonical: `/eu-ai-act/${match.slug}/page/${page}`
    },
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function CountryHubPaginationPage({
  params
}: {
  params: Promise<{ country: string; page: string }>;
}) {
  const { country, page } = await params;
  const pageNumber = Number(page);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  return <CountryHubView countrySlug={country} pageNumber={pageNumber} />;
}

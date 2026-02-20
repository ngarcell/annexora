import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getHighIntentCountriesList,
  getHighIntentCountry
} from '@/lib/high-intent-pseo';
import { CountryHubView } from './country-hub-view';

export async function generateStaticParams() {
  return getHighIntentCountriesList().map((country) => ({
    country: country.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const match = getHighIntentCountry(country);

  if (!match) {
    return {
      title: 'Country hub not found',
      description: 'Country hub not found.'
    };
  }

  return {
    title: `${match.name} EU AI Act high-intent pages`,
    description: `Static high-intent EU AI Act pages for ${match.name} buyers across industries, intents, and artifacts.`,
    alternates: {
      canonical: `/eu-ai-act/${match.slug}`
    }
  };
}

export default async function CountryHubPage({
  params
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  if (!getHighIntentCountry(country)) {
    notFound();
  }

  return <CountryHubView countrySlug={country} pageNumber={1} />;
}

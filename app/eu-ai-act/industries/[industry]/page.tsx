import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getHighIntentIndustriesList,
  getHighIntentIndustry
} from '@/lib/high-intent-pseo';
import { IndustryHubView } from './industry-hub-view';

export async function generateStaticParams() {
  return getHighIntentIndustriesList().map((industry) => ({
    industry: industry.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const match = getHighIntentIndustry(industry);

  if (!match) {
    return {
      title: 'Industry hub not found',
      description: 'Industry hub not found.'
    };
  }

  return {
    title: `${match.name} EU AI Act high-intent pages`,
    description: `Static high-intent EU AI Act pages for ${match.name.toLowerCase()} teams across countries, intents, and artifacts.`,
    alternates: {
      canonical: `/eu-ai-act/industries/${match.slug}`
    }
  };
}

export default async function IndustryHubPage({
  params
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;

  if (!getHighIntentIndustry(industry)) {
    notFound();
  }

  return <IndustryHubView industrySlug={industry} pageNumber={1} />;
}

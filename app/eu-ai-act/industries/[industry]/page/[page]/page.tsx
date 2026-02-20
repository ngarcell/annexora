import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getHighIntentIndustriesList,
  getHighIntentIndustry,
  getHighIntentPagesByIndustry
} from '@/lib/high-intent-pseo';
import {
  INDUSTRY_HUB_PAGE_SIZE,
  IndustryHubView
} from '../../industry-hub-view';

export async function generateStaticParams() {
  const params: { industry: string; page: string }[] = [];

  getHighIntentIndustriesList().forEach((industry) => {
    const pageCount = Math.max(
      1,
      Math.ceil(
        getHighIntentPagesByIndustry(industry.slug).length / INDUSTRY_HUB_PAGE_SIZE
      )
    );

    for (let page = 2; page <= pageCount; page += 1) {
      params.push({ industry: industry.slug, page: String(page) });
    }
  });

  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ industry: string; page: string }>;
}): Promise<Metadata> {
  const { industry, page } = await params;
  const match = getHighIntentIndustry(industry);
  if (!match) {
    return {
      title: 'Industry hub page not found',
      description: 'Industry hub page not found.'
    };
  }

  return {
    title: `${match.name} EU AI Act pages - page ${page}`,
    description: `Paginated static high-intent pages for ${match.name.toLowerCase()} teams.`,
    alternates: {
      canonical: `/eu-ai-act/industries/${match.slug}/page/${page}`
    },
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function IndustryHubPaginationPage({
  params
}: {
  params: Promise<{ industry: string; page: string }>;
}) {
  const { industry, page } = await params;
  const pageNumber = Number(page);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  return <IndustryHubView industrySlug={industry} pageNumber={pageNumber} />;
}

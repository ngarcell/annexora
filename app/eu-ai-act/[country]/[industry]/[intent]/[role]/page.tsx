import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HighIntentPageTemplate } from '@/components/high-intent-page-template';
import {
  getCountryIndustryIntentRolePage,
  getCountryIndustryIntentRoleParams
} from '@/lib/high-intent-pseo';
import type { BuyerRole } from '@/lib/high-intent-data';

export async function generateStaticParams() {
  return getCountryIndustryIntentRoleParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    country: string;
    industry: string;
    intent: string;
    role: BuyerRole;
  }>;
}): Promise<Metadata> {
  const { country, industry, intent, role } = await params;
  const page = getCountryIndustryIntentRolePage(country, industry, intent, role);

  if (!page) {
    return {
      title: 'Playbook not found',
      description: 'Playbook not found.'
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path
    }
  };
}

export default async function CountryIndustryIntentRolePage({
  params
}: {
  params: Promise<{
    country: string;
    industry: string;
    intent: string;
    role: BuyerRole;
  }>;
}) {
  const { country, industry, intent, role } = await params;
  const page = getCountryIndustryIntentRolePage(country, industry, intent, role);

  if (!page) {
    notFound();
  }

  return (
    <HighIntentPageTemplate
      page={page}
      breadcrumb={[
        { name: 'Home', href: '/' },
        { name: 'EU AI Act', href: '/eu-ai-act' },
        { name: page.country.name, href: `/eu-ai-act/${page.country.slug}` },
        { name: page.h1, href: page.path }
      ]}
    />
  );
}

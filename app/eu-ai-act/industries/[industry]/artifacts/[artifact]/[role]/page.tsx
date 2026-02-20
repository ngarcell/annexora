import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HighIntentPageTemplate } from '@/components/high-intent-page-template';
import {
  getIndustryArtifactRolePage,
  getIndustryArtifactRoleParams
} from '@/lib/high-intent-pseo';
import type { BuyerRole } from '@/lib/high-intent-data';

export async function generateStaticParams() {
  return getIndustryArtifactRoleParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ industry: string; artifact: string; role: BuyerRole }>;
}): Promise<Metadata> {
  const { industry, artifact, role } = await params;
  const page = getIndustryArtifactRolePage(industry, artifact, role);

  if (!page) {
    return {
      title: 'Industry artifact playbook not found',
      description: 'Industry artifact playbook not found.'
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

export default async function IndustryArtifactRolePage({
  params
}: {
  params: Promise<{ industry: string; artifact: string; role: BuyerRole }>;
}) {
  const { industry, artifact, role } = await params;
  const page = getIndustryArtifactRolePage(industry, artifact, role);

  if (!page) {
    notFound();
  }

  return (
    <HighIntentPageTemplate
      page={page}
      breadcrumb={[
        { name: 'Home', href: '/' },
        { name: 'EU AI Act', href: '/eu-ai-act' },
        { name: page.industry.name, href: `/eu-ai-act/industries/${page.industry.slug}` },
        { name: page.h1, href: page.path }
      ]}
    />
  );
}

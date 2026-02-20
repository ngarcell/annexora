import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HighIntentPageTemplate } from '@/components/high-intent-page-template';
import {
  getCountryArtifactRolePage,
  getCountryArtifactRoleParams
} from '@/lib/high-intent-pseo';
import type { BuyerRole } from '@/lib/high-intent-data';

export async function generateStaticParams() {
  return getCountryArtifactRoleParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ country: string; artifact: string; role: BuyerRole }>;
}): Promise<Metadata> {
  const { country, artifact, role } = await params;
  const page = getCountryArtifactRolePage(country, artifact, role);

  if (!page) {
    return {
      title: 'Artifact playbook not found',
      description: 'Artifact playbook not found.'
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

export default async function CountryArtifactRolePage({
  params
}: {
  params: Promise<{ country: string; artifact: string; role: BuyerRole }>;
}) {
  const { country, artifact, role } = await params;
  const page = getCountryArtifactRolePage(country, artifact, role);

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

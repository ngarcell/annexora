import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HighIntentPageTemplate } from '@/components/high-intent-page-template';
import {
  getRoleObligationHubPage,
  getRoleObligationHubParams
} from '@/lib/high-intent-pseo';
import type { BuyerRole } from '@/lib/high-intent-data';

export async function generateStaticParams() {
  return getRoleObligationHubParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ role: BuyerRole; topic: string }>;
}): Promise<Metadata> {
  const { role, topic } = await params;
  const page = getRoleObligationHubPage(role, topic);

  if (!page) {
    return {
      title: 'Obligation hub not found',
      description: 'Obligation hub not found.'
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

export default async function RoleObligationHubDetailPage({
  params
}: {
  params: Promise<{ role: BuyerRole; topic: string }>;
}) {
  const { role, topic } = await params;
  const page = getRoleObligationHubPage(role, topic);

  if (!page) {
    notFound();
  }

  return (
    <HighIntentPageTemplate
      page={page}
      breadcrumb={[
        { name: 'Home', href: '/' },
        { name: 'EU AI Act', href: '/eu-ai-act' },
        { name: 'Role hubs', href: `/eu-ai-act/hubs/${role}` },
        { name: page.h1, href: page.path }
      ]}
    />
  );
}

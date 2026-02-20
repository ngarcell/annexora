import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingFooter } from '@/components/marketing-footer';
import { MarketingNav } from '@/components/marketing-nav';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import {
  getHighIntentRole,
  getHighIntentRoles,
  getHighIntentHubPagesByRole
} from '@/lib/high-intent-pseo';
import type { BuyerRole } from '@/lib/high-intent-data';

export async function generateStaticParams() {
  return getHighIntentRoles().map((role) => ({ role: role.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ role: BuyerRole }>;
}): Promise<Metadata> {
  const { role } = await params;
  const match = getHighIntentRole(role);
  if (!match) {
    return {
      title: 'Role hub not found',
      description: 'Role hub not found.'
    };
  }

  return {
    title: `${match.name} EU AI Act obligation hubs`,
    description: `28 obligation/article hubs for ${match.name.toLowerCase()} teams with high-intent implementation guidance.`,
    alternates: {
      canonical: `/eu-ai-act/hubs/${match.slug}`
    }
  };
}

export default async function RoleHubPage({
  params
}: {
  params: Promise<{ role: BuyerRole }>;
}) {
  const { role } = await params;
  const roleProfile = getHighIntentRole(role);

  if (!roleProfile) {
    notFound();
  }

  const pages = getHighIntentHubPagesByRole(role);

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'EU AI Act', href: '/eu-ai-act' },
          { name: `${roleProfile.name} hubs`, href: `/eu-ai-act/hubs/${role}` }
        ]}
      />

      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Role obligation hubs
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            {roleProfile.name} AI Act execution hubs
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {pages.length} indexable hubs mapped to obligation and article topics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/book">Book readiness review</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pt-10">
        <div className="grid gap-4 md:grid-cols-2 pb-10">
          {pages.map((page) => (
            <Card key={page.path} className="border border-border/70 bg-white/90 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {page.topic.articleReference}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{page.h1}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{page.description}</p>
              <Link
                href={page.path}
                className="mt-3 inline-flex text-sm font-semibold text-foreground hover:underline"
              >
                Open hub
              </Link>
            </Card>
          ))}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

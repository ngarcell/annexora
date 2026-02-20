import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingFooter } from '@/components/marketing-footer';
import { MarketingNav } from '@/components/marketing-nav';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import type { HighIntentPage } from '@/lib/high-intent-pseo';

type HighIntentPageTemplateProps = {
  page: HighIntentPage;
  breadcrumb: { name: string; href: string }[];
};

function contextLine(page: HighIntentPage) {
  if (page.cluster === 'country-industry-intent-role') {
    return `${page.country.name} · ${page.industry.name} · ${page.intent.name} · ${page.roleName}`;
  }
  if (page.cluster === 'country-artifact-role') {
    return `${page.country.name} · ${page.artifact.name} · ${page.roleName}`;
  }
  if (page.cluster === 'industry-artifact-role') {
    return `${page.industry.name} · ${page.artifact.name} · ${page.roleName}`;
  }
  return `${page.roleName} · ${page.topic.articleReference}`;
}

export function HighIntentPageTemplate({
  page,
  breadcrumb
}: HighIntentPageTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={breadcrumb} />

      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            EU AI Act high-intent playbook
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            {page.h1}
          </h1>
          <p className="text-sm text-muted-foreground">{page.heroTagline}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {contextLine(page)}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href={page.ctaHref}>{page.ctaLabel}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">Why this page exists</h2>
          <p className="mt-3 text-sm text-muted-foreground">{page.description}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Timeline anchor: AI Act in force on August 1, 2024; prohibitions and
            literacy obligations apply on February 2, 2025; most obligations apply
            on August 2, 2026; additional rollout continues to August 2, 2027.
          </p>
        </Card>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Country enforcement context
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {page.blocks.enforcementBlock}
            </p>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Industry and risk context
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{page.blocks.riskBlock}</p>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">Role obligations</h2>
            <p className="mt-3 text-sm text-muted-foreground">{page.blocks.roleBlock}</p>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">Execution plan</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {page.blocks.executionBlock}
            </p>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">Commercial fit</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {page.blocks.commercialBlock}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={page.ctaHref}>{page.ctaLabel}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/book">Book readiness review</Link>
              </Button>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              {page.faq.map((item) => (
                <div key={item.question}>
                  <p className="text-sm font-semibold text-foreground">
                    {item.question}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">Related pages</h2>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            <Link href={page.parentPath} className="font-semibold text-foreground hover:underline">
              Parent hub
            </Link>
            {page.relatedPaths.map((path) => (
              <Link key={path} href={path} className="hover:text-foreground">
                {path.replace(/\//g, ' / ').replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

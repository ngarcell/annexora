import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { IndustriesDirectory } from './industries-directory';
import { getIndustryPages } from '@/lib/industry-pseo';

export default function IndustriesIndexPage() {
  const pages = getIndustryPages();

  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Industry library
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Industry compliance playbooks
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse industry-specific AI Act readiness guides.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pilot">Start paid pilot</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pt-10">
        <Suspense
          fallback={
            <Card className="border border-border/70 bg-white/90 p-6">
              <p className="text-sm text-muted-foreground">
                Loading filters and playbooks...
              </p>
            </Card>
          }
        >
          <IndustriesDirectory pages={pages} />
        </Suspense>
      </main>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Need a scoped plan?
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Turn an industry guide into a delivery-ready audit pack.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/pilot">Start paid pilot</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/book">Book readiness review</Link>
              </Button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <Link href="/pricing" className="hover:text-foreground">
              Pricing and delivery details
            </Link>
            <Link href="/solutions" className="hover:text-foreground">
              Annex III playbooks
            </Link>
            <Link href="/regions" className="hover:text-foreground">
              Country playbooks
            </Link>
            <Link href="/book" className="hover:text-foreground">
              Readiness review intake
            </Link>
          </div>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  How do industry guides differ from use-case playbooks?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  They translate Annex III obligations into sector-specific
                  evidence, stakeholders, and audit gaps.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Can I customize this for my business unit?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yes. The paid pilot adapts the checklist to your systems,
                  owners, and audit timelines.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Do you cover country requirements too?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse country playbooks to see jurisdiction-specific
                  readiness guidance.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Trust & methodology
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ActaOS playbooks map Annex III categories to evidence and control
              requirements relevant for each industry.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Not legal advice. Always consult qualified counsel for formal
              assessments.
            </p>
          </Card>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

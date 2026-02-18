import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';
import { RoiCalculator } from './roi-calculator';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Calculator', href: '/calculator' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            ROI calculator
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Estimate readiness savings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use this quick calculator to estimate audit-readiness savings for
            your Annex III systems.
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
        <RoiCalculator />

        <Card className="mt-8 border border-border/70 bg-white/90 p-6">
          <p className="text-sm text-muted-foreground">
            Estimates are directional and depend on evidence maturity and audit
            complexity. Use a readiness review for a detailed scope.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/book">Book readiness review</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/trust">Trust center</Link>
            </Button>
          </div>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

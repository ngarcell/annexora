import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Legal', href: '/legal' }, { name: 'Cookie Policy', href: '/legal/cookies' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Cookie policy
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Cookie usage
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We use essential cookies required to operate the platform.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">
            Essential cookies
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            These cookies enable core functionality such as form submissions
            and session handling. We do not run advertising cookies by default.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            For questions, contact{' '}
            <a className="underline" href="mailto:hello@annexora.com">
              hello@annexora.com
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Related: <Link href="/legal/privacy" className="underline">Privacy policy</Link>
          </p>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

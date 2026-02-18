import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

export default function LegalIndexPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Legal', href: '/legal' }]} />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Legal
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Legal policies and notices
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Transparent policies for privacy, terms, and cookie handling.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pt-10">
        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="grid gap-3 text-sm text-muted-foreground">
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy policy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms of service
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground">
              Cookie policy
            </Link>
          </div>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}

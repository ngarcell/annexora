import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';
import { SeoBreadcrumbJsonLd } from '@/components/seo-breadcrumb-json-ld';

export default function PilotSuccessPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <div className="min-h-screen bg-[#f6f4ef] flex flex-col">
      <MarketingNav />
      <SeoBreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Pilot', href: '/pilot' }, { name: 'Checkout Success', href: '/pilot/success' }]} />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Payment received
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Your pilot is confirmed
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We will reach out within 24 hours to schedule onboarding and collect
            initial system details.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {bookingUrl ? (
              <Button asChild>
                <a href={bookingUrl} target="_blank" rel="noreferrer">
                  Schedule onboarding call
                </a>
              </Button>
            ) : (
              <Button asChild>
                <a
                  href="mailto:hello@annexora.com?subject=Pilot%20Onboarding"
                  target="_blank"
                  rel="noreferrer"
                >
                  Email onboarding team
                </a>
              </Button>
            )}
            <Button variant="secondary" asChild>
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

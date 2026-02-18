import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';

export default function PilotCancelPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] flex flex-col">
      <MarketingNav />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Checkout canceled
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Your pilot was not booked
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            You can restart the checkout at any time or talk to us if you need a
            custom scope.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild>
              <Link href="/pilot">Restart checkout</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/book">Talk to us</Link>
            </Button>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

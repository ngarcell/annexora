import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MarketingNav } from '@/components/marketing-nav';
import { MarketingFooter } from '@/components/marketing-footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] pb-16">
      <MarketingNav />
      <header className="border-b border-border/60 bg-white/90">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Terms of service
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            ActaOS terms
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            These terms govern the use of ActaOS and related services.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pt-10">
        <div className="space-y-6">
          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Use of the service
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ActaOS provides governance and audit-readiness tooling. You are
              responsible for ensuring your systems meet applicable regulatory
              requirements.
            </p>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              No legal advice
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ActaOS is not a notified body and does not provide legal advice or
              conformity assessments. Consult qualified counsel for formal
              reviews.
            </p>
          </Card>

          <Card className="border border-border/70 bg-white/90 p-6">
            <h2 className="font-heading text-xl font-semibold">
              Confidentiality and data
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We handle your data under the terms of your pilot or subscription
              agreement. See the privacy policy for details.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Related: <Link href="/legal/privacy" className="underline">Privacy policy</Link>
            </p>
          </Card>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

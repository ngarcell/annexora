import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';
import { portfolioContent } from '@/lib/portfolio-content';

export function MarketingFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-white/90">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8 rounded-3xl border border-border/70 bg-[#10263f]/[0.03] p-6">
          <p className="text-sm font-semibold text-foreground">
            {portfolioContent.relationshipLabel}
          </p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            {portfolioContent.relationshipDescription}
          </p>
          <Link
            href={portfolioContent.parentPageUrl}
            className="mt-3 inline-flex text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {portfolioContent.readLinkLabel}
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <BrandLogo compact />
            <p className="mt-3 text-sm text-muted-foreground">
              Compliance tooling for Annex III high-risk AI systems.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Not legal advice. Always consult qualified legal counsel for
              formal assessments.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Explore</p>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <Link href="/solutions" className="hover:text-foreground">
                Annex III playbooks
              </Link>
              <Link href="/industries" className="hover:text-foreground">
                Industry guides
              </Link>
              <Link href="/regions" className="hover:text-foreground">
                Country playbooks
              </Link>
              <Link href="/pricing" className="hover:text-foreground">
                Pricing
              </Link>
              <Link href="/pilot" className="hover:text-foreground">
                Paid pilot
              </Link>
              <Link href="/book" className="hover:text-foreground">
                Readiness review
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Trust</p>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <Link href="/trust" className="hover:text-foreground">
                Trust center
              </Link>
              <Link href="/security" className="hover:text-foreground">
                Security overview
              </Link>
              <Link href="/case-studies" className="hover:text-foreground">
                Case studies
              </Link>
              <Link href="/calculator" className="hover:text-foreground">
                ROI calculator
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              You don’t decide if a system is compliant. You make compliance
              review possible, fast, and defensible.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <Link href="/legal/privacy" className="hover:text-foreground">
                Privacy policy
              </Link>
              <Link href="/legal/terms" className="hover:text-foreground">
                Terms of service
              </Link>
              <Link href="/legal/cookies" className="hover:text-foreground">
                Cookie policy
              </Link>
              <a className="hover:text-foreground" href="mailto:hello@annexora.com">
                Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

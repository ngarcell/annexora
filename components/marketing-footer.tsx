import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-white/90">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              ActaOS
            </p>
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
              <a className="hover:text-foreground" href="mailto:hello@actaos.example">
                Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

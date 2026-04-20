import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';
import { portfolioContent } from '@/lib/portfolio-content';

const navLinks = [
  { href: '/eu-ai-act', label: 'EU AI Act' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/industries', label: 'Industries' },
  { href: '/regions', label: 'Regions' },
  { href: '/trust', label: 'Trust' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/pilot', label: 'Pilot' },
  { href: '/book', label: 'Readiness Review' }
];

export function MarketingNav() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <header className="relative z-10 border-b border-border/60 bg-white/80 backdrop-blur">
      <div className="border-b border-border/60 bg-[#10263f]/[0.04]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-end px-6 py-2">
          <Link
            href={portfolioContent.parentPageUrl}
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {portfolioContent.learnLinkLabel}
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="rounded-xl px-1 py-1 transition hover:bg-muted/40"
          aria-label="Annexora home, part of Jaeger AI"
        >
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/60 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-muted/40"
            >
              Schedule Call
            </a>
          )}
          <Link
            href="/pilot"
            className="rounded-full border border-foreground/10 bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-foreground/90"
          >
            Start Paid Pilot
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 bg-white/70 px-6 py-3 lg:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-3 text-xs text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Schedule Call
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';

const navLinks = [
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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            ActaOS
          </span>
          <span className="font-heading text-lg font-semibold text-foreground">
            EU AI Act Compliance OS
          </span>
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

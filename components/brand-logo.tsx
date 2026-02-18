type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden
        className="h-10 w-10 shrink-0 rounded-xl shadow-[0_8px_20px_rgba(15,23,42,0.2)]"
      >
        <rect x="2" y="2" width="44" height="44" rx="12" fill="#10263f" />
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="11.5"
          fill="none"
          stroke="#1f3f63"
        />
        <path d="M12 38L21.2 10h5.6L17.6 38H12Z" fill="#f6f4ef" />
        <path d="M21.4 38L30.6 10h5.6L27 38h-5.6Z" fill="#edb745" />
        <rect x="28.4" y="20.5" width="9" height="3.2" rx="1.6" fill="#f6f4ef" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[15px] font-semibold uppercase tracking-[0.14em] text-foreground">
          Annexora
        </span>
        {!compact ? (
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
            EU AI Act Compliance OS
          </span>
        ) : null}
      </span>
    </span>
  );
}


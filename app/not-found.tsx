'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';

export default function NotFound() {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Extract subdomain from URL if we're on a subdomain page
    if (pathname?.startsWith('/s/')) {
      const extractedSubdomain = pathname.split('/')[2];
      if (extractedSubdomain) {
        setSubdomain(extractedSubdomain);
      }
    } else {
      // Try to extract from hostname for direct subdomain access
      const hostname = window.location.hostname;
      if (hostname.includes(`.${rootDomain.split(':')[0]}`)) {
        const extractedSubdomain = hostname.split('.')[0];
        setSubdomain(extractedSubdomain);
      }
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f4ef] p-6">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Workspace not found
        </p>
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          {subdomain ? (
            <>
              {subdomain}.{rootDomain} is not provisioned yet
            </>
          ) : (
            'This workspace does not exist yet'
          )}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Create a new compliance workspace to start your Annex III readiness
          program.
        </p>
        <div className="mt-6">
          <Link
            href={`${protocol}://${rootDomain}#workspace`}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create workspace
          </Link>
        </div>
      </div>
    </div>
  );
}

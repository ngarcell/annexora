'use client';

import Link from 'next/link';

export default function SolutionsNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f4ef] p-6">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Solution not found
        </p>
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          This compliance playbook does not exist.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Browse the full solutions library to find the right Annex III
          playbook.
        </p>
        <div className="mt-6">
          <Link
            href="/solutions"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View all playbooks
          </Link>
        </div>
      </div>
    </div>
  );
}

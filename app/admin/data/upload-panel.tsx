'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { uploadCountriesCsvAction, uploadIndustriesCsvAction } from '@/app/actions';

type UploadState = {
  error?: string;
  success?: boolean;
  count?: number;
};

export function UploadPanel() {
  const [industryState, industryAction, industryPending] =
    useActionState<UploadState, FormData>(uploadIndustriesCsvAction, {});
  const [countryState, countryAction, countryPending] =
    useActionState<UploadState, FormData>(uploadCountriesCsvAction, {});

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border border-border/70 bg-white/90 p-6">
        <h2 className="font-heading text-xl font-semibold">
          Upload industries CSV
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Columns: `name`, `slug` (optional), `summary`, `evidence`,
          `stakeholders`, `use_cases` (use `|` to separate values).
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a
            href="/templates/industries.csv"
            download
            className="text-sm font-semibold text-foreground hover:underline"
          >
            Download template
          </a>
        </div>
        <form
          action={industryAction}
          className="mt-4 space-y-3"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="file"
            accept=".csv"
            className="block w-full text-sm"
            required
          />
          {industryState?.error && (
            <p className="text-sm text-red-500">{industryState.error}</p>
          )}
          {industryState?.success && (
            <p className="text-sm text-emerald-600">
              Uploaded {industryState.count} industries.
            </p>
          )}
          <Button type="submit" disabled={industryPending}>
            {industryPending ? 'Uploading...' : 'Upload industries'}
          </Button>
        </form>
      </Card>

      <Card className="border border-border/70 bg-white/90 p-6">
        <h2 className="font-heading text-xl font-semibold">
          Upload countries CSV
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Columns: `name`, `slug` (optional), `region`.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a
            href="/templates/countries.csv"
            download
            className="text-sm font-semibold text-foreground hover:underline"
          >
            Download template
          </a>
        </div>
        <form
          action={countryAction}
          className="mt-4 space-y-3"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="file"
            accept=".csv"
            className="block w-full text-sm"
            required
          />
          {countryState?.error && (
            <p className="text-sm text-red-500">{countryState.error}</p>
          )}
          {countryState?.success && (
            <p className="text-sm text-emerald-600">
              Uploaded {countryState.count} countries.
            </p>
          )}
          <Button type="submit" disabled={countryPending}>
            {countryPending ? 'Uploading...' : 'Upload countries'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  uploadArtifactsCsvAction,
  uploadCountriesCsvAction,
  uploadIndustriesCsvAction,
  uploadIntentsCsvAction
} from '@/app/actions';

type UploadState = {
  error?: string;
  success?: boolean;
  count?: number;
};

function UploadCard({
  title,
  description,
  templateHref,
  action,
  state,
  pending,
  submitLabel,
  successLabel
}: {
  title: string;
  description: string;
  templateHref: string;
  action: (payload: FormData) => void;
  state: UploadState;
  pending: boolean;
  submitLabel: string;
  successLabel: string;
}) {
  return (
    <Card className="border border-border/70 bg-white/90 p-6">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href={templateHref}
          download
          className="text-sm font-semibold text-foreground hover:underline"
        >
          Download template
        </a>
      </div>
      <form action={action} className="mt-4 space-y-3" encType="multipart/form-data">
        <input
          type="file"
          name="file"
          accept=".csv"
          className="block w-full text-sm"
          required
        />
        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        {state?.success && (
          <p className="text-sm text-emerald-600">
            {successLabel} {state.count} rows.
          </p>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? 'Uploading...' : submitLabel}
        </Button>
      </form>
    </Card>
  );
}

export function UploadPanel() {
  const [industryState, industryAction, industryPending] =
    useActionState<UploadState, FormData>(uploadIndustriesCsvAction, {});
  const [countryState, countryAction, countryPending] =
    useActionState<UploadState, FormData>(uploadCountriesCsvAction, {});
  const [intentState, intentAction, intentPending] =
    useActionState<UploadState, FormData>(uploadIntentsCsvAction, {});
  const [artifactState, artifactAction, artifactPending] =
    useActionState<UploadState, FormData>(uploadArtifactsCsvAction, {});

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <UploadCard
        title="Upload industries CSV"
        description="Columns: name, slug, summary, evidence, stakeholders, use_cases, high_risk_scenarios, provider_risk_points, buying_committee."
        templateHref="/templates/industries.csv"
        action={industryAction}
        state={industryState}
        pending={industryPending}
        submitLabel="Upload industries"
        successLabel="Uploaded"
      />

      <UploadCard
        title="Upload countries CSV"
        description="Columns: name, slug, region, authority_name, authority_url, language_note, enforcement_note, market_signal."
        templateHref="/templates/countries.csv"
        action={countryAction}
        state={countryState}
        pending={countryPending}
        submitLabel="Upload countries"
        successLabel="Uploaded"
      />

      <UploadCard
        title="Upload intents CSV"
        description="Columns: name, slug, execution_focus, buyer_signal, cta_label."
        templateHref="/templates/intents.csv"
        action={intentAction}
        state={intentState}
        pending={intentPending}
        submitLabel="Upload intents"
        successLabel="Uploaded"
      />

      <UploadCard
        title="Upload artifacts CSV"
        description="Columns: name, slug, article_reference, delivery_outcome, cta_label."
        templateHref="/templates/artifacts.csv"
        action={artifactAction}
        state={artifactState}
        pending={artifactPending}
        submitLabel="Upload artifacts"
        successLabel="Uploaded"
      />
    </div>
  );
}

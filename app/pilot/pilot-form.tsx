'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPilotCheckoutAction } from '@/app/actions';

type PilotState = {
  error?: string;
  success?: boolean;
};

type AttributionState = {
  landingPath: string;
  cluster: string;
  intentSlug: string;
  role: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  gclid: string;
  referrer: string;
};

export function PilotForm() {
  const [state, action, isPending] = useActionState<PilotState, FormData>(
    createPilotCheckoutAction,
    {}
  );
  const [attribution, setAttribution] = useState<AttributionState>({
    landingPath: '',
    cluster: '',
    intentSlug: '',
    role: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    gclid: '',
    referrer: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      landingPath: `${window.location.pathname}${window.location.search}`,
      cluster: params.get('cluster') || '',
      intentSlug:
        params.get('intent') || params.get('intentSlug') || params.get('intent_slug') || '',
      role: params.get('role') || '',
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmTerm: params.get('utm_term') || '',
      gclid: params.get('gclid') || '',
      referrer: document.referrer || ''
    });
  }, []);

  return (
    <Card className="border border-border/70 bg-white/95 p-6">
      <form action={action} className="space-y-4">
        <input type="hidden" name="landingPath" value={attribution.landingPath} />
        <input type="hidden" name="cluster" value={attribution.cluster} />
        <input type="hidden" name="intentSlug" value={attribution.intentSlug} />
        <input type="hidden" name="role" value={attribution.role} />
        <input type="hidden" name="utm_source" value={attribution.utmSource} />
        <input type="hidden" name="utm_medium" value={attribution.utmMedium} />
        <input type="hidden" name="utm_campaign" value={attribution.utmCampaign} />
        <input type="hidden" name="utm_term" value={attribution.utmTerm} />
        <input type="hidden" name="gclid" value={attribution.gclid} />
        <input type="hidden" name="referrer" value={attribution.referrer} />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Jane Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Northwind Health"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="systemCount">High-risk system count</Label>
            <Input
              id="systemCount"
              name="systemCount"
              placeholder="2"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="useCase">Primary use case</Label>
          <Input
            id="useCase"
            name="useCase"
            placeholder="Employment & workers management"
            required
          />
        </div>
        <div className="hidden">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" />
        </div>
        {state?.error && (
          <div className="text-sm text-red-500">{state.error}</div>
        )}
        {state?.success && (
          <div className="text-sm text-emerald-600">
            Thanks! We will reach out to schedule your pilot onboarding.
          </div>
        )}
        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? 'Redirecting...' : 'Start paid pilot'}
        </Button>
      </form>
    </Card>
  );
}

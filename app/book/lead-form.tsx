'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLeadAction } from '@/app/actions';

type LeadState = {
  error?: string;
  success?: boolean;
};

export function LeadForm() {
  const [state, action, isPending] = useActionState<LeadState, FormData>(
    createLeadAction,
    {}
  );

  return (
    <Card className="border border-border/70 bg-white/95 p-6">
      <form action={action} className="space-y-4">
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
              placeholder="3"
              required
            />
          </div>
        </div>
        <div className="hidden">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" />
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
        {state?.error && (
          <div className="text-sm text-red-500">{state.error}</div>
        )}
        {state?.success && (
          <div className="text-sm text-emerald-600">
            Thanks! We will reach out to schedule your review.
          </div>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Request readiness review'}
        </Button>
      </form>
    </Card>
  );
}

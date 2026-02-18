'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { annexIIIUseCases, riskTiers } from '@/lib/compliance';
import { createSystemAction } from '@/app/actions';

type CreateState = {
  error?: string;
  success?: boolean;
};

export function SystemForm({ subdomain }: { subdomain: string }) {
  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSystemAction,
    {}
  );

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="tenant" value={subdomain} />
      <div className="space-y-2">
        <Label htmlFor="name">System name</Label>
        <Input
          id="name"
          name="name"
          placeholder="TalentMatch CV Screening"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="owner">Business owner</Label>
        <Input id="owner" name="owner" placeholder="People Ops" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deploymentContext">Deployment context</Label>
        <Input
          id="deploymentContext"
          name="deploymentContext"
          placeholder="EU hiring pipeline for enterprise roles"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="useCaseCategory">Use-case category</Label>
        <div className="rounded-md border border-input bg-background px-3 py-2">
          <select
            id="useCaseCategory"
            name="useCaseCategory"
            className="w-full bg-transparent text-sm text-foreground outline-none"
            defaultValue={annexIIIUseCases[0]}
            required
          >
            {annexIIIUseCases.map((useCase) => (
              <option key={useCase} value={useCase}>
                {useCase}
              </option>
            ))}
            <option value="General productivity">General productivity</option>
          </select>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="riskTier">Risk tier</Label>
          <div className="rounded-md border border-input bg-background px-3 py-2">
            <select
              id="riskTier"
              name="riskTier"
              className="w-full bg-transparent text-sm text-foreground outline-none"
              defaultValue="high"
              required
            >
              {riskTiers.map((tier) => (
                <option key={tier.value} value={tier.value}>
                  {tier.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <div className="rounded-md border border-input bg-background px-3 py-2">
            <select
              id="role"
              name="role"
              className="w-full bg-transparent text-sm text-foreground outline-none"
              defaultValue="deployer"
              required
            >
              <option value="deployer">Deployer</option>
              <option value="provider">Provider</option>
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rationale">Risk rationale</Label>
        <textarea
          id="rationale"
          name="rationale"
          className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Explain why the system is classified this way."
        />
      </div>
      {state?.error && (
        <div className="text-xs text-red-500">{state.error}</div>
      )}
      {state?.success && (
        <div className="text-xs text-emerald-600">
          System added to inventory.
        </div>
      )}
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? 'Saving...' : 'Add system'}
      </Button>
    </form>
  );
}

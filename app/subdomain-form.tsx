'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createWorkspaceAction } from '@/app/actions';
import { rootDomain } from '@/lib/utils';
import { annexIIIUseCases } from '@/lib/compliance';

type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Workspace URL</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="your-workspace"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
        <span className="bg-muted px-3 border border-l-0 border-input rounded-r-md text-muted-foreground min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
    </div>
  );
}

export function SubdomainForm() {
  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createWorkspaceAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Organization name</Label>
        <Input id="name" name="name" placeholder="Northwind Health" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          name="industry"
          placeholder="Healthcare, fintech, HR tech"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="region">Primary region</Label>
        <Input
          id="region"
          name="region"
          placeholder="EU"
          defaultValue="EU"
          required
        />
      </div>

      <SubdomainInput defaultValue={state?.subdomain} />

      <div className="space-y-2">
        <Label htmlFor="useCaseCategory">Primary Annex III use case</Label>
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
          </select>
        </div>
        <p className="text-xs text-muted-foreground">
          This helps us preload the right compliance obligations.
        </p>
      </div>

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Provisioning workspace...' : 'Create workspace'}
      </Button>
      <Button variant="secondary" type="button" className="w-full" asChild>
        <a href="/pilot">Start paid pilot</a>
      </Button>
    </form>
  );
}

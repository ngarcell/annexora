'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Loader2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { deleteWorkspaceAction } from '@/app/actions';
import { rootDomain, protocol } from '@/lib/utils';

type Tenant = {
  subdomain: string;
  name: string;
  industry: string;
  region: string;
  primaryUseCase?: string;
  createdAt: number;
  metrics: {
    total: number;
    highRisk: number;
    auditReady: number;
    evidenceCoverage: number;
  };
};

type DeleteState = {
  error?: string;
  success?: string;
};

function DashboardHeader() {
  // TODO: You can add authentication here with your preferred auth provider

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Admin control
        </p>
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Compliance workspace directory
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor every tenant readiness program from one control plane.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`${protocol}://${rootDomain}/admin/data`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          CSV data
        </Link>
        <Link
          href={`${protocol}://${rootDomain}/admin/leads`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Leads
        </Link>
        <Link
          href={`${protocol}://${rootDomain}/admin/pilots`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Paid pilots
        </Link>
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {rootDomain}
        </Link>
        <Button asChild>
          <Link href={`${protocol}://${rootDomain}#workspace`}>
            New workspace
          </Link>
        </Button>
      </div>
    </div>
  );
}

function TenantGrid({
  tenants,
  action,
  isPending
}: {
  tenants: Tenant[];
  action: (formData: FormData) => void;
  isPending: boolean;
}) {
  if (tenants.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">
            No workspaces have been created yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tenants.map((tenant) => (
        <Card key={tenant.subdomain} className="border border-border/70">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{tenant.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {tenant.industry} · {tenant.region}
                </p>
                {tenant.primaryUseCase && (
                  <p className="text-[11px] text-muted-foreground">
                    Primary use case: {tenant.primaryUseCase}
                  </p>
                )}
              </div>
              <form action={action}>
                <input
                  type="hidden"
                  name="subdomain"
                  value={tenant.subdomain}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  disabled={isPending}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-4 gap-2 rounded-lg border border-border/60 bg-muted/40 p-3 text-center">
              <div>
                <p className="font-semibold text-foreground">
                  {tenant.metrics.total}
                </p>
                <p className="text-xs text-muted-foreground">Systems</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {tenant.metrics.highRisk}
                </p>
                <p className="text-xs text-muted-foreground">High risk</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {tenant.metrics.evidenceCoverage}%
                </p>
                <p className="text-xs text-muted-foreground">Evidence</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {tenant.metrics.auditReady}
                </p>
                <p className="text-xs text-muted-foreground">Audit ready</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Created {new Date(tenant.createdAt).toLocaleDateString()}
              </span>
              <span>{tenant.subdomain}.{rootDomain}</span>
            </div>
            <a
              href={`${protocol}://${tenant.subdomain}.${rootDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline"
            >
              Open workspace <ArrowUpRight className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminDashboard({ tenants }: { tenants: Tenant[] }) {
  const [state, action, isPending] = useActionState<DeleteState, FormData>(
    deleteWorkspaceAction,
    {}
  );

  return (
    <div className="space-y-6 relative p-4 md:p-8">
      <DashboardHeader />
      <TenantGrid tenants={tenants} action={action} isPending={isPending} />

      {state.error && (
        <div className="fixed bottom-4 right-4 rounded border border-red-200 bg-red-100 px-4 py-3 text-sm text-red-700 shadow-md">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="fixed bottom-4 right-4 rounded border border-emerald-200 bg-emerald-100 px-4 py-3 text-sm text-emerald-700 shadow-md">
          {state.success}
        </div>
      )}
    </div>
  );
}

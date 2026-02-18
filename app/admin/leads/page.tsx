import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getLeadCount, getLeads } from '@/lib/leads';
import { protocol, rootDomain } from '@/lib/utils';
import { updateLeadStatusFormAction } from '@/app/actions';

export default async function AdminLeadsPage() {
  const [count, leads] = await Promise.all([getLeadCount(), getLeads(50)]);

  return (
    <div className="min-h-screen bg-[#f6f4ef] p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin leads
            </p>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              Lead export
            </h1>
            <p className="text-sm text-muted-foreground">
              Export readiness review requests as CSV.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`${protocol}://${rootDomain}/admin`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Back to admin
            </Link>
            <Button asChild>
              <a href="/api/leads/export" download>
                Download CSV
              </a>
            </Button>
          </div>
        </div>

        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Total leads
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {count}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Showing
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {leads.length}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Export limit
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                200
              </p>
            </div>
          </div>
        </Card>

        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">
            Recent readiness requests
          </h2>
          {leads.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No leads captured yet.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Company</th>
                    <th className="px-3 py-2 text-left">Use case</th>
                    <th className="px-3 py-2 text-left">Systems</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-border/60">
                      <td className="px-3 py-2">{lead.name}</td>
                      <td className="px-3 py-2">{lead.email}</td>
                      <td className="px-3 py-2">{lead.company}</td>
                      <td className="px-3 py-2">{lead.useCase}</td>
                      <td className="px-3 py-2">{lead.systemCount}</td>
                      <td className="px-3 py-2">
                        <form
                          action={updateLeadStatusFormAction}
                          className="flex items-center gap-2"
                        >
                          <input type="hidden" name="id" value={lead.id} />
                          <select
                            name="status"
                            defaultValue={lead.status || 'new'}
                            className="rounded-md border border-border bg-white px-2 py-1 text-xs"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button
                            type="submit"
                            className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                          >
                            Save
                          </button>
                        </form>
                      </td>
                      <td className="px-3 py-2">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPilotCount, getPilots } from '@/lib/pilots';
import { protocol, rootDomain } from '@/lib/utils';

export default async function AdminPilotsPage() {
  const [count, pilots] = await Promise.all([getPilotCount(), getPilots(50)]);

  return (
    <div className="min-h-screen bg-[#f6f4ef] p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin pilots
            </p>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              Paid pilots
            </h1>
            <p className="text-sm text-muted-foreground">
              Track paid pilot checkouts and export CSV.
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
              <a href="/api/pilots/export" download>
                Download CSV
              </a>
            </Button>
          </div>
        </div>

        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Total pilots
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
                {pilots.length}
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
            Recent paid pilots
          </h2>
          {pilots.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No paid pilots yet.
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
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pilots.map((pilot) => (
                    <tr key={pilot.id} className="border-t border-border/60">
                      <td className="px-3 py-2">{pilot.name}</td>
                      <td className="px-3 py-2">{pilot.email}</td>
                      <td className="px-3 py-2">{pilot.company}</td>
                      <td className="px-3 py-2">{pilot.useCase}</td>
                      <td className="px-3 py-2">{pilot.systemCount}</td>
                      <td className="px-3 py-2">
                        {pilot.amountTotal
                          ? `${pilot.amountTotal / 100} ${pilot.currency?.toUpperCase()}`
                          : '—'}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(pilot.createdAt).toLocaleDateString()}
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

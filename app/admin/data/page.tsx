import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { UploadPanel } from './upload-panel';
import { getCountries, getIndustries } from '@/lib/pseo-data';
import { getArtifacts, getIntents } from '@/lib/high-intent-data';
import { protocol, rootDomain } from '@/lib/utils';

export default function AdminDataPage() {
  let industryCount = 0;
  let countryCount = 0;
  let intentCount = 0;
  let artifactCount = 0;
  let error: string | null = null;

  try {
    industryCount = getIndustries().length;
    countryCount = getCountries().length;
    intentCount = getIntents().length;
    artifactCount = getArtifacts().length;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load CSV data.';
  }

  return (
    <div className="min-h-screen bg-[#f6f4ef] p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin data
            </p>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              CSV data management
            </h1>
            <p className="text-sm text-muted-foreground">
              Update country, industry, intent, and artifact playbooks from CSV
              files.
            </p>
          </div>
          <Link
            href={`${protocol}://${rootDomain}/admin`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to admin
          </Link>
        </div>

        <Card className="border border-border/70 bg-white/90 p-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Industries
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {industryCount}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Countries
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {countryCount}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Intents
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {intentCount}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Artifacts
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {artifactCount}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Status
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {error ? 'Validation error' : 'Validated'}
              </p>
            </div>
          </div>
          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}
        </Card>

        <Card className="border border-border/70 bg-white/90 p-6">
          <h2 className="font-heading text-xl font-semibold">
            CSV schema preview
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Match these headers and formats to avoid validation errors.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-foreground">
                industries.csv
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left">name</th>
                      <th className="px-3 py-2 text-left">slug</th>
                      <th className="px-3 py-2 text-left">summary</th>
                      <th className="px-3 py-2 text-left">evidence</th>
                      <th className="px-3 py-2 text-left">stakeholders</th>
                      <th className="px-3 py-2 text-left">use_cases</th>
                      <th className="px-3 py-2 text-left">high_risk_scenarios</th>
                      <th className="px-3 py-2 text-left">provider_risk_points</th>
                      <th className="px-3 py-2 text-left">buying_committee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60">
                      <td className="px-3 py-2">Financial services</td>
                      <td className="px-3 py-2">financial-services</td>
                      <td className="px-3 py-2">
                        Lending and risk scoring systems
                      </td>
                      <td className="px-3 py-2">
                        model validation|fairness audits
                      </td>
                      <td className="px-3 py-2">
                        Risk|Compliance|Product
                      </td>
                      <td className="px-3 py-2">
                        Credit scoring & access to services
                      </td>
                      <td className="px-3 py-2">
                        eligibility decisions|risk automation
                      </td>
                      <td className="px-3 py-2">
                        incomplete docs|weak release governance
                      </td>
                      <td className="px-3 py-2">
                        Compliance|Legal|Product
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                countries.csv
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left">name</th>
                      <th className="px-3 py-2 text-left">slug</th>
                      <th className="px-3 py-2 text-left">region</th>
                      <th className="px-3 py-2 text-left">authority_name</th>
                      <th className="px-3 py-2 text-left">authority_url</th>
                      <th className="px-3 py-2 text-left">language_note</th>
                      <th className="px-3 py-2 text-left">enforcement_note</th>
                      <th className="px-3 py-2 text-left">market_signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60">
                      <td className="px-3 py-2">Germany</td>
                      <td className="px-3 py-2">germany</td>
                      <td className="px-3 py-2">EU</td>
                      <td className="px-3 py-2">Germany AI supervisory authority</td>
                      <td className="px-3 py-2">digital-strategy.ec.europa.eu</td>
                      <td className="px-3 py-2">English-first implementation assets</td>
                      <td className="px-3 py-2">Maintain auditable evidence trails</td>
                      <td className="px-3 py-2">Buyers prioritizing readiness before 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        <UploadPanel />
      </div>
    </div>
  );
}

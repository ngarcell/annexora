import { NextResponse } from 'next/server';
import {
  buildDefaultControls,
  buildDefaultEvidence,
  highRiskObligations,
  isAnnexIIIUseCase,
  isHighRisk,
  type RiskTier
} from '@/lib/compliance';
import { updateTenantSystem } from '@/lib/tenants';

function getTenantFromRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  return (
    request.headers.get('x-tenant') ||
    searchParams.get('tenant') ||
    undefined
  );
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const tenant = getTenantFromRequest(request);
  if (!tenant) {
    return NextResponse.json(
      { error: 'tenant query parameter is required' },
      { status: 400 }
    );
  }

  const { id } = await params;
  const body = await request.json();
  const riskTier = (body.riskTier as RiskTier) || 'minimal';
  const annexIIIFlag =
    typeof body.annexIIIFlag === 'boolean'
      ? body.annexIIIFlag
      : isAnnexIIIUseCase(body.useCaseCategory || '');
  const reviewer = body.reviewer || 'Compliance Lead';
  const rationale = body.rationale || 'Risk assessment updated.';

  const updated = await updateTenantSystem(tenant, id, (system) => {
    const annexIII = annexIIIFlag ?? isAnnexIIIUseCase(system.useCaseCategory);
    const obligations = isHighRisk(riskTier, annexIII)
      ? highRiskObligations
      : [];
    const controls = obligations.length
      ? buildDefaultControls(obligations)
      : [];
    const evidence = obligations.length
      ? system.evidence.length
        ? system.evidence
        : buildDefaultEvidence(controls)
      : [];
    const status = obligations.length ? 'in_review' : 'draft';

    return {
      ...system,
      riskTier,
      status,
      obligations,
      controls,
      evidence,
      riskAssessment: {
        riskTier,
        rationale,
        annexIII,
        reviewer,
        approvedAt: Date.now()
      },
      lastReviewedAt: Date.now()
    };
  });

  if (!updated) {
    return NextResponse.json({ error: 'system not found' }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}

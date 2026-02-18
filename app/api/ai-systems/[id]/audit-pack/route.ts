import { NextResponse } from 'next/server';
import { buildAuditPack } from '@/lib/compliance';
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

  const updated = await updateTenantSystem(tenant, id, (system) => {
    const pack = buildAuditPack(
      system.id,
      system.obligations,
      system.controls,
      system.evidence
    );
    return {
      ...system,
      status: 'audit_ready',
      auditPacks: [pack, ...system.auditPacks],
      lastReviewedAt: Date.now()
    };
  });

  if (!updated) {
    return NextResponse.json({ error: 'system not found' }, { status: 404 });
  }

  return NextResponse.json({ data: updated.auditPacks[0] }, { status: 201 });
}

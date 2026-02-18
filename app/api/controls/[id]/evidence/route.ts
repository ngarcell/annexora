import { NextResponse } from 'next/server';
import { getTenantSystems, saveTenantSystems } from '@/lib/tenants';
import type { ControlStatus, EvidenceItem, EvidenceStatus } from '@/lib/compliance';

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

  const systems = await getTenantSystems(tenant);
  const systemIndex = systems.findIndex((system) =>
    system.controls.some((control) => control.id === id)
  );

  if (systemIndex === -1) {
    return NextResponse.json({ error: 'control not found' }, { status: 404 });
  }

  const system = systems[systemIndex];
  const approvalStatus: EvidenceStatus = 'pending';
  const nextStatus: ControlStatus = 'in_review';
  const evidenceItem: EvidenceItem = {
    id: crypto.randomUUID(),
    controlId: id,
    type: body.type || 'Evidence',
    location: body.location || 'uploads/evidence.pdf',
    version: body.version || 'v1.0',
    approvalStatus,
    createdAt: Date.now()
  };

  const updatedSystem = {
    ...system,
    evidence: [evidenceItem, ...system.evidence],
    controls: system.controls.map((control) =>
      control.id === id ? { ...control, status: nextStatus } : control
    ),
    lastReviewedAt: Date.now()
  };

  const updatedSystems = [...systems];
  updatedSystems[systemIndex] = updatedSystem;
  await saveTenantSystems(tenant, updatedSystems);

  return NextResponse.json({ data: evidenceItem }, { status: 201 });
}

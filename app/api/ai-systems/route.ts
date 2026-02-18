import { NextResponse } from 'next/server';
import { buildSystem, type RiskTier, type SystemRole } from '@/lib/compliance';
import { addTenantSystem, getTenant, getTenantSystems } from '@/lib/tenants';

function getTenantFromRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  return (
    request.headers.get('x-tenant') ||
    searchParams.get('tenant') ||
    undefined
  );
}

export async function GET(request: Request) {
  const tenant = getTenantFromRequest(request);
  if (!tenant) {
    return NextResponse.json(
      { error: 'tenant query parameter is required' },
      { status: 400 }
    );
  }

  const systems = await getTenantSystems(tenant);
  return NextResponse.json({ data: systems });
}

export async function POST(request: Request) {
  const body = await request.json();
  const tenant = body.tenant || getTenantFromRequest(request);

  if (!tenant) {
    return NextResponse.json(
      { error: 'tenant is required to create a system' },
      { status: 400 }
    );
  }

  const exists = await getTenant(tenant);
  if (!exists) {
    return NextResponse.json(
      { error: 'tenant does not exist' },
      { status: 404 }
    );
  }

  if (
    !body.name ||
    !body.owner ||
    !body.deploymentContext ||
    !body.useCaseCategory
  ) {
    return NextResponse.json(
      { error: 'name, owner, deploymentContext, and useCaseCategory are required' },
      { status: 400 }
    );
  }

  const system = buildSystem({
    name: body.name,
    owner: body.owner,
    deploymentContext: body.deploymentContext,
    useCaseCategory: body.useCaseCategory,
    riskTier: (body.riskTier as RiskTier) || 'minimal',
    role: (body.role as SystemRole) || 'deployer',
    rationale: body.rationale
  });

  await addTenantSystem(tenant, system);
  return NextResponse.json({ data: system }, { status: 201 });
}

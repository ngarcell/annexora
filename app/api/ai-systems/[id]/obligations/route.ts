import { NextResponse } from 'next/server';
import { getTenantSystem } from '@/lib/tenants';

function getTenantFromRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  return (
    request.headers.get('x-tenant') ||
    searchParams.get('tenant') ||
    undefined
  );
}

export async function GET(
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
  const system = await getTenantSystem(tenant, id);
  if (!system) {
    return NextResponse.json({ error: 'system not found' }, { status: 404 });
  }

  return NextResponse.json({ data: system.obligations });
}

import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/leads';
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth';

function csvEscape(value: string | number) {
  const str = String(value ?? '');
  if (str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  if (str.includes(',') || str.includes('\n')) {
    return `"${str}"`;
  }
  return str;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!isAdminAuthorized(authHeader)) {
    return unauthorizedResponse();
  }
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') || '200');
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 2000) : 200;

  const leads = await getLeads(safeLimit);
  const header = [
    'id',
    'name',
    'email',
    'company',
    'useCase',
    'systemCount',
    'status',
    'createdAt',
    'updatedAt'
  ].join(',');

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.name,
      lead.email,
      lead.company,
      lead.useCase,
      lead.systemCount,
      lead.status,
      new Date(lead.createdAt).toISOString(),
      new Date(lead.updatedAt || lead.createdAt).toISOString()
    ]
      .map(csvEscape)
      .join(',')
  );

  const csv = [header, ...rows].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="leads.csv"'
    }
  });
}

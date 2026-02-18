import { NextResponse } from 'next/server';
import { getPilots } from '@/lib/pilots';
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth';

function csvEscape(value: string | number | null) {
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
  const safeLimit = Number.isFinite(limit)
    ? Math.min(Math.max(limit, 1), 2000)
    : 200;

  const pilots = await getPilots(safeLimit);
  const header = [
    'id',
    'name',
    'email',
    'company',
    'useCase',
    'systemCount',
    'amountTotal',
    'currency',
    'createdAt'
  ].join(',');

  const rows = pilots.map((pilot) =>
    [
      pilot.id,
      pilot.name,
      pilot.email,
      pilot.company,
      pilot.useCase,
      pilot.systemCount,
      pilot.amountTotal,
      pilot.currency,
      new Date(pilot.createdAt).toISOString()
    ]
      .map(csvEscape)
      .join(',')
  );

  const csv = [header, ...rows].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=\"pilots.csv\"'
    }
  });
}

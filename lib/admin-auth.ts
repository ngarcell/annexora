import { NextResponse } from 'next/server';

function decodeBasicAuth(authHeader: string) {
  if (!authHeader.startsWith('Basic ')) return null;
  const encoded = authHeader.slice('Basic '.length).trim();
  if (!encoded) return null;
  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    const [user, pass] = decoded.split(':');
    if (!user || !pass) return null;
    return { user, pass };
  } catch {
    return null;
  }
}

export function isAdminAuthorized(authHeader: string | null) {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;
  if (!adminUser || !adminPass) {
    return true;
  }

  if (!authHeader) return false;
  const creds = decodeBasicAuth(authHeader);
  if (!creds) return false;
  return creds.user === adminUser && creds.pass === adminPass;
}

export function unauthorizedResponse() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin"'
    }
  });
}

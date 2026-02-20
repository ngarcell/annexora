import { kv } from '@/lib/store';

export type Pilot = {
  id: string;
  sessionId: string;
  name: string;
  email: string;
  company: string;
  useCase: string;
  systemCount: string;
  landingPath?: string;
  cluster?: string;
  intentSlug?: string;
  role?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  gclid?: string;
  referrer?: string;
  intentScore?: number;
  amountTotal: number | null;
  currency: string | null;
  createdAt: number;
};

export async function getPilots(limit = 200): Promise<Pilot[]> {
  const index = (await kv.get<string[]>('pilot:index')) || [];
  const ids = index.slice(0, limit);
  if (!ids.length) {
    return [];
  }
  const pilots = await kv.mget<Pilot>(...ids.map((id) => `pilot:${id}`));
  return pilots.filter(Boolean) as Pilot[];
}

export async function getPilotCount() {
  const index = (await kv.get<string[]>('pilot:index')) || [];
  return index.length;
}

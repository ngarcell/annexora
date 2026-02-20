import { kv } from '@/lib/store';

export type Lead = {
  id: string;
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
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: number;
  updatedAt: number;
};

export async function getLeads(limit = 200): Promise<Lead[]> {
  const index = (await kv.get<string[]>('lead:index')) || [];
  const ids = index.slice(0, limit);
  if (!ids.length) {
    return [];
  }
  const leads = await kv.mget<Lead>(...ids.map((id) => `lead:${id}`));
  const filtered = leads.filter((lead): lead is Lead => Boolean(lead));
  return filtered.map((lead) => ({
    ...lead,
    status: lead.status || 'new',
    updatedAt: lead.updatedAt || lead.createdAt
  }));
}

export async function getLeadCount() {
  const index = (await kv.get<string[]>('lead:index')) || [];
  return index.length;
}

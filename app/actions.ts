'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';
import { kv } from '@/lib/store';
import {
  parseCountriesCsv,
  parseCsvText,
  parseIndustriesCsv
} from '@/lib/pseo-data';
import { getStripeClient } from '@/lib/stripe';
import { sendLeadNotification } from '@/lib/email';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  addTenantSystem,
  createTenant,
  deleteTenant,
  ensureStarterSystems,
  getTenant,
  getTenantSystems,
  sanitizeSubdomain,
  updateTenantSystem
} from '@/lib/tenants';
import {
  buildAuditPack,
  buildSystem,
  type ControlStatus,
  type EvidenceItem,
  type EvidenceStatus,
  type RiskTier,
  type SystemRole
} from '@/lib/compliance';

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData
) {
  const name = ((formData.get('name') as string) || '').trim();
  const industry = ((formData.get('industry') as string) || '').trim();
  const region = ((formData.get('region') as string) || 'EU').trim();
  const primaryUseCaseRaw = formData.get('useCaseCategory') as string;
  const primaryUseCase = primaryUseCaseRaw
    ? primaryUseCaseRaw.trim()
    : undefined;
  const subdomainInput = ((formData.get('subdomain') as string) || '').trim();

  if (!name || !industry || !subdomainInput) {
    return { success: false, error: 'All fields are required.' };
  }

  const sanitizedSubdomain = sanitizeSubdomain(subdomainInput);

  if (sanitizedSubdomain !== subdomainInput) {
    return {
      subdomain: subdomainInput,
      success: false,
      error:
        'Workspace URL can only include lowercase letters, numbers, and hyphens.'
    };
  }

  if (['admin', 'www', 'root'].includes(sanitizedSubdomain)) {
    return {
      subdomain: subdomainInput,
      success: false,
      error: 'This workspace URL is reserved.'
    };
  }

  const existing = await getTenant(sanitizedSubdomain);
  if (existing) {
    return {
      subdomain: subdomainInput,
      success: false,
      error: 'This workspace URL is already in use.'
    };
  }

  await createTenant({
    subdomain: sanitizedSubdomain,
    name,
    industry,
    region,
    primaryUseCase,
    createdAt: Date.now()
  });

  await ensureStarterSystems(sanitizedSubdomain);

  if (primaryUseCase) {
    const systems = await getTenantSystems(sanitizedSubdomain);
    const exists = systems.some(
      (system) =>
        system.useCaseCategory.toLowerCase() ===
        primaryUseCase.toLowerCase()
    );
    if (!exists) {
      const system = buildSystem({
        name: `${name} Primary System`,
        owner: 'Compliance Lead',
        deploymentContext: `Primary deployment for ${primaryUseCase}`,
        useCaseCategory: primaryUseCase,
        riskTier: 'high',
        role: 'deployer',
        rationale: 'Primary use case selected during workspace provisioning.'
      });
      await addTenantSystem(sanitizedSubdomain, system);
    }
  }

  redirect(`${protocol}://${sanitizedSubdomain}.${rootDomain}`);
}

export async function deleteWorkspaceAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = ((formData.get('subdomain') as string) || '').trim();
  if (!subdomain) {
    return { error: 'Missing workspace identifier.' };
  }
  await deleteTenant(subdomain);
  revalidatePath('/admin');
  return { success: 'Workspace deleted successfully.' };
}

export async function createSystemAction(
  prevState: any,
  formData: FormData
) {
  const tenant = ((formData.get('tenant') as string) || '').trim();
  const name = ((formData.get('name') as string) || '').trim();
  const owner = ((formData.get('owner') as string) || '').trim();
  const deploymentContext = (
    (formData.get('deploymentContext') as string) || ''
  ).trim();
  const useCaseCategory = (
    (formData.get('useCaseCategory') as string) || ''
  ).trim();
  const riskTier = (formData.get('riskTier') as RiskTier) || 'minimal';
  const role = (formData.get('role') as SystemRole) || 'deployer';
  const rationale = ((formData.get('rationale') as string) || '').trim();

  if (
    !tenant ||
    !name ||
    !owner ||
    !deploymentContext ||
    !useCaseCategory
  ) {
    return { error: 'Please complete all required fields.' };
  }

  const tenantRecord = await getTenant(tenant);
  if (!tenantRecord) {
    return { error: 'Workspace not found.' };
  }

  const system = buildSystem({
    name,
    owner,
    deploymentContext,
    useCaseCategory,
    riskTier,
    role,
    rationale
  });

  await addTenantSystem(tenant, system);
  revalidatePath(`/s/${tenant}`);
  return { success: true };
}

export async function generateAuditPackAction(
  prevState: any,
  formData: FormData
) {
  const tenant = ((formData.get('tenant') as string) || '').trim();
  const systemId = ((formData.get('systemId') as string) || '').trim();

  if (!tenant || !systemId) {
    return { error: 'Missing system details.' };
  }

  const updated = await updateTenantSystem(tenant, systemId, (system) => {
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
    return { error: 'System not found.' };
  }

  revalidatePath(`/s/${tenant}`);
  return { success: true };
}

export async function generateAuditPackFormAction(formData: FormData) {
  await generateAuditPackAction({}, formData);
}

export async function addEvidenceAction(
  prevState: any,
  formData: FormData
) {
  const tenant = ((formData.get('tenant') as string) || '').trim();
  const systemId = ((formData.get('systemId') as string) || '').trim();
  const controlId = ((formData.get('controlId') as string) || '').trim();
  const type = ((formData.get('type') as string) || '').trim();
  const location = ((formData.get('location') as string) || '').trim();
  const version = ((formData.get('version') as string) || '').trim();

  if (!tenant || !systemId || !controlId || !type || !location || !version) {
    return { error: 'Complete all evidence fields to upload.' };
  }

  const updated = await updateTenantSystem(tenant, systemId, (system) => {
    const approvalStatus: EvidenceStatus = 'pending';
    const nextStatus: ControlStatus = 'in_review';
    const evidenceItem: EvidenceItem = {
      id: crypto.randomUUID(),
      controlId,
      type,
      location,
      version,
      approvalStatus,
      createdAt: Date.now()
    };

    const evidence = [evidenceItem, ...system.evidence];

    const controls = system.controls.map((control) =>
      control.id === controlId ? { ...control, status: nextStatus } : control
    );

    return {
      ...system,
      evidence,
      controls,
      lastReviewedAt: Date.now()
    };
  });

  if (!updated) {
    return { error: 'System not found.' };
  }

  revalidatePath(`/s/${tenant}`);
  return { success: true };
}

export async function createLeadAction(
  prevState: any,
  formData: FormData
) {
  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  const company = ((formData.get('company') as string) || '').trim();
  const useCase = ((formData.get('useCase') as string) || '').trim();
  const systemCount = ((formData.get('systemCount') as string) || '').trim();
  const website = ((formData.get('website') as string) || '').trim();

  if (website) {
    return { success: true };
  }

  if (!name || !email || !company || !useCase || !systemCount) {
    return { error: 'Please complete all required fields.' };
  }

  const leadId = crypto.randomUUID();
  const leadRecord = {
    id: leadId,
    name,
    email,
    company,
    useCase,
    systemCount,
    status: 'new' as const,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  await kv.set(`lead:${leadId}`, leadRecord);
  const index = (await kv.get<string[]>('lead:index')) || [];
  await kv.set('lead:index', [leadId, ...index]);

  await sendLeadNotification(leadRecord);

  return { success: true };
}

export async function updateLeadStatusAction(
  prevState: any,
  formData: FormData
) {
  const id = ((formData.get('id') as string) || '').trim();
  const status = ((formData.get('status') as string) || '').trim();

  if (!id || !status) {
    return { error: 'Missing lead status.' };
  }

  const allowed = new Set(['new', 'contacted', 'qualified', 'closed']);
  if (!allowed.has(status)) {
    return { error: 'Invalid status.' };
  }

  const lead = await kv.get<any>(`lead:${id}`);
  if (!lead) {
    return { error: 'Lead not found.' };
  }

  const updatedLead = {
    ...lead,
    status,
    updatedAt: Date.now()
  };

  await kv.set(`lead:${id}`, updatedLead);
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateLeadStatusFormAction(formData: FormData) {
  await updateLeadStatusAction({}, formData);
}

export async function uploadIndustriesCsvAction(
  prevState: any,
  formData: FormData
) {
  const file = formData.get('file') as File | null;
  if (!file) {
    return { error: 'Please upload a CSV file.' };
  }

  const contents = await file.text();
  const { headers, records } = parseCsvText(contents);

  if (!headers.length || records.length === 0) {
    return { error: 'CSV must include a header row and at least one entry.' };
  }

  const requiredHeaders = [
    'name',
    'summary',
    'evidence',
    'stakeholders',
    'use_cases'
  ];
  const missingHeaders = requiredHeaders.filter(
    (header) => !headers.includes(header)
  );
  if (missingHeaders.length) {
    return {
      error: `Missing required columns: ${missingHeaders.join(', ')}`
    };
  }

  const parsed = parseIndustriesCsv(records);
  if (parsed.errors.length) {
    return { error: parsed.errors.join('; ') };
  }

  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, 'industries.csv'), contents, 'utf-8');

  revalidatePath('/industries');
  revalidatePath('/regions');
  revalidatePath('/sitemap.xml');

  return { success: true, count: parsed.industries.length };
}

export async function uploadCountriesCsvAction(
  prevState: any,
  formData: FormData
) {
  const file = formData.get('file') as File | null;
  if (!file) {
    return { error: 'Please upload a CSV file.' };
  }

  const contents = await file.text();
  const { headers, records } = parseCsvText(contents);

  if (!headers.length || records.length === 0) {
    return { error: 'CSV must include a header row and at least one entry.' };
  }

  const requiredHeaders = ['name', 'region'];
  const missingHeaders = requiredHeaders.filter(
    (header) => !headers.includes(header)
  );
  if (missingHeaders.length) {
    return {
      error: `Missing required columns: ${missingHeaders.join(', ')}`
    };
  }

  const parsed = parseCountriesCsv(records);
  if (parsed.errors.length) {
    return { error: parsed.errors.join('; ') };
  }

  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, 'countries.csv'), contents, 'utf-8');

  revalidatePath('/regions');
  revalidatePath('/industries');
  revalidatePath('/sitemap.xml');

  return { success: true, count: parsed.countries.length };
}

export async function createPilotCheckoutAction(
  prevState: any,
  formData: FormData
) {
  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  const company = ((formData.get('company') as string) || '').trim();
  const useCase = ((formData.get('useCase') as string) || '').trim();
  const systemCount = ((formData.get('systemCount') as string) || '').trim();
  const website = ((formData.get('website') as string) || '').trim();

  if (website) {
    return { success: true };
  }

  if (!name || !email || !company || !useCase || !systemCount) {
    return { error: 'Please complete all required fields.' };
  }

  const priceId = process.env.STRIPE_PILOT_PRICE_ID;
  if (!priceId) {
    return { error: 'Missing STRIPE_PILOT_PRICE_ID configuration.' };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${rootDomain}`;

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/pilot/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pilot/cancel`,
    customer_email: email,
    metadata: {
      name,
      company,
      useCase,
      systemCount
    }
  });

  if (!session.url) {
    return { error: 'Unable to start checkout session.' };
  }

  redirect(session.url);
  return { success: true };
}

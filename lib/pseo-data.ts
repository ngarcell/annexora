import fs from 'node:fs';
import path from 'node:path';

export type Angle = {
  name: string;
  slug: string;
  focus: string;
  outcome: string;
  evidence: string;
  gap: string;
};

export type Industry = {
  name: string;
  slug: string;
  summary: string;
  evidence: string[];
  stakeholders: string[];
  useCases: string[];
  highRiskScenarios?: string[];
  providerRiskPoints?: string[];
  buyingCommittee?: string[];
};

export type Country = {
  name: string;
  slug: string;
  region: string;
  authorityName?: string;
  authorityUrl?: string;
  languageNote?: string;
  enforcementNote?: string;
  marketSignal?: string;
};

const csvRoot = path.join(process.cwd(), 'data');

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsv(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return { headers: [], records: [] };
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  const records = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    return record;
  });
  return { headers, records };
}

export function parseCsvText(text: string) {
  return parseCsv(text);
}

function readCsvFile(filename: string) {
  const filePath = path.join(csvRoot, filename);
  if (!fs.existsSync(filePath)) {
    return { headers: [], records: [] };
  }
  const contents = fs.readFileSync(filePath, 'utf-8');
  return parseCsv(contents);
}

export const pseoAngles: Angle[] = [
  {
    name: 'Risk classification',
    slug: 'risk-classification',
    focus: 'risk tiering and Annex III alignment',
    outcome: 'Clear risk tier and documented rationale',
    evidence: 'risk assessment records',
    gap: 'missing classification rationale'
  },
  {
    name: 'Audit readiness',
    slug: 'audit-readiness',
    focus: 'audit pack completeness',
    outcome: 'Notified-body ready evidence bundle',
    evidence: 'audit-ready traceability matrix',
    gap: 'scattered evidence and no traceability matrix'
  },
  {
    name: 'Evidence vault',
    slug: 'evidence-vault',
    focus: 'evidence versioning and approvals',
    outcome: 'All evidence centralized and approved',
    evidence: 'versioned evidence repository',
    gap: 'evidence stored across teams with no owner'
  },
  {
    name: 'Human oversight',
    slug: 'human-oversight',
    focus: 'human-in-the-loop controls',
    outcome: 'Operational override and escalation workflows',
    evidence: 'human oversight logs',
    gap: 'no documented oversight procedures'
  },
  {
    name: 'Logging & traceability',
    slug: 'logging-traceability',
    focus: 'event logging and audit trails',
    outcome: 'Traceable decisions and model events',
    evidence: 'logging and retention policies',
    gap: 'insufficient log retention or coverage'
  },
  {
    name: 'Model documentation',
    slug: 'model-documentation',
    focus: 'technical documentation completeness',
    outcome: 'Up-to-date model cards and system docs',
    evidence: 'model cards and technical docs',
    gap: 'documentation out of date with deployments'
  },
  {
    name: 'Data governance',
    slug: 'data-governance',
    focus: 'training data quality and bias checks',
    outcome: 'Documented data quality controls',
    evidence: 'data lineage and quality reports',
    gap: 'missing lineage or bias analysis'
  },
  {
    name: 'Security & robustness',
    slug: 'security-robustness',
    focus: 'accuracy, resilience, and cybersecurity',
    outcome: 'Resilient systems with defined safeguards',
    evidence: 'robustness test reports',
    gap: 'no documented stress testing'
  },
  {
    name: 'Post-market monitoring',
    slug: 'post-market-monitoring',
    focus: 'ongoing monitoring and incident reporting',
    outcome: 'Operational monitoring and incident readiness',
    evidence: 'monitoring plans and incident logs',
    gap: 'no incident workflow defined'
  },
  {
    name: 'Governance operating model',
    slug: 'governance-operating-model',
    focus: 'roles, accountability, and review cadence',
    outcome: 'Clear owners and review schedule',
    evidence: 'governance charters and RACI',
    gap: 'unclear accountability across teams'
  },
  {
    name: 'Performance validation',
    slug: 'performance-validation',
    focus: 'accuracy and performance evaluation',
    outcome: 'Validated performance with clear metrics',
    evidence: 'validation reports',
    gap: 'no documented performance thresholds'
  },
  {
    name: 'Third-party assurance',
    slug: 'third-party-assurance',
    focus: 'vendor and supplier compliance',
    outcome: 'Third-party risk controls in place',
    evidence: 'supplier assessments',
    gap: 'supplier obligations not tracked'
  },
  {
    name: 'Transparency',
    slug: 'transparency',
    focus: 'user and stakeholder transparency',
    outcome: 'Clear transparency notices delivered',
    evidence: 'user-facing disclosures',
    gap: 'missing notices to affected users'
  },
  {
    name: 'Change management',
    slug: 'change-management',
    focus: 'model updates and release governance',
    outcome: 'Controlled updates with approval trails',
    evidence: 'change logs and approval records',
    gap: 'model changes without documented review'
  },
  {
    name: 'Quality management',
    slug: 'quality-management',
    focus: 'quality system alignment',
    outcome: 'Quality controls mapped to AI Act needs',
    evidence: 'quality management procedures',
    gap: 'quality controls not mapped to AI systems'
  }
];

const defaultIndustries: Industry[] = [
  {
    name: 'Financial services',
    slug: 'financial-services',
    summary:
      'AI systems impacting lending, risk scoring, and access to essential services.',
    evidence: [
      'credit model validation reports',
      'fairness audits across cohorts',
      'customer decision logs'
    ],
    stakeholders: ['Risk', 'Compliance', 'Product'],
    useCases: ['Credit scoring & access to services', 'Employment & workers management']
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    summary:
      'Clinical and operational AI systems that influence care pathways.',
    evidence: [
      'clinical validation reports',
      'incident response records',
      'data provenance documentation'
    ],
    stakeholders: ['Clinical Ops', 'Compliance', 'IT'],
    useCases: ['Critical infrastructure', 'Education & vocational training']
  },
  {
    name: 'HR & staffing',
    slug: 'hr-staffing',
    summary:
      'Hiring, performance, and workforce management systems.',
    evidence: [
      'bias monitoring dashboards',
      'human oversight logs',
      'candidate impact assessments'
    ],
    stakeholders: ['People Ops', 'Legal', 'Compliance'],
    useCases: ['Employment & workers management']
  },
  {
    name: 'Education',
    slug: 'education',
    summary:
      'Admissions, placement, and assessment systems influencing student outcomes.',
    evidence: [
      'student outcome validation studies',
      'appeals and override logs',
      'documentation of training datasets'
    ],
    stakeholders: ['Academic Affairs', 'Legal', 'IT'],
    useCases: ['Education & vocational training']
  },
  {
    name: 'Public sector',
    slug: 'public-sector',
    summary:
      'Citizen-facing systems used for eligibility, services, and enforcement.',
    evidence: [
      'transparency notices',
      'audit trails for decisions',
      'risk impact assessments'
    ],
    stakeholders: ['Policy', 'Legal', 'Operations'],
    useCases: ['Justice & democratic processes', 'Migration, asylum & border control']
  },
  {
    name: 'Insurance',
    slug: 'insurance',
    summary:
      'Risk pricing, claims triage, and fraud detection platforms.',
    evidence: [
      'claims decision logs',
      'model robustness testing',
      'data governance policies'
    ],
    stakeholders: ['Claims', 'Risk', 'Compliance'],
    useCases: ['Credit scoring & access to services']
  },
  {
    name: 'Utilities & energy',
    slug: 'utilities-energy',
    summary:
      'AI systems monitoring critical infrastructure and safety.',
    evidence: [
      'safety case documentation',
      'resilience testing logs',
      'incident response playbooks'
    ],
    stakeholders: ['Operations', 'Safety', 'Security'],
    useCases: ['Critical infrastructure']
  },
  {
    name: 'Transportation & logistics',
    slug: 'transport-logistics',
    summary:
      'Routing, safety, and operational optimization systems.',
    evidence: [
      'operational monitoring dashboards',
      'system performance reports',
      'incident management logs'
    ],
    stakeholders: ['Operations', 'Safety', 'Compliance'],
    useCases: ['Critical infrastructure']
  },
  {
    name: 'Retail & ecommerce',
    slug: 'retail-ecommerce',
    summary:
      'AI used for eligibility, access, and workforce management.',
    evidence: [
      'decision explainability artifacts',
      'model monitoring dashboards',
      'data quality documentation'
    ],
    stakeholders: ['Operations', 'Legal', 'Risk'],
    useCases: ['Employment & workers management', 'Credit scoring & access to services']
  },
  {
    name: 'Telecom & media',
    slug: 'telecom-media',
    summary:
      'AI for access decisions, service eligibility, and infrastructure monitoring.',
    evidence: [
      'service eligibility audits',
      'security monitoring reports',
      'data lineage documentation'
    ],
    stakeholders: ['Security', 'Compliance', 'Product'],
    useCases: ['Critical infrastructure', 'Credit scoring & access to services']
  }
];

const defaultCountries: Country[] = [
  { name: 'Austria', slug: 'austria', region: 'EU' },
  { name: 'Belgium', slug: 'belgium', region: 'EU' },
  { name: 'Bulgaria', slug: 'bulgaria', region: 'EU' },
  { name: 'Croatia', slug: 'croatia', region: 'EU' },
  { name: 'Cyprus', slug: 'cyprus', region: 'EU' },
  { name: 'Czechia', slug: 'czechia', region: 'EU' },
  { name: 'Denmark', slug: 'denmark', region: 'EU' },
  { name: 'Estonia', slug: 'estonia', region: 'EU' },
  { name: 'Finland', slug: 'finland', region: 'EU' },
  { name: 'France', slug: 'france', region: 'EU' },
  { name: 'Germany', slug: 'germany', region: 'EU' },
  { name: 'Greece', slug: 'greece', region: 'EU' },
  { name: 'Hungary', slug: 'hungary', region: 'EU' },
  { name: 'Ireland', slug: 'ireland', region: 'EU' },
  { name: 'Italy', slug: 'italy', region: 'EU' },
  { name: 'Latvia', slug: 'latvia', region: 'EU' },
  { name: 'Lithuania', slug: 'lithuania', region: 'EU' },
  { name: 'Luxembourg', slug: 'luxembourg', region: 'EU' },
  { name: 'Malta', slug: 'malta', region: 'EU' },
  { name: 'Netherlands', slug: 'netherlands', region: 'EU' },
  { name: 'Poland', slug: 'poland', region: 'EU' },
  { name: 'Portugal', slug: 'portugal', region: 'EU' },
  { name: 'Romania', slug: 'romania', region: 'EU' },
  { name: 'Slovakia', slug: 'slovakia', region: 'EU' },
  { name: 'Slovenia', slug: 'slovenia', region: 'EU' },
  { name: 'Spain', slug: 'spain', region: 'EU' },
  { name: 'Sweden', slug: 'sweden', region: 'EU' }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function splitList(value: string) {
  return value
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseIndustriesCsv(records: Record<string, string>[]) {
  const errors: string[] = [];
  const industries: Industry[] = [];
  const slugs = new Set<string>();

  records.forEach((record, index) => {
    const name = record.name?.trim();
    if (!name) {
      errors.push(`Row ${index + 2}: name is required`);
      return;
    }

    const slug = record.slug?.trim() || slugify(name);
    if (!slug) {
      errors.push(`Row ${index + 2}: slug is required`);
      return;
    }
    if (slugs.has(slug)) {
      errors.push(`Row ${index + 2}: duplicate slug "${slug}"`);
      return;
    }
    slugs.add(slug);

    const summary = record.summary?.trim() || 'Industry compliance summary.';
    const evidence = splitList(record.evidence || '');
    const stakeholders = splitList(record.stakeholders || '');
    const useCases = splitList(record.use_cases || '');
    const highRiskScenarios = splitList(record.high_risk_scenarios || '');
    const providerRiskPoints = splitList(record.provider_risk_points || '');
    const buyingCommittee = splitList(record.buying_committee || '');

    industries.push({
      name,
      slug,
      summary,
      evidence: evidence.length ? evidence : ['evidence documentation'],
      stakeholders: stakeholders.length ? stakeholders : ['Compliance'],
      useCases: useCases.length
        ? useCases
        : ['Employment & workers management'],
      highRiskScenarios: highRiskScenarios.length ? highRiskScenarios : undefined,
      providerRiskPoints: providerRiskPoints.length
        ? providerRiskPoints
        : undefined,
      buyingCommittee: buyingCommittee.length ? buyingCommittee : undefined
    });
  });

  return { industries, errors };
}

export function parseCountriesCsv(records: Record<string, string>[]) {
  const errors: string[] = [];
  const countries: Country[] = [];
  const slugs = new Set<string>();

  records.forEach((record, index) => {
    const name = record.name?.trim();
    if (!name) {
      errors.push(`Row ${index + 2}: name is required`);
      return;
    }

    const slug = record.slug?.trim() || slugify(name);
    if (!slug) {
      errors.push(`Row ${index + 2}: slug is required`);
      return;
    }
    if (slugs.has(slug)) {
      errors.push(`Row ${index + 2}: duplicate slug "${slug}"`);
      return;
    }
    slugs.add(slug);

    countries.push({
      name,
      slug,
      region: record.region?.trim() || 'EU',
      authorityName: record.authority_name?.trim() || undefined,
      authorityUrl: record.authority_url?.trim() || undefined,
      languageNote: record.language_note?.trim() || undefined,
      enforcementNote: record.enforcement_note?.trim() || undefined,
      marketSignal: record.market_signal?.trim() || undefined
    });
  });

  return { countries, errors };
}

export function getIndustries(): Industry[] {
  const { records } = readCsvFile('industries.csv');
  if (!records.length) {
    return defaultIndustries;
  }

  const parsed = parseIndustriesCsv(records);
  if (parsed.errors.length) {
    throw new Error(`Invalid industries.csv: ${parsed.errors.join('; ')}`);
  }
  return parsed.industries;
}

export function getCountries(): Country[] {
  const { records } = readCsvFile('countries.csv');
  if (!records.length) {
    return defaultCountries;
  }

  const parsed = parseCountriesCsv(records);
  if (parsed.errors.length) {
    throw new Error(`Invalid countries.csv: ${parsed.errors.join('; ')}`);
  }
  return parsed.countries;
}

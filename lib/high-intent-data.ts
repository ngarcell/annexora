import fs from 'node:fs';
import path from 'node:path';
import {
  getCountries,
  getIndustries,
  parseCsvText,
  type Country,
  type Industry
} from '@/lib/pseo-data';

export type BuyerRole = 'deployer' | 'provider';

export type RoleProfile = {
  slug: BuyerRole;
  name: string;
  shortLabel: string;
  responsibilities: string[];
  primaryArticle: string;
};

export type Intent = {
  name: string;
  slug: string;
  executionFocus: string;
  buyerSignal: string;
  ctaLabel: string;
};

export type Artifact = {
  name: string;
  slug: string;
  articleReference: string;
  deliveryOutcome: string;
  ctaLabel: string;
};

export type ObligationHub = {
  name: string;
  slug: string;
  articleReference: string;
  summary: string;
  proofPoints: string[];
};

const csvRoot = path.join(process.cwd(), 'data');

const defaultIntents: Intent[] = [
  {
    name: 'Compliance software',
    slug: 'compliance-software',
    executionFocus: 'centralize controls, owners, and evidence in one workspace',
    buyerSignal: 'teams evaluating software for immediate compliance operations',
    ctaLabel: 'Start paid pilot'
  },
  {
    name: 'Readiness assessment',
    slug: 'readiness-assessment',
    executionFocus: 'baseline current controls against EU AI Act obligations',
    buyerSignal: 'teams preparing for upcoming audit windows',
    ctaLabel: 'Book readiness review'
  },
  {
    name: 'Gap analysis',
    slug: 'gap-analysis',
    executionFocus: 'identify missing evidence and control ownership by obligation',
    buyerSignal: 'buyers with known compliance gaps and budget pressure',
    ctaLabel: 'Request gap review'
  },
  {
    name: 'Audit pack',
    slug: 'audit-pack',
    executionFocus: 'assemble traceability matrices and evidence bundles for reviews',
    buyerSignal: 'teams close to conformity checks or customer due diligence',
    ctaLabel: 'Build audit pack'
  },
  {
    name: 'Technical documentation',
    slug: 'technical-documentation',
    executionFocus: 'produce Annex IV-aligned documentation and release controls',
    buyerSignal: 'provider teams formalizing technical files for high-risk systems',
    ctaLabel: 'Scope documentation sprint'
  },
  {
    name: 'Conformity prep',
    slug: 'conformity-prep',
    executionFocus: 'prepare conformity assessment evidence and governance workflows',
    buyerSignal: 'buyers targeting pre-market approval readiness',
    ctaLabel: 'Plan conformity prep'
  }
];

const defaultArtifacts: Artifact[] = [
  {
    name: 'Annex IV template',
    slug: 'annex-iv-template',
    articleReference: 'Annex IV',
    deliveryOutcome: 'structured technical documentation baseline for high-risk systems',
    ctaLabel: 'Get Annex IV plan'
  },
  {
    name: 'FRIA template',
    slug: 'fria-template',
    articleReference: 'Article 27',
    deliveryOutcome: 'repeatable fundamental-rights impact assessment workflow',
    ctaLabel: 'Scope FRIA workflow'
  },
  {
    name: 'Risk management plan',
    slug: 'risk-management-plan',
    articleReference: 'Article 9',
    deliveryOutcome: 'living risk register with mitigation owners and review cadence',
    ctaLabel: 'Build risk plan'
  },
  {
    name: 'Post-market monitoring plan',
    slug: 'post-market-monitoring-plan',
    articleReference: 'Article 72',
    deliveryOutcome: 'operational monitoring and incident escalation playbook',
    ctaLabel: 'Design monitoring plan'
  },
  {
    name: 'Transparency notice',
    slug: 'transparency-notice',
    articleReference: 'Article 13',
    deliveryOutcome: 'auditable notice workflow for affected users and stakeholders',
    ctaLabel: 'Create transparency pack'
  },
  {
    name: 'Incident reporting SOP',
    slug: 'incident-reporting-sop',
    articleReference: 'Article 73',
    deliveryOutcome: 'serious incident triage and reporting process with ownership',
    ctaLabel: 'Implement incident SOP'
  },
  {
    name: 'Human oversight SOP',
    slug: 'human-oversight-sop',
    articleReference: 'Article 14',
    deliveryOutcome: 'override, escalation, and intervention evidence workflow',
    ctaLabel: 'Deploy oversight SOP'
  },
  {
    name: 'Data governance checklist',
    slug: 'data-governance-checklist',
    articleReference: 'Article 10',
    deliveryOutcome: 'quality, lineage, and bias-control checklist tied to obligations',
    ctaLabel: 'Start data checklist'
  }
];

const csvErrorPrefix = 'Invalid high-intent CSV';

const roles: RoleProfile[] = [
  {
    slug: 'deployer',
    name: 'Deployer',
    shortLabel: 'Deployment owner',
    responsibilities: [
      'Operate high-risk AI systems with documented human oversight',
      'Maintain operational logs and incident workflows',
      'Execute FRIA and downstream accountability requirements'
    ],
    primaryArticle: 'Article 26'
  },
  {
    slug: 'provider',
    name: 'Provider',
    shortLabel: 'Model/system provider',
    responsibilities: [
      'Maintain Annex IV technical documentation and conformity evidence',
      'Operate post-market monitoring and corrective action workflows',
      'Demonstrate quality management and robustness controls'
    ],
    primaryArticle: 'Annex IV + Articles 9-15'
  }
];

export const obligationHubs: ObligationHub[] = [
  {
    name: 'Risk management system',
    slug: 'risk-management-system',
    articleReference: 'Article 9',
    summary:
      'Operationalize risk identification, mitigation ownership, and review cadence for high-risk AI systems.',
    proofPoints: [
      'Risk register with owners and status',
      'Mitigation evidence linked to controls',
      'Scheduled governance review records'
    ]
  },
  {
    name: 'Data governance and quality',
    slug: 'data-governance-quality',
    articleReference: 'Article 10',
    summary:
      'Define training and operational data controls, quality thresholds, and bias monitoring routines.',
    proofPoints: [
      'Data lineage documentation',
      'Bias testing reports',
      'Data quality policy approvals'
    ]
  },
  {
    name: 'Technical documentation scope',
    slug: 'technical-documentation-scope',
    articleReference: 'Article 11',
    summary:
      'Maintain complete technical files for system design, intended use, and performance constraints.',
    proofPoints: [
      'Versioned technical file',
      'Design assumptions and limitations',
      'Release governance records'
    ]
  },
  {
    name: 'Automatic record keeping',
    slug: 'automatic-record-keeping',
    articleReference: 'Article 12',
    summary:
      'Implement durable event logging and retention to support auditability and incident reconstruction.',
    proofPoints: [
      'Log retention policy',
      'Traceability matrix linking logs to controls',
      'Evidence of immutable audit trails'
    ]
  },
  {
    name: 'Transparency information controls',
    slug: 'transparency-information-controls',
    articleReference: 'Article 13',
    summary:
      'Deliver complete instructions for use and stakeholder-facing transparency notices.',
    proofPoints: [
      'Published transparency notice set',
      'Instruction artifact approvals',
      'Disclosure change history'
    ]
  },
  {
    name: 'Human oversight operations',
    slug: 'human-oversight-operations',
    articleReference: 'Article 14',
    summary:
      'Document override authority, escalation steps, and intervention accountability for operators.',
    proofPoints: [
      'Oversight SOP with named owners',
      'Intervention decision logs',
      'Escalation drill evidence'
    ]
  },
  {
    name: 'Accuracy robustness cybersecurity',
    slug: 'accuracy-robustness-cybersecurity',
    articleReference: 'Article 15',
    summary:
      'Validate performance thresholds, robustness scenarios, and cybersecurity safeguards.',
    proofPoints: [
      'Validation benchmark reports',
      'Stress and adversarial testing logs',
      'Security control mapping'
    ]
  },
  {
    name: 'Quality management system',
    slug: 'quality-management-system',
    articleReference: 'Article 17',
    summary:
      'Align AI compliance controls with broader quality management practices and ownership.',
    proofPoints: [
      'QMS process mapping',
      'Internal control audit evidence',
      'Continuous improvement logs'
    ]
  },
  {
    name: 'Authorized representative coordination',
    slug: 'authorized-representative-coordination',
    articleReference: 'Article 22',
    summary:
      'Define evidence handoff and accountability model with authorized representatives.',
    proofPoints: [
      'Representation agreement controls',
      'Delegation and escalation matrix',
      'Evidence handoff records'
    ]
  },
  {
    name: 'Importer assurance interface',
    slug: 'importer-assurance-interface',
    articleReference: 'Article 23',
    summary:
      'Provide importers with validation proof and governance status for placed-on-market systems.',
    proofPoints: [
      'Importer handoff checklist',
      'Conformity status attestations',
      'Issue escalation workflow'
    ]
  },
  {
    name: 'Distributor assurance interface',
    slug: 'distributor-assurance-interface',
    articleReference: 'Article 24',
    summary:
      'Enable distributors to verify compliance posture and corrective action status.',
    proofPoints: [
      'Distributor readiness checklist',
      'Control status snapshot',
      'Corrective action tracking'
    ]
  },
  {
    name: 'Provider obligations operating model',
    slug: 'provider-obligations-operating-model',
    articleReference: 'Article 16',
    summary:
      'Operationalize provider duties across product, legal, security, and quality stakeholders.',
    proofPoints: [
      'Provider RACI model',
      'Obligation owner matrix',
      'Governance meeting evidence'
    ]
  },
  {
    name: 'Deployer obligations operating model',
    slug: 'deployer-obligations-operating-model',
    articleReference: 'Article 26',
    summary:
      'Convert deployer obligations into execution routines, accountability, and audit evidence.',
    proofPoints: [
      'Deployer control framework',
      'Operational owner assignments',
      'Regular compliance reviews'
    ]
  },
  {
    name: 'Fundamental rights impact assessment',
    slug: 'fundamental-rights-impact-assessment',
    articleReference: 'Article 27',
    summary:
      'Build repeatable FRIA workflows that connect risk assessment to mitigation evidence.',
    proofPoints: [
      'FRIA templates and records',
      'Mitigation decision logs',
      'Stakeholder sign-off history'
    ]
  },
  {
    name: 'Use and monitoring duties',
    slug: 'use-and-monitoring-duties',
    articleReference: 'Article 26',
    summary:
      'Document proper-use controls and ongoing monitoring responsibilities in production.',
    proofPoints: [
      'Runtime control checklist',
      'Monitoring KPI dashboard',
      'Usage exception handling logs'
    ]
  },
  {
    name: 'Conformity assessment planning',
    slug: 'conformity-assessment-planning',
    articleReference: 'Article 43',
    summary:
      'Sequence conformity preparation tasks, dependencies, and readiness milestones.',
    proofPoints: [
      'Conformity plan with milestones',
      'Evidence completion tracker',
      'Readiness gate decisions'
    ]
  },
  {
    name: 'Notified body readiness',
    slug: 'notified-body-readiness',
    articleReference: 'Article 43',
    summary:
      'Prepare evidence packaging and workflow readiness for notified body interaction.',
    proofPoints: [
      'Submission-ready evidence index',
      'Owner-verified documentation set',
      'Issue remediation tracker'
    ]
  },
  {
    name: 'EU declaration and CE-mark support',
    slug: 'eu-declaration-ce-mark-support',
    articleReference: 'Articles 47-48',
    summary:
      'Coordinate declaration artifacts and CE-mark support evidence with governance controls.',
    proofPoints: [
      'Declaration support checklist',
      'CE-mark evidence map',
      'Approval chain records'
    ]
  },
  {
    name: 'Post-market monitoring operations',
    slug: 'post-market-monitoring-operations',
    articleReference: 'Article 72',
    summary:
      'Run continuous post-market monitoring with escalation and governance reporting.',
    proofPoints: [
      'Monitoring plan execution logs',
      'Risk signal triage records',
      'Periodic governance summaries'
    ]
  },
  {
    name: 'Serious incident reporting',
    slug: 'serious-incident-reporting',
    articleReference: 'Article 73',
    summary:
      'Define incident severity criteria, response workflows, and authority reporting evidence.',
    proofPoints: [
      'Incident severity matrix',
      'Response and reporting timeline logs',
      'Post-incident corrective actions'
    ]
  },
  {
    name: 'Corrective action governance',
    slug: 'corrective-action-governance',
    articleReference: 'Article 74',
    summary:
      'Track non-conformity remediation and corrective action closure across owners.',
    proofPoints: [
      'Corrective action register',
      'Root-cause analysis reports',
      'Closure validation evidence'
    ]
  },
  {
    name: 'Technical documentation annex iv',
    slug: 'technical-documentation-annex-iv',
    articleReference: 'Annex IV',
    summary:
      'Ensure Annex IV documentation sections are complete, versioned, and auditable.',
    proofPoints: [
      'Annex IV section completion tracker',
      'Versioned doc repository',
      'Review approvals and timestamps'
    ]
  },
  {
    name: 'Data provenance and retention',
    slug: 'data-provenance-and-retention',
    articleReference: 'Articles 10 and 12',
    summary:
      'Connect data lineage records with retention and audit-trace obligations.',
    proofPoints: [
      'Lineage map by system',
      'Retention policy compliance logs',
      'Data quality exception handling'
    ]
  },
  {
    name: 'Model change and release governance',
    slug: 'model-change-and-release-governance',
    articleReference: 'Article 15 + Annex IV',
    summary:
      'Control model updates with release gates and evidence impact review.',
    proofPoints: [
      'Change approval workflow',
      'Release validation reports',
      'Regression and risk sign-offs'
    ]
  },
  {
    name: 'Bias testing and mitigation program',
    slug: 'bias-testing-and-mitigation-program',
    articleReference: 'Article 10',
    summary:
      'Run repeatable bias evaluation and mitigation actions with traceable ownership.',
    proofPoints: [
      'Bias test schedule and outputs',
      'Mitigation action register',
      'Executive review records'
    ]
  },
  {
    name: 'Audit pack and traceability matrix',
    slug: 'audit-pack-and-traceability-matrix',
    articleReference: 'Annex IV + Article 12',
    summary:
      'Package controls, logs, and evidence into audit-ready traceability views.',
    proofPoints: [
      'Obligation-to-evidence matrix',
      'Versioned audit bundle exports',
      'Owner attestation records'
    ]
  },
  {
    name: 'Penalty exposure mitigation',
    slug: 'penalty-exposure-mitigation',
    articleReference: 'Article 99',
    summary:
      'Reduce penalty risk through evidence completeness and accountable remediation workflows.',
    proofPoints: [
      'Penalty-risk heatmap',
      'Priority remediation backlog',
      'Executive compliance reporting'
    ]
  },
  {
    name: 'Standards mapping ISO 42001 and CEN-CENELEC',
    slug: 'standards-mapping-iso-42001-cen-cenelec',
    articleReference: 'Harmonized standards mapping',
    summary:
      'Map AI Act obligations to management-system and standards-aligned controls.',
    proofPoints: [
      'Control crosswalk to standards',
      'Gap analysis against target standard',
      'Roadmap for harmonized alignment'
    ]
  }
];

function readCsvFile(filename: string) {
  const filePath = path.join(csvRoot, filename);
  if (!fs.existsSync(filePath)) {
    return { headers: [], records: [] as Record<string, string>[] };
  }

  const contents = fs.readFileSync(filePath, 'utf-8');
  return parseCsvText(contents);
}

export function parseIntentsCsv(records: Record<string, string>[]) {
  const errors: string[] = [];
  const intents: Intent[] = [];
  const slugs = new Set<string>();

  records.forEach((record, index) => {
    const name = (record.name || '').trim();
    const slug = (record.slug || '').trim();
    const executionFocus = (record.execution_focus || '').trim();
    const buyerSignal = (record.buyer_signal || '').trim();
    const ctaLabel = (record.cta_label || '').trim();

    if (!name) {
      errors.push(`Row ${index + 2}: name is required`);
    }
    if (!slug) {
      errors.push(`Row ${index + 2}: slug is required`);
    } else if (slugs.has(slug)) {
      errors.push(`Row ${index + 2}: duplicate slug "${slug}"`);
    } else {
      slugs.add(slug);
    }

    intents.push({
      name: name || `Intent ${index + 1}`,
      slug: slug || `intent-${index + 1}`,
      executionFocus: executionFocus || 'Map obligations to implementation workstreams.',
      buyerSignal: buyerSignal || 'Teams with urgent compliance timelines.',
      ctaLabel: ctaLabel || 'Book readiness review'
    });
  });

  return { intents, errors };
}

export function parseArtifactsCsv(records: Record<string, string>[]) {
  const errors: string[] = [];
  const artifacts: Artifact[] = [];
  const slugs = new Set<string>();

  records.forEach((record, index) => {
    const name = (record.name || '').trim();
    const slug = (record.slug || '').trim();
    const articleReference = (record.article_reference || '').trim();
    const deliveryOutcome = (record.delivery_outcome || '').trim();
    const ctaLabel = (record.cta_label || '').trim();

    if (!name) {
      errors.push(`Row ${index + 2}: name is required`);
    }
    if (!slug) {
      errors.push(`Row ${index + 2}: slug is required`);
    } else if (slugs.has(slug)) {
      errors.push(`Row ${index + 2}: duplicate slug "${slug}"`);
    } else {
      slugs.add(slug);
    }

    artifacts.push({
      name: name || `Artifact ${index + 1}`,
      slug: slug || `artifact-${index + 1}`,
      articleReference: articleReference || 'EU AI Act obligations',
      deliveryOutcome:
        deliveryOutcome ||
        'Evidence package that supports audit and conformity preparation.',
      ctaLabel: ctaLabel || 'Start paid pilot'
    });
  });

  return { artifacts, errors };
}

function assertHeaders(
  headers: string[],
  required: string[],
  filename: string
): void {
  const missing = required.filter((header) => !headers.includes(header));
  if (missing.length) {
    throw new Error(
      `${csvErrorPrefix} (${filename}): missing required columns ${missing.join(', ')}`
    );
  }
}

export function getIntents(): Intent[] {
  const { headers, records } = readCsvFile('intents.csv');
  if (!records.length) {
    return defaultIntents;
  }

  assertHeaders(
    headers,
    ['name', 'slug', 'execution_focus', 'buyer_signal', 'cta_label'],
    'intents.csv'
  );

  const parsed = parseIntentsCsv(records);
  if (parsed.errors.length) {
    throw new Error(`${csvErrorPrefix} (intents.csv): ${parsed.errors.join('; ')}`);
  }

  return parsed.intents;
}

export function getArtifacts(): Artifact[] {
  const { headers, records } = readCsvFile('artifacts.csv');
  if (!records.length) {
    return defaultArtifacts;
  }

  assertHeaders(
    headers,
    ['name', 'slug', 'article_reference', 'delivery_outcome', 'cta_label'],
    'artifacts.csv'
  );

  const parsed = parseArtifactsCsv(records);
  if (parsed.errors.length) {
    throw new Error(`${csvErrorPrefix} (artifacts.csv): ${parsed.errors.join('; ')}`);
  }

  return parsed.artifacts;
}

export function getRoles(): RoleProfile[] {
  return roles;
}

export function getHighIntentCountries(): Country[] {
  return getCountries();
}

export function getHighIntentIndustries(): Industry[] {
  return getIndustries();
}

export type RiskTier = 'unacceptable' | 'high' | 'limited' | 'minimal';
export type SystemRole = 'provider' | 'deployer';
export type SystemStatus = 'draft' | 'in_review' | 'audit_ready';
export type ControlStatus = 'needs_evidence' | 'in_review' | 'approved';
export type EvidenceStatus = 'pending' | 'approved' | 'rejected';

export type RiskAssessment = {
  riskTier: RiskTier;
  rationale: string;
  annexIII: boolean;
  reviewer: string;
  approvedAt?: number;
};

export type Obligation = {
  code: string;
  title: string;
  description: string;
  riskTierApplicability: RiskTier[];
};

export type Control = {
  id: string;
  obligationCode: string;
  title: string;
  owner: string;
  status: ControlStatus;
  implementationNotes: string;
};

export type EvidenceItem = {
  id: string;
  controlId: string;
  type: string;
  location: string;
  version: string;
  approvalStatus: EvidenceStatus;
  createdAt: number;
};

export type AuditPack = {
  id: string;
  aiSystemId: string;
  generatedAt: number;
  contentsManifest: string[];
  summary: {
    obligations: number;
    controls: number;
    evidence: number;
  };
};

export type AISystem = {
  id: string;
  name: string;
  owner: string;
  deploymentContext: string;
  useCaseCategory: string;
  riskTier: RiskTier;
  role: SystemRole;
  status: SystemStatus;
  lastReviewedAt?: number;
  createdAt: number;
  riskAssessment?: RiskAssessment;
  obligations: Obligation[];
  controls: Control[];
  evidence: EvidenceItem[];
  auditPacks: AuditPack[];
};

export const riskTiers: {
  value: RiskTier;
  label: string;
  description: string;
}[] = [
  {
    value: 'unacceptable',
    label: 'Unacceptable',
    description: 'Prohibited systems with unacceptable risk.'
  },
  {
    value: 'high',
    label: 'High',
    description: 'Annex III high-risk systems requiring conformity checks.'
  },
  {
    value: 'limited',
    label: 'Limited',
    description: 'Transparency obligations, not full conformity assessment.'
  },
  {
    value: 'minimal',
    label: 'Minimal',
    description: 'Low or no regulatory obligations.'
  }
];

export const annexIIIUseCases = [
  'Employment & workers management',
  'Credit scoring & access to services',
  'Education & vocational training',
  'Critical infrastructure',
  'Law enforcement',
  'Migration, asylum & border control',
  'Justice & democratic processes'
];

export const highRiskObligations: Obligation[] = [
  {
    code: 'RM',
    title: 'Risk management system',
    description: 'Continuous risk identification, evaluation, and mitigation.',
    riskTierApplicability: ['high']
  },
  {
    code: 'DQ',
    title: 'Data governance & quality',
    description: 'Training and validation data quality and bias controls.',
    riskTierApplicability: ['high']
  },
  {
    code: 'LOG',
    title: 'Logging & traceability',
    description: 'Event logging and traceability for auditability.',
    riskTierApplicability: ['high']
  },
  {
    code: 'DOC',
    title: 'Technical documentation',
    description: 'Maintain detailed system and model documentation.',
    riskTierApplicability: ['high']
  },
  {
    code: 'INFO',
    title: 'Information for deployers',
    description: 'Provide clear instructions, limits, and performance data.',
    riskTierApplicability: ['high']
  },
  {
    code: 'HO',
    title: 'Human oversight',
    description: 'Human-in-the-loop procedures and override capabilities.',
    riskTierApplicability: ['high']
  },
  {
    code: 'ROB',
    title: 'Robustness & cybersecurity',
    description: 'Accuracy, resilience, and security safeguards.',
    riskTierApplicability: ['high']
  }
];

export function isAnnexIIIUseCase(category: string) {
  return annexIIIUseCases.some(
    (value) => value.toLowerCase() === category.toLowerCase()
  );
}

export function isHighRisk(riskTier: RiskTier, annexIII: boolean) {
  return riskTier === 'high' || annexIII;
}

export function buildDefaultControls(obligations: Obligation[]): Control[] {
  return obligations.map((obligation) => ({
    id: crypto.randomUUID(),
    obligationCode: obligation.code,
    title: `${obligation.title} control`,
    owner: 'Compliance Lead',
    status: 'needs_evidence',
    implementationNotes: 'Define control owner and evidence sources.'
  }));
}

export function buildDefaultEvidence(controls: Control[]): EvidenceItem[] {
  if (controls.length === 0) {
    return [];
  }

  const firstControl = controls[0];
  return [
    {
      id: crypto.randomUUID(),
      controlId: firstControl.id,
      type: 'Model card',
      location: 'docs/model-cards/talentmatch-v2.pdf',
      version: 'v2.3',
      approvalStatus: 'approved',
      createdAt: Date.now()
    }
  ];
}

export function buildAuditPack(
  aiSystemId: string,
  obligations: Obligation[],
  controls: Control[],
  evidence: EvidenceItem[]
): AuditPack {
  return {
    id: crypto.randomUUID(),
    aiSystemId,
    generatedAt: Date.now(),
    contentsManifest: [
      'Risk assessment summary',
      'Traceability matrix',
      'Evidence bundle',
      'Monitoring plan'
    ],
    summary: {
      obligations: obligations.length,
      controls: controls.length,
      evidence: evidence.length
    }
  };
}

export function buildSystem(input: {
  name: string;
  owner: string;
  deploymentContext: string;
  useCaseCategory: string;
  riskTier: RiskTier;
  role: SystemRole;
  status?: SystemStatus;
  rationale?: string;
  reviewer?: string;
}): AISystem {
  const annexIII = isAnnexIIIUseCase(input.useCaseCategory);
  const obligations = isHighRisk(input.riskTier, annexIII)
    ? highRiskObligations
    : [];
  const controls = buildDefaultControls(obligations);
  const evidence = buildDefaultEvidence(controls);

  return {
    id: crypto.randomUUID(),
    name: input.name,
    owner: input.owner,
    deploymentContext: input.deploymentContext,
    useCaseCategory: input.useCaseCategory,
    riskTier: input.riskTier,
    role: input.role,
    status: input.status || (obligations.length ? 'in_review' : 'draft'),
    createdAt: Date.now(),
    lastReviewedAt: Date.now(),
    riskAssessment: {
      riskTier: input.riskTier,
      rationale:
        input.rationale ||
        'Initial classification based on deployment context and annex mapping.',
      annexIII,
      reviewer: input.reviewer || 'Compliance Lead',
      approvedAt: Date.now()
    },
    obligations,
    controls,
    evidence,
    auditPacks: []
  };
}

export function buildStarterSystems(): AISystem[] {
  return [
    buildSystem({
      name: 'TalentMatch CV Screening',
      owner: 'People Ops',
      deploymentContext: 'EU hiring pipeline for enterprise roles',
      useCaseCategory: 'Employment & workers management',
      riskTier: 'high',
      role: 'deployer',
      status: 'in_review',
      rationale:
        'Automates candidate ranking and is listed under Annex III employment.'
    }),
    buildSystem({
      name: 'LoanWise Credit Scoring',
      owner: 'Risk & Compliance',
      deploymentContext: 'Consumer lending decision support',
      useCaseCategory: 'Credit scoring & access to services',
      riskTier: 'high',
      role: 'deployer',
      status: 'in_review',
      rationale:
        'Determines access to essential services, requiring high-risk controls.'
    }),
    buildSystem({
      name: 'SupportShield Spam Filter',
      owner: 'Customer Support',
      deploymentContext: 'Email triage and spam detection',
      useCaseCategory: 'General productivity',
      riskTier: 'minimal',
      role: 'deployer',
      status: 'draft',
      rationale: 'No Annex III impact and low individual rights impact.'
    })
  ];
}

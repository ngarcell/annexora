import { highRiskObligations } from '@/lib/compliance';
import { pseoAngles } from '@/lib/pseo-data';

export type PseoPage = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  heroTagline: string;
  useCaseName: string;
  useCaseSlug: string;
  useCaseSummary: string;
  angleName: string;
  angleSlug: string;
  painPoints: string[];
  outcomes: string[];
  obligations: string[];
  faq: { question: string; answer: string }[];
  ctaLabel: string;
  ctaHref: string;
  relatedSlugs: string[];
};

type UseCase = {
  name: string;
  slug: string;
  summary: string;
  evidence: string[];
  stakeholders: string[];
};

type Angle = {
  name: string;
  slug: string;
  focus: string;
  outcome: string;
  evidence: string;
  gap: string;
};

const annexUseCases: UseCase[] = [
  {
    name: 'Employment & workers management',
    slug: 'employment-workforce',
    summary:
      'Systems that influence hiring, promotion, performance, or termination decisions.',
    evidence: [
      'bias testing and mitigation reports',
      'human-in-the-loop decision logs',
      'candidate impact assessments'
    ],
    stakeholders: ['HR', 'People Ops', 'Legal']
  },
  {
    name: 'Credit scoring & access to services',
    slug: 'credit-scoring-access',
    summary:
      'Models that determine access to credit, insurance, or essential services.',
    evidence: [
      'model performance reports by cohort',
      'audit trails for lending decisions',
      'data provenance documentation'
    ],
    stakeholders: ['Risk', 'Compliance', 'Product']
  },
  {
    name: 'Education & vocational training',
    slug: 'education-training',
    summary:
      'AI that impacts admissions, placement, or evaluation in education.',
    evidence: [
      'validation studies on student outcomes',
      'appeals and override logs',
      'documentation of training datasets'
    ],
    stakeholders: ['Academic Affairs', 'Legal', 'IT']
  },
  {
    name: 'Critical infrastructure',
    slug: 'critical-infrastructure',
    summary:
      'Systems used in energy, transport, or utilities with safety impact.',
    evidence: [
      'safety case documentation',
      'incident response playbooks',
      'resilience and stress testing logs'
    ],
    stakeholders: ['Operations', 'Safety', 'Security']
  },
  {
    name: 'Law enforcement',
    slug: 'law-enforcement',
    summary:
      'AI used for risk assessment or evidence analysis in law enforcement.',
    evidence: [
      'model governance approvals',
      'accuracy and false positive analysis',
      'chain-of-custody documentation'
    ],
    stakeholders: ['Legal', 'Oversight', 'Operations']
  },
  {
    name: 'Migration, asylum & border control',
    slug: 'migration-border',
    summary:
      'Systems supporting migration decisions and border management.',
    evidence: [
      'human oversight protocols',
      'risk impact assessments',
      'log retention policies'
    ],
    stakeholders: ['Policy', 'Legal', 'Security']
  },
  {
    name: 'Justice & democratic processes',
    slug: 'justice-democracy',
    summary:
      'AI that assists courts or influences democratic participation.',
    evidence: [
      'transparency notices',
      'decision explainability artifacts',
      'audit trails for outcomes'
    ],
    stakeholders: ['Judicial Ops', 'Compliance', 'Public Affairs']
  }
];

const angles: Angle[] = pseoAngles;

type PseoPageInternal = PseoPage & { useCase: UseCase; angle: Angle };

function buildPages(): PseoPageInternal[] {
  const pages: PseoPageInternal[] = [];

  annexUseCases.forEach((useCase) => {
    angles.forEach((angle) => {
      const slug = `ai-act-compliance-for-${useCase.slug}-${angle.slug}`;
      const title = `EU AI Act compliance for ${useCase.name} | ${angle.name}`;
      const description = `Audit-ready AI Act compliance for ${useCase.name.toLowerCase()} teams. Focus on ${angle.focus} with evidence-led workflows.`;
      const heroTagline = `Confidently align ${useCase.name.toLowerCase()} systems with ${angle.focus}.`;
      const painPoints = [
        `${useCase.name} teams face ${angle.gap}.`,
        `Evidence lives across ${useCase.stakeholders.join(', ')}.`,
        `Audits stall when ${angle.focus} is undocumented.`
      ];
      const outcomes = [
        `${angle.outcome} for ${useCase.name.toLowerCase()}.`,
        `Mapped obligations with owners in ${useCase.stakeholders.join(', ')}.`,
        `Evidence ready for notified body reviews.`
      ];
      const obligations = highRiskObligations.map(
        (item) => `${item.title}: ${item.description}`
      );
      const faq = [
        {
          question: `Why is ${useCase.name.toLowerCase()} considered high risk?`,
          answer: useCase.summary
        },
        {
          question: `What evidence is most critical for ${angle.name.toLowerCase()}?`,
          answer: `Prioritize ${angle.evidence} and the ${useCase.evidence.join(', ')}.`
        },
        {
          question: 'How quickly can we prepare an audit pack?',
          answer:
            'Most teams can reach an audit-ready baseline in weeks once inventory, controls, and evidence are centralized.'
        }
      ];

      pages.push({
        slug,
        h1: `${useCase.name} compliance for the EU AI Act`,
        title,
        description,
        heroTagline,
        useCaseName: useCase.name,
        useCaseSlug: useCase.slug,
        useCaseSummary: useCase.summary,
        angleName: angle.name,
        angleSlug: angle.slug,
        painPoints,
        outcomes,
        obligations,
        faq,
        ctaLabel: 'Book readiness review',
        ctaHref: '/book',
        relatedSlugs: [],
        useCase,
        angle
      });
    });
  });

  const slugSet = new Set(pages.map((page) => page.slug));
  if (slugSet.size !== pages.length) {
    throw new Error('PSEO slug generation produced duplicates.');
  }

  return pages.map((page) => {
    const related = pages
      .filter((other) => other.slug !== page.slug)
      .filter(
        (other) =>
          other.useCase.name === page.useCase.name ||
          other.angle.name === page.angle.name
      )
      .slice(0, 8)
      .map((item) => item.slug);

    if (related.length < 6) {
      const fallback = pages
        .filter((other) => other.slug !== page.slug)
        .slice(0, 8 - related.length)
        .map((item) => item.slug);
      related.push(...fallback);
    }

    return {
      ...page,
      relatedSlugs: related,
      slug: page.slug
    };
  });
}

const pseoPages = buildPages();

export function getPseoPages(): PseoPage[] {
  return pseoPages;
}

export function getPseoPage(slug: string): PseoPage | undefined {
  return pseoPages.find((page) => page.slug === slug);
}

export function getPseoPagesByUseCase(useCaseName?: string): PseoPage[] {
  if (!useCaseName) {
    return pseoPages.slice(0, 6);
  }
  return pseoPages
    .filter((page) => page.useCase.name === useCaseName)
    .slice(0, 8);
}

export function getFeaturedPseoPages(count = 8): PseoPage[] {
  return pseoPages.slice(0, count);
}

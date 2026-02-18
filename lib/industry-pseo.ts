import { highRiskObligations } from '@/lib/compliance';
import { getPseoPagesByUseCase } from '@/lib/pseo';
import { getIndustries, pseoAngles, type Industry } from '@/lib/pseo-data';

export type IndustryPage = {
  slug: string;
  industrySlug: string;
  industryName: string;
  industrySummary: string;
  angleName: string;
  angleSlug: string;
  h1: string;
  title: string;
  description: string;
  heroTagline: string;
  painPoints: string[];
  outcomes: string[];
  obligations: string[];
  evidence: string[];
  faq: { question: string; answer: string }[];
  ctaLabel: string;
  ctaHref: string;
  relatedSlugs: string[];
  primaryUseCases: string[];
};

type Angle = typeof pseoAngles[number];

const industries: Industry[] = getIndustries();
const angles: Angle[] = pseoAngles;

type IndustryPageInternal = IndustryPage & { industry: Industry; angle: Angle };

function buildIndustryPages(): IndustryPageInternal[] {
  const pages: IndustryPageInternal[] = [];

  industries.forEach((industry) => {
    angles.forEach((angle) => {
      const slug = `ai-act-compliance-${industry.slug}-${angle.slug}`;
      const title = `EU AI Act compliance for ${industry.name} | ${angle.name}`;
      const description = `Compliance playbook for ${industry.name.toLowerCase()} teams focused on ${angle.focus}.`;
      const heroTagline = `Prepare ${industry.name.toLowerCase()} AI systems with ${angle.focus}.`;
      const painPoints = [
        `${industry.name} teams face ${angle.gap}.`,
        `Evidence spans ${industry.stakeholders.join(', ')}.`,
        `Audit readiness suffers without ${angle.focus}.`
      ];
      const outcomes = [
        `${angle.outcome} for ${industry.name.toLowerCase()} teams.`,
        `Obligations mapped with owners in ${industry.stakeholders.join(', ')}.`,
        `Audit packs ready for notified body review.`
      ];
      const obligations = highRiskObligations.map(
        (item) => `${item.title}: ${item.description}`
      );
      const faq = [
        {
          question: `Why does ${industry.name.toLowerCase()} fall under Annex III?`,
          answer: industry.summary
        },
        {
          question: `What evidence matters most for ${angle.name.toLowerCase()}?`,
          answer: `Prioritize ${industry.evidence.join(', ')} and map them to obligations.`
        },
        {
          question: 'How fast can we be audit-ready?',
          answer:
            'Most teams can build an audit-ready baseline in weeks with a centralized evidence vault.'
        }
      ];

      pages.push({
        slug,
        industrySlug: industry.slug,
        industryName: industry.name,
        industrySummary: industry.summary,
        angleName: angle.name,
        angleSlug: angle.slug,
        h1: `${industry.name} AI Act compliance`,
        title,
        description,
        heroTagline,
        painPoints,
        outcomes,
        obligations,
        evidence: industry.evidence,
        faq,
        ctaLabel: 'Book readiness review',
        ctaHref: '/book',
        relatedSlugs: [],
        primaryUseCases: industry.useCases,
        industry,
        angle
      });
    });
  });

  const sliced = pages.slice(0, 100);
  const slugSet = new Set(sliced.map((page) => page.slug));
  if (slugSet.size !== sliced.length) {
    throw new Error('Industry PSEO slug generation produced duplicates.');
  }

  return sliced.map((page) => {
    const related = sliced
      .filter((other) => other.slug !== page.slug)
      .filter(
        (other) =>
          other.industry.name === page.industry.name ||
          other.angle.name === page.angle.name
      )
      .slice(0, 8)
      .map((item) => item.slug);

    if (related.length < 6) {
      const fallback = sliced
        .filter((other) => other.slug !== page.slug)
        .slice(0, 8 - related.length)
        .map((item) => item.slug);
      related.push(...fallback);
    }

    return {
      ...page,
      relatedSlugs: related
    };
  });
}

const industryPages = buildIndustryPages();

export function getIndustryPages(): IndustryPage[] {
  return industryPages;
}

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return industryPages.find((page) => page.slug === slug);
}

export function getFeaturedIndustryPages(count = 6): IndustryPage[] {
  return industryPages.slice(0, count);
}

export function getRelatedUseCasePages(primaryUseCases: string[]) {
  const pages = primaryUseCases.flatMap((useCase) =>
    getPseoPagesByUseCase(useCase)
  );
  const unique = new Map(pages.map((page) => [page.slug, page]));
  return Array.from(unique.values()).slice(0, 6);
}

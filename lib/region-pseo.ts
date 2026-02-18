import { highRiskObligations } from '@/lib/compliance';
import { getIndustries, getCountries, pseoAngles } from '@/lib/pseo-data';

export type RegionPage = {
  id: string;
  country: string;
  countrySlug: string;
  industry: string;
  industrySlug: string;
  angle: string;
  angleSlug: string;
  path: string;
  title: string;
  description: string;
  heroTagline: string;
  painPoints: string[];
  outcomes: string[];
  obligations: string[];
  evidence: string[];
  keywords: string[];
  faq: { question: string; answer: string }[];
  ctaLabel: string;
  ctaHref: string;
  relatedPaths: string[];
};

const industries = getIndustries();
const countries = getCountries();
const angles = pseoAngles;

const buildPath = (countrySlug: string, industrySlug: string, angleSlug: string) =>
  `/regions/${countrySlug}/industries/${industrySlug}/${angleSlug}`;

function buildRegionPages(): RegionPage[] {
  const pages: RegionPage[] = [];
  const max = 100;
  const seen = new Set<string>();
  const totalCombos = countries.length * industries.length * angles.length;

  for (let idx = 0; pages.length < max && idx < totalCombos; idx += 1) {
    const country = countries[idx % countries.length];
    const industry =
      industries[Math.floor(idx / countries.length) % industries.length];
    const angle =
      angles[
        Math.floor(idx / (countries.length * industries.length)) % angles.length
      ];

    const id = `${country.slug}-${industry.slug}-${angle.slug}`;
    if (seen.has(id)) {
      continue;
    }
    seen.add(id);

    const title = `EU AI Act compliance in ${country.name} for ${industry.name} | ${angle.name}`;
    const description = `Country-specific AI Act readiness for ${industry.name.toLowerCase()} teams in ${country.name}, focused on ${angle.focus}.`;
    const heroTagline = `Align ${industry.name.toLowerCase()} AI systems in ${country.name} with ${angle.focus}.`;
    const painPoints = [
      `${industry.name} teams in ${country.name} face ${angle.gap}.`,
      `Evidence spans ${industry.stakeholders.join(', ')} across ${country.name}.`,
      `Audits stall when ${angle.focus} is undocumented.`
    ];
    const outcomes = [
      `${angle.outcome} for ${industry.name.toLowerCase()} teams in ${country.name}.`,
      `Obligations mapped with owners in ${industry.stakeholders.join(', ')}.`,
      `Audit packs ready for notified body review.`
    ];
    const obligations = highRiskObligations.map(
      (item) => `${item.title}: ${item.description}`
    );
    const faq = [
      {
        question: `Why is ${industry.name.toLowerCase()} regulated in ${country.name}?`,
        answer:
          'The EU AI Act applies across member states and treats these systems as high-risk when they impact fundamental rights.'
      },
      {
        question: `What evidence matters most for ${angle.name.toLowerCase()}?`,
        answer: `Prioritize ${industry.evidence.join(', ')} and map them to obligations.`
      },
      {
        question: 'How fast can we be audit-ready?',
        answer:
          'Most teams can build an audit-ready baseline in weeks with centralized evidence and clear owners.'
      }
    ];

    const keywords = [
      `EU AI Act compliance ${industry.name} ${country.name}`,
      `${industry.name} AI Act readiness ${country.name}`,
      `Annex III ${industry.name} compliance ${country.name}`,
      `${angle.name} for ${industry.name} AI systems in ${country.name}`,
      `AI Act audit prep ${industry.name} ${country.name}`
    ];

    pages.push({
      id,
      country: country.name,
      countrySlug: country.slug,
      industry: industry.name,
      industrySlug: industry.slug,
      angle: angle.name,
      angleSlug: angle.slug,
      path: buildPath(country.slug, industry.slug, angle.slug),
      title,
      description,
      heroTagline,
      painPoints,
      outcomes,
      obligations,
      evidence: industry.evidence,
      keywords,
      faq,
      ctaLabel: 'Book readiness review',
      ctaHref: '/book',
      relatedPaths: []
    });
  }

  const unique = new Set(pages.map((page) => page.id));
  if (unique.size !== pages.length) {
    throw new Error('Region page generation produced duplicates.');
  }

  return pages.map((page) => {
    const related = pages
      .filter((other) => other.id !== page.id)
      .filter(
        (other) =>
          other.countrySlug === page.countrySlug ||
          other.industrySlug === page.industrySlug
      )
      .slice(0, 6)
      .map((item) => item.path);

    if (related.length < 4) {
      const fallback = pages
        .filter((other) => other.id !== page.id)
        .slice(0, 6 - related.length)
        .map((item) => item.path);
      related.push(...fallback);
    }

    return {
      ...page,
      relatedPaths: related
    };
  });
}

const regionPages = buildRegionPages();

export function getRegionPages() {
  return regionPages;
}

export function getRegionPage(
  countrySlug: string,
  industrySlug: string,
  angleSlug: string
) {
  return regionPages.find(
    (page) =>
      page.countrySlug === countrySlug &&
      page.industrySlug === industrySlug &&
      page.angleSlug === angleSlug
  );
}

export function getRegionPagesByCountry(countrySlug: string) {
  return regionPages.filter((page) => page.countrySlug === countrySlug);
}

export function getRegionPagesByIndustry(industrySlug: string) {
  return regionPages.filter((page) => page.industrySlug === industrySlug);
}

export function getRegionCountries() {
  return getCountries();
}

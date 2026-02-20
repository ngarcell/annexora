import crypto from 'node:crypto';
import {
  getArtifacts,
  getHighIntentCountries as getCountryProfiles,
  getHighIntentIndustries as getIndustryProfiles,
  getIntents,
  getRoles,
  obligationHubs,
  type Artifact,
  type BuyerRole,
  type Intent,
  type ObligationHub,
  type RoleProfile
} from '@/lib/high-intent-data';
import type { Country, Industry } from '@/lib/pseo-data';

export const highIntentContentVersion = '2026-02-20';

const keyDates = {
  inForce: 'August 1, 2024',
  prohibitions: 'February 2, 2025',
  obligations: 'August 2, 2026',
  expanded: 'August 2, 2027'
};

const minBodyLength = 650;

type ContentBlocks = {
  enforcementBlock: string;
  riskBlock: string;
  roleBlock: string;
  executionBlock: string;
  commercialBlock: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type SharedFields = {
  id: string;
  cluster:
    | 'country-industry-intent-role'
    | 'country-artifact-role'
    | 'industry-artifact-role'
    | 'role-obligation-hub';
  path: string;
  slug: string;
  role: BuyerRole;
  roleName: string;
  title: string;
  description: string;
  h1: string;
  heroTagline: string;
  ctaLabel: string;
  ctaHref: string;
  parentPath: string;
  relatedPaths: string[];
  faq: FaqItem[];
  keywords: string[];
  blocks: ContentBlocks;
  bodyLength: number;
  blockHash: string;
  lastUpdated: string;
};

export type CountryIndustryIntentRolePage = SharedFields & {
  cluster: 'country-industry-intent-role';
  country: Country;
  industry: Industry;
  intent: Intent;
};

export type CountryArtifactRolePage = SharedFields & {
  cluster: 'country-artifact-role';
  country: Country;
  artifact: Artifact;
};

export type IndustryArtifactRolePage = SharedFields & {
  cluster: 'industry-artifact-role';
  industry: Industry;
  artifact: Artifact;
};

export type RoleObligationHubPage = SharedFields & {
  cluster: 'role-obligation-hub';
  topic: ObligationHub;
};

export type HighIntentPage =
  | CountryIndustryIntentRolePage
  | CountryArtifactRolePage
  | IndustryArtifactRolePage
  | RoleObligationHubPage;

function blockHash(blocks: ContentBlocks) {
  return crypto
    .createHash('sha256')
    .update(
      [
        blocks.enforcementBlock,
        blocks.riskBlock,
        blocks.roleBlock,
        blocks.executionBlock,
        blocks.commercialBlock
      ].join('\n')
    )
    .digest('hex');
}

function bodyLength(blocks: ContentBlocks) {
  return [
    blocks.enforcementBlock,
    blocks.riskBlock,
    blocks.roleBlock,
    blocks.executionBlock,
    blocks.commercialBlock
  ].join(' ').length;
}

function normalizeRole(role: RoleProfile) {
  return role.slug;
}

function countryAuthority(country: Country) {
  return {
    authorityName: country.authorityName || `${country.name} AI supervisory authority`,
    authorityUrl: country.authorityUrl || 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    languageNote: country.languageNote || `English documentation support for ${country.name} teams.`,
    enforcementNote:
      country.enforcementNote ||
      `${country.name} teams should maintain evidence packages for supervisory review and cross-border inquiries.`,
    marketSignal:
      country.marketSignal ||
      `${country.name} buyers are prioritizing operational AI governance before August 2, 2026.`
  };
}

function industryContext(industry: Industry) {
  return {
    highRiskScenarios:
      industry.highRiskScenarios && industry.highRiskScenarios.length
        ? industry.highRiskScenarios
        : [
            `${industry.name} systems impacting rights or service access`,
            `${industry.name} automated decision workflows`,
            `${industry.name} risk scoring and eligibility use cases`
          ],
    providerRiskPoints:
      industry.providerRiskPoints && industry.providerRiskPoints.length
        ? industry.providerRiskPoints
        : [
            'incomplete technical documentation',
            'untracked model updates',
            'missing robustness evidence'
          ],
    buyingCommittee:
      industry.buyingCommittee && industry.buyingCommittee.length
        ? industry.buyingCommittee
        : ['Compliance', 'Legal', 'Product']
  };
}

function buildCountryIndustryIntentRolePages(
  countries: Country[],
  industries: Industry[],
  intents: Intent[],
  roles: RoleProfile[]
): CountryIndustryIntentRolePage[] {
  const pages: CountryIndustryIntentRolePage[] = [];

  countries.forEach((country) => {
    const authority = countryAuthority(country);
    industries.forEach((industry) => {
      const context = industryContext(industry);
      intents.forEach((intent) => {
        roles.forEach((roleProfile) => {
          const role = normalizeRole(roleProfile);
          const path = `/eu-ai-act/${country.slug}/${industry.slug}/${intent.slug}/${role}`;
          const blocks: ContentBlocks = {
            enforcementBlock: `${country.name} enforcement context: ${authority.enforcementNote} Primary authority reference: ${authority.authorityName} (${authority.authorityUrl}). ${authority.languageNote}`,
            riskBlock: `${industry.name} risk context: ${industry.summary} High-risk scenarios include ${context.highRiskScenarios.join(', ')}. Evidence expectations include ${industry.evidence.join(', ')} across ${industry.stakeholders.join(', ')} teams.`,
            roleBlock: `${roleProfile.name} execution model: ${roleProfile.responsibilities.join(' ')} Priority duty reference: ${roleProfile.primaryArticle}.`,
            executionBlock: `${intent.name} execution focus: ${intent.executionFocus}. Buyer signal: ${intent.buyerSignal}. Milestones to align: AI Act in force ${keyDates.inForce}, prohibitions and literacy ${keyDates.prohibitions}, most obligations ${keyDates.obligations}, expanded rollout ${keyDates.expanded}.`,
            commercialBlock: `Commercial readiness in ${country.name}: ${authority.marketSignal} Annexora delivers a four-week paid pilot for deployer and provider teams to centralize controls, assign owners, and produce audit-ready evidence.`
          };

          const page: CountryIndustryIntentRolePage = {
            id: `ciir:${country.slug}:${industry.slug}:${intent.slug}:${role}`,
            cluster: 'country-industry-intent-role',
            path,
            slug: `${country.slug}-${industry.slug}-${intent.slug}-${role}`,
            role,
            roleName: roleProfile.name,
            country,
            industry,
            intent,
            title: `EU AI Act ${intent.name.toLowerCase()} for ${industry.name} in ${country.name} (${roleProfile.name})`,
            description: `${intent.name} guidance for ${roleProfile.name.toLowerCase()} teams in ${country.name} ${industry.name.toLowerCase()} with evidence mapped to August 2, 2026 obligations.`,
            h1: `${country.name} ${industry.name} ${intent.name} for ${roleProfile.name}s`,
            heroTagline: `Operationalize ${intent.name.toLowerCase()} for ${industry.name.toLowerCase()} in ${country.name}.`,
            ctaLabel: intent.ctaLabel,
            ctaHref: `/pilot?cluster=country-industry-intent-role&intent=${intent.slug}&role=${role}&country=${country.slug}&industry=${industry.slug}`,
            parentPath: `/eu-ai-act/${country.slug}`,
            relatedPaths: [],
            faq: [
              {
                question: `What changes on ${keyDates.obligations} for ${industry.name.toLowerCase()} teams in ${country.name}?`,
                answer:
                  'Most high-risk operational obligations apply and require evidence-backed workflows for controls, monitoring, and incident response.'
              },
              {
                question: `Why does ${roleProfile.name.toLowerCase()} context matter for ${intent.name.toLowerCase()}?`,
                answer: `${roleProfile.name} teams own different obligations, evidence boundaries, and authority interactions than other operators.`
              },
              {
                question: `How quickly can we produce an audit pack?`,
                answer:
                  'A focused four-week pilot is typically enough to baseline two high-risk systems and deliver a traceability-ready pack.'
              }
            ],
            keywords: [
              `EU AI Act ${intent.slug.replace(/-/g, ' ')} ${industry.name} ${country.name}`,
              `${roleProfile.name} ${industry.name} compliance ${country.name}`,
              `${industry.name} audit readiness ${country.name}`,
              `AI Act ${intent.slug.replace(/-/g, ' ')} ${country.name}`
            ],
            blocks,
            bodyLength: bodyLength(blocks),
            blockHash: blockHash(blocks),
            lastUpdated: highIntentContentVersion
          };

          pages.push(page);
        });
      });
    });
  });

  return pages;
}

function buildCountryArtifactRolePages(
  countries: Country[],
  artifacts: Artifact[],
  roles: RoleProfile[]
): CountryArtifactRolePage[] {
  const pages: CountryArtifactRolePage[] = [];

  countries.forEach((country) => {
    const authority = countryAuthority(country);
    roles.forEach((roleProfile) => {
      const role = normalizeRole(roleProfile);
      artifacts.forEach((artifact) => {
        const path = `/eu-ai-act/${country.slug}/artifacts/${artifact.slug}/${role}`;
        const blocks: ContentBlocks = {
          enforcementBlock: `${country.name} authority context: ${authority.authorityName}. ${authority.enforcementNote}`,
          riskBlock: `${artifact.name} outcomes: ${artifact.deliveryOutcome}. This artifact supports obligation proof for ${artifact.articleReference} and aligns with country-level supervisory expectations.`,
          roleBlock: `${roleProfile.name} role fit: ${roleProfile.responsibilities.join(' ')} This artifact streamlines ownership and evidence handoff.`,
          executionBlock: `Implementation sequence: define scope, assign owners, collect artifacts, and validate controls against ${artifact.articleReference}. Milestones: ${keyDates.prohibitions}, ${keyDates.obligations}, ${keyDates.expanded}.`,
          commercialBlock: `Commercial signal: ${authority.marketSignal} Teams use Annexora paid pilots to operationalize templates into audit-ready workflows.`
        };

        const page: CountryArtifactRolePage = {
          id: `car:${country.slug}:${artifact.slug}:${role}`,
          cluster: 'country-artifact-role',
          path,
          slug: `${country.slug}-${artifact.slug}-${role}`,
          role,
          roleName: roleProfile.name,
          country,
          artifact,
          title: `${artifact.name} for ${roleProfile.name.toLowerCase()} teams in ${country.name} | EU AI Act`,
          description: `${artifact.name} implementation guidance for ${roleProfile.name.toLowerCase()} teams in ${country.name}, aligned to ${artifact.articleReference}.`,
          h1: `${country.name} ${artifact.name} for ${roleProfile.name}s`,
          heroTagline: `Turn ${artifact.name.toLowerCase()} into operational evidence in ${country.name}.`,
          ctaLabel: artifact.ctaLabel,
          ctaHref: `/book?cluster=country-artifact-role&artifact=${artifact.slug}&role=${role}&country=${country.slug}`,
          parentPath: `/eu-ai-act/${country.slug}`,
          relatedPaths: [],
          faq: [
            {
              question: `Which EU AI Act requirement does this artifact support?`,
              answer: `This page is anchored to ${artifact.articleReference} with role-specific execution steps.`
            },
            {
              question: `Can one artifact cover multiple systems?`,
              answer:
                'Yes, when ownership, scope boundaries, and version controls are managed per system and release cycle.'
            },
            {
              question: `How is this different from a static template download?`,
              answer:
                'Annexora maps the artifact directly to controls, owners, and evidence approvals so it is audit-usable.'
            }
          ],
          keywords: [
            `${artifact.name} ${country.name}`,
            `${roleProfile.name} ${artifact.slug.replace(/-/g, ' ')} ${country.name}`,
            `${artifact.articleReference} template ${country.name}`,
            `EU AI Act artifact ${artifact.slug.replace(/-/g, ' ')}`
          ],
          blocks,
          bodyLength: bodyLength(blocks),
          blockHash: blockHash(blocks),
          lastUpdated: highIntentContentVersion
        };

        pages.push(page);
      });
    });
  });

  return pages;
}

function buildIndustryArtifactRolePages(
  industries: Industry[],
  artifacts: Artifact[],
  roles: RoleProfile[]
): IndustryArtifactRolePage[] {
  const pages: IndustryArtifactRolePage[] = [];

  industries.forEach((industry) => {
    const context = industryContext(industry);
    roles.forEach((roleProfile) => {
      const role = normalizeRole(roleProfile);
      artifacts.forEach((artifact) => {
        const path = `/eu-ai-act/industries/${industry.slug}/artifacts/${artifact.slug}/${role}`;

        const blocks: ContentBlocks = {
          enforcementBlock: `EU-wide enforcement context for ${industry.name}: obligations are applied consistently across member states with local supervisory execution.`,
          riskBlock: `${industry.name} evidence baseline: ${industry.summary} High-risk scenarios: ${context.highRiskScenarios.join(', ')}. Provider risk points: ${context.providerRiskPoints.join(', ')}.`,
          roleBlock: `${roleProfile.name} operational duties: ${roleProfile.responsibilities.join(' ')} Buying committee impact typically includes ${context.buyingCommittee.join(', ')}.`,
          executionBlock: `${artifact.name} execution in ${industry.name}: ${artifact.deliveryOutcome} mapped to ${artifact.articleReference} with release-safe ownership and review cadence.`,
          commercialBlock: `Commercial readiness: regulated ${industry.name.toLowerCase()} teams need operational evidence before ${keyDates.obligations}. Annexora converts artifact requirements into delivery plans.`
        };

        const page: IndustryArtifactRolePage = {
          id: `iar:${industry.slug}:${artifact.slug}:${role}`,
          cluster: 'industry-artifact-role',
          path,
          slug: `${industry.slug}-${artifact.slug}-${role}`,
          role,
          roleName: roleProfile.name,
          industry,
          artifact,
          title: `${industry.name} ${artifact.name} for ${roleProfile.name.toLowerCase()} teams | EU AI Act`,
          description: `${artifact.name} implementation framework for ${industry.name.toLowerCase()} ${roleProfile.name.toLowerCase()} teams under ${artifact.articleReference}.`,
          h1: `${industry.name} ${artifact.name} for ${roleProfile.name}s`,
          heroTagline: `Operationalize ${artifact.name.toLowerCase()} across ${industry.name.toLowerCase()} systems.`,
          ctaLabel: artifact.ctaLabel,
          ctaHref: `/book?cluster=industry-artifact-role&artifact=${artifact.slug}&role=${role}&industry=${industry.slug}`,
          parentPath: `/eu-ai-act/industries/${industry.slug}`,
          relatedPaths: [],
          faq: [
            {
              question: `Why is ${artifact.name.toLowerCase()} critical in ${industry.name.toLowerCase()}?`,
              answer:
                'Sector-specific operational risk makes evidence consistency and ownership visibility essential for audits.'
            },
            {
              question: `How should deployer and provider outputs differ?`,
              answer:
                'Deployers optimize operational controls; providers optimize technical documentation and lifecycle assurance.'
            },
            {
              question: `How fast can this be implemented?`,
              answer:
                'Most teams can stand up a first production-grade version in a four-week pilot with defined owners.'
            }
          ],
          keywords: [
            `${industry.name} ${artifact.name}`,
            `${industry.name} ${roleProfile.name} AI Act`,
            `${artifact.articleReference} ${industry.name}`,
            `EU AI Act ${industry.slug} artifact ${artifact.slug}`
          ],
          blocks,
          bodyLength: bodyLength(blocks),
          blockHash: blockHash(blocks),
          lastUpdated: highIntentContentVersion
        };

        pages.push(page);
      });
    });
  });

  return pages;
}

function buildRoleObligationHubPages(roles: RoleProfile[]): RoleObligationHubPage[] {
  const pages: RoleObligationHubPage[] = [];

  roles.forEach((roleProfile) => {
    const role = normalizeRole(roleProfile);

    obligationHubs.forEach((topic) => {
      const path = `/eu-ai-act/hubs/${role}/${topic.slug}`;
      const blocks: ContentBlocks = {
        enforcementBlock: `Authority-readiness context: this hub supports ${roleProfile.name.toLowerCase()} teams building evidence quality before supervisory review windows.`,
        riskBlock: `Topic scope: ${topic.summary} Proof set includes ${topic.proofPoints.join(', ')}.`,
        roleBlock: `${roleProfile.name} responsibilities: ${roleProfile.responsibilities.join(' ')} Priority baseline: ${roleProfile.primaryArticle}.`,
        executionBlock: `Execution cadence: map controls, assign owners, version evidence, and review before ${keyDates.obligations}. Continue lifecycle updates through ${keyDates.expanded}.`,
        commercialBlock: `Revenue intent signal: teams searching this topic usually need scoped implementation support, not generic guidance. Annexora converts this hub into a delivery plan.`
      };

      const page: RoleObligationHubPage = {
        id: `hub:${role}:${topic.slug}`,
        cluster: 'role-obligation-hub',
        path,
        slug: `${role}-${topic.slug}`,
        role,
        roleName: roleProfile.name,
        topic,
        title: `${topic.name} for ${roleProfile.name.toLowerCase()} teams | EU AI Act hub`,
        description: `${topic.name} implementation hub for ${roleProfile.name.toLowerCase()} teams, aligned to ${topic.articleReference}.`,
        h1: `${topic.name} for ${roleProfile.name}s`,
        heroTagline: `Operational hub for ${topic.name.toLowerCase()} with commercial-ready execution steps.`,
        ctaLabel: 'Book readiness review',
        ctaHref: `/book?cluster=role-obligation-hub&topic=${topic.slug}&role=${role}`,
        parentPath: `/eu-ai-act/hubs/${role}`,
        relatedPaths: [],
        faq: [
          {
            question: `Which article is this hub aligned to?`,
            answer: `This hub is mapped to ${topic.articleReference}.`
          },
          {
            question: `What should be implemented first?`,
            answer:
              'Start with accountable ownership and evidence structure before automation or tooling expansion.'
          },
          {
            question: `How do we prove execution quality?`,
            answer:
              'Maintain traceable controls, approvals, and measurable review cadence tied to each proof point.'
          }
        ],
        keywords: [
          `${topic.name} ${roleProfile.name} EU AI Act`,
          `${topic.articleReference} ${roleProfile.name}`,
          `AI Act ${topic.slug.replace(/-/g, ' ')}`
        ],
        blocks,
        bodyLength: bodyLength(blocks),
        blockHash: blockHash(blocks),
        lastUpdated: highIntentContentVersion
      };

      pages.push(page);
    });
  });

  return pages;
}

function buildRelatedPaths(
  ciirPages: CountryIndustryIntentRolePage[],
  carPages: CountryArtifactRolePage[],
  iarPages: IndustryArtifactRolePage[],
  hubPages: RoleObligationHubPage[]
) {
  ciirPages.forEach((page) => {
    const sameCountryIndustryRole = ciirPages
      .filter(
        (other) =>
          other.path !== page.path &&
          other.country.slug === page.country.slug &&
          other.industry.slug === page.industry.slug &&
          other.role === page.role
      )
      .map((item) => item.path);

    const sameCountryIntentRole = ciirPages
      .filter(
        (other) =>
          other.path !== page.path &&
          other.country.slug === page.country.slug &&
          other.intent.slug === page.intent.slug &&
          other.role === page.role
      )
      .map((item) => item.path);

    page.relatedPaths = Array.from(
      new Set([...sameCountryIndustryRole, ...sameCountryIntentRole])
    ).slice(0, 8);
  });

  carPages.forEach((page) => {
    const sameCountryRoleArtifacts = carPages
      .filter(
        (other) =>
          other.path !== page.path &&
          other.country.slug === page.country.slug &&
          other.role === page.role
      )
      .map((item) => item.path);

    const countryRoleIntentPages = ciirPages
      .filter(
        (other) =>
          other.country.slug === page.country.slug && other.role === page.role
      )
      .map((item) => item.path);

    page.relatedPaths = Array.from(
      new Set([...sameCountryRoleArtifacts, ...countryRoleIntentPages])
    ).slice(0, 8);
  });

  iarPages.forEach((page) => {
    const sameIndustryRoleArtifacts = iarPages
      .filter(
        (other) =>
          other.path !== page.path &&
          other.industry.slug === page.industry.slug &&
          other.role === page.role
      )
      .map((item) => item.path);

    const matchingIndustryIntentPages = ciirPages
      .filter(
        (other) =>
          other.industry.slug === page.industry.slug && other.role === page.role
      )
      .map((item) => item.path);

    page.relatedPaths = Array.from(
      new Set([...sameIndustryRoleArtifacts, ...matchingIndustryIntentPages])
    ).slice(0, 8);
  });

  hubPages.forEach((page) => {
    const sameRoleHubs = hubPages
      .filter(
        (other) => other.path !== page.path && other.role === page.role
      )
      .map((item) => item.path);

    page.relatedPaths = sameRoleHubs.slice(0, 8);
  });
}

function validatePageSet(allPages: HighIntentPage[]) {
  const slugSet = new Set<string>();
  const pathSet = new Set<string>();
  const titleSet = new Set<string>();
  const h1Set = new Set<string>();
  const descriptionSet = new Set<string>();
  const blockSet = new Set<string>();

  for (const page of allPages) {
    if (slugSet.has(page.slug)) {
      throw new Error(`Duplicate high-intent slug: ${page.slug}`);
    }
    slugSet.add(page.slug);

    if (pathSet.has(page.path)) {
      throw new Error(`Duplicate high-intent path: ${page.path}`);
    }
    pathSet.add(page.path);

    if (titleSet.has(page.title)) {
      throw new Error(`Duplicate high-intent title: ${page.title}`);
    }
    titleSet.add(page.title);

    if (h1Set.has(page.h1)) {
      throw new Error(`Duplicate high-intent H1: ${page.h1}`);
    }
    h1Set.add(page.h1);

    if (descriptionSet.has(page.description)) {
      throw new Error(`Duplicate high-intent description: ${page.description}`);
    }
    descriptionSet.add(page.description);

    if (blockSet.has(page.blockHash)) {
      throw new Error(`Duplicate high-intent content block hash: ${page.path}`);
    }
    blockSet.add(page.blockHash);

    if (page.bodyLength < minBodyLength) {
      throw new Error(
        `High-intent page body below minimum threshold (${minBodyLength}): ${page.path}`
      );
    }

    if (page.relatedPaths.length < 8) {
      throw new Error(`Insufficient related links for high-intent page: ${page.path}`);
    }
  }
}

function buildHighIntentPages() {
  const countries = getCountryProfiles();
  const industries = getIndustryProfiles();
  const intents = getIntents();
  const artifacts = getArtifacts();
  const roles = getRoles();

  const ciirPages = buildCountryIndustryIntentRolePages(
    countries,
    industries,
    intents,
    roles
  );
  const carPages = buildCountryArtifactRolePages(countries, artifacts, roles);
  const iarPages = buildIndustryArtifactRolePages(industries, artifacts, roles);
  const hubPages = buildRoleObligationHubPages(roles);

  buildRelatedPaths(ciirPages, carPages, iarPages, hubPages);

  const allPages: HighIntentPage[] = [
    ...ciirPages,
    ...carPages,
    ...iarPages,
    ...hubPages
  ];

  const expected = 3888;
  if (allPages.length !== expected) {
    throw new Error(`High-intent page count mismatch. Expected ${expected}, got ${allPages.length}.`);
  }

  validatePageSet(allPages);

  return {
    ciirPages,
    carPages,
    iarPages,
    hubPages,
    allPages
  };
}

const built = buildHighIntentPages();

export function getHighIntentPages() {
  return built.allPages;
}

export function getHighIntentTotals() {
  return {
    countryIndustryIntentRole: built.ciirPages.length,
    countryArtifactRole: built.carPages.length,
    industryArtifactRole: built.iarPages.length,
    roleObligationHub: built.hubPages.length,
    total: built.allPages.length
  };
}

export function getCountryIndustryIntentRolePages() {
  return built.ciirPages;
}

export function getCountryArtifactRolePages() {
  return built.carPages;
}

export function getIndustryArtifactRolePages() {
  return built.iarPages;
}

export function getRoleObligationHubPages() {
  return built.hubPages;
}

export function getCountryIndustryIntentRolePage(
  country: string,
  industry: string,
  intent: string,
  role: BuyerRole
) {
  return built.ciirPages.find(
    (page) =>
      page.country.slug === country &&
      page.industry.slug === industry &&
      page.intent.slug === intent &&
      page.role === role
  );
}

export function getCountryArtifactRolePage(
  country: string,
  artifact: string,
  role: BuyerRole
) {
  return built.carPages.find(
    (page) =>
      page.country.slug === country &&
      page.artifact.slug === artifact &&
      page.role === role
  );
}

export function getIndustryArtifactRolePage(
  industry: string,
  artifact: string,
  role: BuyerRole
) {
  return built.iarPages.find(
    (page) =>
      page.industry.slug === industry &&
      page.artifact.slug === artifact &&
      page.role === role
  );
}

export function getRoleObligationHubPage(role: BuyerRole, topic: string) {
  return built.hubPages.find(
    (page) => page.role === role && page.topic.slug === topic
  );
}

export function getHighIntentPagesByCountry(country: string) {
  return built.allPages.filter(
    (page) =>
      ('country' in page && page.country.slug === country) ||
      (page.cluster === 'country-industry-intent-role' && page.country.slug === country)
  );
}

export function getHighIntentPagesByIndustry(industry: string) {
  return built.allPages.filter(
    (page) =>
      ('industry' in page && page.industry.slug === industry) ||
      (page.cluster === 'country-industry-intent-role' && page.industry.slug === industry)
  );
}

export function getHighIntentHubPagesByRole(role: BuyerRole) {
  return built.hubPages.filter((page) => page.role === role);
}

export function getHighIntentCountry(country: string) {
  return getCountryProfiles().find((item) => item.slug === country);
}

export function getHighIntentIndustry(industry: string) {
  return getIndustryProfiles().find((item) => item.slug === industry);
}

export function getHighIntentRole(role: BuyerRole) {
  return getRoles().find((item) => item.slug === role);
}

export function getHighIntentIntent(intent: string) {
  return getIntents().find((item) => item.slug === intent);
}

export function getHighIntentArtifact(artifact: string) {
  return getArtifacts().find((item) => item.slug === artifact);
}

export function getHighIntentCountriesList() {
  return getCountryProfiles();
}

export function getHighIntentIndustriesList() {
  return getIndustryProfiles();
}

export function getHighIntentRoles() {
  return getRoles();
}

export function getCountryIndustryIntentRoleParams() {
  return built.ciirPages.map((page) => ({
    country: page.country.slug,
    industry: page.industry.slug,
    intent: page.intent.slug,
    role: page.role
  }));
}

export function getCountryArtifactRoleParams() {
  return built.carPages.map((page) => ({
    country: page.country.slug,
    artifact: page.artifact.slug,
    role: page.role
  }));
}

export function getIndustryArtifactRoleParams() {
  return built.iarPages.map((page) => ({
    industry: page.industry.slug,
    artifact: page.artifact.slug,
    role: page.role
  }));
}

export function getRoleObligationHubParams() {
  return built.hubPages.map((page) => ({
    role: page.role,
    topic: page.topic.slug
  }));
}

export function getCountryHubCounts() {
  const map = new Map<string, number>();
  built.ciirPages.forEach((page) => {
    map.set(page.country.slug, (map.get(page.country.slug) || 0) + 1);
  });
  built.carPages.forEach((page) => {
    map.set(page.country.slug, (map.get(page.country.slug) || 0) + 1);
  });
  return map;
}

export function getIndustryHubCounts() {
  const map = new Map<string, number>();
  built.ciirPages.forEach((page) => {
    map.set(page.industry.slug, (map.get(page.industry.slug) || 0) + 1);
  });
  built.iarPages.forEach((page) => {
    map.set(page.industry.slug, (map.get(page.industry.slug) || 0) + 1);
  });
  return map;
}

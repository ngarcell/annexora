import sitemap from '../app/sitemap';
import {
  getHighIntentPages,
  getHighIntentTotals
} from '../lib/high-intent-pseo';
import {
  INDEXABLE_URL_TARGET,
  PRIORITY_SOLUTION_PAGE_COUNT,
  getPrioritySolutionPaths
} from '../lib/indexing-policy';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertUnique(values: string[], label: string) {
  const set = new Set(values);
  assert(set.size === values.length, `Duplicate ${label} detected (${values.length - set.size} duplicates).`);
}

function run() {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  assert(
    entries.length === INDEXABLE_URL_TARGET,
    `Indexable sitemap URL count must be ${INDEXABLE_URL_TARGET}, received ${entries.length}.`
  );
  assertUnique(urls, 'sitemap URL');

  const highIntentTotals = getHighIntentTotals();
  assert(
    highIntentTotals.total === 3888,
    `High-intent page count must be 3888, received ${highIntentTotals.total}.`
  );

  const highIntentPages = getHighIntentPages();
  assertUnique(highIntentPages.map((page) => page.path), 'high-intent path');
  assertUnique(highIntentPages.map((page) => page.slug), 'high-intent slug');
  assertUnique(highIntentPages.map((page) => page.title), 'high-intent title');
  assertUnique(highIntentPages.map((page) => page.h1), 'high-intent H1');
  assertUnique(
    highIntentPages.map((page) => page.description),
    'high-intent description'
  );
  assertUnique(
    highIntentPages.map((page) => page.blockHash),
    'high-intent block hash'
  );

  const thinPages = highIntentPages.filter((page) => page.bodyLength < 650);
  assert(
    thinPages.length === 0,
    `Thin high-intent pages detected: ${thinPages.slice(0, 3).map((page) => page.path).join(', ')}`
  );

  const expectedPrioritySolutionUrls = new Set(
    getPrioritySolutionPaths().map((path) => path)
  );
  const indexedSolutionUrls = urls
    .map((url) => {
      try {
        const parsed = new URL(url);
        return parsed.pathname;
      } catch {
        return '';
      }
    })
    .filter((path) => path.startsWith('/solutions/'));

  assert(
    indexedSolutionUrls.length === PRIORITY_SOLUTION_PAGE_COUNT,
    `Indexed solution URL count must be ${PRIORITY_SOLUTION_PAGE_COUNT}, received ${indexedSolutionUrls.length}.`
  );

  indexedSolutionUrls.forEach((path) => {
    assert(
      expectedPrioritySolutionUrls.has(path),
      `Non-priority solution URL indexed: ${path}`
    );
  });

  console.log('Quality gate passed.');
  console.log(`- Indexable sitemap URLs: ${entries.length}`);
  console.log(`- High-intent pages validated: ${highIntentPages.length}`);
  console.log(`- Indexed priority solutions: ${indexedSolutionUrls.length}`);
}

try {
  run();
} catch (error) {
  console.error('Quality gate failed.');
  console.error((error as Error).message);
  process.exit(1);
}

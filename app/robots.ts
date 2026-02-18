import type { MetadataRoute } from 'next';
import { protocol, rootDomain } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `${protocol}://${rootDomain}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}

import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { protocol, rootDomain } from '@/lib/utils';
import { portfolioContent } from '@/lib/portfolio-content';
import './globals.css';

const headingFont = Bricolage_Grotesque({
  variable: '--font-heading',
  subsets: ['latin']
});

const bodyFont = Manrope({
  variable: '--font-body',
  subsets: ['latin']
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://annexora.com';
const siteDescription =
  'Audit-ready compliance for Annex III AI systems. Inventory, risk classification, obligation mapping, evidence vaults, and audit packs. Annexora is part of the Jaeger AI platform portfolio.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Annexora | EU AI Act Compliance OS',
  description: siteDescription,
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon.svg?v=2', type: 'image/svg+xml' }
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico?v=2'
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    siteName: 'Annexora',
    title: 'Annexora | EU AI Act Compliance OS',
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Annexora - EU AI Act Compliance OS'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annexora | EU AI Act Compliance OS',
    description: siteDescription,
    images: ['/twitter-image']
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#10263f'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const origin = `${protocol}://${rootDomain}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'Annexora',
        url: origin,
        description: siteDescription,
        parentOrganization: {
          '@type': 'Organization',
          name: portfolioContent.parentOrganizationName,
          url: `${origin}${portfolioContent.parentPageUrl}`
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'Annexora',
        url: origin,
        description: siteDescription,
        publisher: {
          '@id': `${origin}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

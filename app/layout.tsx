import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const headingFont = Bricolage_Grotesque({
  variable: '--font-heading',
  subsets: ['latin']
});

const bodyFont = Manrope({
  variable: '--font-body',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://annexora.com'
  ),
  title: 'Annexora | EU AI Act Compliance OS',
  description:
    'Audit-ready compliance for Annex III AI systems. Inventory, risk classification, obligation mapping, evidence vaults, and audit packs.',
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
    description:
      'Audit-ready compliance for Annex III AI systems. Inventory, risk classification, obligation mapping, evidence vaults, and audit packs.',
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
    description:
      'Audit-ready compliance for Annex III AI systems. Inventory, risk classification, obligation mapping, evidence vaults, and audit packs.',
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
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

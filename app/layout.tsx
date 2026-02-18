import type { Metadata } from 'next';
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
  title: 'ActaOS | EU AI Act Compliance OS',
  description:
    'Audit-ready compliance for Annex III AI systems. Inventory, risk classification, obligation mapping, evidence vaults, and audit packs.'
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

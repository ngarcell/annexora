import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Annexora',
    short_name: 'Annexora',
    description:
      'EU AI Act compliance workspace for Annex III deployers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f4ef',
    theme_color: '#10263f',
    icons: [
      {
        src: '/icon.svg?v=2',
        sizes: 'any',
        type: 'image/svg+xml'
      },
      {
        src: '/favicon.ico?v=2',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon'
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  };
}


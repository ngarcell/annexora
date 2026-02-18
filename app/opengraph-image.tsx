import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background:
            'radial-gradient(circle at 18% 22%, #f4e9cf 0%, #f6f4ef 38%, #e7edf5 100%)',
          color: '#10263f',
          display: 'flex',
          fontFamily: 'ui-sans-serif, system-ui',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px',
          width: '100%'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ alignItems: 'center', display: 'flex', gap: 18 }}>
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#10263f',
                borderRadius: 20,
                display: 'flex',
                height: 96,
                justifyContent: 'center',
                width: 96
              }}
            >
              <svg
                viewBox="0 0 48 48"
                width="56"
                height="56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 44L20.4 6H27.6L15.2 44H8Z" fill="#F6F4EF" />
                <path d="M20.7 44L33.1 6H40.3L27.9 44H20.7Z" fill="#EDB745" />
                <rect x="30.2" y="20.5" width="12" height="4.2" rx="2.1" fill="#F6F4EF" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  margin: 0
                }}
              >
                Annexora
              </p>
              <p
                style={{
                  color: '#3d5877',
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: 1.2,
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                EU AI Act Compliance OS
              </p>
            </div>
          </div>
          <p
            style={{
              color: '#1d3550',
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.2,
              margin: 0,
              maxWidth: 920
            }}
          >
            Audit-ready workflows for Annex III AI systems with risk
            classification, obligation mapping, and evidence vaults.
          </p>
        </div>
        <div
          style={{
            alignItems: 'center',
            alignSelf: 'flex-end',
            backgroundColor: '#10263f',
            borderRadius: 999,
            color: '#f6f4ef',
            display: 'flex',
            fontSize: 22,
            fontWeight: 600,
            padding: '12px 22px'
          }}
        >
          annexora.com
        </div>
      </div>
    ),
    size
  );
}

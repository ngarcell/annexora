import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const size = {
  width: 180,
  height: 180
};

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#10263f',
          border: '2px solid #1f3f63',
          borderRadius: 36,
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          position: 'relative',
          width: '100%'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 22,
            height: 122,
            background: '#f6f4ef',
            transform: 'translateX(-23px) rotate(18deg)',
            borderRadius: 10
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 22,
            height: 122,
            background: '#edb745',
            transform: 'translateX(7px) rotate(18deg)',
            borderRadius: 10
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 38,
            height: 14,
            borderRadius: 7,
            background: '#f6f4ef',
            transform: 'translate(30px, -14px)'
          }}
        />
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  );
}


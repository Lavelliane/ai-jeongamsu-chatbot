import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Jeonghamsu - Cyber Security Chatbot';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                'radial-gradient(circle at 25px 25px, #334155 2px, transparent 0)',
              backgroundSize: '50px 50px',
              opacity: 0.3,
            }}
          />

          {/* Gradient accent */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'linear-gradient(to right, #0ea5e9, #6366f1)',
              filter: 'blur(100px)',
              opacity: 0.5,
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 40,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                padding: 10,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* The Edge runtime has limited external image support */}
              {/* Using emoji as fallback since SVG might not load properly */}
              🛡️
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontSize: 72, fontWeight: 'bold' }}>Jeonghamsu</div>
              <div style={{ fontSize: 36, color: '#94a3b8' }}>
                Cyber Security Chatbot
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 40,
              padding: '12px 24px',
              background: 'linear-gradient(to right, #0ea5e9, #6366f1)',
              borderRadius: 16,
              fontSize: 36,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Chat with me now
          </div>

          {/* Footer text */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              fontSize: 24,
              color: '#94a3b8',
              zIndex: 1,
            }}
          >
            Department of Cyber Security | Kookmin University
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
    console.log(`Error generating OpenGraph image: ${e}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}

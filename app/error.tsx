'use client';

import { useEffect } from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main style={{
      backgroundColor: 'var(--bg-body)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px'
        }}>
          <AlertTriangle size={40} color="#ef4444" />
        </div>

        <h1 style={{
          fontSize: '2rem',
          color: 'var(--text-main)',
          marginBottom: '15px',
          fontFamily: 'var(--font-merriweather)'
        }}>
          Xatolik yuz berdi
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          marginBottom: '40px'
        }}>
          Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki bosh sahifaga qayting.
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: '#C5A059',
              color: '#001F3F',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <RefreshCw size={18} />
            Qayta urinish
          </button>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: '#001F3F',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            <Home size={18} />
            Bosh sahifa
          </Link>
        </div>

        {error.digest && (
          <p style={{
            marginTop: '40px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            opacity: 0.7
          }}>
            Xatolik kodi: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}

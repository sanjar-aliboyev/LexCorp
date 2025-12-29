'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
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
          fontSize: '8rem',
          fontWeight: 800,
          color: '#C5A059',
          lineHeight: 1,
          marginBottom: '20px',
          fontFamily: 'var(--font-merriweather)'
        }}>
          404
        </div>

        <h1 style={{
          fontSize: '2rem',
          color: 'var(--text-main)',
          marginBottom: '15px',
          fontFamily: 'var(--font-merriweather)'
        }}>
          Sahifa topilmadi
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          marginBottom: '40px'
        }}>
          Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
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

          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}
          >
            <ArrowLeft size={18} />
            Orqaga
          </button>
        </div>

        <div style={{
          marginTop: '60px',
          padding: '30px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
            <Search size={20} color="#C5A059" />
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Foydali havolalar</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Xizmatlar</Link>
            <Link href="/team" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Jamoa</Link>
            <Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Blog</Link>
            <Link href="/aloqa" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Aloqa</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Loading() {
  return (
    <main style={{
      backgroundColor: 'var(--bg-body)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--border-color)',
          borderTopColor: '#C5A059',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
        <p style={{
          marginTop: '20px',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem'
        }}>
          Yuklanmoqda...
        </p>
      </div>
    </main>
  );
}

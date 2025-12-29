export default function BlogLoading() {
  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      {/* Hero Skeleton */}
      <section style={{
        padding: '160px 5% 60px',
        backgroundColor: '#001F3F',
        textAlign: 'center'
      }}>
        <div style={{
          width: '300px',
          height: '40px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          margin: '0 auto 20px'
        }} />
        <div style={{
          width: '500px',
          maxWidth: '90%',
          height: '20px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          margin: '0 auto'
        }} />
      </section>

      {/* Articles Skeleton */}
      <section style={{ padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                height: '220px',
                backgroundColor: 'var(--bg-surface)',
                animation: 'pulse 1.5s infinite'
              }} />
              <div style={{ padding: '24px' }}>
                <div style={{
                  height: '16px',
                  width: '100px',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '4px',
                  marginBottom: '12px'
                }} />
                <div style={{
                  height: '24px',
                  width: '100%',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }} />
                <div style={{
                  height: '16px',
                  width: '80%',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

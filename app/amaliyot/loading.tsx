export default function AmaliyotLoading() {
  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      {/* Hero Skeleton */}
      <section style={{
        padding: '160px 5% 100px',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '400px',
            maxWidth: '90%',
            height: '50px',
            backgroundColor: 'var(--border-color)',
            borderRadius: '8px',
            margin: '0 auto 20px',
            animation: 'pulse 1.5s infinite'
          }} />
          <div style={{
            width: '600px',
            maxWidth: '90%',
            height: '20px',
            backgroundColor: 'var(--border-color)',
            borderRadius: '4px',
            margin: '0 auto 60px',
            animation: 'pulse 1.5s infinite'
          }} />

          {/* Map Skeleton */}
          <div style={{
            height: '450px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            marginBottom: '50px',
            animation: 'pulse 1.5s infinite'
          }} />

          {/* Clients Grid Skeleton */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                height: '120px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                animation: 'pulse 1.5s infinite'
              }} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

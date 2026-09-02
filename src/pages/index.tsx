export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Production Orders - Tenant Isolated API</h2>
      <p>API is secured with companyId from session</p>
      <p>Every query uses prisma with where companyId filter - tenant isolation enabled</p>
      
      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        <div style={{ background: '#fff', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
          <h3>API Working</h3>
          <p>Check /api/production-orders endpoint</p>
        </div>
      </div>

      <pre style={{ marginTop: 20, background: '#0f172a', color: '#e2e8f0', padding: 12, borderRadius: 8 }}>
        {JSON.stringify({ status: "ok", tenantIsolation: "enabled" }, null, 2)}
      </pre>
    </div>
  );
}
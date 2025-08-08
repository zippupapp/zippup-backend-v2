export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#1e40af',
          fontSize: '3rem',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          ⚡ ZippUp Backend API
        </h1>
        
        <p style={{
          color: '#64748b',
          fontSize: '1.2rem',
          marginBottom: '30px'
        }}>
          Your ZippUp Platform Backend is Live and Running!
        </p>
        
        <div style={{
          backgroundColor: '#dcfce7',
          border: '2px solid #16a34a',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '40px'
        }}>
          <h2 style={{
            color: '#16a34a',
            fontSize: '1.5rem',
            margin: '0'
          }}>
            🚀 API Status: LIVE
          </h2>
        </div>
        
        <div style={{
          textAlign: 'left',
          backgroundColor: '#f1f5f9',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <div style={{
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#334155',
            fontSize: '1.1rem'
          }}>
            Test Endpoints:
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✅</span>
            <code style={{
              backgroundColor: '#e2e8f0',
              padding: '4px 8px',
              borderRadius: '4px',
              marginLeft: '10px',
              fontFamily: 'monospace'
            }}>
              /api/health
            </code>
            <span style={{ marginLeft: '10px', color: '#64748b' }}>- Health Check</span>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✅</span>
            <code style={{
              backgroundColor: '#e2e8f0',
              padding: '4px 8px',
              borderRadius: '4px',
              marginLeft: '10px',
              fontFamily: 'monospace'
            }}>
              /api/services
            </code>
            <span style={{ marginLeft: '10px', color: '#64748b' }}>- Services List</span>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✅</span>
            <code style={{
              backgroundColor: '#e2e8f0',
              padding: '4px 8px',
              borderRadius: '4px',
              marginLeft: '10px',
              fontFamily: 'monospace'
            }}>
              /api/auth/register
            </code>
            <span style={{ marginLeft: '10px', color: '#64748b' }}>- User Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
}

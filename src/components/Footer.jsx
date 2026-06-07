export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center', padding: '4rem 2rem',
      borderTop: '1px solid #39ff1411',
      background: 'linear-gradient(0deg, #0a1a0a 0%, #050505 100%)'
    }}>
      <div style={{
        fontFamily: 'Orbitron', fontSize: '2rem',
        fontWeight: 900, marginBottom: '0.5rem'
      }}>
        G<span style={{ color: '#39ff14', textShadow: '0 0 20px #39ff14' }}>FITNESS</span>
      </div>
      <p style={{ color: '#222', fontSize: '0.8rem', fontFamily: 'Orbitron', letterSpacing: '2px' }}>
        TRAIN HARD. EAT RIGHT. REPEAT.
      </p>
      <p style={{ color: '#1a1a1a', fontSize: '0.75rem', marginTop: '1rem' }}>
        © 2026 GFitness. All rights reserved.
      </p>
    </footer>
  );
}
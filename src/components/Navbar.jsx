import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'BMI', id: 'bmi' },
    { name: 'Nutrition', id: 'nutrition' },
    { name: 'Home Workout', id: 'home-workout' },
    { name: 'Gym Split', id: 'gym-workout' },
    { name: 'Muscles', id: 'muscles' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 999,
        background: scrolled ? 'rgba(5,5,5,0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        padding: '1.2rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: scrolled ? '1px solid #39ff1422' : 'none',
        transition: 'all 0.4s'
      }}>
        <div style={{
          fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 900,
          color: '#fff', letterSpacing: '2px'
        }}>
          G<span style={{ color: '#39ff14' }}>FITNESS</span>
          <span style={{ fontSize: '1rem', marginLeft: '4px' }}>🐹</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          className="desktop-nav">
          {links.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              style={{
                background: 'none', border: 'none',
                color: '#666', fontSize: '0.75rem', fontFamily: 'Orbitron',
                letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s',
                padding: '0'
              }}
              onMouseEnter={e => e.target.style.color = '#39ff14'}
              onMouseLeave={e => e.target.style.color = '#666'}
            >{link.name}</button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', flexDirection: 'column', gap: '5px',
            padding: '4px'
          }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '24px', height: '2px', background: '#39ff14',
              transition: 'all 0.3s'
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0,
          background: 'rgba(5,5,5,0.98)', zIndex: 998,
          borderBottom: '1px solid #39ff1422',
          padding: '1rem'
        }}>
          {links.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              style={{
                display: 'block', width: '100%', padding: '1rem',
                background: 'none', border: 'none', color: '#fff',
                fontFamily: 'Orbitron', fontSize: '0.8rem',
                textAlign: 'left', cursor: 'pointer',
                borderBottom: '1px solid #1a1a1a',
                letterSpacing: '1px'
              }}
            >{link.name}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
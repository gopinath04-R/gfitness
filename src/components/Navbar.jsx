import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

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
        padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: scrolled ? '1px solid #39ff1422' : 'none',
        transition: 'all 0.4s'
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 900,
          color: '#fff', letterSpacing: '2px'
        }}>
          G<span style={{ color: '#39ff14' }}>FITNESS</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
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

          {/* User info */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#39ff1411', border: '1px solid #39ff1433',
                padding: '4px 12px', borderRadius: '20px'
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: '#39ff14', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#000',
                  fontFamily: 'Orbitron', fontSize: '0.7rem', fontWeight: 700
                }}>
                  {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
                <span style={{ color: '#39ff14', fontSize: '0.75rem', fontFamily: 'Orbitron' }}>
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button onClick={() => signOut(auth)} style={{
                background: '#ff444411', border: '1px solid #ff444433',
                color: '#ff4444', padding: '6px 14px',
                borderRadius: '8px', fontFamily: 'Orbitron',
                fontSize: '0.65rem', cursor: 'pointer',
                transition: 'all 0.3s', letterSpacing: '1px'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#ff444422'}
                onMouseLeave={e => e.currentTarget.style.background = '#ff444411'}
              >LOGOUT</button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', flexDirection: 'column', gap: '5px', padding: '4px'
          }}
          className="hamburger">
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '24px', height: '2px', background: '#39ff14', transition: 'all 0.3s' }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0,
          background: 'rgba(5,5,5,0.98)', zIndex: 998,
          borderBottom: '1px solid #39ff1422', padding: '1rem'
        }}>
          {links.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              style={{
                display: 'block', width: '100%', padding: '1rem',
                background: 'none', border: 'none', color: '#fff',
                fontFamily: 'Orbitron', fontSize: '0.8rem',
                textAlign: 'left', cursor: 'pointer',
                borderBottom: '1px solid #1a1a1a', letterSpacing: '1px'
              }}
            >{link.name}</button>
          ))}
          {user && (
            <button onClick={() => signOut(auth)} style={{
              display: 'block', width: '100%', padding: '1rem',
              background: 'none', border: 'none', color: '#ff4444',
              fontFamily: 'Orbitron', fontSize: '0.8rem',
              textAlign: 'left', cursor: 'pointer', letterSpacing: '1px'
            }}>LOGOUT</button>
          )}
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
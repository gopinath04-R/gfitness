import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
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
    { name: 'Timer', id: 'timer' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveLink(id);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .nav-link {
          background: none; border: none;
          color: #555; font-size: 0.72rem;
          font-family: 'Orbitron', monospace;
          letter-spacing: 1px; cursor: pointer;
          transition: all 0.3s; padding: 6px 0;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #39ff14;
          transition: width 0.3s;
        }
        .nav-link:hover { color: #39ff14; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #39ff14; }
        .nav-link.active::after { width: 100%; }
        .logout-btn:hover {
          background: #ff444433 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px #ff444433 !important;
        }
        .mobile-link:hover { color: #39ff14 !important; background: #39ff1408 !important; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 999,
        background: scrolled ? 'rgba(5,5,5,0.97)' : 'rgba(5,5,5,0.5)',
        backdropFilter: 'blur(20px)',
        padding: '0 2rem',
        height: '64px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${scrolled ? '#39ff1422' : 'transparent'}`,
        transition: 'all 0.4s',
        animation: 'slideDown 0.6s ease'
      }}>

        {/* Logo */}
        <div style={{
          fontFamily: 'Orbitron', fontSize: '1.3rem', fontWeight: 900,
          color: '#fff', letterSpacing: '3px', cursor: 'pointer',
          flexShrink: 0
        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          G<span style={{
            color: '#39ff14',
            textShadow: '0 0 20px #39ff1488'
          }}>FITNESS</span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{
          display: 'flex', gap: '1.8rem',
          alignItems: 'center', flex: 1,
          justifyContent: 'center'
        }}>
          {links.map(link => (
            <button key={link.id}
              className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >{link.name}</button>
          ))}
        </div>

        {/* User section */}
        <div className="desktop-nav" style={{
          display: 'flex', alignItems: 'center',
          gap: '0.8rem', flexShrink: 0
        }}>
          {user && (
            <>
              {/* Avatar + name */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#39ff1408',
                border: '1px solid #39ff1422',
                padding: '5px 12px 5px 5px',
                borderRadius: '30px'
              }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #39ff14, #00ff88)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#000', fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 900
                  }}>
                    {(user.displayName || user.email)[0].toUpperCase()}
                  </div>
                )}
                <span style={{
                  color: '#fff', fontSize: '0.75rem',
                  fontFamily: 'Orbitron', letterSpacing: '0.5px',
                  maxWidth: '100px', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                }}>
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>

              {/* Logout */}
              <button className="logout-btn" onClick={handleLogout} style={{
                background: '#ff444411',
                border: '1px solid #ff444433',
                color: '#ff4444', padding: '6px 14px',
                borderRadius: '8px', fontFamily: 'Orbitron',
                fontSize: '0.62rem', cursor: 'pointer',
                transition: 'all 0.3s', letterSpacing: '1px'
              }}>LOGOUT</button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', flexDirection: 'column',
            gap: '5px', padding: '4px'
          }}>
          <div style={{
            width: '24px', height: '2px', background: '#39ff14',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}/>
          <div style={{
            width: '24px', height: '2px', background: '#39ff14',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1
          }}/>
          <div style={{
            width: '24px', height: '2px', background: '#39ff14',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}/>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(5,5,5,0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 998,
          borderBottom: '1px solid #39ff1422',
          padding: '1rem 0',
          animation: 'slideDown 0.3s ease'
        }}>
          {/* User info mobile */}
          {user && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '0.8rem 1.5rem',
              borderBottom: '1px solid #1a1a1a',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #39ff14, #00ff88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontFamily: 'Orbitron', fontSize: '0.8rem', fontWeight: 900
              }}>
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>
              <div>
                <div style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '0.8rem' }}>
                  {user.displayName || user.email.split('@')[0]}
                </div>
                <div style={{ color: '#444', fontSize: '0.7rem' }}>{user.email}</div>
              </div>
            </div>
          )}

          {links.map(link => (
            <button key={link.id}
              className="mobile-link"
              onClick={() => scrollTo(link.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '0.9rem 1.5rem',
                background: 'none', border: 'none', color: '#888',
                fontFamily: 'Orbitron', fontSize: '0.78rem',
                textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.2s', letterSpacing: '1px',
                borderBottom: '1px solid #0f0f0f'
              }}>
              <div style={{
                width: '6px', height: '6px',
                background: '#39ff14', borderRadius: '50%',
                flexShrink: 0
              }}/>
              {link.name}
            </button>
          ))}

          {user && (
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', padding: '0.9rem 1.5rem',
              background: 'none', border: 'none', color: '#ff4444',
              fontFamily: 'Orbitron', fontSize: '0.78rem',
              textAlign: 'left', cursor: 'pointer',
              transition: 'all 0.2s', letterSpacing: '1px',
              marginTop: '0.5rem'
            }}>
              <div style={{ width: '6px', height: '6px', background: '#ff4444', borderRadius: '50%' }}/>
              LOGOUT
            </button>
          )}
        </div>
      )}
    </>
  );
}
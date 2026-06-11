import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

const MESSAGES = [
  'Built for people who show up.',
  'Track it. Train it. Own it.',
  'Every rep counts.',
  'Consistency beats intensity.',
  'Your body. Your data.',
];

export default function Hero() {
  const { user } = useAuth();
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const name = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || '';

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.08); opacity: 1; }
        }
        @keyframes hamsterFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msgOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes lineScan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        .cta-primary:hover {
          background: #fff !important;
          color: #000 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 40px rgba(255,255,255,0.15) !important;
        }
        .cta-secondary:hover {
          border-color: rgba(255,255,255,0.4) !important;
          color: #fff !important;
          transform: translateY(-2px) !important;
        }
        .stat-card:hover {
          border-color: rgba(255,255,255,0.12) !important;
          background: rgba(255,255,255,0.04) !important;
        }
        .feature-pill:hover {
          border-color: rgba(255,255,255,0.2) !important;
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>

      {/* Ambient glow follows mouse */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 300, top: mousePos.y - 300,
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(57,255,20,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
        transition: 'left 0.4s ease, top 0.4s ease'
      }}/>

      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(6rem, 10vw, 8rem) 2rem 4rem',
        background: '#080808',
        position: 'relative', overflow: 'hidden'
      }}>

        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}/>

        {/* Horizontal scan line */}
        <div style={{
          position: 'absolute', top: '40%', left: 0,
          width: '200px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.3), transparent)',
          animation: 'lineScan 6s linear infinite',
          pointerEvents: 'none'
        }}/>

        {/* Radial glow center */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(57,255,20,0.04) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}/>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px', width: '100%' }}>

          {/* Greeting badge */}
          {name && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '6px 16px', borderRadius: '30px',
              marginBottom: '2.5rem',
              animation: 'fadeUp 0.6s ease both'
            }}>
              <div style={{ width: '6px', height: '6px', background: '#39ff14', borderRadius: '50%', animation: 'breathe 2s infinite' }}/>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '2px' }}>
                WELCOME BACK, {name.toUpperCase()}
              </span>
            </div>
          )}

          {/* Hamster mascot - small, tasteful */}
          <div style={{
            marginBottom: '2rem',
            animation: 'hamsterFloat 4s ease-in-out infinite',
            display: 'inline-block'
          }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', margin: '0 auto' }}>
              {/* Ring */}
              <div style={{
                position: 'absolute', inset: '-4px',
                border: '1px solid rgba(57,255,20,0.2)',
                borderRadius: '50%'
              }}/>
              <div style={{
                position: 'absolute', inset: '-8px',
                border: '1px solid rgba(57,255,20,0.08)',
                borderRadius: '50%'
              }}/>
              {/* Face */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(145deg, #e8a870, #c47a4a)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 0 20px rgba(57,255,20,0.15)'
              }}>
                {/* Cheeks */}
                <div style={{ position:'absolute', top:'32px', left:'-4px', width:'20px', height:'14px', background:'#f0a090', borderRadius:'50%', opacity:0.6 }}/>
                <div style={{ position:'absolute', top:'32px', right:'-4px', width:'20px', height:'14px', background:'#f0a090', borderRadius:'50%', opacity:0.6 }}/>
                {/* Eyes */}
                <div style={{ position:'absolute', top:'18px', left:'14px', width:'10px', height:'10px', background:'#1a1a1a', borderRadius:'50%' }}>
                  <div style={{ width:'3px', height:'3px', background:'#fff', borderRadius:'50%', margin:'2px' }}/>
                </div>
                <div style={{ position:'absolute', top:'18px', right:'14px', width:'10px', height:'10px', background:'#1a1a1a', borderRadius:'50%' }}>
                  <div style={{ width:'3px', height:'3px', background:'#fff', borderRadius:'50%', margin:'2px' }}/>
                </div>
                {/* Nose */}
                <div style={{ position:'absolute', top:'30px', left:'27px', width:'8px', height:'6px', background:'#ff8fa3', borderRadius:'50%' }}/>
                {/* Headband */}
                <div style={{ position:'absolute', top:'8px', left:0, right:0, height:'4px', background:'#39ff14', opacity:0.8 }}/>
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: 'Orbitron', fontWeight: 900,
            fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            lineHeight: 0.9, letterSpacing: '-3px',
            marginBottom: '1.5rem',
            animation: 'fadeUp 0.7s 0.1s ease both'
          }}>
            <span style={{ display: 'block', color: '#fff' }}>G</span>
            <span style={{
              display: 'block',
              color: '#39ff14',
              textShadow: '0 0 80px rgba(57,255,20,0.3)',
              position: 'relative'
            }}>
              FITNESS
              {/* Underline */}
              <span style={{
                position: 'absolute', bottom: '-4px', left: 0,
                height: '2px', background: 'linear-gradient(90deg, #39ff14, transparent)',
                animation: 'slideRight 1.2s 0.8s ease both',
                width: '0'
              }}/>
            </span>
          </h1>

          {/* Rotating message */}
          <div style={{
            height: '28px', marginBottom: '2.5rem', overflow: 'hidden',
            animation: 'fadeUp 0.7s 0.2s ease both'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
              fontFamily: 'Inter', letterSpacing: '0.5px',
              animation: visible ? 'msgIn 0.4s ease both' : 'msgOut 0.4s ease both'
            }}>{MESSAGES[msgIdx]}</p>
          </div>

          {/* Feature pills */}
          <div style={{
            display: 'flex', gap: '0.6rem', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: '3rem',
            animation: 'fadeUp 0.7s 0.3s ease both'
          }}>
            {['BMI Calculator', 'Nutrition Plan', 'Home Workout', 'Gym Split', 'Workout Timer', 'Muscle Guide'].map(f => (
              <div key={f} className="feature-pill" style={{
                padding: '5px 14px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '30px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.7rem', fontFamily: 'Orbitron',
                letterSpacing: '0.5px',
                transition: 'all 0.2s', cursor: 'default'
              }}>{f}</div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: '4rem',
            animation: 'fadeUp 0.7s 0.4s ease both'
          }}>
            <button className="cta-primary"
              onClick={() => document.getElementById('bmi')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '0.9rem 2.4rem',
                background: '#39ff14',
                border: 'none', borderRadius: '6px',
                color: '#000', fontFamily: 'Orbitron',
                fontSize: '0.78rem', fontWeight: 900,
                letterSpacing: '2px', cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 0 30px rgba(57,255,20,0.2)'
              }}>
              START TRAINING
            </button>
            <button className="cta-secondary"
              onClick={() => document.getElementById('home-workout')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '0.9rem 2.4rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'Orbitron', fontSize: '0.78rem',
                fontWeight: 700, letterSpacing: '2px',
                cursor: 'pointer', transition: 'all 0.25s'
              }}>
              VIEW WORKOUTS
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px', overflow: 'hidden',
            maxWidth: '480px', margin: '0 auto',
            animation: 'fadeUp 0.7s 0.5s ease both'
          }}>
            {[
              { val: '100%', label: 'Free Forever' },
              { val: '6+', label: 'Tools Included' },
              { val: '∞', label: 'No Limits' },
            ].map((s, i) => (
              <div key={s.label} className="stat-card" style={{
                padding: '1.2rem 1rem',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}>
                <div style={{
                  color: '#fff', fontFamily: 'Orbitron',
                  fontSize: '1.4rem', fontWeight: 900,
                  marginBottom: '4px'
                }}>{s.val}</div>
                <div style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.6rem', fontFamily: 'Orbitron',
                  letterSpacing: '1px'
                }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '6px', zIndex: 2,
          animation: 'fadeIn 1s 1s ease both'
        }}>
          <div style={{
            width: '20px', height: '32px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: '4px', left: '50%',
              transform: 'translateX(-50%)',
              width: '3px', height: '6px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '3px',
              animation: 'hamsterFloat 1.5s ease-in-out infinite'
            }}/>
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.15)',
            fontFamily: 'Orbitron', fontSize: '0.5rem', letterSpacing: '2px'
          }}>SCROLL</div>
        </div>
      </section>
    </>
  );
}
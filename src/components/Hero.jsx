import React, { useEffect, useState } from 'react';

function RunningHamster() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % 4), 140);
    return () => clearInterval(t);
  }, []);

  const legs = [
    { fl: -35, fr: 35, bl: 35, br: -35 },
    { fl: -10, fr: 10, bl: 10, br: -10 },
    { fl: 35, fr: -35, bl: -35, br: 35 },
    { fl: 10, fr: -10, bl: -10, br: 10 },
  ];
  const l = legs[frame];
  const bounce = frame % 2 === 0 ? -3 : 3;

  return (
    <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto' }}>
      {/* Outer ring */}
      <div style={{
        position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px',
        border: '2px solid #39ff1422', borderRadius: '50%',
        animation: 'spinSlow 8s linear infinite'
      }}/>
      {/* Wheel */}
      <div style={{
        position: 'absolute', bottom: '0', left: '50%',
        transform: 'translateX(-50%)',
        width: '160px', height: '160px',
        border: '5px solid #39ff14',
        borderRadius: '50%',
        boxShadow: '0 0 30px #39ff1466, 0 0 60px #39ff1422, inset 0 0 30px #39ff1411',
        animation: 'spin 0.7s linear infinite'
      }}>
        {[0, 45, 90, 135].map(deg => (
          <div key={deg} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '100%', height: '2px',
            background: 'linear-gradient(90deg, transparent, #39ff1444, transparent)',
            transform: `translate(-50%, -50%) rotate(${deg}deg)`,
          }}/>
        ))}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '18px', height: '18px',
          background: '#39ff14', borderRadius: '50%',
          boxShadow: '0 0 15px #39ff14, 0 0 30px #39ff14'
        }}/>
      </div>

      {/* Hamster */}
      <div style={{
        position: 'absolute', bottom: '55px', left: '50%',
        transform: `translateX(-50%) translateY(${bounce}px)`,
        transition: 'transform 0.1s', width: '110px', height: '100px'
      }}>
        {/* Body */}
        <div style={{
          position: 'absolute', bottom: 0, left: '5px',
          width: '100px', height: '75px',
          background: 'linear-gradient(135deg, #e8a870, #c47a4a)',
          borderRadius: '50px 50px 35px 35px',
          boxShadow: '0 0 20px #d4956a33'
        }}/>
        {/* Belly */}
        <div style={{
          position: 'absolute', bottom: '10px', left: '22px',
          width: '62px', height: '48px',
          background: '#f5deb3', borderRadius: '50%'
        }}/>
        {/* Head */}
        <div style={{
          position: 'absolute', top: '0', left: '15px',
          width: '82px', height: '76px',
          background: 'linear-gradient(135deg, #e8a870, #c47a4a)',
          borderRadius: '50%',
          boxShadow: '0 0 15px #d4956a22'
        }}/>
        {/* Cheeks */}
        <div style={{ position: 'absolute', top: '32px', left: '6px', width: '26px', height: '20px', background: '#e8a882', borderRadius: '50%', opacity: 0.8 }}/>
        <div style={{ position: 'absolute', top: '32px', right: '10px', width: '26px', height: '20px', background: '#e8a882', borderRadius: '50%', opacity: 0.8 }}/>
        {/* Ears */}
        <div style={{ position: 'absolute', top: '-14px', left: '18px', width: '26px', height: '26px', background: '#c47a4a', borderRadius: '50%' }}>
          <div style={{ width: '14px', height: '14px', background: '#ffb6c1', borderRadius: '50%', margin: '6px' }}/>
        </div>
        <div style={{ position: 'absolute', top: '-14px', right: '16px', width: '26px', height: '26px', background: '#c47a4a', borderRadius: '50%' }}>
          <div style={{ width: '14px', height: '14px', background: '#ffb6c1', borderRadius: '50%', margin: '6px' }}/>
        </div>
        {/* Eyes */}
        <div style={{ position: 'absolute', top: '16px', left: '28px', width: '15px', height: '15px', background: '#111', borderRadius: '50%', boxShadow: '0 0 10px #39ff14' }}>
          <div style={{ width: '5px', height: '5px', background: '#fff', borderRadius: '50%', margin: '2px' }}/>
        </div>
        <div style={{ position: 'absolute', top: '16px', right: '22px', width: '15px', height: '15px', background: '#111', borderRadius: '50%', boxShadow: '0 0 10px #39ff14' }}>
          <div style={{ width: '5px', height: '5px', background: '#fff', borderRadius: '50%', margin: '2px' }}/>
        </div>
        {/* Nose */}
        <div style={{ position: 'absolute', top: '36px', left: '52px', width: '9px', height: '7px', background: '#ff8fa3', borderRadius: '50%' }}/>
        {/* Sweat */}
        <div style={{
          position: 'absolute', top: '5px', right: '8px',
          width: '8px', height: '13px',
          background: 'linear-gradient(180deg, #00d4ff, #0099cc)',
          borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
          opacity: frame % 2 === 0 ? 1 : 0.2,
          transition: 'opacity 0.14s'
        }}/>
        {/* Headband */}
        <div style={{
          position: 'absolute', top: '8px', left: '15px', right: '16px',
          height: '6px', background: '#ff4444',
          borderRadius: '10px', opacity: 0.9
        }}/>
        {/* Legs */}
        {[
          { bottom: '-10px', left: '14px', angle: l.fl },
          { bottom: '-10px', left: '34px', angle: l.fr },
          { bottom: '-10px', right: '20px', angle: l.bl },
          { bottom: '-10px', right: '6px', angle: l.br },
        ].map((leg, i) => (
          <div key={i} style={{
            position: 'absolute', ...leg,
            width: '15px', height: '27px',
            background: i < 2 ? '#c47a4a' : '#b8692a',
            borderRadius: '8px',
            transform: `rotate(${leg.angle}deg)`,
            transformOrigin: 'top center',
            transition: 'transform 0.1s'
          }}/>
        ))}
        {/* Tail */}
        <div style={{ position: 'absolute', bottom: '22px', right: '-12px', width: '18px', height: '14px', background: '#c47a4a', borderRadius: '50%' }}/>
        {/* Dumbbell */}
        <div style={{
          position: 'absolute', top: '40px', left: '-22px',
          width: '30px', height: '10px',
          transform: frame % 2 === 0 ? 'rotate(-20deg)' : 'rotate(10deg)',
          transition: 'transform 0.14s'
        }}>
          <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', background: '#888', borderRadius: '2px' }}/>
          <div style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '4px', background: '#666', borderRadius: '2px' }}/>
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', background: '#888', borderRadius: '2px' }}/>
        </div>
      </div>

      {/* Ground glow */}
      <div style={{
        position: 'absolute', bottom: '-6px', left: '50%',
        transform: 'translateX(-50%)',
        width: '180px', height: '8px',
        background: 'radial-gradient(ellipse, #39ff1488 0%, transparent 70%)',
        filter: 'blur(4px)'
      }}/>
    </div>
  );
}

// Floating particle
function Particle({ x, y, size, duration, delay, color }) {
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, bottom: `${y}%`,
      width: `${size}px`, height: `${size}px`,
      background: color, borderRadius: '50%',
      boxShadow: `0 0 ${size * 2}px ${color}`,
      animation: `floatUp ${duration}s ${delay}s infinite linear`,
      opacity: 0, pointerEvents: 'none'
    }}/>
  );
}

// Star particle
function Star({ x, y, size, delay }) {
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: `${size}px`, height: `${size}px`,
      background: '#fff', borderRadius: '50%',
      animation: `twinkle ${2 + Math.random() * 3}s ${delay}s infinite`,
      opacity: 0, pointerEvents: 'none'
    }}/>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [msgIdx, setMsgIdx] = useState(0);
  const [btnHover, setBtnHover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);
  const [ripples, setRipples] = useState([]);

  const msgs = ['KEEP PUSHING!', 'NO DAYS OFF!', "LET'S GO!", 'STAY HARD!', 'GRIND TIME!', 'BEAST MODE!'];

  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => (i + 1) % msgs.length), 1800);
    return () => clearInterval(t);
  }, [msgs.length]);

  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const move = (e) => {
      if (cursor) { cursor.style.left = e.clientX - 10 + 'px'; cursor.style.top = e.clientY - 10 + 'px'; }
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleBtnClick = (e, scrollId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
    document.getElementById(scrollId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Particles data
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 30,
    size: Math.random() * 3 + 1,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    color: i % 3 === 0 ? '#39ff14' : i % 3 === 1 ? '#00d4ff' : '#ffffff44'
  }));

  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4
  }));

  return (
    <>
      <div className="cursor"/>
      <style>{`
        @keyframes spin { from{transform:translateX(-50%) rotate(0deg)} to{transform:translateX(-50%) rotate(360deg)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatUp {
          0%{transform:translateY(0) scale(1);opacity:0}
          10%{opacity:1}
          90%{opacity:0.6}
          100%{transform:translateY(-100vh) scale(0.3);opacity:0}
        }
        @keyframes twinkle {
          0%,100%{opacity:0;transform:scale(0.5)}
          50%{opacity:0.8;transform:scale(1)}
        }
        @keyframes glitchText {
          0%,90%,100%{transform:translate(0)}
          92%{transform:translate(-3px,1px)}
          94%{transform:translate(3px,-1px)}
          96%{transform:translate(-1px,2px)}
          98%{transform:translate(2px,-1px)}
        }
        @keyframes pulseGlow {
          0%,100%{box-shadow:0 0 20px #39ff1444, 0 0 40px #39ff1422}
          50%{box-shadow:0 0 40px #39ff1488, 0 0 80px #39ff1444}
        }
        @keyframes ripple {
          0%{transform:scale(0);opacity:1}
          100%{transform:scale(4);opacity:0}
        }
        @keyframes scanMove {
          0%{transform:translateY(-100%)}
          100%{transform:translateY(100vh)}
        }
        @keyframes borderFlow {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes float {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }
        @keyframes msgFade {
          0%{opacity:0;transform:translateY(5px)}
          20%,80%{opacity:1;transform:translateY(0)}
          100%{opacity:0;transform:translateY(-5px)}
        }
      `}</style>

      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem', paddingTop: '100px',
        background: 'radial-gradient(ellipse at 20% 80%, #0a1a0a 0%, #050505 50%, #000510 100%)',
        position: 'relative', overflow: 'hidden'
      }}>

        {/* Stars */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars.map((s, i) => <Star key={i} {...s} />)}
        </div>

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(#39ff1406 1px, transparent 1px), linear-gradient(90deg, #39ff1406 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }}/>

        {/* Scanline */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.04) 50%)',
          backgroundSize: '100% 4px', zIndex: 1
        }}/>

        {/* Moving scan */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, #39ff1444, transparent)',
          animation: 'scanMove 4s linear infinite',
          pointerEvents: 'none', zIndex: 2
        }}/>

        {/* Particles */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {particles.map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* Mouse glow */}
        <div style={{
          position: 'fixed',
          left: mousePos.x - 200, top: mousePos.y - 200,
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, #39ff1406 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          transition: 'left 0.15s, top 0.15s'
        }}/>

        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: '80px', left: '20px', width: '60px', height: '60px', border: '1px solid #39ff1422', borderRight: 'none', borderBottom: 'none', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', top: '80px', right: '20px', width: '60px', height: '60px', border: '1px solid #39ff1422', borderLeft: 'none', borderBottom: 'none', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '60px', height: '60px', border: '1px solid #39ff1422', borderRight: 'none', borderTop: 'none', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '60px', height: '60px', border: '1px solid #39ff1422', borderLeft: 'none', borderTop: 'none', pointerEvents: 'none' }}/>

        {/* Speech bubble */}
        <div style={{
          position: 'relative', zIndex: 2,
          background: 'linear-gradient(135deg, #39ff14, #00ff88)',
          color: '#000', padding: '8px 28px', borderRadius: '30px',
          fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 900,
          letterSpacing: '2px', marginBottom: '1.5rem',
          boxShadow: '0 0 30px #39ff1466, 0 0 60px #39ff1422',
          animation: 'pulseGlow 2s infinite',
          key: msgIdx
        }}>
          <span style={{ animation: 'msgFade 1.8s ease infinite' }}>{msgs[msgIdx]}</span>
          <div style={{
            position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
            borderTop: '8px solid #39ff14'
          }}/>
        </div>

        {/* Hamster */}
        <div style={{ position: 'relative', zIndex: 2, marginBottom: '2.5rem', animation: 'float 4s ease-in-out infinite' }}>
          <RunningHamster />
        </div>

        {/* Title */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid #39ff1430', padding: '5px 18px',
            borderRadius: '30px', marginBottom: '1rem',
            background: 'linear-gradient(90deg, #39ff1408, #00d4ff08, #39ff1408)',
            backgroundSize: '200% 100%', animation: 'borderFlow 3s linear infinite'
          }}>
            <div style={{ width: '5px', height: '5px', background: '#39ff14', borderRadius: '50%', animation: 'pulseGlow 1.5s infinite' }}/>
            <span style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '3px' }}>YOUR FITNESS COMPANION</span>
            <div style={{ width: '5px', height: '5px', background: '#39ff14', borderRadius: '50%', animation: 'pulseGlow 1.5s 0.5s infinite' }}/>
          </div>

          {/* Main title */}
          <h1 style={{
            fontSize: 'clamp(3.5rem, 12vw, 9rem)',
            fontFamily: 'Orbitron', fontWeight: 900,
            lineHeight: 0.85, marginBottom: '1.5rem', letterSpacing: '-3px'
          }}>
            <span style={{
              display: 'block', color: '#fff',
              textShadow: '0 0 80px #ffffff18',
              animation: 'glitchText 10s infinite'
            }}>G</span>
            <span style={{
              display: 'block', color: '#39ff14',
              textShadow: '0 0 40px #39ff14, 0 0 100px #39ff1444',
              animation: 'glitchText 7s 1s infinite'
            }}>FITNESS</span>
          </h1>

          {/* Subtitle */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: '2.5rem'
          }}>
            {['BMI', 'NUTRITION', 'WORKOUTS', 'MUSCLE'].map((t, i) => (
              <span key={t} style={{
                color: '#333', fontFamily: 'Orbitron', fontSize: '0.65rem',
                letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                {i > 0 && <span style={{ color: '#39ff1433' }}>·</span>}
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Primary button */}
            <button
              onClick={(e) => handleBtnClick(e, 'bmi')}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                position: 'relative', overflow: 'hidden',
                background: btnHover
                  ? 'linear-gradient(135deg, #39ff14, #00ff88, #00d4ff)'
                  : 'linear-gradient(135deg, #39ff14, #00ff88)',
                border: 'none', padding: '1.1rem 2.8rem',
                fontFamily: 'Orbitron', fontSize: '0.82rem',
                fontWeight: 900, letterSpacing: '2px',
                borderRadius: '4px', cursor: 'pointer',
                color: '#000',
                boxShadow: btnHover
                  ? '0 0 50px #39ff14, 0 0 100px #39ff1444, 4px 4px 0 #1a8a00'
                  : '0 0 30px #39ff1466, 4px 4px 0 #1a8a00',
                transform: btnHover ? 'translate(-3px, -3px)' : 'translate(0, 0)',
                transition: 'all 0.2s'
              }}
            >
              {/* Shine effect */}
              <div style={{
                position: 'absolute', top: 0, left: btnHover ? '100%' : '-100%',
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, #ffffff44, transparent)',
                transition: 'left 0.4s', pointerEvents: 'none'
              }}/>
              {/* Ripples */}
              {ripples.map(r => (
                <div key={r.id} style={{
                  position: 'absolute', left: r.x, top: r.y,
                  width: '20px', height: '20px',
                  background: '#ffffff44', borderRadius: '50%',
                  transform: 'translate(-50%,-50%) scale(0)',
                  animation: 'ripple 0.6s ease-out',
                  pointerEvents: 'none'
                }}/>
              ))}
              START TRAINING
            </button>

            {/* Secondary button */}
            <button
              onClick={(e) => handleBtnClick(e, 'home-workout')}
              onMouseEnter={() => setBtn2Hover(true)}
              onMouseLeave={() => setBtn2Hover(false)}
              style={{
                position: 'relative', overflow: 'hidden',
                background: btn2Hover ? '#39ff1411' : 'transparent',
                border: '1px solid #39ff14',
                padding: '1.1rem 2.8rem',
                fontFamily: 'Orbitron', fontSize: '0.82rem',
                fontWeight: 700, letterSpacing: '2px',
                borderRadius: '4px', cursor: 'pointer',
                color: '#39ff14',
                boxShadow: btn2Hover ? '0 0 30px #39ff1433, inset 0 0 20px #39ff1411' : 'none',
                transform: btn2Hover ? 'translate(-2px, -2px)' : 'translate(0,0)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: btn2Hover ? '100%' : '-100%',
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, #39ff1422, transparent)',
                transition: 'left 0.4s', pointerEvents: 'none'
              }}/>
              VIEW WORKOUTS
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '2rem', justifyContent: 'center',
            marginTop: '3rem', flexWrap: 'wrap'
          }}>
            {[
              { val: '100%', label: 'FREE' },
              { val: '6+', label: 'TOOLS' },
              { val: '∞', label: 'GAINS' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '1.5rem', fontWeight: 900, textShadow: '0 0 20px #39ff1466' }}>{s.val}</div>
                <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '2px', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2
        }}>
          <div style={{ fontFamily: 'Orbitron', fontSize: '0.55rem', color: '#222', letterSpacing: '3px' }}>SCROLL</div>
          <div style={{ width: '24px', height: '36px', border: '1px solid #39ff1433', borderRadius: '12px', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)',
              width: '4px', height: '8px', background: '#39ff14', borderRadius: '4px',
              animation: 'float 1.5s ease-in-out infinite'
            }}/>
          </div>
        </div>
      </section>
    </>
  );
}
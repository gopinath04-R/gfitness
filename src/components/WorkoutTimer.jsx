import React, { useState, useEffect, useRef } from 'react';

function ClockCartoon({ seconds, total, isRest }) {
  const percent = total > 0 ? ((total - seconds) / total) * 100 : 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (percent / 100) * circumference;
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(t);
  }, []);

  const eyeOpen = seconds > 3 ? true : blink;

  return (
    <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto' }}>
      {/* SVG clock ring */}
      <svg width="180" height="180" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Background ring */}
        <circle cx="90" cy="90" r={radius}
          fill="none" stroke="#1a1a1a" strokeWidth="8"/>
        {/* Progress ring */}
        <circle cx="90" cy="90" r={radius}
          fill="none"
          stroke={isRest ? '#00d4ff' : '#39ff14'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          transform="rotate(-90 90 90)"
          style={{ transition: 'stroke-dasharray 0.5s ease', filter: `drop-shadow(0 0 8px ${isRest ? '#00d4ff' : '#39ff14'})` }}
        />
      </svg>

      {/* Cartoon hamster face */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90px', height: '90px'
      }}>
        {/* Face */}
        <div style={{
          width: '80px', height: '80px',
          background: 'linear-gradient(135deg, #e8a870, #c47a4a)',
          borderRadius: '50%', position: 'absolute',
          top: '5px', left: '5px',
          boxShadow: `0 0 20px ${isRest ? '#00d4ff44' : '#39ff1444'}`
        }}/>
        {/* Cheeks */}
        <div style={{ position:'absolute', top:'38px', left:'2px', width:'22px', height:'16px', background:'#ffb6c1', borderRadius:'50%', opacity:0.8 }}/>
        <div style={{ position:'absolute', top:'38px', right:'2px', width:'22px', height:'16px', background:'#ffb6c1', borderRadius:'50%', opacity:0.8 }}/>
        {/* Eyes */}
        <div style={{
          position: 'absolute', top: '22px', left: '20px',
          width: '14px', height: eyeOpen ? '14px' : '4px',
          background: '#111', borderRadius: eyeOpen ? '50%' : '2px',
          transition: 'height 0.1s',
          boxShadow: `0 0 6px ${isRest ? '#00d4ff' : '#39ff14'}`
        }}>
          {eyeOpen && <div style={{ width:'4px', height:'4px', background:'#fff', borderRadius:'50%', margin:'2px' }}/>}
        </div>
        <div style={{
          position: 'absolute', top: '22px', right: '18px',
          width: '14px', height: eyeOpen ? '14px' : '4px',
          background: '#111', borderRadius: eyeOpen ? '50%' : '2px',
          transition: 'height 0.1s',
          boxShadow: `0 0 6px ${isRest ? '#00d4ff' : '#39ff14'}`
        }}>
          {eyeOpen && <div style={{ width:'4px', height:'4px', background:'#fff', borderRadius:'50%', margin:'2px' }}/>}
        </div>
        {/* Nose */}
        <div style={{ position:'absolute', top:'38px', left:'36px', width:'8px', height:'6px', background:'#ff8fa3', borderRadius:'50%' }}/>
        {/* Mouth - smile or tired */}
        <div style={{
          position: 'absolute', top: '48px', left: '50%',
          transform: 'translateX(-50%)',
          width: '20px', height: '10px',
          border: `2px solid #c47a4a`,
          borderTop: 'none',
          borderRadius: '0 0 10px 10px'
        }}/>
        {/* Sweat when working */}
        {!isRest && (
          <div style={{
            position: 'absolute', top: '10px', right: '5px',
            width: '6px', height: '10px',
            background: '#00d4ff',
            borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
            opacity: blink ? 1 : 0.3, transition: 'opacity 0.5s'
          }}/>
        )}
        {/* Headband */}
        <div style={{
          position: 'absolute', top: '12px', left: '5px', right: '6px',
          height: '5px',
          background: isRest ? '#00d4ff' : '#ff4444',
          borderRadius: '10px', opacity: 0.9
        }}/>
      </div>
    </div>
  );
}

export default function WorkoutTimer() {
  const [workoutTime, setWorkoutTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const [sets, setSets] = useState(4);
  const [currentSet, setCurrentSet] = useState(1);
  const [seconds, setSeconds] = useState(40);
  const [isRest, setIsRest] = useState(false);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  const total = isRest ? restTime : workoutTime;

  useEffect(() => {
    if (running && !done) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            if (!isRest) {
              if (currentSet >= sets) {
                setRunning(false);
                setDone(true);
                return 0;
              }
              setIsRest(true);
              return restTime;
            } else {
              setIsRest(false);
              setCurrentSet(c => c + 1);
              return workoutTime;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, isRest, currentSet, sets, workoutTime, restTime, done]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setDone(false);
    setIsRest(false);
    setCurrentSet(1);
    setSeconds(workoutTime);
  };

  const start = () => {
    setDone(false);
    setSeconds(workoutTime);
    setIsRest(false);
    setCurrentSet(1);
    setRunning(true);
  };

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const sliderStyle = (color) => ({
    width: '100%', height: '6px', borderRadius: '6px',
    appearance: 'none', background: `linear-gradient(90deg, ${color} 0%, #1a1a1a 0%)`,
    outline: 'none', cursor: 'pointer'
  });

  return (
    <section id="timer" style={{ padding: '6rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes done { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
        input[type=range]::-webkit-slider-thumb {
          appearance: none; width: 18px; height: 18px;
          background: #39ff14; border-radius: 50%;
          box-shadow: 0 0 10px #39ff14; cursor: pointer;
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#39ff1411', border: '1px solid #39ff1430',
          padding: '6px 20px', borderRadius: '30px', marginBottom: '1rem'
        }}>
          <div style={{ width: '6px', height: '6px', background: '#39ff14', borderRadius: '50%' }}/>
          <span style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '3px' }}>INTERVAL TRAINER</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 6vw, 3rem)', fontFamily: 'Orbitron',
          background: 'linear-gradient(135deg, #fff 30%, #39ff14 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>WORKOUT TIMER</h2>
      </div>

      <div style={{
        background: 'linear-gradient(145deg, #0e0e0e, #080808)',
        border: '1px solid #39ff1420', borderRadius: '28px',
        padding: '2.5rem', animation: 'fadeUp 0.5s ease'
      }}>

        {/* Done screen */}
        {done ? (
          <div style={{ textAlign: 'center', animation: 'done 0.5s ease' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
            <div style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              WORKOUT COMPLETE!
            </div>
            <div style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>
              {sets} sets crushed! Great work! 💪
            </div>
            <button onClick={reset} style={{
              background: '#39ff14', color: '#000', border: 'none',
              padding: '1rem 2.5rem', borderRadius: '14px',
              fontFamily: 'Orbitron', fontSize: '0.85rem', fontWeight: 900,
              cursor: 'pointer', letterSpacing: '2px'
            }}>GO AGAIN</button>
          </div>
        ) : (
          <>
            {/* Clock */}
            <div style={{ marginBottom: '1.5rem' }}>
              <ClockCartoon seconds={seconds} total={total} isRest={isRest} />
            </div>

            {/* Time display */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{
                fontSize: 'clamp(3rem, 10vw, 5rem)', fontFamily: 'Orbitron',
                fontWeight: 900,
                color: isRest ? '#00d4ff' : '#39ff14',
                textShadow: `0 0 40px ${isRest ? '#00d4ff88' : '#39ff1488'}`,
                lineHeight: 1,
                animation: running ? 'pulse 1s infinite' : 'none'
              }}>
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </div>
              <div style={{
                color: isRest ? '#00d4ff' : '#39ff14',
                fontFamily: 'Orbitron', fontSize: '0.7rem',
                letterSpacing: '3px', marginTop: '0.5rem'
              }}>
                {isRest ? 'REST TIME' : 'WORK TIME'}
              </div>
            </div>

            {/* Set counter */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: '0.5rem',
              marginBottom: '2rem', flexWrap: 'wrap'
            }}>
              {Array.from({ length: sets }, (_, i) => (
                <div key={i} style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: i < currentSet - 1 ? '#39ff14' : i === currentSet - 1 ? '#39ff1433' : '#1a1a1a',
                  border: `1px solid ${i === currentSet - 1 ? '#39ff14' : '#2a2a2a'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i < currentSet - 1 ? '#000' : i === currentSet - 1 ? '#39ff14' : '#333',
                  fontFamily: 'Orbitron', fontSize: '0.7rem', fontWeight: 700,
                  transition: 'all 0.3s'
                }}>{i + 1}</div>
              ))}
            </div>

            {/* Settings - only when not running */}
            {!running && (
              <div style={{ marginBottom: '2rem' }}>
                {[
                  { label: 'WORK TIME', val: workoutTime, set: (v) => { setWorkoutTime(v); setSeconds(v); }, min: 5, max: 120, color: '#39ff14', unit: 's' },
                  { label: 'REST TIME', val: restTime, set: setRestTime, min: 5, max: 120, color: '#00d4ff', unit: 's' },
                  { label: 'SETS', val: sets, set: setSets, min: 1, max: 10, color: '#ffd700', unit: '' },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: item.color, fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '2px' }}>{item.label}</span>
                      <span style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '0.85rem', fontWeight: 700 }}>
                        {item.val}{item.unit}
                      </span>
                    </div>
                    <input type="range" min={item.min} max={item.max}
                      value={item.val}
                      onChange={e => item.set(Number(e.target.value))}
                      style={sliderStyle(item.color)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {!running ? (
                <button onClick={start} style={{
                  flex: 1, padding: '1.1rem',
                  background: 'linear-gradient(135deg, #39ff14, #00ff88)',
                  border: 'none', borderRadius: '14px',
                  color: '#000', fontFamily: 'Orbitron', fontSize: '0.85rem',
                  fontWeight: 900, letterSpacing: '2px', cursor: 'pointer',
                  boxShadow: '0 4px 25px #39ff1444'
                }}>START</button>
              ) : (
                <>
                  <button onClick={() => setRunning(false)} style={{
                    flex: 1, padding: '1.1rem',
                    background: '#ffd70022', border: '1px solid #ffd700',
                    borderRadius: '14px', color: '#ffd700',
                    fontFamily: 'Orbitron', fontSize: '0.85rem',
                    fontWeight: 900, cursor: 'pointer'
                  }}>PAUSE</button>
                  <button onClick={() => setRunning(true)} style={{
                    flex: 1, padding: '1.1rem',
                    background: '#39ff1422', border: '1px solid #39ff14',
                    borderRadius: '14px', color: '#39ff14',
                    fontFamily: 'Orbitron', fontSize: '0.85rem',
                    fontWeight: 900, cursor: 'pointer'
                  }}>RESUME</button>
                </>
              )}
              <button onClick={reset} style={{
                padding: '1.1rem 1.5rem',
                background: '#ff444422', border: '1px solid #ff444444',
                borderRadius: '14px', color: '#ff4444',
                fontFamily: 'Orbitron', fontSize: '0.85rem',
                fontWeight: 900, cursor: 'pointer'
              }}>RESET</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
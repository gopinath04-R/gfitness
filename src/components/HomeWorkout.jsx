import React, { useState, useEffect, useRef } from 'react';

const workouts = [
  {
    name: 'Push-Ups', sets: 4, reps: '15', rest: 60, duration: 0,
    muscle: 'Chest', difficulty: 'Beginner', effort: 6,
    calories: 8, equipment: 'None',
    form: [
      'Hands shoulder-width apart, fingers forward',
      'Body forms straight line from head to heel',
      'Lower chest to one inch above floor',
      'Press back to full arm extension',
    ],
    cue: 'Squeeze chest hard at the top of every rep'
  },
  {
    name: 'Bodyweight Squats', sets: 4, reps: '20', rest: 60, duration: 0,
    muscle: 'Legs', difficulty: 'Beginner', effort: 5,
    calories: 10, equipment: 'None',
    form: [
      'Feet shoulder-width, toes slightly out',
      'Brace core, keep chest tall throughout',
      'Drive knees out over toes on descent',
      'Break parallel, then drive through heels',
    ],
    cue: 'Sit back into the squat, do not collapse knees inward'
  },
  {
    name: 'Plank Hold', sets: 3, reps: '60s', rest: 45, duration: 60,
    muscle: 'Core', difficulty: 'Intermediate', effort: 7,
    calories: 5, equipment: 'None',
    form: [
      'Forearms flat, elbows directly under shoulders',
      'Neutral spine — no sagging or raised hips',
      'Squeeze glutes and brace abs simultaneously',
      'Breathe steadily, do not hold your breath',
    ],
    cue: 'Imagine pulling your elbows toward your feet'
  },
  {
    name: 'Burpees', sets: 3, reps: '10', rest: 90, duration: 0,
    muscle: 'Full Body', difficulty: 'Advanced', effort: 10,
    calories: 15, equipment: 'None',
    form: [
      'Stand, drop hands to floor outside feet',
      'Jump feet back to high push-up position',
      'Perform one strict push-up',
      'Jump feet to hands, explode upward',
    ],
    cue: 'Land with soft knees every single rep'
  },
  {
    name: 'Reverse Lunges', sets: 3, reps: '12', rest: 60, duration: 0,
    muscle: 'Legs', difficulty: 'Beginner', effort: 6,
    calories: 9, equipment: 'None',
    form: [
      'Stand tall, hands on hips or at sides',
      'Step one foot back, lower rear knee to floor',
      'Front shin stays vertical over ankle',
      'Drive through front heel to return',
    ],
    cue: 'Keep your torso completely upright throughout'
  },
  {
    name: 'Mountain Climbers', sets: 3, reps: '30', rest: 45, duration: 0,
    muscle: 'Core', difficulty: 'Intermediate', effort: 8,
    calories: 11, equipment: 'None',
    form: [
      'Start in high push-up position, arms locked',
      'Drive one knee toward chest explosively',
      'Alternate legs in a running motion',
      'Keep hips level — do not bounce them',
    ],
    cue: 'Fast feet, steady hips'
  },
  {
    name: 'Diamond Push-Ups', sets: 3, reps: '12', rest: 60, duration: 0,
    muscle: 'Triceps', difficulty: 'Intermediate', effort: 7,
    calories: 9, equipment: 'None',
    form: [
      'Form diamond shape with thumbs and index fingers',
      'Hands directly under sternum center',
      'Elbows track backward, not flared out',
      'Lower chest to hands, full extension up',
    ],
    cue: 'Feel it in triceps — not shoulders'
  },
  {
    name: 'Glute Bridges', sets: 4, reps: '20', rest: 45, duration: 0,
    muscle: 'Glutes', difficulty: 'Beginner', effort: 5,
    calories: 6, equipment: 'None',
    form: [
      'Lie on back, knees bent, feet flat on floor',
      'Drive hips up by squeezing glutes hard',
      'Hold two seconds at top, full extension',
      'Lower slowly under control',
    ],
    cue: 'Posterior pelvic tilt at the top — tuck your tailbone'
  },
  {
    name: 'Tricep Dips', sets: 3, reps: '15', rest: 60, duration: 0,
    muscle: 'Triceps', difficulty: 'Beginner', effort: 6,
    calories: 7, equipment: 'Chair',
    form: [
      'Hands on chair edge, fingers pointing forward',
      'Lower body until upper arms are parallel to floor',
      'Keep back close to the chair throughout',
      'Press to full arm extension at top',
    ],
    cue: 'Elbows point straight back — never flare sideways'
  },
  {
    name: 'Jump Squats', sets: 3, reps: '15', rest: 75, duration: 0,
    muscle: 'Legs', difficulty: 'Advanced', effort: 9,
    calories: 14, equipment: 'None',
    form: [
      'Descend to parallel squat position',
      'Explode upward driving through both feet',
      'Reach full body extension at peak',
      'Land softly with bent knees, absorb impact',
    ],
    cue: 'Quiet landing is the goal'
  },
  {
    name: 'Superman Hold', sets: 3, reps: '15', rest: 45, duration: 0,
    muscle: 'Back', difficulty: 'Beginner', effort: 5,
    calories: 4, equipment: 'None',
    form: [
      'Lie face down, arms extended forward',
      'Lift arms, chest, and legs simultaneously',
      'Hold peak position for two full seconds',
      'Lower slowly back to floor',
    ],
    cue: 'Squeeze shoulder blades together as you lift'
  },
  {
    name: 'Bear Crawl', sets: 3, reps: '30s', rest: 60, duration: 30,
    muscle: 'Full Body', difficulty: 'Intermediate', effort: 8,
    calories: 10, equipment: 'None',
    form: [
      'On hands and toes, knees hover two inches off floor',
      'Move opposite hand and foot in coordination',
      'Keep back flat — no rotation or hip rise',
      'Forward four steps, backward four steps',
    ],
    cue: 'Slow and deliberate beats speed here'
  },
];

const diffColor = { Beginner: '#39ff14', Intermediate: '#ffd700', Advanced: '#ff4444' };

function TimerModal({ workout, onClose }) {
  const totalWork = workout.duration > 0 ? workout.duration : 40;
  const totalRest = workout.rest;
  const totalSets = workout.sets;

  const [seconds, setSeconds] = useState(totalWork);
  const [isRest, setIsRest] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [blink, setBlink] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (running && !done) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            if (!isRest) {
              if (currentSet >= totalSets) {
                setRunning(false);
                setDone(true);
                clearInterval(intervalRef.current);
                return 0;
              }
              setIsRest(true);
              return totalRest;
            } else {
              setIsRest(false);
              setCurrentSet(c => c + 1);
              return totalWork;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, isRest, currentSet, totalSets, totalWork, totalRest, done]);

  const activeTotal = isRest ? totalRest : totalWork;
  const percent = activeTotal > 0 ? ((activeTotal - seconds) / activeTotal) * 100 : 0;
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const dash = (percent / 100) * circ;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const color = isRest ? '#00d4ff' : '#39ff14';

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false); setDone(false);
    setIsRest(false); setCurrentSet(1);
    setSeconds(totalWork);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.92)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <style>{`
        @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      <div style={{
        width: '100%', maxWidth: '400px',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '2rem',
        animation: 'scaleIn 0.3s ease',
        position: 'relative'
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#555', width: '30px', height: '30px',
          borderRadius: '50%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', transition: 'all 0.2s'
        }}>✕</button>

        {/* Exercise info */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.52rem', letterSpacing: '3px', marginBottom: '4px' }}>NOW TRAINING</div>
          <div style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 700 }}>{workout.name}</div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '8px' }}>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>{totalSets} sets</span>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>·</span>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>{workout.reps} reps</span>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>·</span>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>{totalRest}s rest</span>
          </div>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🎯</div>
            <div style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              COMPLETE
            </div>
            <div style={{ color: '#444', fontSize: '0.8rem', marginBottom: '2rem' }}>
              {totalSets} sets · ~{workout.calories * totalSets} cal burned
            </div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={reset} style={{
                flex: 1, padding: '0.9rem',
                background: 'rgba(57,255,20,0.08)',
                border: '1px solid rgba(57,255,20,0.2)',
                borderRadius: '10px', color: '#39ff14',
                fontFamily: 'Orbitron', fontSize: '0.7rem',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>AGAIN</button>
              <button onClick={onClose} style={{
                flex: 1, padding: '0.9rem',
                background: '#39ff14', border: 'none',
                borderRadius: '10px', color: '#000',
                fontFamily: 'Orbitron', fontSize: '0.7rem',
                fontWeight: 900, cursor: 'pointer'
              }}>DONE</button>
            </div>
          </div>
        ) : (
          <>
            {/* Clock */}
            <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 1.5rem' }}>
              <svg width="160" height="160" style={{ position: 'absolute', top: 0, left: 0 }}>
                <circle cx="80" cy="80" r={radius} fill="none" stroke="#111" strokeWidth="6"/>
                <circle cx="80" cy="80" r={radius} fill="none"
                  stroke={color} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${dash} ${circ}`}
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dasharray 0.5s', filter: `drop-shadow(0 0 6px ${color})` }}
                />
              </svg>

              {/* Hamster face */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '80px', height: '80px'
              }}>
                <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #e8a870, #c47a4a)', borderRadius: '50%', position: 'absolute', top: '4px', left: '4px' }}/>
                <div style={{ position:'absolute', top:'34px', left:'0', width:'18px', height:'13px', background:'#f0a090', borderRadius:'50%', opacity:0.7 }}/>
                <div style={{ position:'absolute', top:'34px', right:'0', width:'18px', height:'13px', background:'#f0a090', borderRadius:'50%', opacity:0.7 }}/>
                <div style={{ position:'absolute', top:'20px', left:'18px', width:'11px', height: blink && !isRest ? '3px' : '11px', background:'#111', borderRadius: blink && !isRest ? '2px' : '50%', transition:'height 0.1s', boxShadow:`0 0 5px ${color}` }}/>
                <div style={{ position:'absolute', top:'20px', right:'16px', width:'11px', height: blink && !isRest ? '3px' : '11px', background:'#111', borderRadius: blink && !isRest ? '2px' : '50%', transition:'height 0.1s', boxShadow:`0 0 5px ${color}` }}/>
                <div style={{ position:'absolute', top:'33px', left:'31px', width:'7px', height:'5px', background:'#ff8fa3', borderRadius:'50%' }}/>
                <div style={{ position:'absolute', top:'9px', left:'4px', right:'5px', height:'4px', background: isRest ? '#00d4ff' : '#ff4444', borderRadius:'10px', opacity:0.9 }}/>
                {!isRest && running && (
                  <div style={{ position:'absolute', top:'5px', right:'3px', width:'5px', height:'8px', background:'#00d4ff', borderRadius:'50% 50% 50% 50% / 30% 30% 70% 70%', opacity: blink ? 1 : 0.2, transition:'opacity 0.5s' }}/>
                )}
              </div>
            </div>

            {/* Time display */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{
                fontSize: '3.8rem', fontFamily: 'Orbitron', fontWeight: 900,
                color: color, textShadow: `0 0 30px ${color}55`, lineHeight: 1
              }}>
                {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron',
                fontSize: '0.55rem', letterSpacing: '3px', marginTop: '6px'
              }}>
                {isRest ? 'REST · RECOVER' : 'WORK · PUSH IT'}
              </div>
            </div>

            {/* Set indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '1.5rem' }}>
              {Array.from({ length: totalSets }, (_, i) => (
                <div key={i} style={{
                  width: '28px', height: '4px', borderRadius: '4px',
                  background: i < currentSet - 1 ? '#39ff14' : i === currentSet - 1 ? `${color}66` : '#1a1a1a',
                  transition: 'all 0.3s'
                }}/>
              ))}
            </div>
            <div style={{ textAlign: 'center', color: '#333', fontFamily: 'Orbitron', fontSize: '0.6rem', marginBottom: '1.5rem' }}>
              SET {currentSet} OF {totalSets}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {!running ? (
                <button onClick={() => setRunning(true)} style={{
                  flex: 1, padding: '1rem',
                  background: '#39ff14', border: 'none',
                  borderRadius: '10px', color: '#000',
                  fontFamily: 'Orbitron', fontSize: '0.78rem',
                  fontWeight: 900, cursor: 'pointer', letterSpacing: '2px',
                  transition: 'all 0.2s'
                }}>
                  {seconds === totalWork && currentSet === 1 ? 'START' : 'RESUME'}
                </button>
              ) : (
                <button onClick={() => setRunning(false)} style={{
                  flex: 1, padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', color: '#fff',
                  fontFamily: 'Orbitron', fontSize: '0.78rem',
                  fontWeight: 700, cursor: 'pointer'
                }}>PAUSE</button>
              )}
              <button onClick={reset} style={{
                padding: '1rem 1.2rem',
                background: 'rgba(255,68,68,0.08)',
                border: '1px solid rgba(255,68,68,0.15)',
                borderRadius: '10px', color: '#ff4444',
                fontFamily: 'Orbitron', fontSize: '0.75rem',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>↺</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function HomeWorkout() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('All');
  const [timerWorkout, setTimerWorkout] = useState(null);
  const [completed, setCompleted] = useState({});
  const [view, setView] = useState('grid');

  const muscles = ['All', 'Chest', 'Legs', 'Core', 'Triceps', 'Glutes', 'Back', 'Full Body'];
  const filtered = filter === 'All' ? workouts : workouts.filter(w => w.muscle === filter);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalCalories = workouts.reduce((sum, w) => completed[w.name] ? sum + (w.calories * w.sets) : sum, 0);

  const toggleComplete = (e, name) => {
    e.stopPropagation();
    setCompleted(c => ({ ...c, [name]: !c[name] }));
  };

  return (
    <section id="home-workout" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .w-card:hover { background: #0f0f0f !important; }
        .start-btn:hover { background: rgba(57,255,20,0.08) !important; color: #39ff14 !important; border-color: rgba(57,255,20,0.2) !important; }
        .filter-btn:hover { border-color: rgba(255,255,255,0.2) !important; color: rgba(255,255,255,0.7) !important; }
        .view-btn:hover { color: #fff !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '4px 14px', borderRadius: '30px', marginBottom: '1rem'
        }}>
          <div style={{ width: '5px', height: '5px', background: '#39ff14', borderRadius: '50%' }}/>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Orbitron', fontSize: '0.58rem', letterSpacing: '3px' }}>NO EQUIPMENT</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontFamily: 'Orbitron', fontWeight: 900,
              color: '#fff', letterSpacing: '-1px', marginBottom: '4px'
            }}>Home Workout</h2>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem' }}>
              {workouts.length} exercises · Click any card to see form guide
            </p>
          </div>

          {/* Progress stats */}
          {completedCount > 0 && (
            <div style={{
              display: 'flex', gap: '1.5rem',
              padding: '0.8rem 1.2rem',
              background: 'rgba(57,255,20,0.05)',
              border: '1px solid rgba(57,255,20,0.1)',
              borderRadius: '10px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '1.1rem', fontWeight: 900 }}>{completedCount}</div>
                <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron', fontSize: '0.5rem', letterSpacing: '1px' }}>DONE</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.05)' }}/>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '1.1rem', fontWeight: 900 }}>{totalCalories}</div>
                <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron', fontSize: '0.5rem', letterSpacing: '1px' }}>CAL</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter + View toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {muscles.map(m => (
            <button key={m} className="filter-btn" onClick={() => setFilter(m)} style={{
              padding: '5px 12px', borderRadius: '5px',
              background: 'transparent',
              border: `1px solid ${filter === m ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.07)'}`,
              color: filter === m ? '#39ff14' : 'rgba(255,255,255,0.25)',
              fontFamily: 'Orbitron', fontSize: '0.58rem',
              cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.5px'
            }}>{m.toUpperCase()}</button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '3px' }}>
          {['grid', 'list'].map(v => (
            <button key={v} className="view-btn" onClick={() => setView(v)} style={{
              padding: '5px 12px', borderRadius: '4px',
              background: view === v ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none', color: view === v ? '#fff' : 'rgba(255,255,255,0.2)',
              fontFamily: 'Orbitron', fontSize: '0.55rem', cursor: 'pointer', transition: 'all 0.2s',
              letterSpacing: '1px'
            }}>{v.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{
        display: view === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
        flexDirection: view === 'list' ? 'column' : undefined,
        gap: '1px', background: 'rgba(255,255,255,0.04)'
      }}>
        {filtered.map((w, i) => (
          <div key={w.name} className="w-card"
            onClick={() => setActive(active === i ? null : i)}
            style={{
              background: completed[w.name] ? 'rgba(57,255,20,0.02)' : '#080808',
              padding: '1.5rem',
              cursor: 'pointer',
              borderLeft: `2px solid ${active === i ? '#39ff14' : completed[w.name] ? 'rgba(57,255,20,0.2)' : 'transparent'}`,
              transition: 'all 0.2s',
              animation: `fadeUp 0.4s ease ${i * 0.03}s both`
            }}>

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{
                  color: completed[w.name] ? 'rgba(255,255,255,0.2)' : '#fff',
                  fontFamily: 'Orbitron', fontSize: '0.88rem', fontWeight: 700,
                  marginBottom: '5px', letterSpacing: '0.3px',
                  textDecoration: completed[w.name] ? 'line-through' : 'none'
                }}>{w.name}</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ color: diffColor[w.difficulty], fontSize: '0.58rem', fontFamily: 'Orbitron' }}>
                    {w.difficulty.toUpperCase()}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.58rem', fontFamily: 'Orbitron' }}>
                    {w.muscle.toUpperCase()}
                  </span>
                  {w.equipment !== 'None' && (
                    <>
                      <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
                      <span style={{ color: 'rgba(255,165,0,0.6)', fontSize: '0.58rem', fontFamily: 'Orbitron' }}>
                        {w.equipment.toUpperCase()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Complete toggle */}
              <button onClick={(e) => toggleComplete(e, w.name)} style={{
                width: '22px', height: '22px', borderRadius: '5px',
                background: completed[w.name] ? '#39ff14' : 'transparent',
                border: `1px solid ${completed[w.name] ? '#39ff14' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s'
              }}>
                {completed[w.name] && <span style={{ color: '#000', fontSize: '0.65rem', fontWeight: 900 }}>✓</span>}
              </button>
            </div>

            {/* Effort bar */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${w.effort * 10}%`,
                  background: w.effort >= 8 ? '#ff4444' : w.effort >= 5 ? '#ffd700' : '#39ff14',
                  borderRadius: '2px', transition: 'width 1s ease'
                }}/>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: active === i ? '1.2rem' : '1rem' }}>
              {[
                { l: 'SETS', v: w.sets },
                { l: 'REPS', v: w.reps },
                { l: 'REST', v: `${w.rest}s` },
                { l: 'CAL', v: `~${w.calories * w.sets}` }
              ].map(s => (
                <div key={s.l}>
                  <div style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.52rem', fontFamily: 'Orbitron', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Form guide expanded */}
            {active === i && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1.2rem', marginBottom: '1.2rem' }}>
                <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron', fontSize: '0.52rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>
                  FORM GUIDE
                </div>
                {w.form.map((step, si) => (
                  <div key={si} style={{ display: 'flex', gap: '10px', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '18px', height: '18px', borderRadius: '4px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.2)', fontSize: '0.52rem',
                      fontFamily: 'Orbitron', flexShrink: 0
                    }}>{si + 1}</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.6, paddingTop: '1px' }}>{step}</div>
                  </div>
                ))}
                <div style={{
                  padding: '0.8rem 1rem',
                  background: 'rgba(57,255,20,0.03)',
                  borderLeft: '2px solid rgba(57,255,20,0.2)',
                  marginTop: '0.8rem', marginBottom: '0'
                }}>
                  <div style={{ color: 'rgba(57,255,20,0.5)', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{w.cue}"
                  </div>
                </div>
              </div>
            )}

            {/* Start Timer */}
            <button className="start-btn"
              onClick={(e) => { e.stopPropagation(); setTimerWorkout(w); }}
              style={{
                width: '100%', padding: '0.7rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '7px',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'Orbitron', fontSize: '0.6rem',
                cursor: 'pointer', transition: 'all 0.2s',
                letterSpacing: '2px', fontWeight: 700
              }}>
              START TIMER
            </button>
          </div>
        ))}
      </div>

      {/* Timer modal */}
      {timerWorkout && (
        <TimerModal workout={timerWorkout} onClose={() => setTimerWorkout(null)} />
      )}
    </section>
  );
}
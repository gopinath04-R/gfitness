import React, { useState, useEffect, useRef } from 'react';

const splits = {
  PUSH: {
    color: '#e8e8e8', accent: '#39ff14',
    desc: 'Chest · Shoulders · Triceps', days: 'Mon · Thu',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: '6–8', rest: 180, focus: 'Primary Compound', muscles: 'Chest, Anterior Delt, Tricep', effort: 9, form: ['Retract scapula into bench throughout', 'Grip slightly wider than shoulder width', 'Lower bar to lower chest under control', 'Drive feet into floor and press explosively'], cue: 'Think about bending the bar to engage your lats' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10–12', rest: 120, focus: 'Upper Chest', muscles: 'Upper Chest, Front Delt', effort: 7, form: ['Set bench 30–45 degrees', 'Dumbbells at chest, elbows 45 degrees', 'Press up and slightly inward at top', 'Lower with control, feel the stretch'], cue: 'Squeeze upper chest hard at full extension' },
      { name: 'Cable Chest Fly', sets: 3, reps: '12–15', rest: 90, focus: 'Isolation', muscles: 'Mid Chest', effort: 5, form: ['Cables set at chest height', 'Slight forward lean, arms slightly bent', 'Wide arc motion bringing hands together', 'Control the return to full stretch'], cue: 'Hug a barrel — do not push' },
      { name: 'Overhead Press', sets: 4, reps: '8–10', rest: 150, focus: 'Compound', muscles: 'Front & Side Delts, Triceps', effort: 8, form: ['Bar on upper chest, grip shoulder width', 'Brace core hard before each rep', 'Press straight up, move head back slightly', 'Lock out fully, bring head through at top'], cue: 'Push your head through the window at lockout' },
      { name: 'Lateral Raises', sets: 3, reps: '15–20', rest: 60, focus: 'Isolation', muscles: 'Lateral Deltoid', effort: 6, form: ['Slight bend in elbows throughout', 'Lead with elbows, not wrists', 'Raise to parallel, no higher', 'Lower slowly over 3 seconds'], cue: 'Pour a jug at the top — thumbs slightly down' },
      { name: 'Tricep Pushdown', sets: 3, reps: '12–15', rest: 60, focus: 'Isolation', muscles: 'All 3 Tricep Heads', effort: 5, form: ['Elbows pinned to sides — do not move them', 'Start at 90 degrees', 'Push to full lockout', 'Squeeze hard at bottom'], cue: 'Elbows stay glued to your ribs the entire set' },
    ]
  },
  PULL: {
    color: '#e8e8e8', accent: '#00d4ff',
    desc: 'Back · Biceps · Rear Delts', days: 'Tue · Fri',
    exercises: [
      { name: 'Conventional Deadlift', sets: 4, reps: '4–6', rest: 240, focus: 'Primary Compound', muscles: 'Full Posterior Chain', effort: 10, form: ['Bar over mid-foot, hip width stance', 'Hinge at hips, grip just outside shins', 'Big breath, brace hard, then initiate', 'Keep bar close to body on the way up'], cue: 'Push the floor away — not pull the bar up' },
      { name: 'Weighted Pull-Ups', sets: 4, reps: '6–10', rest: 180, focus: 'Compound', muscles: 'Lats, Biceps, Mid Back', effort: 9, form: ['Dead hang to start, shoulder width grip', 'Depress shoulder blades to initiate', 'Pull elbows down and back toward hips', 'Chin over bar, lower over 3 seconds'], cue: 'Pull the bar to you, not yourself to the bar' },
      { name: 'Barbell Bent Over Row', sets: 4, reps: '8–10', rest: 150, focus: 'Compound', muscles: 'Mid Back, Lats', effort: 8, form: ['Hinge 45 degrees, flat back', 'Overhand grip slightly wider than shoulders', 'Pull to lower chest or upper abs', 'Squeeze shoulder blades hard at top'], cue: 'Row to belly button for lower lats, nipple for upper' },
      { name: 'Seated Cable Row', sets: 3, reps: '12–15', rest: 90, focus: 'Compound', muscles: 'Mid Back, Rhomboids', effort: 6, form: ['Sit tall with slight arch', 'Pull handle to belly button', 'Full scapular retraction at end', 'Reach fully forward for full stretch each rep'], cue: 'The stretch at the front is where the gains live' },
      { name: 'Face Pulls', sets: 3, reps: '15–20', rest: 60, focus: 'Rear Delt', muscles: 'Rear Delts, External Rotators', effort: 4, form: ['Cable at forehead height, rope attachment', 'Pull to face, elbows above wrists', 'Externally rotate at end — thumbs behind ears', 'Slow controlled movement'], cue: 'Elbows high and wide — double bicep at the end' },
      { name: 'Barbell Bicep Curl', sets: 3, reps: '10–12', rest: 75, focus: 'Isolation', muscles: 'Biceps Brachii', effort: 6, form: ['Shoulder width underhand grip', 'Elbows pinned to sides throughout', 'Curl without swinging torso', 'Full extension at bottom is non-negotiable'], cue: 'Slow the negative — that is where the muscle grows' },
    ]
  },
  LEGS: {
    color: '#e8e8e8', accent: '#ffd700',
    desc: 'Quads · Hamstrings · Calves', days: 'Wed · Sat',
    exercises: [
      { name: 'Barbell Back Squat', sets: 4, reps: '6–8', rest: 210, focus: 'Primary Compound', muscles: 'Quads, Glutes, Hamstrings', effort: 10, form: ['Bar on upper traps, feet shoulder width', 'Big breath and brace before each rep', 'Break hips and knees simultaneously', 'Drive knees out and break parallel'], cue: 'Spread the floor apart with your feet as you stand' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10–12', rest: 150, focus: 'Hamstrings', muscles: 'Hamstrings, Glutes', effort: 8, form: ['Hip width stance, soft bend in knees', 'Hinge at hips, push them back', 'Bar stays close to legs throughout', 'Stop when hamstrings are fully stretched'], cue: 'Stop at hamstring stretch — not when bar hits the floor' },
      { name: 'Leg Press', sets: 4, reps: '12–15', rest: 120, focus: 'Compound', muscles: 'Quads, Glutes', effort: 7, form: ['Feet shoulder width at mid plate', 'Lower until knees reach 90 degrees', 'Do not let lower back peel off pad', 'Drive through whole foot evenly'], cue: 'High foot placement targets glutes, low targets quads' },
      { name: 'Lying Leg Curl', sets: 3, reps: '12–15', rest: 90, focus: 'Isolation', muscles: 'Hamstrings', effort: 5, form: ['Lie face down, pad just above heel', 'Curl heels toward glutes smoothly', 'Hold peak 1 second — do not rush', 'Lower over 3 seconds'], cue: 'Flex your hamstring like flexing a bicep' },
      { name: 'Leg Extension', sets: 3, reps: '15–20', rest: 75, focus: 'Isolation', muscles: 'Quadriceps', effort: 5, form: ['Back against pad, knees at seat edge', 'Extend to full lockout', 'Squeeze quads 1 second at top', 'Lower slowly, no swinging'], cue: 'Lock out fully — partial reps miss the peak contraction' },
      { name: 'Standing Calf Raises', sets: 4, reps: '20–25', rest: 60, focus: 'Calves', muscles: 'Gastrocnemius, Soleus', effort: 4, form: ['Ball of foot on step edge', 'Lower heel fully below step level', 'Rise to full tip-toe extension', 'Pause 1 second at top and bottom'], cue: 'Full range every rep — partial reps do almost nothing' },
    ]
  }
};

// Timer Modal (same as HomeWorkout)
function TimerModal({ exercise, accentColor, onClose }) {
  const totalWork = 45;
  const totalRest = exercise.rest;
  const totalSets = exercise.sets;

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
                setRunning(false); setDone(true);
                clearInterval(intervalRef.current); return 0;
              }
              setIsRest(true); return totalRest;
            } else {
              setIsRest(false); setCurrentSet(c => c + 1); return totalWork;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, isRest, currentSet, totalSets, totalWork, totalRest, done]);

  const total = isRest ? totalRest : totalWork;
  const percent = total > 0 ? ((total - seconds) / total) * 100 : 0;
  const radius = 54; const circ = 2 * Math.PI * radius;
  const dash = (percent / 100) * circ;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const color = isRest ? '#00d4ff' : accentColor;

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false); setDone(false);
    setIsRest(false); setCurrentSet(1); setSeconds(totalWork);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div style={{
        width: '100%', maxWidth: '400px', background: '#0a0a0a',
        border: '1px solid #ffffff12', borderRadius: '28px', padding: '2rem',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          background: '#ffffff08', border: '1px solid #ffffff15',
          color: '#666', width: '32px', height: '32px', borderRadius: '50%',
          cursor: 'pointer', fontFamily: 'Orbitron', fontSize: '0.7rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>✕</button>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.55rem', letterSpacing: '3px', marginBottom: '4px' }}>NOW TRAINING</div>
          <div style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 700 }}>{exercise.name}</div>
          <div style={{ color: '#333', fontSize: '0.75rem', marginTop: '4px' }}>{exercise.muscles}</div>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ color: accentColor, fontFamily: 'Orbitron', fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.5rem' }}>SET COMPLETE</div>
            <div style={{ color: '#444', fontSize: '0.85rem', marginBottom: '2rem' }}>{totalSets} sets complete</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={reset} style={{ flex:1, padding:'1rem', background:`${accentColor}15`, border:`1px solid ${accentColor}33`, borderRadius:'12px', color:accentColor, fontFamily:'Orbitron', fontSize:'0.75rem', cursor:'pointer' }}>AGAIN</button>
              <button onClick={onClose} style={{ flex:1, padding:'1rem', background:accentColor, border:'none', borderRadius:'12px', color:'#000', fontFamily:'Orbitron', fontSize:'0.75rem', fontWeight:900, cursor:'pointer' }}>DONE</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ position:'relative', width:'160px', height:'160px', margin:'0 auto 1.5rem' }}>
              <svg width="160" height="160" style={{ position:'absolute', top:0, left:0 }}>
                <circle cx="80" cy="80" r={radius} fill="none" stroke="#1a1a1a" strokeWidth="6"/>
                <circle cx="80" cy="80" r={radius} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 80 80)"
                  style={{ transition:'stroke-dasharray 0.5s', filter:`drop-shadow(0 0 6px ${color})` }}/>
              </svg>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'80px', height:'80px' }}>
                <div style={{ width:'72px', height:'72px', background:'linear-gradient(135deg, #e8a870, #c47a4a)', borderRadius:'50%', position:'absolute', top:'4px', left:'4px' }}/>
                <div style={{ position:'absolute', top:'34px', left:'0', width:'20px', height:'14px', background:'#ffb6c1', borderRadius:'50%', opacity:0.7 }}/>
                <div style={{ position:'absolute', top:'34px', right:'0', width:'20px', height:'14px', background:'#ffb6c1', borderRadius:'50%', opacity:0.7 }}/>
                <div style={{ position:'absolute', top:'20px', left:'18px', width:'12px', height: blink && !isRest ? '3px' : '12px', background:'#111', borderRadius: blink && !isRest ? '2px' : '50%', transition:'height 0.1s', boxShadow:`0 0 5px ${color}` }}/>
                <div style={{ position:'absolute', top:'20px', right:'16px', width:'12px', height: blink && !isRest ? '3px' : '12px', background:'#111', borderRadius: blink && !isRest ? '2px' : '50%', transition:'height 0.1s', boxShadow:`0 0 5px ${color}` }}/>
                <div style={{ position:'absolute', top:'34px', left:'32px', width:'7px', height:'5px', background:'#ff8fa3', borderRadius:'50%' }}/>
                <div style={{ position:'absolute', top:'10px', left:'4px', right:'5px', height:'5px', background: isRest ? '#00d4ff' : '#ff4444', borderRadius:'10px', opacity:0.9 }}/>
              </div>
            </div>

            <div style={{ textAlign:'center', marginBottom:'1rem' }}>
              <div style={{ fontSize:'4rem', fontFamily:'Orbitron', fontWeight:900, color, textShadow:`0 0 30px ${color}66`, lineHeight:1 }}>
                {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
              </div>
              <div style={{ color:'#444', fontFamily:'Orbitron', fontSize:'0.6rem', letterSpacing:'3px', marginTop:'6px' }}>
                {isRest ? 'REST' : 'WORK'}
              </div>
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:'6px', marginBottom:'1.5rem' }}>
              {Array.from({ length: totalSets }, (_, i) => (
                <div key={i} style={{
                  width:'28px', height:'28px', borderRadius:'6px',
                  background: i < currentSet-1 ? accentColor : i === currentSet-1 ? `${accentColor}20` : '#111',
                  border:`1px solid ${i === currentSet-1 ? accentColor : '#222'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color: i < currentSet-1 ? '#000' : i === currentSet-1 ? accentColor : '#333',
                  fontFamily:'Orbitron', fontSize:'0.65rem', fontWeight:700, transition:'all 0.3s'
                }}>{i+1}</div>
              ))}
            </div>

            <div style={{ display:'flex', gap:'0.8rem' }}>
              {!running ? (
                <button onClick={() => setRunning(true)} style={{ flex:1, padding:'1rem', background:accentColor, border:'none', borderRadius:'12px', color:'#000', fontFamily:'Orbitron', fontSize:'0.8rem', fontWeight:900, cursor:'pointer', letterSpacing:'2px' }}>
                  {seconds === totalWork && currentSet === 1 ? 'START' : 'RESUME'}
                </button>
              ) : (
                <button onClick={() => setRunning(false)} style={{ flex:1, padding:'1rem', background:'#ffffff08', border:'1px solid #ffffff15', borderRadius:'12px', color:'#fff', fontFamily:'Orbitron', fontSize:'0.8rem', fontWeight:700, cursor:'pointer' }}>PAUSE</button>
              )}
              <button onClick={reset} style={{ padding:'1rem 1.2rem', background:'#ff444411', border:'1px solid #ff444422', borderRadius:'12px', color:'#ff4444', fontFamily:'Orbitron', fontSize:'0.75rem', cursor:'pointer' }}>↺</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function GymWorkout() {
  const [activeDay, setActiveDay] = useState('PUSH');
  const [activeEx, setActiveEx] = useState(null);
  const [timerEx, setTimerEx] = useState(null);
  const [completed, setCompleted] = useState({});
  const current = splits[activeDay];

  const toggleComplete = (e, name) => {
    e.stopPropagation();
    setCompleted(c => ({ ...c, [name]: !c[name] }));
  };

  return (
    <section id="gym-workout" style={{ padding: '6rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .ex-row { transition: background 0.2s !important; cursor: pointer; }
        .ex-row:hover { background: #0f0f0f !important; }
        .start-btn:hover { color: #fff !important; border-color: #ffffff33 !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid #ffffff15', padding: '5px 16px',
          borderRadius: '30px', marginBottom: '1rem'
        }}>
          <div style={{ width: '5px', height: '5px', background: current.accent, borderRadius: '50%' }}/>
          <span style={{ color: '#555', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '3px' }}>PPL PROGRAM</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontFamily: 'Orbitron', fontWeight: 900,
          color: '#fff', letterSpacing: '-1px', marginBottom: '0.5rem'
        }}>Gym Split</h2>
        <p style={{ color: '#333', fontSize: '0.85rem' }}>6 days · 3 sessions · Maximum progression</p>
      </div>

      {/* Day tabs */}
      <div style={{ display: 'flex', gap: '1px', marginBottom: '2rem', background: '#111' }}>
        {Object.keys(splits).map(day => (
          <button key={day} onClick={() => { setActiveDay(day); setActiveEx(null); }} style={{
            flex: 1, padding: '1rem',
            background: activeDay === day ? '#0f0f0f' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeDay === day ? splits[day].accent : 'transparent'}`,
            color: activeDay === day ? splits[day].accent : '#333',
            fontFamily: 'Orbitron', fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '2px'
          }}>{day}</button>
        ))}
      </div>

      {/* Day info */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '1rem 0', borderBottom: '1px solid #111',
        marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.55rem', letterSpacing: '2px', marginBottom: '3px' }}>TARGET</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{current.desc}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.55rem', letterSpacing: '2px', marginBottom: '3px' }}>FREQUENCY</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{current.days}</div>
        </div>
      </div>

      {/* Exercises */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {current.exercises.map((ex, i) => (
          <div key={ex.name} style={{ animation: `fadeUp 0.3s ease ${i * 0.04}s both` }}>
            <div className="ex-row"
              onClick={() => setActiveEx(activeEx === i ? null : i)}
              style={{
                background: completed[ex.name] ? '#39ff1403' : '#0a0a0a',
                padding: '1.4rem 1.2rem',
                borderBottom: '1px solid #0f0f0f',
                borderLeft: `2px solid ${activeEx === i ? current.accent : completed[ex.name] ? current.accent + '44' : 'transparent'}`,
                transition: 'all 0.2s'
              }}>

              {/* Main row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: '#111', border: `1px solid #1f1f1f`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#333', fontFamily: 'Orbitron', fontSize: '0.65rem', flexShrink: 0
                  }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      color: completed[ex.name] ? '#ffffff44' : '#fff',
                      fontWeight: 600, fontSize: '0.95rem', marginBottom: '3px',
                      textDecoration: completed[ex.name] ? 'line-through' : 'none'
                    }}>{ex.name}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#333', fontSize: '0.6rem', fontFamily: 'Orbitron' }}>{ex.focus.toUpperCase()}</span>
                      <span style={{ color: '#222' }}>·</span>
                      <span style={{ color: '#333', fontSize: '0.6rem' }}>{ex.muscles}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexShrink: 0 }}>
                  {[{ l: 'SETS', v: ex.sets }, { l: 'REPS', v: ex.reps }, { l: 'REST', v: `${ex.rest}s` }].map(s => (
                    <div key={s.l} style={{ textAlign: 'center' }}>
                      <div style={{ color: '#fff', fontFamily: 'Orbitron', fontWeight: 700, fontSize: '0.9rem' }}>{s.v}</div>
                      <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.5rem' }}>{s.l}</div>
                    </div>
                  ))}

                  {/* Complete */}
                  <button onClick={(e) => toggleComplete(e, ex.name)} style={{
                    width: '24px', height: '24px', borderRadius: '5px',
                    background: completed[ex.name] ? current.accent : 'transparent',
                    border: `1px solid ${completed[ex.name] ? current.accent : '#2a2a2a'}`,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0
                  }}>
                    {completed[ex.name] && <span style={{ color: '#000', fontSize: '0.65rem', fontWeight: 900 }}>✓</span>}
                  </button>
                </div>
              </div>

              {/* Effort bar */}
              <div style={{ marginTop: '0.8rem' }}>
                <div style={{ height: '2px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${ex.effort * 10}%`,
                    background: ex.effort >= 8 ? '#ff4444' : ex.effort >= 5 ? '#ffd700' : '#39ff14',
                    transition: 'width 0.8s'
                  }}/>
                </div>
              </div>
            </div>

            {/* Expanded */}
            {activeEx === i && (
              <div style={{
                background: '#060606', borderBottom: '1px solid #0f0f0f',
                borderLeft: `2px solid ${current.accent}`,
                padding: '1.2rem', animation: 'fadeUp 0.3s ease'
              }}>
                <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.55rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>FORM GUIDE</div>
                {ex.form.map((step, si) => (
                  <div key={si} style={{ display: 'flex', gap: '10px', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '18px', height: '18px', borderRadius: '4px',
                      background: '#0f0f0f', border: '1px solid #1a1a1a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#333', fontSize: '0.55rem', fontFamily: 'Orbitron', flexShrink: 0
                    }}>{si + 1}</div>
                    <div style={{ color: '#555', fontSize: '0.78rem', lineHeight: 1.6, paddingTop: '1px' }}>{step}</div>
                  </div>
                ))}
                <div style={{ padding: '0.8rem', background: '#0a0a0a', borderLeft: `2px solid ${current.accent}33`, marginTop: '0.8rem', marginBottom: '1rem' }}>
                  <div style={{ color: `${current.accent}66`, fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 1.5 }}>"{ex.cue}"</div>
                </div>

                {/* Start timer */}
                <button className="start-btn"
                  onClick={() => setTimerEx(ex)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'transparent', border: '1px solid #1f1f1f',
                    borderRadius: '8px', color: '#444',
                    fontFamily: 'Orbitron', fontSize: '0.65rem',
                    cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '2px'
                  }}>
                  START TIMER
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {timerEx && (
        <TimerModal exercise={timerEx} accentColor={current.accent} onClose={() => setTimerEx(null)} />
      )}
    </section>
  );
}
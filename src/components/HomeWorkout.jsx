import React, { useState } from 'react';

const workouts = [
  {
    name: 'PUSH-UPS', sets: '4', reps: '15', muscle: 'CHEST',
    difficulty: 'BEGINNER', effort: 6, color: '#ff6b6b',
    form: [
      'Place hands shoulder-width apart',
      'Keep body in straight line head to heel',
      'Lower chest to 1 inch above floor',
      'Push back up, fully extend arms',
    ],
    cue: 'Squeeze chest at top of every rep'
  },
  {
    name: 'BODYWEIGHT SQUATS', sets: '4', reps: '20', muscle: 'LEGS',
    difficulty: 'BEGINNER', effort: 5, color: '#39ff14',
    form: [
      'Feet shoulder-width, toes slightly out',
      'Keep chest up, back straight',
      'Drive knees out over toes',
      'Go below parallel, full depth',
    ],
    cue: 'Sit back like sitting on a chair'
  },
  {
    name: 'PLANK HOLD', sets: '3', reps: '60s', muscle: 'CORE',
    difficulty: 'INTERMEDIATE', effort: 7, color: '#00d4ff',
    form: [
      'Forearms on ground, elbows under shoulders',
      'Body forms straight line hip to head',
      'Squeeze glutes and abs tight',
      'Breathe steady throughout hold',
    ],
    cue: 'Do not let hips sag or rise'
  },
  {
    name: 'BURPEES', sets: '3', reps: '10', muscle: 'FULL BODY',
    difficulty: 'ADVANCED', effort: 10, color: '#ff4444',
    form: [
      'Stand, drop hands to floor',
      'Jump feet back into push-up position',
      'Perform one push-up',
      'Jump feet to hands, explode upward',
    ],
    cue: 'Move fast, land softly on feet'
  },
  {
    name: 'REVERSE LUNGES', sets: '3', reps: '12', muscle: 'LEGS',
    difficulty: 'BEGINNER', effort: 6, color: '#ffd700',
    form: [
      'Stand tall, hands on hips',
      'Step one foot back, lower knee to floor',
      'Front knee stays over ankle, not forward',
      'Push through front heel to return',
    ],
    cue: 'Keep torso upright, do not lean forward'
  },
  {
    name: 'MOUNTAIN CLIMBERS', sets: '3', reps: '30', muscle: 'CORE',
    difficulty: 'INTERMEDIATE', effort: 8, color: '#a29bfe',
    form: [
      'Start in high push-up position',
      'Drive one knee toward chest',
      'Quickly switch legs, running motion',
      'Keep hips level with shoulders',
    ],
    cue: 'Fast pace, do not let hips bounce'
  },
  {
    name: 'DIAMOND PUSH-UPS', sets: '3', reps: '12', muscle: 'TRICEPS',
    difficulty: 'INTERMEDIATE', effort: 7, color: '#ff9f43',
    form: [
      'Form diamond shape with thumbs and index fingers',
      'Hands directly under chest center',
      'Keep elbows tucked close to body',
      'Lower chest to hands, press back up',
    ],
    cue: 'Feel the burn in triceps, not shoulders'
  },
  {
    name: 'GLUTE BRIDGES', sets: '4', reps: '20', muscle: 'GLUTES',
    difficulty: 'BEGINNER', effort: 5, color: '#fd79a8',
    form: [
      'Lie on back, knees bent, feet flat',
      'Drive hips up squeezing glutes hard',
      'Hold at top for 2 seconds',
      'Lower slowly back to floor',
    ],
    cue: 'Squeeze glutes like cracking a walnut'
  },
  {
    name: 'TRICEP DIPS', sets: '3', reps: '15', muscle: 'TRICEPS',
    difficulty: 'BEGINNER', effort: 6, color: '#00b894',
    form: [
      'Hands on chair edge behind you, fingers forward',
      'Lower body bending elbows to 90 degrees',
      'Keep back close to the chair',
      'Press back up to full arm extension',
    ],
    cue: 'Elbows point straight back, not sideways'
  },
  {
    name: 'JUMP SQUATS', sets: '3', reps: '15', muscle: 'LEGS',
    difficulty: 'ADVANCED', effort: 9, color: '#6c5ce7',
    form: [
      'Squat down to parallel position',
      'Explode upward jumping off both feet',
      'Reach full extension in the air',
      'Land softly with bent knees into next squat',
    ],
    cue: 'Land quiet means good form'
  },
  {
    name: 'SUPERMAN HOLD', sets: '3', reps: '15', muscle: 'BACK',
    difficulty: 'BEGINNER', effort: 5, color: '#fdcb6e',
    form: [
      'Lie face down, arms extended forward',
      'Lift arms, chest and legs off floor together',
      'Hold at top for 2 seconds',
      'Lower slowly back to start',
    ],
    cue: 'Squeeze shoulder blades together at top'
  },
  {
    name: 'BEAR CRAWL', sets: '3', reps: '30s', muscle: 'FULL BODY',
    difficulty: 'INTERMEDIATE', effort: 8, color: '#e17055',
    form: [
      'On hands and knees, knees hover 2 inches off floor',
      'Move opposite hand and foot together',
      'Keep back flat, hips low',
      'Move forward then backward for full set',
    ],
    cue: 'Slow and controlled beats fast and sloppy'
  },
];

const diffColor = { BEGINNER: '#39ff14', INTERMEDIATE: '#ffd700', ADVANCED: '#ff4444' };

function EffortBar({ effort, color }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: '#444', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '1px' }}>EFFORT</span>
        <span style={{ color: color, fontSize: '0.6rem', fontFamily: 'Orbitron' }}>{effort}/10</span>
      </div>
      <div style={{ height: '4px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${effort * 10}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: '4px',
          boxShadow: `0 0 8px ${color}`,
          transition: 'width 0.8s ease'
        }}/>
      </div>
    </div>
  );
}

export default function HomeWorkout() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const muscles = ['ALL', 'CHEST', 'LEGS', 'CORE', 'TRICEPS', 'GLUTES', 'BACK', 'FULL BODY'];
  const filtered = filter === 'ALL' ? workouts : workouts.filter(w => w.muscle === filter);

  return (
    <section id="home-workout" style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes expandDown { from{opacity:0;max-height:0} to{opacity:1;max-height:500px} }
        .w-card { transition: all 0.3s !important; cursor: pointer; }
        .w-card:hover { transform: translateY(-5px) !important; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#ffd70011', border: '1px solid #ffd70030',
          padding: '6px 20px', borderRadius: '30px', marginBottom: '1rem'
        }}>
          <div style={{ width: '6px', height: '6px', background: '#ffd700', borderRadius: '50%' }}/>
          <span style={{ color: '#ffd700', fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '3px' }}>NO EQUIPMENT NEEDED</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', fontFamily: 'Orbitron',
          background: 'linear-gradient(135deg, #fff 30%, #ffd700 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem'
        }}>HOME WORKOUT</h2>
        <p style={{ color: '#333', fontSize: '0.85rem' }}>12 exercises · Proper form · Real results</p>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {muscles.map(m => (
          <button key={m} onClick={() => setFilter(m)} style={{
            padding: '0.45rem 1.1rem', borderRadius: '50px',
            background: filter === m ? '#ffd700' : '#0a0a0a',
            border: `1px solid ${filter === m ? '#ffd700' : '#1a1a1a'}`,
            color: filter === m ? '#000' : '#444',
            fontFamily: 'Orbitron', fontSize: '0.6rem',
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: filter === m ? '0 0 15px #ffd70044' : 'none',
            fontWeight: filter === m ? 700 : 400
          }}>{m}</button>
        ))}
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {filtered.map((w, i) => (
          <div key={w.name} className="w-card"
            onClick={() => setActive(active === i ? null : i)}
            style={{
              background: active === i
                ? `linear-gradient(145deg, ${w.color}08, #0a0a0a)`
                : '#0a0a0a',
              border: `1px solid ${active === i ? w.color + '44' : '#141414'}`,
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: active === i ? `0 8px 40px ${w.color}18` : '0 2px 20px rgba(0,0,0,0.4)',
              animation: `fadeUp 0.4s ease ${i * 0.04}s both`
            }}>

            {/* Top color bar */}
            <div style={{ height: '3px', background: `linear-gradient(90deg, ${w.color}, transparent)` }}/>

            <div style={{ padding: '1.4rem' }}>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{
                    color: '#fff', fontFamily: 'Orbitron', fontSize: '0.95rem',
                    fontWeight: 700, marginBottom: '5px', letterSpacing: '0.5px'
                  }}>{w.name}</div>
                  <span style={{
                    color: diffColor[w.difficulty], fontSize: '0.6rem',
                    fontFamily: 'Orbitron', letterSpacing: '1px'
                  }}>{w.difficulty}</span>
                </div>
                <div style={{
                  background: `${w.color}11`, border: `1px solid ${w.color}33`,
                  color: w.color, padding: '3px 10px', borderRadius: '8px',
                  fontSize: '0.6rem', fontFamily: 'Orbitron', whiteSpace: 'nowrap'
                }}>{w.muscle}</div>
              </div>

              {/* Effort bar */}
              <EffortBar effort={w.effort} color={w.color} />

              {/* Sets / Reps */}
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
                {[{ l: 'SETS', v: w.sets }, { l: 'REPS', v: w.reps }].map(s => (
                  <div key={s.l} style={{
                    flex: 1, background: '#060606',
                    border: `1px solid ${w.color}18`, borderRadius: '10px',
                    padding: '0.7rem', textAlign: 'center'
                  }}>
                    <div style={{ color: w.color, fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 700 }}>{s.v}</div>
                    <div style={{ color: '#333', fontSize: '0.6rem', fontFamily: 'Orbitron' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Expand tip */}
              {active === i && (
                <div style={{ animation: 'expandDown 0.4s ease' }}>
                  {/* Form steps */}
                  <div style={{
                    background: '#060606', borderRadius: '12px',
                    padding: '1rem', marginBottom: '0.8rem',
                    border: `1px solid ${w.color}18`
                  }}>
                    <div style={{ color: w.color, fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>PROPER FORM</div>
                    {w.form.map((step, si) => (
                      <div key={si} style={{
                        display: 'flex', gap: '0.8rem', alignItems: 'flex-start',
                        marginBottom: si < w.form.length - 1 ? '0.6rem' : 0
                      }}>
                        <div style={{
                          minWidth: '20px', height: '20px',
                          background: `${w.color}22`, border: `1px solid ${w.color}44`,
                          borderRadius: '50%', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: w.color,
                          fontSize: '0.6rem', fontFamily: 'Orbitron', fontWeight: 700
                        }}>{si + 1}</div>
                        <div style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.5, paddingTop: '2px' }}>{step}</div>
                      </div>
                    ))}
                  </div>

                  {/* Coach cue */}
                  <div style={{
                    padding: '0.8rem 1rem',
                    background: `${w.color}0a`,
                    border: `1px solid ${w.color}22`,
                    borderLeft: `3px solid ${w.color}`,
                    borderRadius: '0 10px 10px 0',
                    color: w.color, fontSize: '0.78rem',
                    lineHeight: 1.5, fontStyle: 'italic'
                  }}>
                    "{w.cue}"
                  </div>
                </div>
              )}

              {/* Toggle */}
              <div style={{
                textAlign: 'center', marginTop: '0.8rem',
                color: active === i ? w.color : '#222',
                fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '1px',
                transition: 'color 0.3s'
              }}>
                {active === i ? '▲ CLOSE' : '▼ FORM GUIDE'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
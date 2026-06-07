import React, { useState } from 'react';

const splits = {
  PUSH: {
    color: '#ff6b6b', desc: 'Chest · Shoulders · Triceps', days: 'Mon / Thu',
    exercises: [
      {
        name: 'BARBELL BENCH PRESS', sets: 4, reps: '6-8', focus: 'COMPOUND',
        effort: 9, muscles: 'Lower & Mid Chest',
        form: [
          'Grip slightly wider than shoulder width',
          'Retract shoulder blades into bench',
          'Lower bar to lower chest with control',
          'Drive feet into floor, press explosively',
        ],
        cue: 'Think about bending the bar toward you to activate chest'
      },
      {
        name: 'INCLINE DUMBBELL PRESS', sets: 3, reps: '10-12', focus: 'UPPER CHEST',
        effort: 7, muscles: 'Upper Chest',
        form: [
          'Set bench to 30-45 degree angle',
          'Dumbbells at chest level, elbows 45 degrees out',
          'Press up and slightly together at top',
          'Lower slowly, feel the stretch at bottom',
        ],
        cue: 'Squeeze upper chest hard at full extension'
      },
      {
        name: 'CABLE CHEST FLY', sets: 3, reps: '12-15', focus: 'ISOLATION',
        effort: 5, muscles: 'Mid Chest',
        form: [
          'Stand centered between cables, slight forward lean',
          'Arms slightly bent, wide arc motion',
          'Bring hands together in front of chest',
          'Control the negative all the way back',
        ],
        cue: 'Imagine hugging a tree, not pushing'
      },
      {
        name: 'OVERHEAD PRESS', sets: 4, reps: '8-10', focus: 'COMPOUND',
        effort: 8, muscles: 'Front & Side Delts',
        form: [
          'Bar rests on upper chest, grip shoulder width',
          'Brace core tight, slight forward lean',
          'Press straight up, move head back slightly',
          'Lock out arms at top, bring head through',
        ],
        cue: 'Push your head through the window at lockout'
      },
      {
        name: 'LATERAL RAISES', sets: 3, reps: '15-20', focus: 'ISOLATION',
        effort: 6, muscles: 'Side Delts',
        form: [
          'Slight bend in elbows throughout',
          'Raise arms to side until parallel to floor',
          'Lead with elbows, not wrists',
          'Lower slowly over 3 seconds',
        ],
        cue: 'Pour water from a jug at the top'
      },
      {
        name: 'TRICEP PUSHDOWN', sets: 3, reps: '12-15', focus: 'ISOLATION',
        effort: 5, muscles: 'All 3 Tricep Heads',
        form: [
          'Elbows pinned to sides, do not move them',
          'Start with forearms parallel to floor',
          'Push down to full extension',
          'Squeeze triceps hard at bottom',
        ],
        cue: 'Elbows stay glued to your sides the entire set'
      },
    ]
  },
  PULL: {
    color: '#00d4ff', desc: 'Back · Biceps · Rear Delts', days: 'Tue / Fri',
    exercises: [
      {
        name: 'CONVENTIONAL DEADLIFT', sets: 4, reps: '4-6', focus: 'COMPOUND',
        effort: 10, muscles: 'Full Posterior Chain',
        form: [
          'Bar over mid-foot, hip width stance',
          'Hinge at hips, grip just outside legs',
          'Chest up, back straight, big breath and brace',
          'Drive floor away, keep bar close to body',
        ],
        cue: 'Protect your armpits with your arms to keep bar tight'
      },
      {
        name: 'WEIGHTED PULL-UPS', sets: 4, reps: '6-10', focus: 'COMPOUND',
        effort: 9, muscles: 'Lats & Biceps',
        form: [
          'Dead hang start, shoulder width grip',
          'Initiate by depressing shoulder blades',
          'Pull elbows down and back toward hips',
          'Chin over bar, lower slowly over 3 seconds',
        ],
        cue: 'Pull the bar down to you, not yourself up to the bar'
      },
      {
        name: 'BARBELL BENT OVER ROW', sets: 4, reps: '8-10', focus: 'COMPOUND',
        effort: 8, muscles: 'Mid Back & Lats',
        form: [
          'Hinge forward 45 degrees, back straight',
          'Overhand grip, slightly wider than shoulders',
          'Pull bar to lower chest or upper abs',
          'Drive elbows back and squeeze hard',
        ],
        cue: 'Row to your belly button for lower lats, nipple for upper'
      },
      {
        name: 'SEATED CABLE ROW', sets: 3, reps: '12-15', focus: 'COMPOUND',
        effort: 6, muscles: 'Mid Back',
        form: [
          'Sit tall, slight arch in lower back',
          'Pull handle to belly button',
          'Squeeze shoulder blades together at end',
          'Reach forward fully to stretch lats each rep',
        ],
        cue: 'Full stretch at the front is where the gains are'
      },
      {
        name: 'FACE PULLS', sets: 3, reps: '15-20', focus: 'REAR DELT',
        effort: 4, muscles: 'Rear Delts & Rotator Cuff',
        form: [
          'Cable at forehead height, rope attachment',
          'Pull rope to face, elbows above wrists',
          'Externally rotate at end, thumbs behind ears',
          'Slow controlled movement, feel rear delts',
        ],
        cue: 'Elbows high and wide like a double bicep pose'
      },
      {
        name: 'BARBELL BICEP CURL', sets: 3, reps: '10-12', focus: 'ISOLATION',
        effort: 6, muscles: 'Biceps',
        form: [
          'Shoulder width underhand grip, elbows at sides',
          'Curl up without swinging body',
          'Squeeze biceps hard at top',
          'Lower slowly over 3 seconds, full extension',
        ],
        cue: 'Full extension at the bottom is non-negotiable'
      },
    ]
  },
  LEGS: {
    color: '#39ff14', desc: 'Quads · Hamstrings · Calves', days: 'Wed / Sat',
    exercises: [
      {
        name: 'BARBELL BACK SQUAT', sets: 4, reps: '6-8', focus: 'COMPOUND',
        effort: 10, muscles: 'Quads, Glutes & Hamstrings',
        form: [
          'Bar on upper traps, feet shoulder width',
          'Brace core, take big breath before descent',
          'Break at hips and knees simultaneously',
          'Drive knees out, go below parallel',
        ],
        cue: 'Spread the floor apart with your feet as you stand up'
      },
      {
        name: 'ROMANIAN DEADLIFT', sets: 3, reps: '10-12', focus: 'HAMSTRINGS',
        effort: 8, muscles: 'Hamstrings & Glutes',
        form: [
          'Hip width stance, slight bend in knees',
          'Hinge at hips, push them back',
          'Bar stays close to legs throughout',
          'Feel hamstrings stretch at bottom, drive hips through',
        ],
        cue: 'Stop when you feel the hamstring stretch, not when bar hits the floor'
      },
      {
        name: 'LEG PRESS', sets: 4, reps: '12-15', focus: 'COMPOUND',
        effort: 7, muscles: 'Quads & Glutes',
        form: [
          'Feet shoulder width at mid plate',
          'Lower until knees reach 90 degrees',
          'Do not let lower back peel off pad',
          'Drive through whole foot, not just toes',
        ],
        cue: 'High foot placement targets glutes, low targets quads'
      },
      {
        name: 'LYING LEG CURL', sets: 3, reps: '12-15', focus: 'ISOLATION',
        effort: 5, muscles: 'Hamstrings',
        form: [
          'Lie face down, pad just above heel',
          'Curl heels toward glutes smoothly',
          'Hold at peak contraction 1 second',
          'Lower slowly over 3 seconds',
        ],
        cue: 'Flex your hamstrings like flexing a bicep'
      },
      {
        name: 'LEG EXTENSION', sets: 3, reps: '15-20', focus: 'ISOLATION',
        effort: 5, muscles: 'Quads',
        form: [
          'Sit with back against pad, knees at edge',
          'Extend legs to full lockout',
          'Squeeze quads hard at top for 1 second',
          'Lower controlled, do not swing',
        ],
        cue: 'Lock out fully at top or you miss the peak contraction'
      },
      {
        name: 'STANDING CALF RAISES', sets: 4, reps: '20-25', focus: 'CALVES',
        effort: 4, muscles: 'Gastrocnemius & Soleus',
        form: [
          'Ball of foot on edge of step',
          'Lower heel fully below step level',
          'Rise up to full extension on tip toes',
          'Pause 1 second at top and bottom',
        ],
        cue: 'Full range is everything, partial reps do nothing'
      },
    ]
  }
};

function EffortBar({ effort, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ color: '#333', fontSize: '0.58rem', fontFamily: 'Orbitron', letterSpacing: '1px' }}>EFFORT</span>
        <span style={{ color, fontSize: '0.58rem', fontFamily: 'Orbitron' }}>{effort}/10</span>
      </div>
      <div style={{ height: '3px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${effort * 10}%`,
          background: `linear-gradient(90deg, ${color}66, ${color})`,
          borderRadius: '4px', transition: 'width 0.8s ease'
        }}/>
      </div>
    </div>
  );
}

export default function GymWorkout() {
  const [activeDay, setActiveDay] = useState('PUSH');
  const [activeEx, setActiveEx] = useState(null);
  const current = splits[activeDay];

  const handleDayChange = (day) => {
    setActiveDay(day);
    setActiveEx(null);
  };

  return (
    <section id="gym-workout" style={{ padding: '6rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:translateY(0)} }
        @keyframes expandDown { from{opacity:0;max-height:0;overflow:hidden} to{opacity:1;max-height:600px} }
        .ex-row { transition: all 0.3s !important; cursor: pointer; }
        .ex-row:hover { background: #111 !important; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#ff6b6b11', border: '1px solid #ff6b6b30',
          padding: '6px 20px', borderRadius: '30px', marginBottom: '1rem'
        }}>
          <div style={{ width: '6px', height: '6px', background: '#ff6b6b', borderRadius: '50%' }}/>
          <span style={{ color: '#ff6b6b', fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '3px' }}>PPL PROGRAM</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', fontFamily: 'Orbitron',
          background: 'linear-gradient(135deg, #fff 30%, #ff6b6b 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem'
        }}>GYM SPLIT</h2>
        <p style={{ color: '#333', fontSize: '0.85rem' }}>6 days · 3 sessions · Maximum gains</p>
      </div>

      {/* Day tabs */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {Object.keys(splits).map(day => (
          <button key={day} onClick={() => handleDayChange(day)} style={{
            padding: '0.9rem 2rem', borderRadius: '14px',
            background: activeDay === day ? `${splits[day].color}18` : '#0a0a0a',
            border: `1px solid ${activeDay === day ? splits[day].color : '#1a1a1a'}`,
            color: activeDay === day ? splits[day].color : '#444',
            fontFamily: 'Orbitron', fontSize: '0.9rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: activeDay === day ? `0 0 25px ${splits[day].color}33` : 'none'
          }}>{day}</button>
        ))}
      </div>

      {/* Day info bar */}
      <div style={{
        background: `linear-gradient(135deg, ${current.color}0a, #0a0a0a)`,
        border: `1px solid ${current.color}22`,
        borderRadius: '16px', padding: '1.2rem 1.8rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ color: current.color, fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '4px' }}>TARGET MUSCLES</div>
          <div style={{ color: '#fff', fontWeight: 600 }}>{current.desc}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: current.color, fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '4px' }}>TRAINING DAYS</div>
          <div style={{ color: '#fff', fontWeight: 600 }}>{current.days}</div>
        </div>
      </div>

      {/* Exercise list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {current.exercises.map((ex, i) => (
          <div key={ex.name} style={{ animation: `fadeUp 0.3s ease ${i * 0.05}s both` }}>
            {/* Exercise header row */}
            <div className="ex-row"
              onClick={() => setActiveEx(activeEx === i ? null : i)}
              style={{
                background: activeEx === i ? `${current.color}08` : '#0a0a0a',
                border: `1px solid ${activeEx === i ? current.color + '33' : '#141414'}`,
                borderRadius: activeEx === i ? '16px 16px 0 0' : '16px',
                padding: '1.2rem 1.5rem',
                borderLeft: `3px solid ${current.color}`,
                transition: 'all 0.3s'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    background: `${current.color}18`,
                    border: `1px solid ${current.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: current.color, fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 700,
                    flexShrink: 0
                  }}>{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px' }}>{ex.name}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        background: `${current.color}11`, border: `1px solid ${current.color}22`,
                        color: current.color, padding: '1px 8px', borderRadius: '6px',
                        fontSize: '0.58rem', fontFamily: 'Orbitron'
                      }}>{ex.focus}</span>
                      <span style={{ color: '#333', fontSize: '0.75rem' }}>{ex.muscles}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <div style={{
                    background: '#060606', padding: '0.4rem 0.7rem',
                    borderRadius: '8px', border: `1px solid ${current.color}22`, textAlign: 'center'
                  }}>
                    <div style={{ color: current.color, fontFamily: 'Orbitron', fontSize: '0.9rem', fontWeight: 700 }}>{ex.sets}</div>
                    <div style={{ color: '#222', fontSize: '0.55rem', fontFamily: 'Orbitron' }}>SETS</div>
                  </div>
                  <div style={{
                    background: '#060606', padding: '0.4rem 0.7rem',
                    borderRadius: '8px', border: `1px solid ${current.color}22`, textAlign: 'center'
                  }}>
                    <div style={{ color: current.color, fontFamily: 'Orbitron', fontSize: '0.9rem', fontWeight: 700 }}>{ex.reps}</div>
                    <div style={{ color: '#222', fontSize: '0.55rem', fontFamily: 'Orbitron' }}>REPS</div>
                  </div>
                  <div style={{ color: activeEx === i ? current.color : '#222', fontSize: '0.8rem', transition: 'all 0.3s', marginLeft: '4px' }}>
                    {activeEx === i ? '▲' : '▼'}
                  </div>
                </div>
              </div>
              {/* Effort bar always visible */}
              <EffortBar effort={ex.effort} color={current.color} />
            </div>

            {/* Expanded form guide */}
            {activeEx === i && (
              <div style={{
                background: '#060606',
                border: `1px solid ${current.color}22`,
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                padding: '1.2rem 1.5rem',
                animation: 'expandDown 0.4s ease'
              }}>
                {/* Form steps */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: current.color, fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '0.8rem' }}>PROPER FORM</div>
                  {ex.form.map((step, si) => (
                    <div key={si} style={{
                      display: 'flex', gap: '0.8rem', alignItems: 'flex-start',
                      marginBottom: si < ex.form.length - 1 ? '0.7rem' : 0
                    }}>
                      <div style={{
                        minWidth: '22px', height: '22px',
                        background: `${current.color}18`,
                        border: `1px solid ${current.color}33`,
                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: current.color,
                        fontSize: '0.58rem', fontFamily: 'Orbitron', fontWeight: 700, flexShrink: 0
                      }}>{si + 1}</div>
                      <div style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.6, paddingTop: '3px' }}>{step}</div>
                    </div>
                  ))}
                </div>

                {/* Coach cue */}
                <div style={{
                  padding: '0.9rem 1rem',
                  background: `${current.color}08`,
                  border: `1px solid ${current.color}20`,
                  borderLeft: `3px solid ${current.color}`,
                  borderRadius: '0 10px 10px 0',
                  color: current.color, fontSize: '0.8rem',
                  lineHeight: 1.6, fontStyle: 'italic'
                }}>
                  "{ex.cue}"
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
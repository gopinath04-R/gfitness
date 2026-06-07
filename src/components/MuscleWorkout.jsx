import React, { useState } from 'react';

const muscles = {
  CHEST: { color: '#ff6b6b', exercises: [
    { name: 'Flat Bench Press', sets: '4x8', type: 'COMPOUND' },
    { name: 'Incline Press', sets: '3x10', type: 'COMPOUND' },
    { name: 'Cable Fly', sets: '3x12', type: 'ISOLATION' },
    { name: 'Dips', sets: '3x10', type: 'COMPOUND' },
  ]},
  BACK: { color: '#00d4ff', exercises: [
    { name: 'Deadlift', sets: '4x5', type: 'COMPOUND' },
    { name: 'Pull-Ups', sets: '4x8', type: 'COMPOUND' },
    { name: 'Seated Row', sets: '3x12', type: 'COMPOUND' },
    { name: 'Lat Pulldown', sets: '3x10', type: 'WIDTH' },
  ]},
  SHOULDERS: { color: '#ffd700', exercises: [
    { name: 'Overhead Press', sets: '4x8', type: 'COMPOUND' },
    { name: 'Lateral Raises', sets: '3x15', type: 'ISOLATION' },
    { name: 'Front Raises', sets: '3x12', type: 'ISOLATION' },
    { name: 'Face Pulls', sets: '3x15', type: 'REAR DELT' },
  ]},
  ARMS: { color: '#ff9f43', exercises: [
    { name: 'Barbell Curl', sets: '3x12', type: 'BICEPS' },
    { name: 'Hammer Curl', sets: '3x12', type: 'BICEPS' },
    { name: 'Skull Crushers', sets: '3x10', type: 'TRICEPS' },
    { name: 'Tricep Pushdown', sets: '3x12', type: 'TRICEPS' },
  ]},
  LEGS: { color: '#39ff14', exercises: [
    { name: 'Barbell Squat', sets: '4x8', type: 'COMPOUND' },
    { name: 'Leg Press', sets: '4x12', type: 'COMPOUND' },
    { name: 'Romanian DL', sets: '3x10', type: 'HAMSTRINGS' },
    { name: 'Calf Raises', sets: '4x20', type: 'CALVES' },
  ]},
  CORE: { color: '#a29bfe', exercises: [
    { name: 'Plank', sets: '3x60s', type: 'ISOMETRIC' },
    { name: 'Hanging Leg Raise', sets: '3x15', type: 'LOWER ABS' },
    { name: 'Cable Crunch', sets: '3x20', type: 'UPPER ABS' },
    { name: 'Russian Twist', sets: '3x20', type: 'OBLIQUES' },
  ]},
};

export default function MuscleWorkout() {
  const [active, setActive] = useState('CHEST');
  const current = muscles[active];

  return (
    <section id="muscles" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-block',
          background: '#a29bfe11', border: '1px solid #a29bfe44',
          color: '#a29bfe', padding: '4px 20px', borderRadius: '20px',
          fontSize: '0.7rem', fontFamily: 'Orbitron', letterSpacing: '3px',
          marginBottom: '1rem'
        }}>TARGET SPECIFIC</div>
        <h2 style={{
          fontSize: '2.8rem', fontFamily: 'Orbitron',
          background: 'linear-gradient(135deg, #fff, #a29bfe)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>MUSCLE GROUPS</h2>
      </div>

      {/* Muscle selector */}
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {Object.keys(muscles).map(m => (
          <button key={m} onClick={() => setActive(m)} style={{
            padding: '0.7rem 1.4rem', borderRadius: '12px',
            background: active === m ? `${muscles[m].color}22` : '#0f0f0f',
            border: `1px solid ${active === m ? muscles[m].color : '#222'}`,
            color: active === m ? muscles[m].color : '#444',
            fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: active === m ? `0 0 15px ${muscles[m].color}33` : 'none'
          }}>{m}</button>
        ))}
      </div>

      {/* Exercise list */}
      <div style={{
        background: `linear-gradient(135deg, ${current.color}08, #0f0f0f)`,
        border: `1px solid ${current.color}22`,
        borderRadius: '24px', padding: '2rem', overflow: 'hidden'
      }}>
        {current.exercises.map((ex, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.2rem', marginBottom: '0.8rem',
            background: '#0a0a0a', borderRadius: '14px',
            border: `1px solid ${current.color}22`,
            transition: 'all 0.3s'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = current.color;
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${current.color}22`;
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: `${current.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: current.color, fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 700
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{ex.name}</div>
                <div style={{
                  display: 'inline-block', marginTop: '4px',
                  background: `${current.color}11`, border: `1px solid ${current.color}33`,
                  color: current.color, padding: '1px 8px', borderRadius: '6px',
                  fontSize: '0.6rem', fontFamily: 'Orbitron'
                }}>{ex.type}</div>
              </div>
            </div>
            <div style={{
              color: current.color, fontFamily: 'Orbitron',
              fontSize: '1rem', fontWeight: 700
            }}>{ex.sets}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
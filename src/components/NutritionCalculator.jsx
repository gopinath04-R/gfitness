import React, { useState } from 'react';

export default function NutritionCalculator() {
  const [form, setForm] = useState({ weight: '', height: '', age: '', gender: 'male', goal: 'maintain', activity: '1.55' });
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  const calculate = () => {
    const { weight, height, age, gender, goal, activity } = form;
    if (!weight || !height || !age) return;
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    let cal = bmr * parseFloat(activity);
    if (goal === 'lose') cal -= 500;
    if (goal === 'gain') cal += 500;
    setShow(false);
    setTimeout(() => {
      setResult({
        calories: Math.round(cal),
        protein: Math.round(weight * 2),
        carbs: Math.round((cal * 0.45) / 4),
        fat: Math.round((cal * 0.25) / 9),
        water: (weight * 0.033).toFixed(1),
        fiber: Math.round(cal / 1000 * 14)
      });
      setShow(true);
    }, 300);
  };

  const inputBase = {
    width: '100%', padding: '0.9rem 1rem',
    background: '#080808', border: '1px solid #1f1f1f',
    borderRadius: '14px', color: '#fff', fontSize: '1rem',
    outline: 'none', transition: 'all 0.3s', fontFamily: 'Inter'
  };

  return (
    <section id="nutrition" style={{ padding: '6rem 1.5rem', maxWidth: '640px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        @keyframes fillBar { from { width: 0%; } }
        .nut-input:focus { border-color: #00d4ff !important; box-shadow: 0 0 0 3px #00d4ff11 !important; }
        .nut-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 30px #00d4ff55 !important; }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#00d4ff11', border: '1px solid #00d4ff33',
          padding: '6px 20px', borderRadius: '30px', marginBottom: '1rem'
        }}>
          <div style={{ width: '6px', height: '6px', background: '#00d4ff', borderRadius: '50%' }}/>
          <span style={{ color: '#00d4ff', fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '3px' }}>DAILY MACROS</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 6vw, 3rem)', fontFamily: 'Orbitron',
          background: 'linear-gradient(135deg, #ffffff 30%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>NUTRITION PLAN</h2>
        <p style={{ color: '#444', fontSize: '0.85rem' }}>Fuel your body. Crush your goals.</p>
      </div>

      <div style={{
        background: 'linear-gradient(145deg, #111, #0a0a0a)',
        border: '1px solid #00d4ff22', borderRadius: '28px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, #00d4ff10, transparent 70%)',
          borderRadius: '50%'
        }}/>

        {/* Grid inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
          {[
            { label: 'WEIGHT', unit: 'kg', key: 'weight', ph: '70' },
            { label: 'HEIGHT', unit: 'cm', key: 'height', ph: '170' },
            { label: 'AGE', unit: 'yrs', key: 'age', ph: '25' },
          ].map(({ label, unit, key, ph }) => (
            <div key={key}>
              <div style={{ color: '#00d4ff', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '6px' }}>{label}</div>
              <div style={{ position: 'relative' }}>
                <input className="nut-input" style={{ ...inputBase, paddingRight: '2rem', fontFamily: 'Orbitron', fontWeight: 700 }}
                  type="number" placeholder={ph}
                  value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                />
                <span style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#00d4ff55', fontSize: '0.6rem', fontFamily: 'Orbitron' }}>{unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gender toggle */}
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ color: '#00d4ff', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '8px' }}>GENDER</div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {[{ v: 'male', l: 'MALE' }, { v: 'female', l: 'FEMALE' }].map(g => (
              <button key={g.v} onClick={() => setForm({ ...form, gender: g.v })} style={{
                flex: 1, padding: '0.8rem',
                background: form.gender === g.v ? '#00d4ff22' : '#080808',
                border: `1px solid ${form.gender === g.v ? '#00d4ff' : '#1f1f1f'}`,
                borderRadius: '12px', color: form.gender === g.v ? '#00d4ff' : '#444',
                fontFamily: 'Orbitron', fontSize: '0.75rem', cursor: 'pointer',
                transition: 'all 0.3s', letterSpacing: '1px',
                boxShadow: form.gender === g.v ? '0 0 15px #00d4ff22' : 'none'
              }}>{g.l}</button>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ color: '#00d4ff', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '8px' }}>ACTIVITY LEVEL</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { v: '1.2', l: 'SEDENTARY', desc: 'Little or no exercise' },
              { v: '1.375', l: 'LIGHT', desc: '1-3 days/week' },
              { v: '1.55', l: 'MODERATE', desc: '3-5 days/week' },
              { v: '1.725', l: 'ACTIVE', desc: '6-7 days/week' },
              { v: '1.9', l: 'ATHLETE', desc: 'Twice daily' },
            ].map(a => (
              <button key={a.v} onClick={() => setForm({ ...form, activity: a.v })} style={{
                padding: '0.7rem 1rem',
                background: form.activity === a.v ? '#00d4ff11' : '#080808',
                border: `1px solid ${form.activity === a.v ? '#00d4ff' : '#1a1a1a'}`,
                borderRadius: '10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <span style={{ color: form.activity === a.v ? '#00d4ff' : '#555', fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '1px' }}>{a.l}</span>
                <span style={{ color: '#333', fontSize: '0.75rem' }}>{a.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#00d4ff', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '8px' }}>FITNESS GOAL</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
            {[
              { v: 'lose', l: 'FAT LOSS', c: '#ff6b6b' },
              { v: 'maintain', l: 'MAINTAIN', c: '#00d4ff' },
              { v: 'gain', l: 'MUSCLE GAIN', c: '#39ff14' },
            ].map(g => (
              <button key={g.v} onClick={() => setForm({ ...form, goal: g.v })} style={{
                padding: '0.9rem 0.5rem',
                background: form.goal === g.v ? `${g.c}22` : '#080808',
                border: `1px solid ${form.goal === g.v ? g.c : '#1a1a1a'}`,
                borderRadius: '12px', color: form.goal === g.v ? g.c : '#444',
                fontFamily: 'Orbitron', fontSize: '0.6rem', cursor: 'pointer',
                transition: 'all 0.3s', letterSpacing: '0.5px',
                boxShadow: form.goal === g.v ? `0 0 15px ${g.c}22` : 'none'
              }}>{g.l}</button>
            ))}
          </div>
        </div>

        <button className="nut-btn" onClick={calculate} style={{
          width: '100%', padding: '1.1rem',
          background: 'linear-gradient(135deg, #00d4ff, #39ff14)',
          border: 'none', borderRadius: '14px',
          color: '#000', fontSize: '0.85rem', fontWeight: 900,
          fontFamily: 'Orbitron', letterSpacing: '3px',
          cursor: 'pointer', transition: 'all 0.3s',
          boxShadow: '0 4px 20px #00d4ff44'
        }}>CALCULATE MACROS</button>

        {show && result && (
          <div style={{ marginTop: '2rem', animation: 'fadeUp 0.5s ease' }}>
            {/* Calorie hero */}
            <div style={{
              background: 'linear-gradient(135deg, #00d4ff11, #080808)',
              border: '1px solid #00d4ff33', borderRadius: '20px',
              padding: '2rem', textAlign: 'center', marginBottom: '1.2rem'
            }}>
              <div style={{ color: '#444', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '3px', marginBottom: '4px' }}>DAILY CALORIES</div>
              <div style={{
                fontSize: 'clamp(3rem, 10vw, 5rem)', fontFamily: 'Orbitron', fontWeight: 900,
                color: '#00d4ff', textShadow: '0 0 40px #00d4ff88', lineHeight: 1
              }}>{result.calories}</div>
              <div style={{ color: '#333', fontSize: '0.8rem', marginTop: '4px' }}>kcal per day</div>
            </div>

            {/* Macro bars */}
            {[
              { label: 'PROTEIN', val: result.protein, max: 250, unit: 'g', color: '#ff6b6b', desc: 'Builds muscle' },
              { label: 'CARBS', val: result.carbs, max: 400, unit: 'g', color: '#ffd700', desc: 'Primary energy' },
              { label: 'FATS', val: result.fat, max: 120, unit: 'g', color: '#ff9f43', desc: 'Hormones & joints' },
              { label: 'FIBER', val: result.fiber, max: 40, unit: 'g', color: '#a29bfe', desc: 'Digestive health' },
            ].map(m => (
              <div key={m.label} style={{
                background: '#080808', borderRadius: '14px',
                padding: '1rem 1.2rem', marginBottom: '0.8rem',
                border: `1px solid ${m.color}22`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <span style={{ color: m.color, fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 700 }}>{m.label}</span>
                    <span style={{ color: '#333', fontSize: '0.75rem', marginLeft: '8px' }}>{m.desc}</span>
                  </div>
                  <span style={{ color: '#fff', fontFamily: 'Orbitron', fontWeight: 700 }}>{m.val}<span style={{ color: '#333', fontSize: '0.7rem' }}>{m.unit}</span></span>
                </div>
                <div style={{ height: '6px', background: '#111', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min((m.val / m.max) * 100, 100)}%`,
                    background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                    borderRadius: '6px',
                    boxShadow: `0 0 8px ${m.color}88`,
                    animation: 'fillBar 1s ease'
                  }}/>
                </div>
              </div>
            ))}

            {/* Water */}
            <div style={{
              background: '#080808', borderRadius: '14px', padding: '1rem 1.2rem',
              border: '1px solid #00d4ff22',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <div style={{ color: '#00d4ff', fontFamily: 'Orbitron', fontSize: '0.75rem' }}>DAILY WATER</div>
                <div style={{ color: '#333', fontSize: '0.75rem', marginTop: '2px' }}>Stay hydrated</div>
              </div>
              <div style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 700 }}>
                {result.water}<span style={{ color: '#333', fontSize: '0.8rem' }}>L</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
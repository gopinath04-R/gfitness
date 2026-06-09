import React, { useState } from 'react';

function AnimatedNumber({ value, color }) {
  const [display, setDisplay] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const target = parseFloat(value);
    const step = 16;
    const increment = target / (1000 / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(parseFloat(start.toFixed(1)));
    }, step);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div style={{
      fontSize: 'clamp(4rem, 12vw, 6rem)',
      fontFamily: 'Orbitron', fontWeight: 900,
      color: color, textShadow: `0 0 60px ${color}, 0 0 120px ${color}44`,
      lineHeight: 1
    }}>{display.toFixed(1)}</div>
  );
}

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'UNDERWEIGHT', color: '#00d4ff', advice: 'Increase calorie intake & strength train' };
    if (bmi < 25) return { label: 'NORMAL', color: '#39ff14', advice: 'Keep it up! Maintain your routine' };
    if (bmi < 30) return { label: 'OVERWEIGHT', color: '#ffd700', advice: 'Add cardio & reduce processed foods' };
    return { label: 'OBESE', color: '#ff4444', advice: 'Start with walking & clean diet' };
  };

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0) return;
    const bmi = parseFloat((w / (h * h)).toFixed(1));
    const cat = getCategory(bmi);
    setShow(false);
    setTimeout(() => {
      setResult({ bmi, ...cat });
      setShow(true);
    }, 300);
  };

  const idealWeight = height ? {
    min: (18.5 * Math.pow(parseFloat(height) / 100, 2)).toFixed(1),
    max: (24.9 * Math.pow(parseFloat(height) / 100, 2)).toFixed(1),
  } : null;

  const percent = result ? Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100) : 0;

  const inputStyle = {
    width: '100%', padding: '1rem',
    background: '#060606', border: '1px solid #1a1a1a',
    borderRadius: '14px', color: '#fff',
    fontSize: '1.2rem', outline: 'none',
    transition: 'all 0.3s', fontFamily: 'Orbitron', fontWeight: 700
  };

  return (
    <section id="bmi" style={{ padding: '6rem 1.5rem', maxWidth: '580px', margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .bmi-inp:focus{border-color:#39ff14!important;box-shadow:0 0 0 3px #39ff1415!important;}
        .calc-btn:hover{transform:translateY(-3px)!important;box-shadow:0 12px 40px #39ff1466!important;}
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#39ff1408', border: '1px solid #39ff1430',
          padding: '6px 20px', borderRadius: '30px', marginBottom: '1.2rem'
        }}>
          <div style={{ width: '6px', height: '6px', background: '#39ff14', borderRadius: '50%' }}/>
          <span style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '3px' }}>BODY MASS INDEX</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', fontFamily: 'Orbitron',
          background: 'linear-gradient(135deg, #fff 0%, #39ff14 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>BMI CALCULATOR</h2>
        <p style={{ color: '#333', fontSize: '0.85rem', fontFamily: 'Orbitron', letterSpacing: '1px' }}>Know your body. Own your health.</p>
      </div>

      <div style={{
        background: 'linear-gradient(145deg, #0e0e0e, #080808)',
        border: '1px solid #39ff1418', borderRadius: '28px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
      }}>
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'180px', height:'180px', background:'radial-gradient(circle, #39ff1412 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }}/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          {[
            { label: 'HEIGHT', unit: 'cm', val: height, set: setHeight, ph: '170' },
            { label: 'WEIGHT', unit: 'kg', val: weight, set: setWeight, ph: '70' },
          ].map(({ label, unit, val, set, ph }) => (
            <div key={label}>
              <div style={{ color: '#39ff14', fontSize: '0.62rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '8px' }}>{label}</div>
              <div style={{ position: 'relative' }}>
                <input className="bmi-inp" style={{ ...inputStyle, paddingRight: '2.5rem' }}
                  type="number" placeholder={ph} value={val}
                  onChange={e => set(e.target.value)}
                />
                <span style={{ position:'absolute', right:'0.8rem', top:'50%', transform:'translateY(-50%)', color:'#39ff1455', fontSize:'0.65rem', fontFamily:'Orbitron' }}>{unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#39ff14', fontSize: '0.62rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '8px' }}>AGE</div>
          <div style={{ position: 'relative' }}>
            <input className="bmi-inp" style={{ ...inputStyle, paddingRight: '2.5rem' }}
              type="number" placeholder="25" value={age}
              onChange={e => setAge(e.target.value)}
            />
            <span style={{ position:'absolute', right:'0.8rem', top:'50%', transform:'translateY(-50%)', color:'#39ff1455', fontSize:'0.65rem', fontFamily:'Orbitron' }}>yrs</span>
          </div>
        </div>

        {idealWeight && (
          <div style={{
            padding: '0.8rem 1rem', background: '#39ff1408',
            border: '1px solid #39ff1420', borderRadius: '10px',
            marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between'
          }}>
            <span style={{ color: '#444', fontSize: '0.75rem' }}>Ideal weight for your height</span>
            <span style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '0.75rem' }}>{idealWeight.min} — {idealWeight.max} kg</span>
          </div>
        )}

        <button className="calc-btn" onClick={calculate} style={{
          width: '100%', padding: '1.2rem',
          background: 'linear-gradient(135deg, #39ff14, #00ff88)',
          border: 'none', borderRadius: '14px',
          color: '#000', fontSize: '0.85rem', fontWeight: 900,
          fontFamily: 'Orbitron', letterSpacing: '3px',
          cursor: 'pointer', transition: 'all 0.3s',
          boxShadow: '0 4px 25px #39ff1444'
        }}>CALCULATE BMI</button>

        {show && result && (
          <div style={{ marginTop: '2rem', animation: 'fadeUp 0.6s ease' }}>
            <div style={{
              background: `linear-gradient(135deg, ${result.color}0f, #060606)`,
              border: `1px solid ${result.color}30`,
              borderRadius: '22px', padding: '2rem',
              textAlign: 'center', marginBottom: '1.5rem',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ color: '#333', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '0.8rem' }}>YOUR BMI SCORE</div>
              <AnimatedNumber value={result.bmi} color={result.color} />
              <div style={{
                display: 'inline-block', marginTop: '1rem',
                background: `${result.color}18`, border: `1px solid ${result.color}44`,
                color: result.color, padding: '5px 24px', borderRadius: '30px',
                fontFamily: 'Orbitron', fontSize: '0.8rem', letterSpacing: '3px'
              }}>{result.label}</div>
              <div style={{ color: '#444', fontSize: '0.8rem', marginTop: '1rem', lineHeight: 1.6 }}>{result.advice}</div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ height: '12px', background: '#0a0a0a', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1a1a1a', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #00d4ff 0%, #39ff14 30%, #ffd700 65%, #ff4444 100%)', opacity: 0.2 }}/>
                <div style={{
                  height: '100%', width: `${percent}%`,
                  background: `linear-gradient(90deg, #39ff14, ${result.color})`,
                  borderRadius: '12px', boxShadow: `0 0 15px ${result.color}88`,
                  transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1)'
                }}/>
              </div>
            </div>

            {idealWeight && (
              <div style={{
                padding: '1rem', background: '#39ff1408',
                border: '1px solid #39ff1420', borderRadius: '14px',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '1.2rem'
              }}>
                <div>
                  <div style={{ color: '#39ff14', fontFamily: 'Orbitron', fontSize: '0.7rem' }}>IDEAL WEIGHT RANGE</div>
                  <div style={{ color: '#333', fontSize: '0.75rem', marginTop: '2px' }}>Based on your height</div>
                </div>
                <div style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '1.1rem', fontWeight: 700 }}>
                  {idealWeight.min}–{idealWeight.max}<span style={{ color: '#333', fontSize: '0.7rem' }}> kg</span>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              {[
                { label: 'Underweight', range: '< 18.5', c: '#00d4ff' },
                { label: 'Normal', range: '18.5 — 24.9', c: '#39ff14' },
                { label: 'Overweight', range: '25 — 29.9', c: '#ffd700' },
                { label: 'Obese', range: '> 30', c: '#ff4444' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '0.9rem', background: result.label === item.label.toUpperCase() ? `${item.c}0f` : '#060606',
                  borderRadius: '12px', border: `1px solid ${result.label === item.label.toUpperCase() ? item.c : '#111'}`,
                  borderLeft: `3px solid ${item.c}`, transition: 'all 0.3s'
                }}>
                  <div style={{ color: item.c, fontSize: '0.7rem', fontFamily: 'Orbitron' }}>{item.label}</div>
                  <div style={{ color: '#333', fontSize: '0.75rem', marginTop: '3px' }}>{item.range}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
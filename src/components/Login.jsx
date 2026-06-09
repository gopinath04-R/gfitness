import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
        await updateProfile(res.user, { displayName: form.name });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(.*\)/, ''));
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  const inputStyle = {
    width: '100%', padding: '1rem 1.2rem',
    background: '#080808', border: '1px solid #1a1a1a',
    borderRadius: '14px', color: '#fff', fontSize: '1rem',
    outline: 'none', transition: 'all 0.3s', fontFamily: 'Inter',
    marginBottom: '1rem'
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'radial-gradient(ellipse at 30% 50%, #0a1a0a 0%, #050505 60%)',
      position: 'relative', overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .login-inp:focus { border-color: #39ff14 !important; box-shadow: 0 0 0 3px #39ff1415 !important; }
        .login-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 30px #39ff1466 !important; }
        .google-btn:hover { background: #1a1a1a !important; border-color: #fff !important; }
      `}</style>

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(#39ff1406 1px, transparent 1px), linear-gradient(90deg, #39ff1406 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none'
      }}/>

      {/* Corner decorations */}
      <div style={{ position:'absolute', top:'20px', left:'20px', width:'50px', height:'50px', border:'1px solid #39ff1422', borderRight:'none', borderBottom:'none' }}/>
      <div style={{ position:'absolute', top:'20px', right:'20px', width:'50px', height:'50px', border:'1px solid #39ff1422', borderLeft:'none', borderBottom:'none' }}/>
      <div style={{ position:'absolute', bottom:'20px', left:'20px', width:'50px', height:'50px', border:'1px solid #39ff1422', borderRight:'none', borderTop:'none' }}/>
      <div style={{ position:'absolute', bottom:'20px', right:'20px', width:'50px', height:'50px', border:'1px solid #39ff1422', borderLeft:'none', borderTop:'none' }}/>

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'linear-gradient(145deg, #0e0e0e, #080808)',
        border: '1px solid #39ff1420', borderRadius: '28px',
        padding: '2.5rem', position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        animation: 'fadeUp 0.6s ease'
      }}>
        {/* Glow */}
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'180px', height:'180px', background:'radial-gradient(circle, #39ff1412 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }}/>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontFamily: 'Orbitron', fontSize: '2rem', fontWeight: 900,
            marginBottom: '0.5rem', animation: 'float 3s ease-in-out infinite'
          }}>
            G<span style={{ color: '#39ff14', textShadow: '0 0 20px #39ff14' }}>FITNESS</span>
          </div>
          <div style={{ color: '#333', fontSize: '0.75rem', fontFamily: 'Orbitron', letterSpacing: '2px' }}>
            {mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{
          display: 'flex', background: '#060606',
          borderRadius: '12px', padding: '4px', marginBottom: '1.5rem',
          border: '1px solid #1a1a1a'
        }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              style={{
                flex: 1, padding: '0.7rem',
                background: mode === m ? '#39ff14' : 'transparent',
                border: 'none', borderRadius: '10px',
                color: mode === m ? '#000' : '#444',
                fontFamily: 'Orbitron', fontSize: '0.75rem',
                fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
                letterSpacing: '1px'
              }}>
              {m === 'login' ? 'LOGIN' : 'SIGN UP'}
            </button>
          ))}
        </div>

        {/* Inputs */}
        {mode === 'signup' && (
          <div>
            <div style={{ color: '#39ff14', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '6px' }}>NAME</div>
            <input className="login-inp" style={inputStyle}
              type="text" placeholder="Your name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
        )}

        <div style={{ color: '#39ff14', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '6px' }}>EMAIL</div>
        <input className="login-inp" style={inputStyle}
          type="email" placeholder="your@email.com"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <div style={{ color: '#39ff14', fontSize: '0.6rem', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '6px' }}>PASSWORD</div>
        <input className="login-inp" style={inputStyle}
          type="password" placeholder="••••••••"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
        />

        {/* Error */}
        {error && (
          <div style={{
            background: '#ff444411', border: '1px solid #ff444433',
            borderRadius: '10px', padding: '0.8rem',
            color: '#ff4444', fontSize: '0.8rem', marginBottom: '1rem'
          }}>{error}</div>
        )}

        {/* Submit */}
        <button className="login-btn" onClick={handleSubmit} disabled={loading}
          style={{
            width: '100%', padding: '1.1rem',
            background: 'linear-gradient(135deg, #39ff14, #00ff88)',
            border: 'none', borderRadius: '14px',
            color: '#000', fontSize: '0.85rem', fontWeight: 900,
            fontFamily: 'Orbitron', letterSpacing: '2px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 25px #39ff1444',
            opacity: loading ? 0.7 : 1,
            marginBottom: '1rem'
          }}>
          {loading ? 'LOADING...' : mode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }}/>
          <span style={{ color: '#333', fontSize: '0.75rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }}/>
        </div>

        {/* Google */}
        <button className="google-btn" onClick={handleGoogle}
          style={{
            width: '100%', padding: '1rem',
            background: '#0a0a0a', border: '1px solid #2a2a2a',
            borderRadius: '14px', color: '#fff',
            fontSize: '0.85rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (isAuthenticated) {
    const dest = location.state?.from?.pathname || '/admin';
    return <Navigate to={dest} replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(username, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-glow" />
      <div className="admin-login-card">
        <div className="brand-row">
          <svg className="logo-mark" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="13" fill="#0b2846" />
            <path d="M24 12c6.5 0 10.5 4 10.5 4s-2 6.5-10.5 6.5S13.5 16 13.5 16 17.5 12 24 12Z" stroke="#c6a15b" strokeWidth="2" />
            <path d="M13.5 32s2-6.5 10.5-6.5S34.5 32 34.5 32s-4 4-10.5 4S13.5 32 13.5 32Z" stroke="#c6a15b" strokeWidth="2" />
          </svg>
          <div>
            <span className="logo-word">SURGNATE</span>
            <span className="logo-sub" style={{ display: 'block' }}>Admin Panel</span>
          </div>
        </div>

        <h2>Welcome back</h2>
        <p className="lede">Sign in to manage products, media and customer inquiries.</p>

        {error && (
          <div className="admin-login-error"><Icon name="alert" /> {error}</div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Username</label>
            <div className="input-icon">
              <Icon name="user" />
              <input id="username" autoFocus value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <Icon name="lock" />
              <input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              <button type="button" className="toggle-eye" onClick={() => setShowPw(s => !s)} aria-label="Toggle password visibility">
                <Icon name={showPw ? 'eyeOff' : 'eye'} />
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-gold btn-block" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'} <Icon name="arrowRight" />
          </button>
        </form>

        <p className="admin-login-hint">Default credentials: <b>admin</b> / <b>Surgnate@123</b> — change this in <code>server/.env</code>.</p>
      </div>
    </div>
  );
}

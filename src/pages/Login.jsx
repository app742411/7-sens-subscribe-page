import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to dashboard automatically
    const token = sessionStorage.getItem('7sens_admin_token') || localStorage.getItem('7sens_admin_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('error');
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const endpoint = '/api/admin/auth/login';
      const apiUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username: email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false || data.statusCode === 401) {
        const errorText = data.message || data.error || 'Invalid email or password';
        setStatus('error');
        setErrorMsg(errorText);
        return;
      }

      // Save auth token in sessionStorage
      const token = data.token || data.accessToken || data.data?.token || 'authenticated_admin_session';
      sessionStorage.setItem('7sens_admin_token', token);
      sessionStorage.setItem('7sens_admin_email', email);

      setStatus('idle');
      navigate('/dashboard');
    } catch (err) {
      console.warn('Login API connection error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Failed to sign in. Please check your network connection.');
    }
  };

  return (
    <div className="login-page-container">
      {/* Background artwork */}
      <div className="bg-canvas-luxury">
        <div className="hero-art-bg" />
      </div>

      <div className="login-card-wrapper">
        {/* Logo Brand */}
        <div className="login-logo-header">
          <Link to="/">
            <img src="/7sens.webp" alt="7Sens" style={{ height: '48px', width: 'auto' }} />
          </Link>
          <div className="login-subtitle">ADMINISTRATION PORTAL</div>
        </div>

        <div className="login-card">
          <div className="login-title-box">
            <Shield size={22} color="#C5A059" />
            <h2>Admin Sign In</h2>
          </div>
          <p className="login-desc">Enter your credentials to access the 7Sens admin dashboard.</p>

          {status === 'error' && (
            <div className="login-error-alert">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={17} className="input-icon" />
                <input
                  type="email"
                  placeholder="admin@7-sens.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={17} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={status === 'loading'}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="login-card-footer">
            <Link to="/" className="back-to-home-link">
              ← Return to Main Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

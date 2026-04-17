import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { FiMail, FiLock } from 'react-icons/fi';

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(async () => {
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        const data = await response.json();

        if (response.ok) {
          login(data);
          navigate('/');
        } else {
          setError(data.error || 'Invalid email or password. Please try again.');
        }
      } catch (err) {
        setError('Server error connecting to database');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-card-header">
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👤</div>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </div>
          <div className="auth-card-body">
            {error && (
              <div style={{
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#991b1b',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                marginBottom: '16px',
              }}>
                ⚠️ {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-icon">
                  <span className="icon"><FiMail /></span>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-icon">
                  <span className="icon"><FiLock /></span>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                <Link to="/login" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? '⏳ Signing in...' : '🔐 Login'}
              </button>
            </form>
          </div>
          <div className="auth-footer">
            New to Testapiqa?{' '}
            <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

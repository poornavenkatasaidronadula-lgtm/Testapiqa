import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('ae_users') || '[]');
      if (users.find(u => u.email === form.email)) {
        setError('Email already registered. Please login.');
        setLoading(false);
        return;
      }
      const newUser = { name: form.name, email: form.email, phone: form.phone, password: form.password };
      users.push(newUser);
      localStorage.setItem('ae_users', JSON.stringify(users));
      login(newUser);
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-card-header">
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
            <h2>Create Account</h2>
            <p>Join Testapiqa today</p>
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
                <label className="form-label">Full Name</label>
                <div className="form-input-icon">
                  <span className="icon"><FiUser /></span>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
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
                <label className="form-label">Phone Number</label>
                <div className="form-input-icon">
                  <span className="icon"><FiPhone /></span>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
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
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="form-input-icon">
                  <span className="icon"><FiLock /></span>
                  <input
                    type="password"
                    name="confirm"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={form.confirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? '⏳ Creating Account...' : '✅ Create Account'}
              </button>
            </form>
          </div>
          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

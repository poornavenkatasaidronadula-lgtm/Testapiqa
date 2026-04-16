import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { FiMail, FiUser } from 'react-icons/fi';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', confirm: '',
    firstName: '', lastName: '', company: '', address: '', address2: '',
    country: 'India', state: '', city: '', zipcode: '', mobile: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Please fill in your name and email first.');
      return;
    }
    setError('');
    setStep(2);
  };

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
    if (!form.firstName || !form.lastName || !form.address || !form.state || !form.city || !form.zipcode || !form.mobile) {
      setError('Please fill in all required address fields.');
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
      const newUser = { 
        name: form.name, email: form.email, password: form.password,
        firstName: form.firstName, lastName: form.lastName, company: form.company,
        address: form.address, address2: form.address2, country: form.country,
        state: form.state, city: form.city, zipcode: form.zipcode, mobile: form.mobile
      };
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
            {step === 1 ? (
              <form onSubmit={nextStep}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <div className="form-input-icon">
                    <span className="icon"><FiUser /></span>
                    <input type="text" name="name" className="form-input" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <div className="form-input-icon">
                    <span className="icon"><FiMail /></span>
                    <input type="email" name="email" className="form-input" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <button type="submit" className="form-submit">
                  Continue to Address Information
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: '16px', color: 'var(--primary)', textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>ACCOUNT INFORMATION</h3>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input type="password" name="password" className="form-input" placeholder="Create a password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password *</label>
                  <input type="password" name="confirm" className="form-input" placeholder="Confirm your password" value={form.confirm} onChange={handleChange} required />
                </div>

                <h3 style={{ marginTop: '30px', marginBottom: '16px', color: 'var(--primary)', textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>ADDRESS INFORMATION</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">First name *</label>
                    <input type="text" name="firstName" className="form-input" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last name *</label>
                    <input type="text" name="lastName" className="form-input" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input type="text" name="company" className="form-input" value={form.company} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Address * (Street address, P.O. Box, Company name, etc.)</label>
                  <input type="text" name="address" className="form-input" value={form.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Address 2</label>
                  <input type="text" name="address2" className="form-input" value={form.address2} onChange={handleChange} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <select name="country" className="form-input" value={form.country} onChange={handleChange} required>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input type="text" name="state" className="form-input" value={form.state} onChange={handleChange} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input type="text" name="city" className="form-input" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Zipcode *</label>
                    <input type="text" name="zipcode" className="form-input" value={form.zipcode} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input type="tel" name="mobile" className="form-input" value={form.mobile} onChange={handleChange} required />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="button" className="form-submit" style={{ background: '#e0e0e0', color: '#333' }} onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? '⏳ Creating Account...' : '✅ Create Account'}
                  </button>
                </div>
              </form>
            )}
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

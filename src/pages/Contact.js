import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>📧 Contact us</h1>
        <p>Get in touch with us — we'd love to hear from you</p>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact us</span>
          </div>
        </div>
      </div>

      <div className="contact-page">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div>
              <h2 className="section-title">Get in <span>Touch</span></h2>
              <div className="section-divider" style={{ margin: '0.75rem 0 1.5rem' }}></div>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '8px' }}>
                Have questions or need help? We're here for you. Reach out via any of the
                channels below or fill the form and we'll get back to you shortly.
              </p>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="icon-wrap"><FiPhone /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="icon-wrap"><FiMail /></div>
                  <div>
                    <h4>Email</h4>
                    <p>support@testapiqa.com</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="icon-wrap"><FiMapPin /></div>
                  <div>
                    <h4>Address</h4>
                    <p>123 Test Street, QA City, 400001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px' }}>
                Send us a Message
              </h3>
              {sent ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ marginBottom: '8px', color: '#16a34a' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-gray)' }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    className="btn-primary"
                    style={{ marginTop: '16px' }}
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-input"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Message</label>
                    <textarea
                      name="message"
                      className="form-input"
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? '⏳ Sending...' : <><FiSend /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

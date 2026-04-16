import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { MdOutlineStorefront } from 'react-icons/md';

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/products', label: 'Products', icon: '🛍️' },
    { to: '/test-cases', label: 'Test Cases', icon: '📋' },
    { to: '/contact', label: 'Contact us', icon: '📧' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <span className="brand-icon"><MdOutlineStorefront /></span>
            Testapiqa
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar-nav">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://youtube.com/@qaframeworkfactory?si=KK5aYvaQXEGWCCxd" target="_blank" rel="noreferrer" className="nav-link">
                Video Tutorials
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            <Link to="/cart" className="nav-icon-btn" title="Cart">
              <FiShoppingCart />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.reduce((a, b) => a + b.qty, 0)}</span>
              )}
            </Link>
            {user ? (
              <button
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                onClick={logout}
              >
                <FiUser /> Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                <FiUser /> Signup / Login
              </Link>
            )}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <><span/><span/><span/></>
              ) : (
                <><span/><span/><span/></>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <a
            href="https://youtube.com/@qaframeworkfactory?si=KK5aYvaQXEGWCCxd"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            onClick={() => setMobileOpen(false)}
          >
            ▶️ Video Tutorials
          </a>
          {!user && (
            <Link to="/login" className="nav-link" onClick={() => setMobileOpen(false)}>
              👤 Signup / Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

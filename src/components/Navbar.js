import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import { FiShoppingCart, FiUser, FiHome, FiGrid, FiClipboard, FiMail, FiYoutube } from 'react-icons/fi';
import { MdOutlineStorefront } from 'react-icons/md';

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/products', label: 'Products', icon: <FiGrid /> },
    { to: '/test-cases', label: 'Test Cases', icon: <FiClipboard /> },
    { to: '/contact', label: 'Contact us', icon: <FiMail /> },
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
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  {link.icon} {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://youtube.com/@qaframeworkfactory?si=KK5aYvaQXEGWCCxd" target="_blank" rel="noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiYoutube /> Video Tutorials
              </a>
            </li>
            <li>
              <Link to="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <span className="cart-count" style={{ marginLeft: '4px', position: 'static' }}>{cartItems.reduce((a, b) => a + b.qty, 0)}</span>
                )}
              </Link>
            </li>
            <li>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: '600' }}>
                    <FiUser /> Hi, {user.firstName || user.name}
                  </span>
                  <button className="nav-link" onClick={logout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '0', fontSize: '1rem', fontWeight: 600 }}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiUser /> Signup / Login
                </Link>
              )}
            </li>
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
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
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
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
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FiYoutube /> Video Tutorials
          </a>
          <Link to="/cart" className="nav-link" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiShoppingCart /> Cart ({cartItems.reduce((a, b) => a + b.qty, 0)})
          </Link>
          {!user ? (
            <Link to="/login" className="nav-link" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiUser /> Signup / Login
            </Link>
          ) : (
            <>
              <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                <FiUser /> Hi, {user.firstName || user.name}
              </div>
              <button className="nav-link" onClick={() => { logout(); setMobileOpen(false); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', width: '100%', textAlign: 'left', fontSize: '1rem', fontWeight: '600' }}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

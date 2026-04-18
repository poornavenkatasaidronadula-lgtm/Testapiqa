import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import { FiShoppingCart, FiUser, FiHome, FiGrid, FiClipboard, FiYoutube, FiPackage } from 'react-icons/fi';
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
                {link.external ? (
                  <a href={link.to} target="_blank" rel="noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {link.icon} {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    {link.icon} {link.label}
                  </Link>
                )}
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
                <div className="user-menu-container">
                  <span className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>
                    <FiUser /> Hi, {user.firstName || user.name}
                  </span>
                  <div className="user-dropdown">
                    <Link to="/orders" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiPackage /> Orders
                    </Link>
                    <button className="nav-link" onClick={logout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', fontSize: '1rem', fontWeight: 600, width: '100%', textAlign: 'left' }}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiUser /> Signup / Login
                </Link>
              )}
            </li>
            <li>
              <a href="https://topmate.io/qaframeworkfactory/2052890" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--primary)', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, textDecoration: 'none', marginLeft: '6px', transition: '0.2s', boxShadow: '0 4px 6px rgba(249, 115, 22, 0.2)' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FiUser /> Enroll Now
              </a>
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
            link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {link.icon} {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {link.icon} {link.label}
              </Link>
            )
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
              <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '28px' }}>
                <FiPackage /> Orders
              </Link>
              <button className="nav-link" onClick={() => { logout(); setMobileOpen(false); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', width: '100%', textAlign: 'left', fontSize: '1rem', fontWeight: '600' }}>
                Logout
              </button>
            </>
          )}
          <a
            href="https://topmate.io/qaframeworkfactory/2052890"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--primary)', color: '#fff', padding: '12px', borderRadius: '6px', fontWeight: 600, textDecoration: 'none', marginTop: '12px', boxShadow: '0 4px 6px rgba(249, 115, 22, 0.2)' }}
          >
            <FiUser /> Enroll Now
          </a>
        </div>
      </div>
    </nav>
  );
}

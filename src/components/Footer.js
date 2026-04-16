import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineStorefront } from 'react-icons/md';

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div>
              <div className="footer-brand">
                <MdOutlineStorefront />
                Testapiqa
              </div>
              <p className="footer-description">
                Full-fledged practice website for QA Engineers. All testers can use
                this website for automation practice and API testing at any skill level.
              </p>

            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/products">🛍️ Products</Link></li>
                <li><Link to="/cart">🛒 Cart</Link></li>
                <li><Link to="/login">👤 Login / Signup</Link></li>
                <li><Link to="/test-cases">📋 Test Cases</Link></li>
                <li><Link to="/contact">📧 Contact us</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li><Link to="/products/women">👗 Women's Wear</Link></li>
                <li><Link to="/products/men">👔 Men's Wear</Link></li>
                <li><Link to="/products/kids">🧒 Kids' Collection</Link></li>
                <li><Link to="/products/dress">Dresses</Link></li>
                <li><Link to="/products/tops">Tops</Link></li>
                <li><Link to="/products/saree">Sarees</Link></li>
              </ul>
            </div>

            {/* Info */}
            <div className="footer-col">
              <h4>Information</h4>
              <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">Terms & Conditions</Link></li>
                <li><Link to="/">Return Policy</Link></li>
                <li><Link to="/">Shipping Info</Link></li>
                <li><Link to="/test-cases">API List</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Testapiqa. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/">Privacy</Link>
              <Link to="/">Terms</Link>
              <Link to="/">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

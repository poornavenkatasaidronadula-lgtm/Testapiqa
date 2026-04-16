import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="toast">
      <span className="toast-icon">🛒</span>
      <span>{message}</span>
    </div>
  );
}

export default function Home() {
  const [toasts, setToasts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const featuredProducts = products.slice(0, 8);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const filteredProducts = activeCategory === 'All'
    ? featuredProducts
    : featuredProducts.filter(p => p.category === activeCategory);

  return (
    <>

      {/* Features Bar */}
      <section className="features-bar">
        <div className="container">
          <div className="features-bar-grid">
            <div className="feature-bar-item">

            </div>
            <div className="feature-bar-item">
              <div className="icon-wrap"><FiRefreshCw /></div>
              <div>
                <h4>Easy Returns</h4>
                <p>30 day return policy</p>
              </div>
            </div>
            <div className="feature-bar-item">
              <div className="icon-wrap"><FiShield /></div>
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure transactions</p>
              </div>
            </div>
            <div className="feature-bar-item">
              <div className="icon-wrap"><FiHeadphones /></div>
              <div>
                <h4>24/7 Support</h4>
                <p>Dedicated customer support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Shop by <span>Category</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Explore our wide range of fashion categories</p>
          </div>
          <div className="category-grid">
            <Link to="/products/women" className="category-card">
              <span className="cat-icon">👗</span>
              <h3>Women</h3>
              <p>Explore women's fashion</p>
              <div className="sub-items">
                <span className="sub-tag">Dress</span>
                <span className="sub-tag">Tops</span>
                <span className="sub-tag">Saree</span>
              </div>
            </Link>
            <Link to="/products/men" className="category-card">
              <span className="cat-icon">👔</span>
              <h3>Men</h3>
              <p>Discover men's collection</p>
              <div className="sub-items">
                <span className="sub-tag">Tshirts</span>
                <span className="sub-tag">Jeans</span>
              </div>
            </Link>
            <Link to="/products/kids" className="category-card">
              <span className="cat-icon">🧒</span>
              <h3>Kids</h3>
              <p>Cute kids' clothing</p>
              <div className="sub-items">
                <span className="sub-tag">Dress</span>
                <span className="sub-tag">Tops & Shirts</span>
              </div>
            </Link>
            <Link to="/products" className="category-card">
              <span className="cat-icon">🏷️</span>
              <h3>All Products</h3>
              <p>Browse everything</p>
              <div className="sub-items">
                <span className="sub-tag">18+ Products</span>
                <span className="sub-tag">8 Brands</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Features <span>Items</span></h2>
              <div className="section-divider" style={{ margin: '0.75rem 0 0' }}></div>
            </div>
            <Link to="/products" className="view-all">
              View All Products <FiArrowRight />
            </Link>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['All', 'Women', 'Men', 'Kids'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: '2px solid',
                  borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border)',
                  background: activeCategory === cat ? 'var(--primary)' : '#fff',
                  color: activeCategory === cat ? '#fff' : 'var(--text-dark)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} showToast={showToast} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/products" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">What Our <span>Users Say</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Trusted by QA professionals worldwide</p>
          </div>
          <div className="testimonials-grid">
            {[
              { name: 'Priya Sharma', role: 'QA Engineer at TCS', text: 'Testapiqa is the best practice platform I have used. The test cases are comprehensive and well documented.', stars: 5, initial: 'P' },
              { name: 'Rahul Verma', role: 'SDET at Infosys', text: 'The API endpoints here are perfect for API automation testing. I recommend this to all my junior colleagues.', stars: 5, initial: 'R' },
              { name: 'Anita Patel', role: 'Test Lead at Wipro', text: 'Great website for selenium practice. The UI interactions are similar to real-world e-commerce applications.', stars: 4, initial: 'A' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div className="testimonial-author-info">
                    <h5>{t.name}</h5>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} message={t.msg} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </>
  );
}

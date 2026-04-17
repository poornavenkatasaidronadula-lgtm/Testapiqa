import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { CartContext } from '../App';
import ProductCard from '../components/ProductCard';
import { FiShoppingCart, FiHeart, FiShare2, FiArrowLeft } from 'react-icons/fi';

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

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [toasts, setToasts] = useState([]);

  const product = products.find(p => p.id === parseInt(id));
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const isWishlisted = wishlist.find(p => p.id === product?.id);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
        <h2>Product not found</h2>
        <Link to="/products" className="btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
    showToast(`${product.name} (x${qty}) added to cart!`);
  };

  const isAddToCartDisabled = product.size && product.size.length > 0 && !selectedSize;

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/products">Products</Link>
            <span>›</span>
            <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary)' }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="product-detail">
        <div className="container">
          <div style={{ marginBottom: '16px' }}>
            <Link to="/products" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.88rem' }}>
              <FiArrowLeft /> Back to Products
            </Link>
          </div>

          <div className="product-detail-layout">
            {/* Images */}
            <div className="product-images">
              <img
                src={product.image}
                alt={product.name}
                className="product-main-img"
              />
              <div className="product-thumbnails">
                {[product.image, product.image, product.image, product.image].map((img, i) => (
                  <img key={i} src={img} alt={`${product.name} ${i + 1}`} className={`product-thumb${i === 0 ? ' active' : ''}`} />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="product-info">
              <div className="product-category-tag" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>
                {product.category} — {product.subcategory}
              </div>
              <h1>{product.name}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ color: '#f39c12', fontSize: '1.1rem' }}>
                  {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                </div>
                <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                  {product.rating} ({product.reviews} reviews)
                </span>
                <span style={{
                  background: product.inStock ? '#d1fae5' : '#fee2e2',
                  color: product.inStock ? '#065f46' : '#991b1b',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '600'
                }}>
                  {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </span>
              </div>

              <div className="product-price-detail">Rs. {product.price.toLocaleString()}</div>

              <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Size */}
              {product.size && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '0.9rem' }}>Select Size:</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.size.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '2px solid',
                          borderColor: selectedSize === s ? 'var(--primary)' : 'var(--border)',
                          background: selectedSize === s ? 'var(--primary)' : '#fff',
                          color: selectedSize === s ? '#fff' : 'var(--text-dark)',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '0.9rem' }}>Quantity:</div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="qty-value">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>

              {/* Product Meta */}
              <div className="product-meta">
                <div className="product-meta-item">
                  <span className="key">Brand:</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.brand}</span>
                </div>
                <div className="product-meta-item">
                  <span className="key">Color:</span>
                  <span>{product.color}</span>
                </div>
                <div className="product-meta-item">
                  <span className="key">Category:</span>
                  <span>{product.category} › {product.subcategory}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn" 
                  onClick={handleAddToCart}
                  disabled={isAddToCartDisabled}
                  style={{ opacity: isAddToCartDisabled ? 0.6 : 1, cursor: isAddToCartDisabled ? 'not-allowed' : 'pointer' }}
                >
                  <FiShoppingCart /> {isAddToCartDisabled ? 'Select a Size' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => { toggleWishlist(product); showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!'); }}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius)',
                    border: '2px solid',
                    borderColor: isWishlisted ? 'var(--primary)' : 'var(--border)',
                    background: isWishlisted ? 'var(--orange-light)' : '#fff',
                    color: isWishlisted ? 'var(--primary)' : 'var(--text-gray)',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'all 0.2s',
                  }}
                  title="Wishlist"
                >
                  <FiHeart />
                </button>
                <button
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius)',
                    border: '2px solid var(--border)',
                    background: '#fff',
                    color: 'var(--text-gray)',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'all 0.2s',
                  }}
                  title="Share"
                >
                  <FiShare2 />
                </button>
              </div>

              {/* Tags */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Tags:</span>
                {[product.category, product.subcategory, product.brand].map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: 'var(--bg-light)',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      color: 'var(--text-gray)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div style={{ marginTop: '60px' }}>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Related <span>Products</span></h2>
                  <div className="section-divider" style={{ margin: '0.75rem 0 0' }}></div>
                </div>
              </div>
              <div className="product-grid">
                {related.map(p => (
                  <ProductCard key={p.id} product={p} showToast={showToast} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} message={t.msg} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </>
  );
}

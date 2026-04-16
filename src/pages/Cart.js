import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-state">
            <div className="icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn-primary">
              <FiShoppingBag /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="cart-page">
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <Link to="/products" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items-section">
              <div className="cart-section-title">
                🛒 My Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
              </div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">Rs. {item.price.toLocaleString()}</div>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)} title="Remove">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="cart-summary-header">🏷️ Order Summary</div>
              <div className="cart-summary-body">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-row">
                    <span style={{ fontSize: '0.85rem' }}>{item.name} × {item.qty}</span>
                    <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#16a34a' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ background: 'var(--orange-light)', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--primary)', margin: '8px 0' }}>
                    📦 Add Rs. {(500 - subtotal).toLocaleString()} more for FREE shipping!
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="amount">Rs. {total.toLocaleString()}</span>
                </div>
                <button className="checkout-btn" onClick={() => {
                  if (!user) setShowAuthModal(true);
                  else alert('Order placed successfully! (Checkout flow placeholder)');
                }}>
                  🛍️ Proceed to Checkout
                </button>
                <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                  🔒 Secure checkout powered by SSL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && ReactDOM.createPortal(
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9998 }} onClick={() => setShowAuthModal(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '30px', borderRadius: '8px', zIndex: 9999, width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '15px', color: '#000' }}>Checkout Information</h3>
            <p style={{ color: '#555', marginBottom: '24px' }}>Register / Login account to proceed on checkout.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <Link to="/login" className="btn-primary" style={{ padding: '12px', textDecoration: 'none', background: 'var(--primary)', color: '#fff', borderRadius: '4px', fontWeight: 600 }}>Register / Login</Link>
               <button onClick={() => setShowAuthModal(false)} style={{ padding: '12px', background: 'transparent', color: '#555', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

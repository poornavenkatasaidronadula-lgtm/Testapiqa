import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { FiPackage, FiShoppingBag, FiCalendar, FiMapPin, FiTrash2 } from 'react-icons/fi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/orders/${user.email}`)
        .then(res => res.json())
        .then(data => {
           setOrders(data);
           setLoading(false);
        })
        .catch(err => {
           console.error("Failed to fetch orders:", err);
           setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
      } else {
        alert("Failed to delete order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting order.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#16a34a';
      case 'Processing': return '#d97706';
      case 'Shipped': return '#2563eb';
      case 'Cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Delivered': return '#dcfce7';
      case 'Processing': return '#fef3c7';
      case 'Shipped': return '#dbeafe';
      case 'Cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  if (!user) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="orders-empty-state">
            <div className="empty-icon">🔒</div>
            <h3>Please Login to View Orders</h3>
            <p>You need to be logged in to view your order history.</p>
            <Link to="/login" className="btn-primary">
              <FiShoppingBag /> Login / Signup
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <Link to="/">Home</Link>
              <span>›</span>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>My Orders</span>
            </div>
          </div>
        </div>
        <div className="orders-page">
          <div className="container">
            <div className="orders-empty-state">
              <div className="empty-icon">📦</div>
              <h3>No Orders Yet</h3>
              <p>You haven't placed any orders yet. Start shopping!</p>
              <Link to="/products" className="btn-primary">
                <FiShoppingBag /> Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading-spinner"></div>
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>My Orders</span>
          </div>
        </div>
      </div>

      <div className="orders-page">
        <div className="container">
          {/* Page Header */}
          <div className="orders-header">
            <div className="orders-header-left">
              <h2 className="orders-title">
                <FiPackage style={{ color: 'var(--primary)' }} />
                My Orders
              </h2>
              <p className="orders-subtitle">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
            </div>
            <Link to="/products" className="btn-outline-primary">
              <FiShoppingBag /> Continue Shopping
            </Link>
          </div>

          {/* Orders List */}
          <div className="orders-list">
            {[...orders].reverse().map((order, idx) => (
              <div key={order.id || idx} className="order-card">
                {/* Order Header */}
                <div className="order-card-header">
                  <div className="order-meta">
                    <div className="order-id">
                      <span className="order-id-label">Order ID</span>
                      <span className="order-id-value">#{order.id}</span>
                    </div>
                    <div className="order-date">
                      <FiCalendar style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }} />
                      <span>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="order-header-right">
                    <span
                      className="order-status-badge"
                      style={{
                        color: getStatusColor(order.status),
                        background: getStatusBg(order.status),
                      }}
                    >
                      {order.status || 'Processing'}
                    </span>
                    <span className="order-total-label">
                      Total: <strong style={{ color: 'var(--primary)' }}>Rs. {order.total?.toLocaleString()}</strong>
                    </span>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '4px' }}
                      title="Delete Order"
                      onMouseOver={e => e.currentTarget.style.background = '#fee2e2'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items-list">
                  {order.items?.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <img src={item.image} alt={item.name} className="order-item-img" />
                      <div className="order-item-info">
                        <div className="order-item-name">
                          {item.name}
                          {item.selectedSize && (
                            <span className="order-item-size">Size: {item.selectedSize}</span>
                          )}
                        </div>
                        <div className="order-item-qty">Qty: {item.qty}</div>
                      </div>
                      <div className="order-item-price">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="order-card-footer">
                  <div className="order-address">
                    <FiMapPin style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span>
                      {order.address?.firstName} {order.address?.lastName}
                      {order.address?.city && `, ${order.address.city}`}
                      {order.address?.state && `, ${order.address.state}`}
                    </span>
                  </div>
                  <div className="order-summary-row">
                    <span>Subtotal: Rs. {order.subtotal?.toLocaleString()}</span>
                    <span> · </span>
                    <span>Shipping: {order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping}`}</span>
                    <span> · </span>
                    <strong>Total: Rs. {order.total?.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

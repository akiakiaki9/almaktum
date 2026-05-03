'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { IoClose, IoAdd, IoRemove, IoTrash } from 'react-icons/io5';
import './cart.css';

export default function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleSubmitOrder = async () => {
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните имя и телефон');
      return;
    }

    setOrderStatus('loading');
    
    const orderData = {
      order: cart,
      total: getTotalPrice(),
      customer: formData
    };

    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      setOrderStatus('success');
      clearCart();
      setTimeout(() => {
        setOrderStatus(null);
        setIsOrderModalOpen(false);
        onClose();
        setFormData({ name: '', phone: '', address: '', comment: '' });
      }, 2000);
    } else {
      setOrderStatus('error');
      setTimeout(() => setOrderStatus(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-content" onClick={e => e.stopPropagation()}>
          <div className="cart-header">
            <h3>🛒 Ваш заказ</h3>
            <button className="cart-close" onClick={onClose}>
              <IoClose />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Корзина пуста</p>
              <button className="btn-outline-gold" onClick={onClose}>Продолжить покупки</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price.toLocaleString()} сум</p>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <IoRemove />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <IoAdd />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                        <IoTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Итого:</span>
                  <span className="gold-text">{getTotalPrice().toLocaleString()} сум</span>
                </div>
                <button 
                  className="btn-gold order-btn" 
                  onClick={handleOpenOrderModal}
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Модалка оформления заказа */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={() => !orderStatus && setIsOrderModalOpen(false)}>
          <div className="modal-content order-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => !orderStatus && setIsOrderModalOpen(false)}>×</button>
            <h2>📝 Оформление заказа</h2>
            
            {orderStatus === 'success' ? (
              <div className="order-success">
                <div className="success-icon">✓</div>
                <h3>Заказ успешно оформлен!</h3>
                <p>Наш менеджер свяжется с вами в ближайшее время</p>
              </div>
            ) : orderStatus === 'error' ? (
              <div className="order-error">
                <div className="error-icon">✗</div>
                <h3>Ошибка при оформлении</h3>
                <p>Пожалуйста, попробуйте позже</p>
                <button className="btn-gold" onClick={() => setOrderStatus(null)}>Попробовать снова</button>
              </div>
            ) : (
              <>
                <div className="order-summary">
                  <p>Ваш заказ:</p>
                  {cart.slice(0, 3).map(item => (
                    <div key={item.id} className="order-summary-item">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{(item.price * item.quantity).toLocaleString()} сум</span>
                    </div>
                  ))}
                  {cart.length > 3 && <p className="more-items">...и ещё {cart.length - 3} позиций</p>}
                  <div className="order-total">
                    <strong>Общая сумма:</strong>
                    <strong className="gold-text">{getTotalPrice().toLocaleString()} сум</strong>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
                  <input 
                    type="text" 
                    placeholder="Ваше имя *" 
                    required
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    disabled={orderStatus === 'loading'}
                  />
                  <input 
                    type="tel" 
                    placeholder="Номер телефона *" 
                    required
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    disabled={orderStatus === 'loading'}
                  />
                  <input 
                    type="text" 
                    placeholder="Адрес доставки (необязательно)" 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    disabled={orderStatus === 'loading'}
                  />
                  <textarea 
                    placeholder="Комментарий к заказу (необязательно)" 
                    rows="3"
                    value={formData.comment} 
                    onChange={e => setFormData({...formData, comment: e.target.value})}
                    disabled={orderStatus === 'loading'}
                  />
                  <button 
                    type="submit" 
                    className="btn-gold submit-order-btn"
                    disabled={orderStatus === 'loading'}
                  >
                    {orderStatus === 'loading' ? (
                      <>
                        <span className="spinner"></span> Обработка...
                      </>
                    ) : (
                      'Подтвердить заказ'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
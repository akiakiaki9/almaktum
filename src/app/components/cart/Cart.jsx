'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { IoClose, IoAdd, IoRemove, IoTrash, IoCallOutline } from 'react-icons/io5';
import './cart.css';

export default function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const phoneNumber = "+998907449870";
  const formattedPhone = "+998 90 744 98 70";

  // Блокируем скролл при открытии корзины
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Блокируем скролл при открытии модалки
  useEffect(() => {
    if (isOrderModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      if (!isOrderModalOpen && !isOpen) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    };
  }, [isOrderModalOpen, isOpen]);

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать:', err);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Очистить всю корзину?')) {
      clearCart();
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
                    {/* Фотография блюда */}
                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="cart-item-placeholder">
                          🍽️
                        </div>
                      )}
                    </div>
                    
                    <div className="cart-item-details">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
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
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <button 
                  className="btn-gold order-btn" 
                  onClick={handleOpenOrderModal}
                >
                  Оформить заказ
                </button>
                <button 
                  className="btn-clear-cart" 
                  onClick={handleClearCart}
                >
                  Очистить корзину
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Модалка оформления заказа - с кнопкой звонка */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={handleCloseOrderModal}>
          <div className="modal-content order-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseOrderModal}>×</button>
            
            <div className="modal-header">
              <div className="header-icon">📞</div>
              <h2>Оформление заказа</h2>
              <p>Позвоните нам, чтобы подтвердить заказ</p>
            </div>

            {/* Список блюд */}
            <div className="order-summary">
              <p className="order-summary-title">Ваш заказ:</p>
              {cart.map(item => (
                <div key={item.id} className="order-summary-item">
                  <div className="order-summary-item-info">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-quantity">x{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Телефонная карточка */}
            <div className="phone-card">
              <div className="phone-icon">
                <IoCallOutline />
              </div>
              <div className="phone-details">
                <span className="phone-label">Позвоните для подтверждения</span>
                <a href={`tel:${phoneNumber}`} className="phone-number">
                  {formattedPhone}
                </a>
                <span className="phone-schedule">Ежедневно с 10:00 до 23:00</span>
              </div>
              <button className="copy-btn" onClick={copyPhone}>
                {copied ? '✓ Скопировано' : 'Копировать'}
              </button>
            </div>

            {/* Кнопка звонка */}
            <a href={`tel:${phoneNumber}`} className="call-btn">
              <IoCallOutline />
              <span>Позвонить и подтвердить заказ</span>
            </a>

            <p className="booking-note">
              📞 Позвоните нам, и мы подтвердим ваш заказ, уточним детали и время доставки
            </p>

            <button className="btn-outline-gold secondary-btn" onClick={handleCloseOrderModal}>
              Вернуться в корзину
            </button>
          </div>
        </div>
      )}
    </>
  );
}
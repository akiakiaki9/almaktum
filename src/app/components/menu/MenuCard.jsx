'use client';

import { useState } from 'react';

// MenuCard component - обновленная версия с отображением фотографий

function MenuCard({ item, onAddToCart, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div
      className={`menu-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-glow"></div>
      <div className="card-gold-border"></div>

      <div className="menu-card-image">
        <div className="image-wrapper">
          {item.image && !imageError ? (
            <img
              src={item.image}
              alt={item.name}
              className="menu-item-image"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">
              <span>🍽️</span>
            </div>
          )}
          <div className="image-overlay"></div>
          <div className="card-badge">
            <FaStar />
            <span>{item.badge || 'Хит'}</span>
          </div>
        </div>
      </div>

      <div className="menu-card-info">
        <div className="card-header">
          <h4>{item.name}</h4>
          <div className="card-rating">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
          </div>
        </div>
        <p>{item.description}</p>
        <div className="menu-card-footer">
          <div className="price-wrapper">
            <span className="price">{item.price.toLocaleString()} сум</span>
            {item.oldPrice && (
              <span className="old-price">{item.oldPrice.toLocaleString()} сум</span>
            )}
          </div>
          <button
            className={`add-to-cart-btn ${isHovered ? 'visible' : ''} ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <div className="spinner"></div>
                <span>Добавлено!</span>
              </>
            ) : (
              <>
                <FaShoppingBag />
                <span>В корзину</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
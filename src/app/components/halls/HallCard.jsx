// HallCard.js - обновленный компонент с фотографиями

'use client';

import { useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaArrowRight, FaStar, FaUtensils } from 'react-icons/fa';
import BookingModal from '../modal/BookingModal';
import './halls.css';

export default function HallCard({ hall, index }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getHallValue = (name) => {
    const map = {
      'Основной зал': 'main',
      'Кабины': 'cabins',
      'Банкетный зал': 'banquet',
      'Свадебный зал': 'wedding',
      'Семейный зал': 'family',
      'Терраса': 'terrace'
    };
    return map[name] || 'main';
  };

  return (
    <>
      <div
        className={`hall-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="hall-card-glow"></div>
        <div className="hall-card-gold-border"></div>

        <div className="hall-card-image">
          <div className="image-wrapper">
            {hall.image && !imageError ? (
              <img
                src={hall.image}
                alt={hall.name}
                className="hall-image"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="image-placeholder">
                <FaUtensils />
              </div>
            )}
            <div className="image-overlay"></div>
            {hall.isNew && (
              <div className="hall-badge">
                <FaStar />
                <span>NEW</span>
              </div>
            )}
          </div>
        </div>

        <div className="hall-card-info">
          <div className="hall-header">
            <h4>{hall.name}</h4>
            <div className="hall-rating">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </div>
          </div>

          <p className="hall-description">{hall.description}</p>

          <div className="hall-features">
            <div className="hall-feature">
              <FaUsers className="feature-icon" />
              <span>до {hall.capacity} человек</span>
            </div>
            <div className="hall-feature">
              <FaMoneyBillWave className="feature-icon" />
              <span>{hall.price}</span>
            </div>
          </div>

          <button
            className="hall-btn"
            onClick={() => setIsBookingModalOpen(true)}
          >
            <span>Забронировать {hall.name.toLowerCase()}</span>
            <FaArrowRight className="btn-arrow" />
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedHall={getHallValue(hall.name)}
      />
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaUsers, FaArrowRight, FaStar, FaUtensils, FaInfoCircle, FaTimes, FaChevronLeft, FaChevronRight, FaDoorOpen } from 'react-icons/fa';
import BookingModal from '../modal/BookingModal';
import './halls.css';

export default function HallCard({ hall, index }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  // Получаем массив изображений для карусели
  const getGalleryImages = () => {
    if (hall.images && hall.images.length > 0) {
      return hall.images;
    }
    return hall.image ? [hall.image] : [];
  };

  const galleryImages = getGalleryImages();

  // Функция для получения правильного текста вместимости
  const getCapacityText = () => {
    if (hall.name === 'Кабины') {
      return `${hall.capacity} комнат`;
    }
    return `до ${hall.capacity} человек`;
  };

  // Функция для получения иконки вместимости
  const getCapacityIcon = () => {
    if (hall.name === 'Кабины') {
      return <FaDoorOpen className="feature-icon" />;
    }
    return <FaUsers className="feature-icon" />;
  };

  // Функция для получения правильного текста в деталях
  const getDetailCapacityText = () => {
    if (hall.name === 'Кабины') {
      return `${hall.capacity} отдельных комнат`;
    }
    return `до ${hall.capacity} человек`;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Закрытие модалки по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDetailModalOpen) {
        setIsDetailModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDetailModalOpen]);

  // Блокировка скролла при открытии модалки
  useEffect(() => {
    if (isDetailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDetailModalOpen]);

  // Контент модалки с деталями
  const detailModalContent = (
    <div className="detail-modal-overlay" onClick={() => setIsDetailModalOpen(false)}>
      <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="detail-modal-close" onClick={() => setIsDetailModalOpen(false)}>
          <FaTimes />
        </button>

        {/* Карусель */}
        {galleryImages.length > 0 && (
          <div className="detail-carousel">
            <div className="carousel-container">
              <img 
                src={galleryImages[currentImageIndex]} 
                alt={`${hall.name} - фото ${currentImageIndex + 1}`}
                className="carousel-image"
              />
              {galleryImages.length > 1 && (
                <>
                  <button className="carousel-prev" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <button className="carousel-next" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                  <div className="carousel-dots">
                    {galleryImages.map((_, idx) => (
                      <span
                        key={idx}
                        className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Информация о зале */}
        <div className="detail-info">
          <h2>{hall.name}</h2>
          <div className="detail-rating">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            <span>5.0 (35 отзывов)</span>
          </div>
          <p className="detail-description">{hall.description}</p>
          
          <div className="detail-features">
            <div className="detail-feature">
              {hall.name === 'Кабины' ? <FaDoorOpen /> : <FaUsers />}
              <div>
                <h4>Вместимость</h4>
                <p>{getDetailCapacityText()}</p>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button 
              className="detail-booking-btn"
              onClick={() => {
                setIsDetailModalOpen(false);
                setIsBookingModalOpen(true);
              }}
            >
              Забронировать {hall.name.toLowerCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              {getCapacityIcon()}
              <span>{getCapacityText()}</span>
            </div>
          </div>

          <div className="hall-buttons">
            <button
              className="hall-btn detail-btn"
              onClick={() => setIsDetailModalOpen(true)}
            >
              <FaInfoCircle />
              <span>Подробнее</span>
            </button>
            <button
              className="hall-btn booking-btn-main"
              onClick={() => setIsBookingModalOpen(true)}
            >
              <span>Забронировать</span>
              <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedHall={getHallValue(hall.name)}
      />

      {/* Рендерим модалку через портал */}
      {isDetailModalOpen && mounted && createPortal(detailModalContent, document.body)}
    </>
  );
}
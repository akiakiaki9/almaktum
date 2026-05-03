'use client';

import { useState, useEffect } from 'react';
import { FaCrown, FaUtensils, FaMusic, FaGem, FaArrowRight } from 'react-icons/fa';
import { GiChopsticks, GiFullPizza, GiWineGlass } from 'react-icons/gi';
import { MdOutlineRestaurantMenu, MdOutlineTableRestaurant } from 'react-icons/md';
import './hero.css';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBooking = () => {
    const bookingBtn = document.querySelector('.booking-btn');
    if (bookingBtn) {
      bookingBtn.click();
    }
  };

  return (
    <section id="hero" className={`hero ${isLoaded ? 'loaded' : ''}`}>
      <div className="hero-gradient"></div>
      <div className="hero-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <FaCrown className="hero-badge-icon" />
          <span>Premium Dining</span>
        </div>
        
        <h1 className="hero-title">
          <span className="hero-title-line">Добро пожаловать в</span>
          <span className="hero-title-main">
            Al <span className="gold-text">Maktum</span>
          </span>
        </h1>
        
        <p className="hero-subtitle">
          Откройте для себя искусство высокой кухни в атмосфере восточного великолепия
        </p>
        
        <div className="hero-features">
          <div className="hero-feature">
            <div className="feature-icon">
              <GiChopsticks />
            </div>
            <span>Национальная кухня</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <FaMusic />
            </div>
            <span>Живая музыка</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <FaGem />
            </div>
            <span>Премиум сервис</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <GiWineGlass />
            </div>
            <span>Винная карта</span>
          </div>
        </div>
        
        <div className="hero-buttons">
          <button className="hero-btn hero-btn-primary" onClick={scrollToMenu}>
            <MdOutlineRestaurantMenu />
            <span>Смотреть меню</span>
            <FaArrowRight className="btn-arrow" />
          </button>
          <button className="hero-btn hero-btn-secondary" onClick={scrollToBooking}>
            <MdOutlineTableRestaurant />
            <span>Забронировать стол</span>
          </button>
        </div>
        
        <div className="hero-scroll-indicator">
          <span>Листайте вниз</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </div>
      
      <div className="hero-background">
        <div className="hero-bg-overlay"></div>
        <div className="hero-bg-image"></div>
      </div>
    </section>
  );
};
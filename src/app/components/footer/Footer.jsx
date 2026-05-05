'use client';

import { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaMapMarkerAlt,
  FaClock,
  FaArrowUp,
  FaStar
} from 'react-icons/fa';
import { IoMdRestaurant } from 'react-icons/io';
import './footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#hero', label: 'Главная' },
    { href: '/menu', label: 'Меню' },
    { href: '#halls', label: 'Залы' },
    { href: '/gallery', label: 'Галерея' },
    { href: '/contact', label: 'Контакты' }
  ];

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`}>
      <div className="footer-bg-glow"></div>
      <div className="footer-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Logo Section */}
          <div className="footer-logo">
            <div className="logo-wrapper">
              <div className="logo-icon">
                <IoMdRestaurant />
              </div>
              <h3>Al <span className="gold-text">Maktum</span></h3>
            </div>
            <p>Премиум ресторан в сердце Бухары</p>
            <p className="footer-tagline">Изысканный вкус Востока</p>
            <div className="footer-social-links">
              <a
                href="https://www.instagram.com/al_maktum_bukhara/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <h4>
              <FaStar className="section-icon" />
              Навигация
            </h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>
                    <span className="link-dot"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="footer-working">
            <h4>
              <FaClock className="section-icon" />
              Режим работы
            </h4>
            <div className="working-hours">
              <div className="hour-item">
                <span className="hour-icon">⏰</span>
                <div>
                  <p className="hour-title">Ежедневно</p>
                  <p className="hour-value">10:00 - 23:00</p>
                </div>
              </div>
              <div className="hour-item">
                <span className="hour-icon">✨</span>
                <div>
                  <p className="hour-title">Без выходных</p>
                  <p className="hour-value">Работаем каждый день</p>
                </div>
              </div>
              <div className="hour-item">
                <span className="hour-icon">🎙️</span>
                <div>
                  <p className="hour-title">Живая музыка</p>
                  <p className="hour-value">Пт-Вс с 20:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>
              <FaMapMarkerAlt className="section-icon" />
              Контакты
            </h4>
            <div className="contact-info-footer">
              <a href="tel:+998907449870" className="contact-item">
                📞 +998 907 449 870
              </a>
              <a href="tel:+998914417181" className="contact-item">
                📞 +998 914 417 181
              </a>
              <div className="contact-item">
                📍 г. Бухара, Шарк 1
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© {currentYear} Al Maktum. Все права защищены.</p>

            {/* Developed by Akbar Soft */}
            <div className="developer-credit">
              <span>Разработано</span>
              <span>в</span>
              <a
                href="https://akbarsoft.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
              >
                Akbar Soft
              </a>
            </div>

            <p className="footer-address">📍 г. Бухара, Шарк 1</p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};
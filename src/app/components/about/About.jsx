'use client';

import { useState, useEffect } from 'react';
import {
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaStar,
  FaUtensils,
  FaChevronRight,
  FaSmoking
} from 'react-icons/fa';
import { MdOutlineRoomService } from 'react-icons/md';
import { GiKnifeFork, GiSmokingPipe } from 'react-icons/gi';
import { TbArmchair } from 'react-icons/tb';
import { IoWaterOutline } from 'react-icons/io5';
import './about.css';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: <GiKnifeFork />, text: 'Авторская кухня' },
    { icon: <GiSmokingPipe />, text: 'Кальянная карта' },
    { icon: <TbArmchair />, text: 'Восточный колорит' },
    { icon: <MdOutlineRoomService />, text: 'Премиум сервис' }
  ];

  return (
    <section id="about" className="about">
      <div className="about-bg-pattern"></div>
      <div className="container">
        <div className="about-grid">
          <div className={`about-text ${isVisible ? 'animate' : ''}`}>
            <div className="section-header">
              <span className="section-tag">
                <FaStar className="tag-icon" />
                О ресторане
              </span>
              <h2>
                Изысканный вкус
                <span className="gold-text"> Востока</span>
              </h2>
              <div className="title-decoration">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <p className="about-description">
              Al Maktum — это воплощение роскоши и утонченного вкуса. Мы сочетаем лучшие традиции
              узбекской кухни с европейским изыском, создавая неповторимые гастрономические впечатления.
            </p>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon-wrapper">
                    {feature.icon}
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-content">
                  <span className="info-label">Режим работы</span>
                  <span className="info-value">Без выходных: 10:00 - 23:00</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <span className="info-label">Адрес</span>
                  <span className="info-value">г. Бухара, Шарк 1</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <span className="info-label">Телефоны</span>
                  <div className="info-phones">
                    <span className="info-value">+998 907 449 870</span>
                    <span className="info-value">+998 914 417 181</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-section">
              <a
                href="https://www.instagram.com/al_maktum_bukhara/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaInstagram />
                <span>@al_maktum_bukhara</span>
                <FaChevronRight className="link-arrow" />
              </a>
            </div>
          </div>

          <div className={`about-visual ${isVisible ? 'animate' : ''}`}>
            <div className="visual-wrapper">
              <div className="main-image">
                <img
                  src="/images/gallery/17.png"
                  alt="Интерьер ресторана Al Maktum"
                  className="main-image-img"
                />
                <div className="image-overlay"></div>
                <div className="image-content">
                  <FaUtensils className="image-icon" />
                  <span>Премиум ресторан</span>
                </div>
              </div>

              <div className="floating-card card-1">
                <GiSmokingPipe />
                <span>Кальянная карта</span>
              </div>

              <div className="experience-badge">
                <div className="experience-number">10+</div>
                <div className="experience-text">лет<br />совершенства</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
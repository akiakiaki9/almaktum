// halls.js - обновленный компонент

'use client';

import { useState, useEffect } from 'react';
import { halls } from '@/app/utils/data';
import { FaStar } from 'react-icons/fa';
import HallCard from './HallCard';
import './halls.css';

export default function Halls() {
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

    const section = document.getElementById('halls');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="halls" className={`halls ${isVisible ? 'visible' : ''}`}>
      <div className="halls-bg-glow"></div>
      <div className="container">
        <div className="halls-header">
          <span className="section-tag">
            <FaStar className="tag-icon" />
            Премиум залы
          </span>
          <h2>Выберите <span className="gold-text">атмосферу</span></h2>
          <div className="title-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="halls-subtitle">6 уникальных залов для любого мероприятия</p>
        </div>
        <div className="halls-grid">
          {halls.map((hall, index) => (
            <HallCard key={hall.id} hall={hall} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
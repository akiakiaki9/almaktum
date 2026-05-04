// ContactMap.js
'use client';

import { useState, useEffect } from 'react';
import { IoNavigate, IoLocation } from 'react-icons/io5';
import { FaStar, FaArrowRight } from 'react-icons/fa';

export default function ContactMap() {
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

        const element = document.querySelector('.contact-map-block');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`contact-map-block ${isVisible ? 'animate' : ''}`}>
            <div className="map-header">
                <span className="section-tag">
                    <FaStar className="tag-icon" />
                    Наше местоположение
                </span>
                <h3>Как <span className="gold-text">нас найти</span></h3>
                <div className="title-decoration">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="map-wrapper">
                <div className="map-container">
                    <div className="map-overlay"></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.456789123456!2d64.42123456789012!3d39.77456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzI4LjQiTiA2NMKwMjUnMTYuNCJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Al Maktum Location"
                    />
                    <div className="map-text">
                        <IoLocation />
                        <span>г. Бухара, Шарк 1</span>
                    </div>
                </div>

                <div className="map-address">
                    <p>📍 г. Бухара, Шарк 1 — Ресторан Al Maktum</p>
                    <a href="https://maps.google.com/?q=Бухара+Шарк+1" target="_blank" rel="noopener noreferrer" className="map-btn">
                        <IoNavigate />
                        <span>Построить маршрут</span>
                        <FaArrowRight className="btn-arrow" />
                    </a>
                </div>
            </div>
        </div>
    );
}
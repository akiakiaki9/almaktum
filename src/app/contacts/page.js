'use client';

import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';
import './contacts-page.css';
import Navbar from '../components/navbar/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/footer/Footer';

export default function ContactPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.contact-page');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <PageHeader
                title="Контакты"
                subtitle="Свяжитесь с нами любым удобным способом"
                backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
                breadcrumbs="Контакты"
            />

            <section className={`contact-page ${isVisible ? 'visible' : ''}`}>
                <div className="contact-bg-glow"></div>
                <div className="container">
                    <div className="contact-page-grid">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                    <ContactMap />
                </div>
            </section>

            {/* Часы работы */}
            <section className="working-hours-section">
                <div className="container">
                    <div className="working-hours-card">
                        <div className="card-glow"></div>
                        <div className="card-header">
                            <span className="section-tag">
                                <FaStar className="tag-icon" />
                                Режим работы
                            </span>
                            <h3>Часы <span className="gold-text">работы</span></h3>
                            <div className="title-decoration">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="hours-grid">
                            <div className="hour-item">
                                <div className="hour-icon">⏰</div>
                                <div className="hour-content">
                                    <span>Понедельник - Воскресенье</span>
                                    <strong>10:00 - 23:00</strong>
                                </div>
                            </div>
                            <div className="hour-item">
                                <div className="hour-icon">🎙️</div>
                                <div className="hour-content">
                                    <span>Живая музыка (Пт, Сб)</span>
                                    <strong>20:00 - 23:00</strong>
                                </div>
                            </div>
                            <div className="hour-item">
                                <div className="hour-icon">🎉</div>
                                <div className="hour-content">
                                    <span>Банкетное обслуживание</span>
                                    <strong>Круглосуточно по предзаказу</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
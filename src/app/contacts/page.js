'use client';

import { useEffect } from 'react';

import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';
import './contacts-page.css';
import Navbar from '../components/navbar/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/footer/Footer';

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
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

            <section className="contact-page">
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
                        <h3>⏰ Режим работы</h3>
                        <div className="hours-grid">
                            <div className="hour-item">
                                <span>Понедельник - Воскресенье</span>
                                <strong>10:00 - 23:00</strong>
                            </div>
                            <div className="hour-item">
                                <span>Живая музыка (Пт, Сб)</span>
                                <strong>20:00 - 23:00</strong>
                            </div>
                            <div className="hour-item">
                                <span>Банкетное обслуживание</span>
                                <strong>Круглосуточно по предзаказу</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};
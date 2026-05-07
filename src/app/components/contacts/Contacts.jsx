'use client';

import { useState } from 'react';
import {
    IoLocation,
    IoCall,
    IoTime,
    IoLogoInstagram,
    IoCheckmarkCircle
} from 'react-icons/io5';
import './contact.css';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const phoneNumber = "+998907449870";
    const formattedPhone = "+998 90 744 98 70";

    const copyPhone = async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Не удалось скопировать:', err);
        }
    };

    const contactInfo = [
        {
            icon: <IoLocation />,
            title: 'Адрес',
            details: ['г. Бухара, Шарк 1', 'Ресторан Al Maktum'],
            action: 'Построить маршрут',
            link: 'https://maps.google.com/?q=Бухара+Шарк+1'
        },
        {
            icon: <IoCall />,
            title: 'Телефоны',
            details: ['+998 90 744 98 70', '+998 91 441 71 81'],
            action: 'Позвонить',
            link: 'tel:+998907449870'
        },
        {
            icon: <IoTime />,
            title: 'Режим работы',
            details: ['Ежедневно: 10:00 - 23:00', 'Без выходных'],
            action: null
        },
        {
            icon: <IoLogoInstagram />,
            title: 'Социальные сети',
            details: ['Instagram: @al_maktum_bukhara'],
            action: 'Подписаться',
            link: 'https://www.instagram.com/al_maktum_bukhara/',
            isExternal: true
        }
    ];

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact-header">
                    <span className="section-tag gold-text">Свяжитесь с нами</span>
                    <h2>Мы всегда <span className="gold-text">на связи</span></h2>
                    <p>Свяжитесь с нами любым удобным способом</p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info Cards */}
                    <div className="contact-info">
                        <div className="info-cards">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="info-card">
                                    <div className="info-icon">{info.icon}</div>
                                    <div className="info-content">
                                        <h3>{info.title}</h3>
                                        {info.details.map((detail, i) => (
                                            <p key={i}>{detail}</p>
                                        ))}
                                        {info.action && (
                                            <a
                                                href={info.link}
                                                target={info.isExternal ? "_blank" : "_self"}
                                                rel={info.isExternal ? "noopener noreferrer" : ""}
                                                className="info-link"
                                            >
                                                {info.action} →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map */}
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.456789123456!2d64.42123456789012!3d39.77456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzI4LjQiTiA2NMKwMjUnMTYuNCJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Al Maktum Location"
                            />
                        </div>
                    </div>

                    {/* Контактная карточка с телефоном */}
                    <div className="contact-call-card">
                        <div className="call-card-header">
                            <div className="call-icon">📞</div>
                            <h3>Забронировать столик</h3>
                            <p>Позвоните нам для бронирования</p>
                        </div>

                        {/* Телефонная карточка */}
                        <div className="phone-card">
                            <div className="phone-icon">
                                <IoCall />
                            </div>
                            <div className="phone-details">
                                <span className="phone-label">Позвоните нам</span>
                                <a href={`tel:${phoneNumber}`} className="phone-number">
                                    {formattedPhone}
                                </a>
                                <span className="phone-schedule">Ежедневно с 10:00 до 23:00</span>
                            </div>
                            <button className="copy-btn" onClick={copyPhone}>
                                {copied ? <IoCheckmarkCircle /> : 'Копировать'}
                            </button>
                        </div>

                        {/* Кнопка звонка */}
                        <a href={`tel:${phoneNumber}`} className="call-btn">
                            <IoCall />
                            <span>Позвонить сейчас</span>
                        </a>

                        {/* Дополнительная информация */}
                        <div className="call-info">
                            <div className="call-info-item">
                                <span>⏰</span>
                                <div>
                                    <strong>Быстрое бронирование</strong>
                                    <p>Звоните, и мы подберем лучший столик</p>
                                </div>
                            </div>
                            <div className="call-info-item">
                                <span>🎉</span>
                                <div>
                                    <strong>Особые события</strong>
                                    <p>Поможем организовать праздник</p>
                                </div>
                            </div>
                            <div className="call-info-item">
                                <span>🍽️</span>
                                <div>
                                    <strong>Вопросы по меню</strong>
                                    <p>Расскажем о блюдах и акциях</p>
                                </div>
                            </div>
                        </div>

                        <p className="call-note">
                            📞 Позвоните нам, и мы с радостью ответим на все ваши вопросы
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
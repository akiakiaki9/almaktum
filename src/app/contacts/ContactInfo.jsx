// ContactInfo.js
'use client';

import { useState, useEffect } from 'react';
import {
    IoLocation,
    IoCall,
    IoTime,
    IoLogoInstagram,
    IoLogoWhatsapp,
    IoNavigate,
} from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { BiLogoTelegram } from "react-icons/bi";

export default function ContactInfo() {
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

        const element = document.querySelector('.contact-info-block');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const contactDetails = [
        {
            icon: <IoLocation />,
            title: 'Адрес',
            info: 'г. Бухара, Шарк 1',
            link: 'https://maps.google.com/?q=Бухара+Шарк+1',
            action: 'Построить маршрут'
        },
        {
            icon: <IoCall />,
            title: 'Телефоны',
            info: ['+998 907 449 870', '+998 914 417 181'],
            link: 'tel:+998907449870',
            action: 'Позвонить'
        },
        {
            icon: <IoTime />,
            title: 'Режим работы',
            info: 'Ежедневно: 10:00 - 23:00',
            subInfo: 'Без выходных'
        },
        {
            icon: <IoLogoInstagram />,
            title: 'Instagram',
            info: '@al_maktum_bukhara',
            link: 'https://www.instagram.com/al_maktum_bukhara/',
            action: 'Подписаться'
        }
    ];

    return (
        <div className={`contact-info-block ${isVisible ? 'animate' : ''}`}>
            <div className="block-header">
                <span className="section-tag">
                    <FaStar className="tag-icon" />
                    Свяжитесь с нами
                </span>
                <h2>Контактная <span className="gold-text">информация</span></h2>
                <div className="title-decoration">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p>Свяжитесь с нами для бронирования столов, организации мероприятий или любых других вопросов</p>
            </div>

            <div className="contact-details">
                {contactDetails.map((detail, idx) => (
                    <div key={idx} className="contact-detail-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="detail-icon-wrapper">
                            <div className="detail-icon">{detail.icon}</div>
                            <div className="detail-glow"></div>
                        </div>
                        <div className="detail-content">
                            <h4>{detail.title}</h4>
                            {Array.isArray(detail.info) ? (
                                detail.info.map((phone, i) => (
                                    <a key={i} href={detail.link} className="detail-link">
                                        {phone}
                                    </a>
                                ))
                            ) : (
                                <>
                                    <p className="detail-text">{detail.info}</p>
                                    {detail.subInfo && <p className="detail-sub">{detail.subInfo}</p>}
                                </>
                            )}
                            {detail.action && (
                                <a href={detail.link} className="detail-action">
                                    <IoNavigate />
                                    <span>{detail.action}</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="social-section">
                <h4>Мы в мессенджерах</h4>
                <div className="messenger-links">
                    <a href="https://t.me/+998907449870" target="_blank" rel="noopener noreferrer" className="messenger telegram">
                        <BiLogoTelegram />
                        <span>Telegram</span>
                    </a>
                    <a href="https://wa.me/998907449870" target="_blank" rel="noopener noreferrer" className="messenger whatsapp">
                        <IoLogoWhatsapp />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div> */}
        </div>
    );
};
'use client';

import { useState } from 'react';
import {
    IoLocation,
    IoCall,
    IoTime,
    IoLogoInstagram,
    IoSend,
    IoCheckmarkCircle,
    IoCloseCircle
} from 'react-icons/io5';
import './contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(null), 5000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
            details: ['+998 907 449 870', '+998 914 417 181'],
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
                    <p>Оставьте заявку или свяжитесь с нами любым удобным способом</p>
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

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="form-header">
                            <h3>📝 Обратная связь</h3>
                            <p>Заполните форму и мы ответим вам в ближайшее время</p>
                        </div>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Ваше имя *"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span className="input-icon">👤</span>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Номер телефона *"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span className="input-icon">📞</span>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email (необязательно)"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span className="input-icon">📧</span>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Тема обращения *"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span className="input-icon">📝</span>
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <textarea
                                    name="message"
                                    placeholder="Ваше сообщение *"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                <span className="input-icon">💬</span>
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Отправка...
                                    </>
                                ) : (
                                    <>
                                        <IoSend /> Отправить сообщение
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="notification success">
                                    <IoCheckmarkCircle />
                                    <div>
                                        <strong>Сообщение отправлено!</strong>
                                        <p>Мы свяжемся с вами в ближайшее время.</p>
                                    </div>
                                    <button onClick={() => setStatus(null)}>×</button>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="notification error">
                                    <IoCloseCircle />
                                    <div>
                                        <strong>Ошибка отправки!</strong>
                                        <p>Пожалуйста, попробуйте позже или позвоните нам.</p>
                                    </div>
                                    <button onClick={() => setStatus(null)}>×</button>
                                </div>
                            )}
                        </form>

                        {/* Quick Contact */}
                        <div className="quick-contact">
                            <div className="quick-item">
                                <span>📞</span>
                                <div>
                                    <h4>Быстрый звонок</h4>
                                    <a href="tel:+998907449870">+998 907 449 870</a>
                                </div>
                            </div>
                            <div className="quick-item">
                                <span>💬</span>
                                <div>
                                    <h4>Мессенджеры</h4>
                                    <div className="messengers">
                                        <a href="https://www.instagram.com/al_maktum_bukhara/" target="_blank">Instagram</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
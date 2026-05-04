// ContactForm.js
'use client';

import { useState } from 'react';
import { IoSend, IoPerson, IoCall, IoMail, IoChatbubble, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('loading');

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, subject: 'Сообщение с сайта' })
        });

        if (res.ok) {
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(null), 5000);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="contact-form-block">
            <div className="block-header">
                <div className="form-icon">
                    <IoSend />
                </div>
                <h2>Отправить <span className="gold-text">сообщение</span></h2>
                <p>Заполните форму и мы ответим вам в ближайшее время</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <IoPerson className="input-icon" />
                    <input
                        type="text"
                        placeholder="Ваше имя *"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                </div>

                <div className="input-group">
                    <IoCall className="input-icon" />
                    <input
                        type="tel"
                        placeholder="Номер телефона *"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                </div>

                <div className="input-group">
                    <IoMail className="input-icon" />
                    <input
                        type="email"
                        placeholder="Email (необязательно)"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                </div>

                <div className="input-group">
                    <IoChatbubble className="input-icon" />
                    <textarea
                        placeholder="Ваше сообщение *"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <div className="spinner"></div>
                            <span>Отправка...</span>
                        </>
                    ) : (
                        <>
                            <IoSend />
                            <span>Отправить сообщение</span>
                            <FaArrowRight className="btn-arrow" />
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
        </div>
    );
}
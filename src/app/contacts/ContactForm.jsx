'use client';

import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, subject: 'Сообщение с сайта' })
        });

        if (res.ok) {
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 3000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(null), 3000);
        }
    };

    return (
        <div className="contact-form-block">
            <h2>Отправить сообщение</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ваше имя *"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'loading'}
                />
                <input
                    type="tel"
                    placeholder="Номер телефона *"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    disabled={status === 'loading'}
                />
                <input
                    type="email"
                    placeholder="Email (необязательно)"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === 'loading'}
                />
                <textarea
                    placeholder="Ваше сообщение *"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === 'loading'}
                />
                <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Отправка...' : <><IoSend /> Отправить сообщение</>}
                </button>
                {status === 'success' && <div className="success-message">✓ Сообщение отправлено!</div>}
                {status === 'error' && <div className="error-message">❌ Ошибка отправки</div>}
            </form>
        </div>
    );
}
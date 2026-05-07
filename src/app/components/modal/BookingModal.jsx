'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  IoClose, 
  IoCallOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoPeopleOutline,
  IoLocationOutline
} from 'react-icons/io5';
import { FaStar, FaPhoneAlt } from 'react-icons/fa';
import './modal.css';

export default function BookingModal({ isOpen, onClose }) {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const scrollPositionRef = useRef(0);
    
    const phoneNumber = "+998907449870";
    const formattedPhone = "+998 90 744 98 70";

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Блокируем скролл при открытии модалки
    useEffect(() => {
        if (isOpen) {
            scrollPositionRef.current = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPositionRef.current);
        }
        
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    const copyPhone = async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Не удалось скопировать:', err);
        }
    };

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content booking-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <IoClose />
                </button>

                <div className="modal-header">
                    <div className="header-icon">
                        <FaStar />
                    </div>
                    <h2>Забронировать столик</h2>
                    <p>Позвоните нам, и мы подберем лучший вариант</p>
                </div>

                {/* Телефонная карточка */}
                <div className="phone-card">
                    <div className="phone-icon">
                        <FaPhoneAlt />
                    </div>
                    <div className="phone-details">
                        <span className="phone-label">Забронировать по телефону</span>
                        <a href={`tel:${phoneNumber}`} className="phone-number">
                            {formattedPhone}
                        </a>
                        <span className="phone-schedule">Ежедневно с 10:00 до 23:00</span>
                    </div>
                    <button className="copy-btn" onClick={copyPhone}>
                        {copied ? <IoCheckmarkCircle /> : 'Копировать'}
                    </button>
                </div>

                {/* Информация о бронировании */}
                <div className="booking-info">
                    <div className="info-item">
                        <IoTimeOutline />
                        <div>
                            <strong>Время работы</strong>
                            <span>Ежедневно: 10:00 - 23:00</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <IoPeopleOutline />
                        <div>
                            <strong>Бронирование</strong>
                            <span>Рекомендуем бронировать за 1-2 дня</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <IoLocationOutline />
                        <div>
                            <strong>Адрес</strong>
                            <span>г. Ташкент, ул. Примерная, 123</span>
                        </div>
                    </div>
                </div>

                {/* Кнопка звонка */}
                <a href={`tel:${phoneNumber}`} className="call-btn">
                    <IoCallOutline />
                    <span>Позвонить и забронировать</span>
                </a>

                <p className="booking-note">
                    📞 Позвоните нам, и мы поможем выбрать лучший столик, учтем все пожелания и ответим на вопросы
                </p>
            </div>
        </div>
    );

    if (!isOpen || !mounted) return null;
    
    return createPortal(modalContent, document.body);
}
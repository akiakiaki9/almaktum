'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  IoClose, 
  IoCalendarOutline, 
  IoTimeOutline, 
  IoPeopleOutline, 
  IoRestaurantOutline,
  IoCallOutline,
  IoPersonOutline,
  IoChatbubbleOutline,
  IoCheckmarkCircle,
  IoWarningOutline
} from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import './modal.css';

export default function BookingModal({ isOpen, onClose, preselectedHall }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        hall: preselectedHall || 'main',
        comment: ''
    });
    const [status, setStatus] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [mounted, setMounted] = useState(false);
    const scrollPositionRef = useRef(0);

    // Монтируем портал
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Блокируем скролл при открытии модалки
    useEffect(() => {
        if (isOpen) {
            // Сохраняем текущую позицию скролла
            scrollPositionRef.current = window.scrollY;
            
            // Применяем стили для блокировки
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = '100%';
            document.body.style.paddingRight = '0px';
        } else {
            // Восстанавливаем скролл
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
            
            // Возвращаемся к сохраненной позиции
            window.scrollTo(0, scrollPositionRef.current);
        }
        
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    // Доступные времена для бронирования
    useEffect(() => {
        const times = [];
        for (let i = 10; i <= 23; i++) {
            times.push(`${i}:00`);
            if (i < 23) times.push(`${i}:30`);
        }
        setAvailableTimes(times);
    }, []);

    const hallsList = [
        { value: 'main', label: 'Основной зал', icon: <IoRestaurantOutline />, capacity: 150, price: 'от 50,000 сум/чел' },
        { value: 'cabins', label: 'Кабины', icon: <IoRestaurantOutline />, capacity: 40, price: 'от 80,000 сум/чел' },
        { value: 'banquet', label: 'Банкетный зал', icon: <IoRestaurantOutline />, capacity: 200, price: 'от 45,000 сум/чел' },
        { value: 'wedding', label: 'Свадебный зал', icon: <IoRestaurantOutline />, capacity: 300, price: 'от 40,000 сум/чел' },
        { value: 'family', label: 'Семейный зал', icon: <IoRestaurantOutline />, capacity: 50, price: 'от 60,000 сум/чел' },
        { value: 'terrace', label: 'Терраса', icon: <IoRestaurantOutline />, capacity: 80, price: 'от 55,000 сум/чел' }
    ];

    const selectedHallData = hallsList.find(h => h.value === formData.hall);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const res = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus(null);
                setFormData({
                    name: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: '2',
                    hall: preselectedHall || 'main',
                    comment: ''
                });
            }, 2500);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(null), 3000);
        }
    };

    const getMinDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const getMaxDate = () => {
        const max = new Date();
        max.setDate(max.getDate() + 30);
        const yyyy = max.getFullYear();
        const mm = String(max.getMonth() + 1).padStart(2, '0');
        const dd = String(max.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // Контент модалки
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
                    <h2>Бронирование стола</h2>
                    <p>Заполните форму и мы свяжемся с вами для подтверждения</p>
                </div>

                {status === 'success' ? (
                    <div className="booking-success">
                        <div className="success-icon">
                            <IoCheckmarkCircle />
                        </div>
                        <h3>Заявка отправлена!</h3>
                        <p>Мы свяжемся с вами в ближайшее время для подтверждения бронирования</p>
                        <button className="btn-gold" onClick={onClose}>Закрыть</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <IoPersonOutline className="label-icon" />
                                Ваше имя *
                            </label>
                            <input
                                type="text"
                                placeholder="Как к вам обращаться?"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                disabled={status === 'loading'}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <IoCallOutline className="label-icon" />
                                Номер телефона *
                            </label>
                            <input
                                type="tel"
                                placeholder="+998 (__) ___-__-__"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                disabled={status === 'loading'}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <IoCalendarOutline className="label-icon" />
                                    Дата *
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={getMinDate()}
                                    max={getMaxDate()}
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <IoTimeOutline className="label-icon" />
                                    Время *
                                </label>
                                <select
                                    required
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    disabled={status === 'loading'}
                                >
                                    <option value="">Выберите время</option>
                                    {availableTimes.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <IoPeopleOutline className="label-icon" />
                                    Количество гостей *
                                </label>
                                <select
                                    value={formData.guests}
                                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                                    disabled={status === 'loading'}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 40, 50].map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? 'гость' : (n < 5 ? 'гостя' : 'гостей')}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <IoRestaurantOutline className="label-icon" />
                                    Выберите зал *
                                </label>
                                <select
                                    value={formData.hall}
                                    onChange={e => setFormData({ ...formData, hall: e.target.value })}
                                    disabled={status === 'loading'}
                                >
                                    {hallsList.map(hall => (
                                        <option key={hall.value} value={hall.value}>
                                            {hall.label} - {hall.price}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {selectedHallData && (
                            <div className="hall-info-card">
                                <div className="hall-info-icon">
                                    {selectedHallData.icon}
                                </div>
                                <div className="hall-info-details">
                                    <h4>{selectedHallData.label}</h4>
                                    <p>👥 Вместимость: до {selectedHallData.capacity} человек</p>
                                    <p>💰 Минимальный чек: {selectedHallData.price}</p>
                                    {parseInt(formData.guests) > selectedHallData.capacity && (
                                        <p className="hall-warning">
                                            <IoWarningOutline />
                                            Количество гостей превышает вместимость зала!
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label>
                                <IoChatbubbleOutline className="label-icon" />
                                Дополнительные пожелания
                            </label>
                            <textarea
                                placeholder="Особые пожелания, аллергии, праздничный повод и т.д."
                                rows="3"
                                value={formData.comment}
                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                disabled={status === 'loading'}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-gold submit-booking-btn"
                            disabled={status === 'loading' || (selectedHallData && parseInt(formData.guests) > selectedHallData.capacity)}
                        >
                            {status === 'loading' ? (
                                <>
                                    <span className="spinner"></span> Отправка...
                                </>
                            ) : (
                                'Забронировать стол'
                            )}
                        </button>

                        {status === 'error' && (
                            <div className="error-msg">
                                ❌ Ошибка при отправке. Пожалуйста, попробуйте позже.
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );

    // Рендерим через портал только если модалка открыта и компонент смонтирован
    if (!isOpen || !mounted) return null;
    
    return createPortal(modalContent, document.body);
}
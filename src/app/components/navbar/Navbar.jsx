'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    IoMdCart,
    IoMdCalendar
} from 'react-icons/io';
import { FaCrown } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import './navbar.css';
import Cart from '../cart/Cart';
import BookingModal from '../modal/BookingModal';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { cartCount } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Обновляем прогресс скролла
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Плавная загрузка
        setTimeout(() => setIsLoading(false), 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Блокировка скролла при открытом бургер-меню
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen]);

    const scrollToSection = (sectionId) => {
        if (pathname !== '/') {
            window.location.href = `/#${sectionId}`;
            return;
        }
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: '/', label: 'Главная', section: null },
        { href: '/menu', label: 'Меню', section: null },
        { href: '/gallery', label: 'Галерея', section: null },
        { href: '/contacts', label: 'Контакты', section: null },
    ];

    const handleNavClick = (e, link) => {
        if (link.href === '/') {
            e.preventDefault();
            scrollToSection(link.section);
        }
        setIsMenuOpen(false);
    };

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname === href;
    };

    if (isLoading) {
        return (
            <nav className={`navbar loading-nav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="logo-skeleton"></div>
                    <div className="nav-links-skeleton">
                        <div className="skeleton-item"></div>
                        <div className="skeleton-item"></div>
                        <div className="skeleton-item"></div>
                        <div className="skeleton-item"></div>
                        <div className="skeleton-item"></div>
                    </div>
                    <div className="nav-actions-skeleton">
                        <div className="skeleton-btn"></div>
                        <div className="skeleton-btn"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                        <div className="logo-wrapper">
                            <div className="logo-icon-wrapper">
                                <Image
                                    src="/images/logo.PNG"
                                    alt="Al Maktum Logo"
                                    width={64}
                                    height={64}
                                    className="logo-image"
                                    priority
                                />
                                <FaCrown className="logo-crown" />
                            </div>
                            <div className="logo-text">
                                <span className="logo-name">AL</span>
                                <span className="logo-surname gold-text">MAKTUM</span>
                            </div>
                        </div>
                    </Link>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="nav-link-text" style={{ color: 'white' }}>{link.label}</span>
                                <span className="nav-link-hover"></span>
                            </Link>
                        ))}

                        {/* Мобильные кнопки действий */}
                        <div className="mobile-nav-actions">
                            <button
                                className="mobile-booking-btn"
                                onClick={() => {
                                    setIsBookingModalOpen(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <IoMdCalendar />
                                <span>Бронирование</span>
                            </button>
                            <button
                                className="mobile-cart-btn"
                                onClick={() => {
                                    setIsCartOpen(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <IoMdCart />
                                <span>Корзина</span>
                                {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
                            </button>
                        </div>
                    </div>

                    <div className="nav-actions">
                        <button className="booking-btn" onClick={() => setIsBookingModalOpen(true)}>
                            <IoMdCalendar />
                            <span>Забронировать</span>
                        </button>
                        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
                            <IoMdCart />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                        <button
                            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Меню"
                        >
                            <div className="menu-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Индикатор скролла */}
                <div className="scroll-indicator">
                    <div className="scroll-progress"></div>
                </div>
            </nav>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                preselectedHall={null}
            />
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};
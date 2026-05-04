// menu-page.js
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import {
    IoSearch,
    IoClose,
    IoCheckmarkCircle,
    IoRestaurant,
    IoSad,
    IoCart
} from 'react-icons/io5';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import './menu-page.css';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/footer/Footer';
import { menuData } from '../utils/data';
import Navbar from '../components/navbar/Navbar';

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [addingItemId, setAddingItemId] = useState(null);
    const { addToCart } = useCart();

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

        const section = document.querySelector('.menu-page');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let items = [];
        if (selectedCategory === 'all') {
            items = menuData.flatMap(cat => cat.items);
        } else {
            const category = menuData.find(cat => cat.id === parseInt(selectedCategory));
            items = category ? category.items : [];
        }

        if (searchQuery) {
            items = items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredItems(items);
    }, [selectedCategory, searchQuery]);

    const handleAddToCart = (item) => {
        setAddingItemId(item.id);
        addToCart(item);
        setTimeout(() => {
            setAddingItemId(null);
        }, 1000);
    };

    const categories = [
        { id: 'all', name: 'Все блюда', icon: <IoRestaurant /> },
        ...menuData.map(cat => ({
            id: cat.id.toString(),
            name: cat.category,
            icon: cat.id === 1 ? '🥘' : cat.id === 2 ? '🍝' : '🥤'
        }))
    ];

    return (
        <>
            <Navbar />
            <PageHeader
                title="Наше меню"
                subtitle="Изысканные блюда национальной и европейской кухни"
                backgroundImage="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600"
                breadcrumbs="Меню"
            />

            <section className={`menu-page ${isVisible ? 'visible' : ''}`}>
                <div className="menu-bg-glow"></div>
                <div className="container">
                    {/* Фильтры */}
                    <div className="menu-filters">
                        <div className="filter-categories">
                            {categories.map((cat, index) => (
                                <button
                                    key={cat.id}
                                    className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <span className="filter-icon">{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="filter-search">
                            <IoSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Поиск блюд..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="search-clear" onClick={() => setSearchQuery('')}>
                                    <IoClose />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Сетка меню */}
                    <div className="menu-items-grid">
                        {filteredItems.map((item, index) => (
                            <div key={item.id} className="menu-item-card" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="card-glow"></div>
                                <div className="card-gold-border"></div>

                                <div className="item-image">
                                    <div className="image-wrapper">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="item-img" />
                                        ) : (
                                            <div className="image-placeholder">
                                                {item.id.toString().startsWith('1') ? '🥘' : item.id.toString().startsWith('2') ? '🍝' : '🥤'}
                                            </div>
                                        )}
                                        <div className="image-overlay"></div>
                                        <div className="item-badge">
                                            <FaStar />
                                            <span>Хит</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="item-info">
                                    <div className="item-header">
                                        <h4>{item.name}</h4>
                                        <span className="item-price">{item.price.toLocaleString()} сум</span>
                                    </div>
                                    <p className="item-description">{item.description}</p>

                                    {/* Анимация добавления в корзину над кнопкой */}
                                    {addingItemId === item.id && (
                                        <div className="cart-notification">
                                            <IoCheckmarkCircle />
                                            <span>Добавлено в корзину!</span>
                                        </div>
                                    )}

                                    {/* Кнопка добавления в корзину - СВЕТЛАЯ на ТЕМНОМ фоне */}
                                    <button
                                        className={`add-to-cart-btn ${addingItemId === item.id ? 'adding' : ''}`}
                                        onClick={() => handleAddToCart(item)}
                                        disabled={addingItemId === item.id}
                                    >
                                        {addingItemId === item.id ? (
                                            <>
                                                <div className="spinner"></div>
                                                <span>Добавлено!</span>
                                            </>
                                        ) : (
                                            <>
                                                <IoCart />
                                                <span>В корзину</span>
                                                <FaArrowRight className="btn-arrow" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="no-results">
                            <IoSad className="no-results-icon" />
                            <p>По вашему запросу ничего не найдено</p>
                            <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
'use client';

import { useState, useEffect } from 'react';

import { useCart } from '@/context/CartContext';

import './menu-page.css';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/footer/Footer';
import { menuData } from '../utils/data';
import Navbar from '../components/navbar/Navbar';

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
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

    const categories = [
        { id: 'all', name: 'Все блюда', icon: '🍽️' },
        ...menuData.map(cat => ({ id: cat.id.toString(), name: cat.category, icon: cat.id === 1 ? '🥘' : cat.id === 2 ? '🍝' : '🥤' }))
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

            <section className="menu-page">
                <div className="container">
                    {/* Фильтры */}
                    <div className="menu-filters">
                        <div className="filter-categories">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <span className="filter-icon">{cat.icon}</span>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        <div className="filter-search">
                            <input
                                type="text"
                                placeholder="Поиск блюд..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>

                    {/* Специальное предложение */}
                    <div className="special-offer">
                        <div className="offer-badge">🔥 Спецпредложение</div>
                        <div className="offer-content">
                            <div className="offer-info">
                                <h3>Бизнес-ланч</h3>
                                <p>С 12:00 до 16:00 скидка 20% на все блюда</p>
                                <button className="btn-outline-gold">Забронировать столик</button>
                            </div>
                            <div className="offer-image">
                                <span>🍽️</span>
                            </div>
                        </div>
                    </div>

                    {/* Сетка меню */}
                    <div className="menu-items-grid">
                        {filteredItems.map(item => (
                            <div key={item.id} className="menu-item-card">
                                <div className="item-image">
                                    <div className="image-placeholder">
                                        {item.id.toString().startsWith('1') ? '🥘' : item.id.toString().startsWith('2') ? '🍝' : '🥤'}
                                    </div>
                                </div>
                                <div className="item-info">
                                    <div className="item-header">
                                        <h4>{item.name}</h4>
                                        <span className="item-price gold-text">{item.price.toLocaleString()} сум</span>
                                    </div>
                                    <p className="item-description">{item.description}</p>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        + В корзину
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="no-results">
                            <p>😔 По вашему запросу ничего не найдено</p>
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
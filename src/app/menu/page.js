'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import {
    IoSearch,
    IoClose,
    IoCheckmarkCircle,
    IoRestaurant,
    IoSad,
    IoCart,
    IoChevronBack,
    IoChevronForward,
    IoPizza,
    IoFish,
    IoCafe,
    IoWine,
    IoIceCream,
    IoBasket,
    IoFastFood,
    IoBarbell
} from 'react-icons/io5';
import { FaStar, FaArrowRight, FaHamburger, FaMugHot } from 'react-icons/fa';
import { GiChopsticks, GiNoodles, GiSushis, GiMeat, GiHotSpices } from 'react-icons/gi';
import { FaCakeCandles } from "react-icons/fa6";
import { TbSalad } from "react-icons/tb";
import './menu-page.css';
import Navbar from '../components/navbar/Navbar';
import PageHeader from '../components/common/PageHeader';
import { menuData } from '../utils/data';
import Footer from '../components/footer/Footer';


// Функция для получения изображения блюда
const getDishImage = (dish) => {
    // Если у блюда есть свое фото, используем его
    if (dish.image && dish.image !== '') {
        return dish.image;
    }
    // Иначе используем плейсхолдер
    return '/images/placeholder.jpg';
};

// Маппинг категорий к иконкам
const getCategoryIcon = (categoryName, categoryId) => {
    const iconsMap = {
        'Салаты': <TbSalad />,
        'Горячие блюда': <IoBarbell />,
        'Супы': <IoFastFood />,
        'Гарниры': <IoBasket />,
        'Соусы': <IoWine />,
        'Напитки': <IoCafe />,
        'Десерты': <FaCakeCandles />,
        'Завтраки': <FaMugHot />,
        'Бургеры': <FaHamburger />,
        'Пицца': <IoPizza />,
        'Паста': <GiNoodles />,
        'Суши': <GiSushis />,
        'Азиатская кухня': <GiChopsticks />,
        'Мясо на гриле': <GiMeat />,
        'Острые блюда': <GiHotSpices />,
        'Рыбные блюда': <IoFish />,
        'Мороженое': <IoIceCream />
    };
    
    for (const [key, icon] of Object.entries(iconsMap)) {
        if (categoryName?.includes(key)) {
            return icon;
        }
    }
    
    if (categoryId === 1) return <GiMeat />;
    if (categoryId === 2) return <GiNoodles />;
    if (categoryId === 3) return <IoPizza />;
    if (categoryId === 4) return <FaHamburger />;
    if (categoryId === 5) return <IoFish />;
    if (categoryId === 6) return <TbSalad />;
    if (categoryId === 7) return <IoCafe />;
    if (categoryId === 8) return <FaCakeCandles />;
    if (categoryId === 9) return <IoWine />;
    if (categoryId === 10) return <IoBarbell />;
    
    return <IoRestaurant />;
};

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [addingItemId, setAddingItemId] = useState(null);
    const [randomizedAllItems, setRandomizedAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const { addToCart, cart } = useCart();

    // Рандомизация всех блюд
    useEffect(() => {
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };
        const allItems = menuData.flatMap(cat => cat.items);
        setRandomizedAllItems(shuffleArray(allItems));
    }, []);

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

    // Фильтрация блюд (без категории "Шеф-рекомендует")
    useEffect(() => {
        let items = [];
        if (selectedCategory === 'all') {
            items = [...randomizedAllItems];
        } else {
            const category = menuData.find(cat => cat.id === parseInt(selectedCategory));
            items = category ? [...category.items] : [];
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            items = items.filter(item =>
                item.name?.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query)
            );
        }

        setFilteredItems(items);
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, randomizedAllItems]);

    const handleAddToCart = useCallback((item) => {
        setAddingItemId(item.id);
        
        const cartItem = {
            id: item.id,
            name: item.name,
            price: item.price || 0,
            image: getDishImage(item),
            quantity: 1
        };
        
        const existingItem = cart.find(i => i.id === item.id);
        if (existingItem) {
            addToCart({ ...cartItem, quantity: existingItem.quantity + 1 });
        } else {
            addToCart(cartItem);
        }
        
        setTimeout(() => setAddingItemId(null), 1000);
    }, [addToCart, cart]);

    // Пагинация
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredItems, currentPage]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }, []);

    // Категории (без "Шеф-рекомендует")
    const categories = useMemo(() => {
        const cats = [
            { id: 'all', name: 'Все блюда', icon: <IoRestaurant /> }
        ];
        
        menuData.forEach(cat => {
            if (cat.category !== "🍽️ БЛЮДО ОТ ШЕФА") {
                cats.push({
                    id: cat.id.toString(),
                    name: cat.category,
                    icon: getCategoryIcon(cat.category, cat.id)
                });
            }
        });
        
        return cats;
    }, []);

    const getPageNumbers = useCallback(() => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) pages.push(i);
            pages.push('...');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
            pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    }, [currentPage, totalPages]);

    return (
        <>
            <Navbar />
            <PageHeader
                title="Наше меню"
                subtitle="Изысканные блюда национальной и европейской кухни"
                backgroundImage="/images/menu/1.png"
                breadcrumbs="Меню"
            />

            <section className={`menu-page ${isVisible ? 'visible' : ''}`}>
                <div className="menu-bg-glow"></div>
                <div className="container">
                    <div className="menu-search-bar">
                        <div className="search-container">
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

                    <div className="categories-wrapper">
                        <div className="categories-container">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <span className="category-icon">{cat.icon}</span>
                                    <span className="category-name">{cat.name}</span>
                                    {selectedCategory === cat.id && <span className="active-indicator"></span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {searchQuery && (
                        <div className="search-results-info">
                            <span className="results-count">Найдено: {filteredItems.length} блюд</span>
                            <button className="reset-filter" onClick={() => setSearchQuery('')}>
                                Очистить
                            </button>
                        </div>
                    )}

                    <div className="menu-items-grid">
                        {paginatedItems.map((item, index) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                index={index}
                                isAdding={addingItemId === item.id}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn prev"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <IoChevronBack />
                            </button>
                            <div className="pagination-numbers">
                                {getPageNumbers().map((page, idx) => (
                                    page === '...' ? (
                                        <span key={`dots-${idx}`} className="pagination-dots">...</span>
                                    ) : (
                                        <button
                                            key={page}
                                            className={`pagination-num ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>
                            <button
                                className="pagination-btn next"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <IoChevronForward />
                            </button>
                        </div>
                    )}

                    {filteredItems.length === 0 && (
                        <div className="no-results">
                            <IoSad className="no-results-icon" />
                            <p>По запросу "{searchQuery}" ничего не найдено</p>
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

// Отдельный компонент карточки
const MenuCard = ({ item, index, isAdding, onAddToCart }) => {
    const [imgError, setImgError] = useState(false);

    const getImageSrc = () => {
        if (item.image && item.image !== '' && !imgError) {
            return item.image;
        }
        return '/images/placeholder.jpg';
    };

    return (
        <div className="menu-item-card" style={{ animationDelay: `${index * 0.03}s` }}>
            <div className="card-glow"></div>
            <div className="card-gold-border"></div>

            <div className="item-image">
                <div className="image-wrapper">
                    <img 
                        src={getImageSrc()} 
                        alt={item.name} 
                        className="item-img" 
                        loading="lazy"
                        onError={(e) => {
                            setImgError(true);
                            e.target.src = '/images/placeholder.jpg';
                        }}
                    />
                    <div className="image-overlay">
                        <span className="quick-view">Быстрый просмотр</span>
                    </div>
                </div>
                <div className="item-badge">
                    <FaStar /> Хит
                </div>
            </div>

            <div className="item-info">
                <div className="item-header">
                    <h4>{item.name || 'Блюдо'}</h4>
                    <span className="item-price gold-text">
                        {item.price ? `${item.price.toLocaleString()} сум` : ''}
                    </span>
                </div>
                <p className="item-description">{item.description || 'Описание отсутствует'}</p>

                {isAdding && (
                    <div className="cart-notification">
                        <IoCheckmarkCircle />
                        <span>Добавлено!</span>
                    </div>
                )}

                <button
                    className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                    onClick={() => onAddToCart(item)}
                    disabled={isAdding}
                >
                    {isAdding ? (
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
    );
};
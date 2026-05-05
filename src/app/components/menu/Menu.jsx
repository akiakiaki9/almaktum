'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { menuData } from '@/app/utils/data';
import { useCart } from '@/context/CartContext';
import {
  FaUtensils,
  FaChevronRight,
  FaStar,
  FaShoppingBag,
  FaStarHalfAlt,
  FaChevronLeft
} from 'react-icons/fa';
import './menu.css';

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const menuSectionRef = useRef(null);
  const tabsContainerRef = useRef(null);

  // Получаем все блюда для отображения (первые 6)
  const allItems = menuData.flatMap(cat => cat.items);
  const popularItems = allItems.slice(0, 6);

  const handleCategoryClick = (categoryId, categoryData = null) => {
    setActiveCategory(categoryId);
    setSelectedCategoryData(categoryData);

    setTimeout(() => {
      if (menuSectionRef.current) {
        const navbarHeight = 80;
        const categoryTabsHeight = 70;
        const elementPosition = menuSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - categoryTabsHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Проверка необходимости показа стрелок
  const checkScrollButtons = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Скролл влево/вправо
  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Drag to scroll функционал для мобильных
  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    // Touch events для мобильных
    const onTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);

    // Проверка скролла
    container.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);
    checkScrollButtons();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('menu');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Отображаемые блюда в зависимости от выбранной категории
  const getDisplayItems = () => {
    if (activeCategory === 'all') {
      return popularItems;
    }
    if (selectedCategoryData) {
      return selectedCategoryData.items;
    }
    return popularItems;
  };

  const displayItems = getDisplayItems();
  const currentCategoryTitle = activeCategory === 'all' ? 'Популярные блюда' : selectedCategoryData?.category;

  return (
    <section id="menu" className={`menu ${isVisible ? 'visible' : ''}`} ref={menuSectionRef}>
      <div className="menu-bg-glow"></div>
      <div className="container">
        <div className="menu-header">
          <span className="section-tag">
            <FaStar className="tag-icon" />
            Меню
          </span>
          <h2>Наши <span className="gold-text">шедевры</span></h2>
          <div className="title-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Category Tabs с возможностью скролла и drag */}
        <div className="category-tabs-wrapper">
          {showLeftArrow && (
            <button
              className="scroll-arrow scroll-arrow-left"
              onClick={() => scrollTabs('left')}
              aria-label="Прокрутить влево"
            >
              <FaChevronLeft />
            </button>
          )}

          <div className="category-tabs" ref={tabsContainerRef}>
            <button
              className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              <FaUtensils />
              <span>Все блюда</span>
            </button>
            {menuData.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id, category)}
              >
                {category.category.split(' ')[0]}
                <span>{category.category}</span>
              </button>
            ))}
          </div>

          {showRightArrow && (
            <button
              className="scroll-arrow scroll-arrow-right"
              onClick={() => scrollTabs('right')}
              aria-label="Прокрутить вправо"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* Menu Content - показывает только выбранную категорию */}
        <div className="menu-content">
          <div className="featured-header">
            <h3>{currentCategoryTitle}</h3>
            <Link href="/menu" className="view-all-link">
              <span>Смотреть полное меню</span>
              <FaChevronRight />
            </Link>
          </div>

          <div className="menu-grid">
            {displayItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// MenuCard Component остается без изменений
function MenuCard({ item, onAddToCart, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div
      className={`menu-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-glow"></div>
      <div className="card-gold-border"></div>

      <div className="menu-card-image">
        <div className="image-wrapper">
          <div className="image-placeholder">
            {item.image ? (
              <img src={item.image} alt={item.name} />
            ) : (
              <span>🍽️</span>
            )}
          </div>
          <div className="image-overlay"></div>
          <div className="card-badge">
            <FaStar />
            <span>Хит</span>
          </div>
        </div>
      </div>

      <div className="menu-card-info">
        <div className="card-header">
          <h4>{item.name}</h4>
          <div className="card-rating">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
          </div>
        </div>
        <p>{item.description}</p>
        <div className="menu-card-footer">
          <div className="price-wrapper">
            <span className="price">{item.price.toLocaleString()} сум</span>
            {item.oldPrice && (
              <span className="old-price">{item.oldPrice.toLocaleString()} сум</span>
            )}
          </div>
          <button
            className={`add-to-cart-btn ${isHovered ? 'visible' : ''} ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <div className="spinner"></div>
                <span>Добавлено!</span>
              </>
            ) : (
              <>
                <FaShoppingBag />
                <span>В корзину</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
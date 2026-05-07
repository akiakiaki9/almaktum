'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import {
  FaUtensils,
  FaChevronRight,
  FaStar,
  FaShoppingBag,
  FaChevronLeft,
  FaTimes,
  FaCrown,
} from 'react-icons/fa';
import './menu.css';
import { menuData } from '@/app/utils/data';

// Функция для получения случайного фото блюда из интернета
const getRandomFoodImage = (dishName) => {
  const foodImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400',
    'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    'https://images.unsplash.com/photo-1574484284009-3d96b177f7b1?w=400',
    'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    'https://images.unsplash.com/photo-1625938144755-5f6e5f3b94b6?w=400',
    'https://images.unsplash.com/photo-1632778149955-e80f8ceca2b8?w=400',
    'https://images.unsplash.com/photo-1695223958714-80b1b97ec2fc?w=400',
    'https://images.unsplash.com/photo-1694099095412-0a08d7c433d7?w=400',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'
  ];
  
  const index = dishName?.length ? dishName.charCodeAt(0) % foodImages.length : Math.floor(Math.random() * foodImages.length);
  return foodImages[index];
};

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isAdding, setIsAdding] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [randomizedItems, setRandomizedItems] = useState([]);
  const itemsPerPage = 12;
  const menuSectionRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Функция для рандомизации массива
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Получаем все блюда и рандомизируем их
    const allItems = menuData.flatMap(cat => cat.items);
    setRandomizedItems(shuffleArray(allItems));

    return () => setMounted(false);
  }, []);

  // Находим категорию "Блюдо от шефа"
  const chefCategory = menuData.find(cat => cat.category === "🍽️ БЛЮДО ОТ ШЕФА");

  const getDisplayItems = () => {
    if (activeCategory === 'all') {
      return randomizedItems;
    }
    if (activeCategory === 'chef' && chefCategory) {
      return chefCategory.items;
    }
    if (selectedCategoryData) {
      return selectedCategoryData.items;
    }
    return randomizedItems;
  };

  const displayItems = getDisplayItems();
  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = displayItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: menuSectionRef.current?.offsetTop - 100, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId, categoryData = null) => {
    setActiveCategory(categoryId);
    setSelectedCategoryData(categoryData);
    setCurrentPage(1);

    setTimeout(() => {
      if (menuSectionRef.current) {
        const navbarHeight = 80;
        const categoryTabsHeight = 70;
        const elementPosition = menuSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - categoryTabsHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const checkScrollButtons = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

  useEffect(() => {
    if (selectedDish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDish]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedDish) {
        setSelectedDish(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDish]);

  const handleAddToCart = (item) => {
    setIsAdding(item.id);
    const cartItem = {
      id: item.id,
      name: item.name,
      price: 0,
      image: item.image || getRandomFoodImage(item.name),
      quantity: 1
    };
    addToCart(cartItem);
    setTimeout(() => {
      setIsAdding(null);
    }, 500);
  };

  const currentCategoryTitle = () => {
    if (activeCategory === 'all') return 'Все блюда';
    if (activeCategory === 'chef') return '🍽️ Блюдо от шефа';
    return selectedCategoryData?.category || 'Меню';
  };

  const DishModal = ({ dish, onClose }) => (
    <div className="dish-modal-overlay" onClick={onClose}>
      <div className="dish-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="dish-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="dish-modal-image">
          <img 
            src={dish.image || getRandomFoodImage(dish.name)} 
            alt={dish.name} 
            onError={(e) => {
              e.target.src = getRandomFoodImage(dish.name);
            }}
          />
          {dish.isChefSpecial && (
            <div className="dish-chef-badge">
              <FaCrown /> Блюдо шефа
            </div>
          )}
        </div>
        <div className="dish-modal-info">
          <h2>{dish.name}</h2>
          <p className="dish-modal-description">{dish.description}</p>
          <button
            className="dish-modal-btn"
            onClick={() => {
              handleAddToCart(dish);
              onClose();
            }}
          >
            <FaShoppingBag />
            <span>Заказать</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
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

          <div className="category-tabs-wrapper">
            {showLeftArrow && (
              <button className="scroll-arrow scroll-arrow-left" onClick={() => scrollTabs('left')}>
                <FaChevronLeft />
              </button>
            )}

            <div className="category-tabs" ref={tabsContainerRef}>
              <button
                className={`category-tab ${activeCategory === 'chef' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('chef')}
              >
                <FaCrown />
                <span>Блюдо от шефа</span>
              </button>
              <button
                className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                <FaUtensils />
                <span>Все блюда</span>
              </button>
              {menuData.filter(cat => cat.category !== "🍽️ БЛЮДО ОТ ШЕФА").map((category) => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.id, category)}
                >
                  <span>{category.category}</span>
                </button>
              ))}
            </div>

            {showRightArrow && (
              <button className="scroll-arrow scroll-arrow-right" onClick={() => scrollTabs('right')}>
                <FaChevronRight />
              </button>
            )}
          </div>

          <div className="menu-content">
            <div className="featured-header">
              <h3>{currentCategoryTitle()}</h3>
              <div className="items-count">Всего: {displayItems.length} блюд</div>
            </div>

            <div className="menu-grid">
              {paginatedItems.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  onImageClick={setSelectedDish}
                  index={index}
                  isAdding={isAdding}
                  isChefCategory={activeCategory === 'chef'}
                />
              ))}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-num ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedDish && mounted && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </>
  );
}

// MenuCard Component
function MenuCard({ item, onAddToCart, onImageClick, index, isAdding, isChefCategory }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (item.image) {
      setImgSrc(item.image);
    } else {
      setImgSrc(getRandomFoodImage(item.name));
    }
  }, [item.image, item.name]);

  return (
    <div
      className={`menu-card ${isHovered ? 'hovered' : ''} ${isChefCategory ? 'chef-special' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.02}s` }}
    >
      <div className="card-glow"></div>
      <div className="card-gold-border"></div>

      {isChefCategory && (
        <div className="chef-crown">
          <FaCrown />
          <span>Шеф-рекомендует</span>
        </div>
      )}

      <div className="menu-card-image" onClick={() => onImageClick(item)}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.name}
            onError={(e) => {
              e.target.src = getRandomFoodImage(item.name);
            }}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <span>🍽️</span>
          </div>
        )}
        <div className="image-overlay">
          <span className="view-icon">🔍</span>
        </div>
      </div>

      <div className="menu-card-info">
        <div className="card-header">
          <h4>{item.name}</h4>
          <div className="card-rating">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
          </div>
        </div>
        <p className="card-description">{item.description}</p>
        <button
          className={`card-order-btn ${isHovered ? 'visible' : ''} ${isAdding === item.id ? 'adding' : ''}`}
          onClick={() => onAddToCart(item)}
          disabled={isAdding === item.id}
        >
          {isAdding === item.id ? (
            <>
              <div className="spinner"></div>
              <span>✓</span>
            </>
          ) : (
            <>
              <FaShoppingBag />
              <span>Заказать</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
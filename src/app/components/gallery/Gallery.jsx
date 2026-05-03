'use client';

import { useState, useEffect } from 'react';
import { 
  IoChevronBack, 
  IoChevronForward, 
  IoClose, 
  IoPlay, 
  IoPause,
  IoExpand,
  IoHeart,
  IoHeartOutline
} from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import './gallery.css';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    title: 'Основной зал',
    description: 'Элегантный интерьер с золотыми акцентами и панорамными окнами',
    category: 'Интерьер'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    title: 'Ресторанная зона',
    description: 'Уютная атмосфера для романтических ужинов при свечах',
    category: 'Интерьер'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
    title: 'Банкетный зал',
    description: 'Просторный зал для торжественных мероприятий до 200 гостей',
    category: 'Интерьер'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&q=80',
    title: 'Летняя терраса',
    description: 'Летняя веранда с видом на город и свежим воздухом',
    category: 'Терраса'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80',
    title: 'Шеф-повар',
    description: 'Мастер-классы от шеф-повара и приготовление традиционных блюд',
    category: 'Кухня'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',
    title: 'Живая музыка',
    description: 'Вечерние выступления лучших музыкантов и джазовые вечера',
    category: 'Развлечения'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=1200&q=80',
    title: 'Винная карта',
    description: 'Более 200 наименований вин со всего мира',
    category: 'Кухня'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80',
    title: 'VIP Зона',
    description: 'Премиум зона с отдельным входом и обслуживанием',
    category: 'Интерьер'
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [likedImages, setLikedImages] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.max(0, galleryImages.length - slidesToShow);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && maxIndex > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsAutoPlaying(true);
    document.body.style.overflow = '';
  };

  const goToImage = (index) => {
    setSelectedImage(galleryImages[index]);
  };

  const toggleLike = (imageId, e) => {
    e.stopPropagation();
    setLikedImages(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  const visibleImages = galleryImages.slice(currentIndex, currentIndex + slidesToShow);

  return (
    <section id="gallery" className={`gallery ${isVisible ? 'visible' : ''}`}>
      <div className="gallery-bg-glow"></div>
      <div className="container">
        <div className="gallery-header">
          <span className="section-tag">
            <FaStar className="tag-icon" />
            Галерея
          </span>
          <h2>Наша <span className="gold-text">атмосфера</span></h2>
          <div className="title-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Взгляните на изысканный интерьер и неповторимую атмосферу ресторана Al Maktum</p>
        </div>

        <div className="carousel-container">
          {galleryImages.length > slidesToShow && (
            <button className="carousel-nav prev" onClick={prevSlide}>
              <IoChevronBack />
            </button>
          )}

          <div className="carousel-track">
            <div className="carousel-slides" style={{ 
              gridTemplateColumns: `repeat(${slidesToShow}, 1fr)`
            }}>
              {visibleImages.map((image, idx) => (
                <div 
                  key={image.id} 
                  className="gallery-item"
                  onClick={() => openModal(image)}
                >
                  <div className="gallery-image-wrapper">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <span className="gallery-category">{image.category}</span>
                        <h4>{image.title}</h4>
                        <p>{image.description}</p>
                        <button className="view-btn">
                          <IoExpand />
                          <span>Увеличить</span>
                        </button>
                      </div>
                    </div>
                    <button 
                      className="gallery-like"
                      onClick={(e) => toggleLike(image.id, e)}
                    >
                      {likedImages[image.id] ? <IoHeart /> : <IoHeartOutline />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {galleryImages.length > slidesToShow && (
            <button className="carousel-nav next" onClick={nextSlide}>
              <IoChevronForward />
            </button>
          )}
        </div>

        {galleryImages.length > slidesToShow && (
          <div className="carousel-controls">
            <button 
              className="auto-play-btn"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? <IoPause /> : <IoPlay />}
              {isAutoPlaying ? 'Пауза' : 'Автоплей'}
            </button>
            
            <div className="carousel-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && selectedImage && (
        <div className="lightbox-modal" onClick={closeModal}>
          <button className="lightbox-close" onClick={closeModal}>
            <IoClose />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} />
            
            <div className="lightbox-info">
              <span className="lightbox-category">{selectedImage.category}</span>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
            
            <div className="lightbox-nav">
              <button 
                onClick={() => {
                  const currentIdx = galleryImages.findIndex(img => img.id === selectedImage.id);
                  const prevIdx = currentIdx === 0 ? galleryImages.length - 1 : currentIdx - 1;
                  setSelectedImage(galleryImages[prevIdx]);
                }}
              >
                <IoChevronBack />
              </button>
              <span className="lightbox-counter">
                {galleryImages.findIndex(img => img.id === selectedImage.id) + 1} / {galleryImages.length}
              </span>
              <button 
                onClick={() => {
                  const currentIdx = galleryImages.findIndex(img => img.id === selectedImage.id);
                  const nextIdx = currentIdx === galleryImages.length - 1 ? 0 : currentIdx + 1;
                  setSelectedImage(galleryImages[nextIdx]);
                }}
              >
                <IoChevronForward />
              </button>
            </div>
          </div>
          
          <div className="lightbox-thumbnails">
            {galleryImages.map((image, idx) => (
              <div
                key={image.id}
                className={`thumbnail ${selectedImage.id === image.id ? 'active' : ''}`}
                onClick={() => goToImage(idx)}
              >
                <img src={image.url} alt={image.title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
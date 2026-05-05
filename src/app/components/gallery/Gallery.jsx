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
    url: '/images/gallery/2.png',
    title: 'Основной зал',
    description: 'Элегантный интерьер с золотыми акцентами и панорамными окнами',
    category: 'Интерьер'
  },
  {
    id: 2,
    url: '/images/gallery/13.png',
    title: 'Ресторанная зона',
    description: 'Уютная атмосфера для романтических ужинов при свечах',
    category: 'Интерьер'
  },
  {
    id: 6,
    url: '/images/gallery/11.png',
    title: 'Живая музыка',
    description: 'Вечерние выступления лучших музыкантов и джазовые вечера',
    category: 'Развлечения'
  },
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
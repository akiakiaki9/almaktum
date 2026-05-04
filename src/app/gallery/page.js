'use client';

import { useState, useEffect } from 'react';
import { IoClose, IoChevronBack, IoChevronForward, IoSearchOutline } from 'react-icons/io5';
import './gallery-page.css';
import Navbar from '../components/navbar/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/footer/Footer';

// Генерируем массив фоток с 1 по 21
const generateGalleryImages = () => {
    const images = [];
    for (let i = 1; i <= 21; i++) {
        images.push({
            id: i,
            url: `/images/gallery/${i}.png`,
            description: `Фото ${i}`
        });
    }
    // Перемешиваем массив для рандомного порядка
    return images.sort(() => Math.random() - 0.5);
};

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // При загрузке страницы создаем рандомный порядок фоток
        setGalleryImages(generateGalleryImages());
    }, []);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setSelectedImage(null);
        setSelectedIndex(null);
        document.body.style.overflow = 'auto';
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (selectedIndex !== null && galleryImages.length > 0) {
            const prevIndex = selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1;
            setSelectedImage(galleryImages[prevIndex]);
            setSelectedIndex(prevIndex);
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (selectedIndex !== null && galleryImages.length > 0) {
            const nextIndex = selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1;
            setSelectedImage(galleryImages[nextIndex]);
            setSelectedIndex(nextIndex);
        }
    };

    // Обработка клавиш клавиатуры
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'ArrowLeft') {
                handlePrev(e);
            } else if (e.key === 'ArrowRight') {
                handleNext(e);
            } else if (e.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, selectedIndex, galleryImages]);

    return (
        <>
            <Navbar />
            <PageHeader
                title="Фотогалерея"
                subtitle="Взгляните на атмосферу и интерьер нашего ресторана"
                backgroundImage="/images/gallery/1.png"
                breadcrumbs="Галерея"
            />

            <section className="gallery-page">
                <div className="container">
                    <div className="gallery-stats">
                        <p>Всего фотографий: {galleryImages.length}</p>
                    </div>
                    
                    <div className="gallery-masonry">
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="gallery-item"
                                onClick={() => handleImageClick(image, index)}
                            >
                                <img src={image.url} alt="Al Maktum галерея" loading="lazy" />
                                <div className="gallery-item-overlay">
                                    <div className="overlay-content">
                                        <div className="icon-wrapper">
                                            <IoSearchOutline />
                                        </div>
                                        <span className="view-text">Увеличить</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="gallery-lightbox" onClick={handleClose}>
                    <button className="lightbox-close" onClick={handleClose}>
                        <IoClose />
                    </button>
                    
                    <button className="lightbox-nav-btn prev-btn" onClick={handlePrev}>
                        <IoChevronBack />
                    </button>
                    
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage.url} alt={selectedImage.description} />
                        <div className="lightbox-counter">
                            {selectedIndex + 1} / {galleryImages.length}
                        </div>
                    </div>
                    
                    <button className="lightbox-nav-btn next-btn" onClick={handleNext}>
                        <IoChevronForward />
                    </button>
                </div>
            )}

            <Footer />
        </>
    );
}
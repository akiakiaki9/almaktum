'use client';

import { useState, useEffect } from 'react';

import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './gallery-page.css';
import Navbar from '../components/navbar/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/footer/Footer';

const galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200', title: 'Основной зал', category: 'Интерьер', description: 'Элегантный интерьер с золотыми акцентами' },
    { id: 2, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200', title: 'Ресторанная зона', category: 'Интерьер', description: 'Уютная атмосфера для романтических ужинов' },
    { id: 3, url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200', title: 'Банкетный зал', category: 'Залы', description: 'Просторный зал для торжественных мероприятий' },
    { id: 4, url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200', title: 'Терраса', category: 'Залы', description: 'Летняя веранда с видом на город' },
    { id: 5, url: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200', title: 'Блюда', category: 'Кухня', description: 'Авторские блюда от шеф-повара' },
    { id: 6, url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200', title: 'Живая музыка', category: 'События', description: 'Вечерние выступления лучших музыкантов' },
    { id: 7, url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200', title: 'Свадебный зал', category: 'Залы', description: 'Идеальное место для свадебного торжества' },
    { id: 8, url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200', title: 'Винная карта', category: 'Кухня', description: 'Более 100 видов премиальных вин' },
    { id: 9, url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200', title: 'Блюда', category: 'Кухня', description: 'Изысканная подача блюд' }
];

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [filteredImages, setFilteredImages] = useState(galleryImages);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredImages(galleryImages);
        } else {
            setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
        }
    }, [selectedCategory]);

    const categories = ['all', 'Интерьер', 'Залы', 'Кухня', 'События'];

    return (
        <>
            <Navbar />
            <PageHeader
                title="Фотогалерея"
                subtitle="Взгляните на атмосферу и интерьер нашего ресторана"
                backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
                breadcrumbs="Галерея"
            />

            <section className="gallery-page">
                <div className="container">
                    <div className="gallery-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`gallery-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === 'all' ? 'Все фото' : cat}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-masonry">
                        {filteredImages.map((image, index) => (
                            <div
                                key={image.id}
                                className={`gallery-item ${index % 3 === 1 ? 'tall' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image.url} alt={image.title} loading="lazy" />
                                <div className="gallery-item-overlay">
                                    <div className="overlay-content">
                                        <h4>{image.title}</h4>
                                        <p>{image.category}</p>
                                        <span className="view-icon">🔍</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                        <IoClose />
                    </button>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage.url} alt={selectedImage.title} />
                        <div className="lightbox-info">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                        </div>
                        <div className="lightbox-nav">
                            <button onClick={() => {
                                const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                                const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
                                setSelectedImage(filteredImages[prevIndex]);
                            }}>
                                <IoChevronBack />
                            </button>
                            <button onClick={() => {
                                const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                                const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
                                setSelectedImage(filteredImages[nextIndex]);
                            }}>
                                <IoChevronForward />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};
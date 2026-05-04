'use client';

import { useEffect, useState } from 'react';
import './about-page.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import PageHeader from '../components/common/PageHeader';
import { 
  IoPlay, 
  IoMusicalNotes,
  IoPeople, 
  IoCalendar, 
  IoTime,
  IoStar,
} from 'react-icons/io5';
import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';
import { SiBytedance } from "react-icons/si";

export default function AboutPage() {
    const [activeVideo, setActiveVideo] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.about-page');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const galleryImages = [
        { id: 1, url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", title: "Основной зал", category: "Интерьер" },
        { id: 2, url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", title: "Ресторанная зона", category: "Интерьер" },
        { id: 3, url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", title: "Банкетный зал", category: "Интерьер" },
        { id: 4, url: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800", title: "Летняя терраса", category: "Терраса" },
        { id: 5, url: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800", title: "Приготовление плова", category: "Кухня" },
        { id: 6, url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800", title: "Живая музыка", category: "Развлечения" },
        { id: 7, url: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800", title: "Винная карта", category: "Сервис" },
        { id: 8, url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800", title: "VIP зона", category: "Интерьер" }
    ];

    return (
        <>
            <Navbar />
            <PageHeader
                title="О ресторане Al Maktum"
                subtitle="Лучшее место для отдыха и развлечений в Бухаре"
                backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
                breadcrumbs="О нас"
            />

            <div className={`about-page ${isVisible ? 'visible' : ''}`}>
                {/* Видео презентация */}
                <section className="about-video-section">
                    <div className="container">
                        <div className="video-wrapper">
                            <div className="video-container">
                                <video
                                    poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
                                    controls
                                    playsInline
                                >
                                    <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=1c0c7a6f5c7e6f5e4d3e2c1b0a9e8d7c" type="video/mp4" />
                                    Ваш браузер не поддерживает видео.
                                </video>
                                <div className="video-overlay-content">
                                    <span>🎬 Добро пожаловать в Al Maktum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Субботний танцевальный вечер */}
                <section className="dance-evening-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">
                                <SiBytedance className="tag-icon" />
                                Каждую субботу
                            </span>
                            <h2>Танцевальный <span className="gold-text">вечер</span></h2>
                            <div className="title-decoration">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>Зажигательные ритмы и незабываемая атмосфера каждую субботу</p>
                        </div>

                        <div className="dance-content">
                            <div className="dance-info">
                                <div className="dance-features">
                                    <div className="dance-feature">
                                        <IoCalendar className="feature-icon" />
                                        <div>
                                            <h4>Каждую субботу</h4>
                                            <p>С 20:00 до 23:00</p>
                                        </div>
                                    </div>
                                    <div className="dance-feature">
                                        <IoTime className="feature-icon" />
                                        <div>
                                            <h4>Продолжительность</h4>
                                            <p>3 часа танцевального марафона</p>
                                        </div>
                                    </div>
                                    <div className="dance-feature">
                                        <IoPeople className="feature-icon" />
                                        <div>
                                            <h4>Для всех гостей</h4>
                                            <p>Вход свободный для посетителей ресторана</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dance-description">
                                    <p>Каждую субботу ресторан Al Maktum превращается в танцевальную площадку! Профессиональные танцоры, зажигательные мелодии и неповторимая атмосфера ждут вас.</p>
                                    <button className="btn-gold dance-btn">
                                        Забронировать столик на субботу
                                    </button>
                                </div>
                            </div>
                            <div className="dance-gallery">
                                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600" alt="Танцевальный вечер" />
                                <img src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600" alt="Танцы" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Концерты ансамбля */}
                <section className="concert-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">
                                <IoMusicalNotes className="tag-icon" />
                                Живая музыка
                            </span>
                            <h2>Концерты <span className="gold-text">ансамбля</span></h2>
                            <div className="title-decoration">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>Лучшие музыканты создают уникальную атмосферу</p>
                        </div>

                        <div className="concert-grid">
                            <div className="concert-card">
                                <div className="concert-image">
                                    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600" alt="Ансамбль" />
                                    <div className="concert-overlay">
                                        <IoPlay className="play-icon" />
                                    </div>
                                </div>
                                <div className="concert-info">
                                    <h4>Народный ансамбль "Бухара"</h4>
                                    <p>Ежедневные выступления с 19:00 до 22:00</p>
                                    <div className="concert-schedule">
                                        <span>🎵 Национальные мелодии</span>
                                        <span>🎶 Современные хиты</span>
                                        <span>🥁 Живые инструменты</span>
                                    </div>
                                </div>
                            </div>

                            <div className="concert-card">
                                <div className="concert-image">
                                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600" alt="Джаз вечер" />
                                    <div className="concert-overlay">
                                        <IoPlay className="play-icon" />
                                    </div>
                                </div>
                                <div className="concert-info">
                                    <h4>Джазовый вечер</h4>
                                    <p>По пятницам с 20:00 до 23:00</p>
                                    <div className="concert-schedule">
                                        <span>🎷 Джаз стандарты</span>
                                        <span>🎹 Фортепианное трио</span>
                                        <span>🎺 Духовые инструменты</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Философия */}
                <section className="about-philosophy">
                    <div className="container">
                        <div className="philosophy-content">
                            <div className="philosophy-quote">
                                <span className="quote-icon">"</span>
                                <h3>Гостеприимство — наше призвание</h3>
                                <p>Мы создаем место, где каждый гость чувствует себя особенным, а атмосфера праздника сопровождает вас весь вечер</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Галерея событий */}
                <section className="events-gallery">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">
                                <IoStar className="tag-icon" />
                                Галерея событий
                            </span>
                            <h2>Фото и видео <span className="gold-text">мероприятий</span></h2>
                            <div className="title-decoration">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                        <div className="gallery-grid">
                            {galleryImages.map((image, index) => (
                                <div key={image.id} className="gallery-item" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <img src={image.url} alt={image.title} />
                                    <div className="gallery-overlay">
                                        <h4>{image.title}</h4>
                                        <span className="gallery-category">{image.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Видео нарезка */}
                <section className="video-gallery-section">
                    <div className="container">
                        <div className="video-gallery-grid">
                            <div className="video-gallery-card">
                                <div className="video-thumbnail">
                                    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600" alt="Танцевальный вечер" />
                                    <button className="video-play-btn">
                                        <IoPlay />
                                    </button>
                                </div>
                                <h4>Танцевальный вечер | Al Maktum</h4>
                                <p>Лучшие моменты субботних танцев</p>
                            </div>
                            <div className="video-gallery-card">
                                <div className="video-thumbnail">
                                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600" alt="Концерт ансамбля" />
                                    <button className="video-play-btn">
                                        <IoPlay />
                                    </button>
                                </div>
                                <h4>Ансамбль "Бухара" | Концерт</h4>
                                <p>Живое исполнение национальных мелодий</p>
                            </div>
                            <div className="video-gallery-card">
                                <div className="video-thumbnail">
                                    <img src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600" alt="Атмосфера ресторана" />
                                    <button className="video-play-btn">
                                        <IoPlay />
                                    </button>
                                </div>
                                <h4>Al Maktum | Атмосфера ресторана</h4>
                                <p>Уют и элегантность в каждом кадре</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Преимущества */}
                <section className="about-features">
                    <div className="container">
                        <div className="features-grid">
                            <div className="feature-item">
                                <div className="feature-icon">🎵</div>
                                <h4>Живая музыка ежедневно</h4>
                                <p>Профессиональные музыканты создают настроение</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">💃</div>
                                <h4>Танцевальные вечера</h4>
                                <p>Каждую субботу танцевальный марафон</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🏆</div>
                                <h4>Премиум сервис</h4>
                                <p>Индивидуальный подход к каждому гостю</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🍽️</div>
                                <h4>Авторская кухня</h4>
                                <p>Уникальные блюда от шеф-повара</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Социальные сети */}
                <section className="social-section">
                    <div className="container">
                        <div className="social-content">
                            <h3>Следите за нами в социальных сетях</h3>
                            <p>Больше фото, видео и анонсов мероприятий</p>
                            <div className="social-links">
                                <a href="https://www.instagram.com/al_maktum_bukhara/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                    <FaInstagram />
                                    <span>Instagram</span>
                                </a>
                                <a href="https://t.me/+998907449870" target="_blank" rel="noopener noreferrer" className="social-link telegram">
                                    <FaTelegram />
                                    <span>Telegram</span>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                                    <FaYoutube />
                                    <span>YouTube</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
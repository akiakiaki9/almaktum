'use client';

import { useEffect } from 'react';
import './about-page.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import PageHeader from '../components/common/PageHeader';

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <PageHeader
                title="О ресторане Al Maktum"
                subtitle="История создания лучшего премиум ресторана Бухары"
                backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
                breadcrumbs="О нас"
            />

            {/* Видео секция */}
            <section className="about-video-section">
                <div className="container">
                    <div className="video-wrapper">
                        <div className="video-container">
                            <video
                                src="/videos/restaurant-promo.mp4"
                                poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200"
                                controls
                                playsInline
                            >
                                <source src="/videos/restaurant-promo.mp4" type="video/mp4" />
                                Ваш браузер не поддерживает видео.
                            </video>
                            <div className="video-overlay-content">
                                <span className="play-hint">▶ Посмотрите видео о нас</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* История */}
            <section className="about-story">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-text">
                            <span className="section-tag gold-text">Наша история</span>
                            <h2>Путь к <span className="gold-text">совершенству</span></h2>
                            <p>Ресторан Al Maktum открыл свои двери в 2018 году с мечтой создать уникальное место, где восточное гостеприимство встречается с европейской элегантностью.</p>
                            <p>За годы работы мы завоевали доверие тысяч гостей и стали одним из лучших ресторанов Бухары премиум-класса. Наша философия — использовать только свежие продукты, готовить с душой и создавать атмосферу, в которой каждый гость чувствует себя особенным.</p>
                            <div className="story-stats">
                                <div className="stat">
                                    <span className="stat-number">5000+</span>
                                    <span className="stat-label">Довольных гостей</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100+</span>
                                    <span className="stat-label">Блюд в меню</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">6</span>
                                    <span className="stat-label">Уникальных залов</span>
                                </div>
                            </div>
                        </div>
                        <div className="story-image">
                            <div className="image-stack">
                                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800" alt="Интерьер" />
                                <img src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800" alt="Атмосфера" />
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
                            <h3>Кухня — это искусство, а мы — художники</h3>
                            <p>Мы верим, что настоящая роскошь — это качество во всем: от свежести продуктов до сервиса высшего уровня.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Команда */}
            <section className="about-team">
                <div className="container">
                    <div className="team-header">
                        <span className="section-tag gold-text">Наша команда</span>
                        <h2>Профессионалы <span className="gold-text">своего дела</span></h2>
                        <p>Люди, создающие магию вкуса и атмосферы</p>
                    </div>
                    <div className="team-grid">
                        <div className="team-card">
                            <div className="team-image">
                                <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400" alt="Шеф-повар" />
                            </div>
                            <h4>Шеф-повар</h4>
                            <p className="team-name">Усмонов Бахром</p>
                            <p className="team-desc">20 лет опыта, мастер национальной кухни</p>
                        </div>
                        <div className="team-card">
                            <div className="team-image">
                                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400" alt="Сомелье" />
                            </div>
                            <h4>Сомелье</h4>
                            <p className="team-name">Алиев Рустам</p>
                            <p className="team-desc">Лучший сомелье Узбекистана 2022</p>
                        </div>
                        <div className="team-card">
                            <div className="team-image">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" alt="Управляющий" />
                            </div>
                            <h4>Управляющий</h4>
                            <p className="team-name">Каримова Дилноза</p>
                            <p className="team-desc">10 лет в ресторанном бизнесе</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Преимущества */}
            <section className="about-features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🥩</div>
                            <h4>Только свежие продукты</h4>
                            <p>Ежедневная поставка от лучших фермеров</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">👨‍🍳</div>
                            <h4>Высокое мастерство</h4>
                            <p>Шеф-повара с мировым опытом</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🏆</div>
                            <h4>Премиум сервис</h4>
                            <p>Индивидуальный подход к каждому гостю</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
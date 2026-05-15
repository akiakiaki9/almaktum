'use client';

import { useState, useRef, useEffect } from 'react';
import {
  IoPlay,
  IoPause,
  IoVolumeHigh,
  IoVolumeMute,
  IoExpand,
  IoClose,
  IoPlayCircle,
  IoPeople,
  IoHeart,
  IoCamera
} from 'react-icons/io5';
import { FaUtensils, FaGlassCheers } from 'react-icons/fa';
import './videoreview.css';

export default function VideoReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [activeHall, setActiveHall] = useState(0);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  const videoUrl = '/videos/al-maktum_preview.mp4';
  const previewImage = '/images/video-preview.jpg';

  // Обзор залов
  const hallsReview = [
    {
      id: 0,
      name: 'Основной зал',
      icon: <FaUtensils />,
      capacity: 'до 150 гостей',
      description: 'Элегантный просторный зал с золотыми акцентами, идеально подходит для романтических ужинов и деловых встреч. Панорамные окна создают ощущение простора, а мягкое освещение добавляет уюта.',
      features: ['Панорамные окна', 'Мягкое освещение', 'Акустическая система', 'VIP зона'],
      image: '/images/main-hall.jpg'
    },
    {
      id: 1,
      name: 'Кабины',
      icon: <IoPeople />,
      capacity: 'до 40 гостей',
      description: 'Уютные отдельные кабинки для приватных встреч и романтических свиданий. Каждая кабина оформлена в уникальном стиле, создавая атмосферу уединения и комфорта.',
      features: ['Приватность', 'Индивидуальное освещение', 'Отдельный официант', 'Звукоизоляция'],
      image: '/images/cabins.jpg'
    },
    {
      id: 2,
      name: 'Банкетный зал',
      icon: <FaGlassCheers />,
      capacity: 'до 200 гостей',
      description: 'Роскошный зал для проведения банкетов, корпоративов и юбилеев. Современное оборудование, профессиональная акустика и возможность установки сцены.',
      features: ['Сцена', 'Танцпол', 'Караоке', 'Проектор'],
      image: '/images/banquet.jpg'
    },
    {
      id: 3,
      name: 'Свадебный зал',
      icon: <IoHeart />,
      capacity: 'до 300 гостей',
      description: 'Специально оборудованный зал для свадебных церемоний и торжеств. Романтическая атмосфера, фотозоны и возможность проведения выездной регистрации.',
      features: ['Фотозона', 'Выездная регистрация', 'Свадебный организатор', 'Фейерверки'],
      image: '/images/wedding.jpg'
    },
    {
      id: 4,
      name: 'Семейный зал',
      icon: <IoHeart />,
      capacity: 'до 50 гостей',
      description: 'Теплый и уютный зал для семейных праздников и детских дней рождения. Есть детская игровая зона и меню для маленьких гостей.',
      features: ['Детская комната', 'Аниматоры', 'Семейное меню', 'Игровая зона'],
      image: '/images/family.jpg'
    },
    {
      id: 5,
      name: 'Терраса',
      icon: <IoCamera />,
      capacity: 'до 80 гостей',
      description: 'Летняя веранда с видом на город. Идеальное место для завтраков, ужинов на свежем воздухе и коктейльных вечеринок. Уютная атмосфера и живая музыка по вечерам.',
      features: ['Вид на город', 'Уличные обогреватели', 'Живая музыка', 'Кальян'],
      image: '/images/terrace.jpg'
    }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        const mins = Math.floor(videoRef.current.duration / 60);
        const secs = Math.floor(videoRef.current.duration % 60);
        setDuration(`${mins}:${secs.toString().padStart(2, '0')}`);
      });
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);

      const mins = Math.floor(videoRef.current.currentTime / 60);
      const secs = Math.floor(videoRef.current.currentTime % 60);
      setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <section className="video-review">
        <div className="video-bg-glow"></div>
        <div className="container">
          <div className="video-review-header">
            <span className="section-tag gold-text">
              <IoPlayCircle /> Виртуальный тур
            </span>
            <h2>Погрузитесь в <span className="gold-text">атмосферу</span> Al Maktum</h2>
            <p>Видеообзор и подробное описание наших уникальных залов</p>
          </div>

          <div className="video-review-content">
            {/* Блок с вертикальным видео */}
            <div className="video-vertical-wrapper">
              <div className="video-vertical-container">
                <div className="video-vertical-frame">
                  <video
                    ref={videoRef}
                    className="video-vertical"
                    poster={previewImage}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>

                  <div className="video-vertical-overlay">
                    <button className="play-btn-vertical" onClick={handlePlayPause}>
                      {isPlaying ? <IoPause /> : <IoPlay />}
                    </button>
                  </div>

                  <div className="video-vertical-controls">
                    <button className="ctrl-btn" onClick={handlePlayPause}>
                      {isPlaying ? <IoPause /> : <IoPlay />}
                    </button>
                    <div className="progress-vertical" onClick={handleSeek}>
                      <div className="progress-fill-vertical" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="time-vertical">
                      {currentTime} / {duration}
                    </div>
                    <button className="ctrl-btn" onClick={handleMute}>
                      {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
                    </button>
                    <button className="ctrl-btn" onClick={openModal}>
                      <IoExpand />
                    </button>
                  </div>
                </div>
                <div className="video-vertical-label">
                  <span className="video-badge">🎬 Видеообзор</span>
                  <p>Короткое видео об атмосфере ресторана</p>
                </div>
              </div>
            </div>

            {/* Текстовый обзор залов */}
            <div className="halls-review-wrapper">
              <div className="halls-review-header">
                <h3>Наши премиум залы</h3>
                <p>6 уникальных пространств для любых мероприятий</p>
              </div>

              <div className="halls-tabs">
                {hallsReview.map((hall, idx) => (
                  <button
                    key={idx}
                    className={`hall-tab ${activeHall === idx ? 'active' : ''}`}
                    onClick={() => setActiveHall(idx)}
                  >
                    {hall.icon}
                    <span>{hall.name}</span>
                  </button>
                ))}
              </div>

              <div className="hall-review-content">
                <div className="hall-review-info">
                  <div className="hall-icon-large">{hallsReview[activeHall].icon}</div>
                  <h4>{hallsReview[activeHall].name}</h4>
                  <div className="hall-capacity">
                    <IoPeople /> {hallsReview[activeHall].capacity}
                  </div>
                  <p className="hall-description">{hallsReview[activeHall].description}</p>
                  <div className="hall-features">
                    {hallsReview[activeHall].features.map((feature, idx) => (
                      <span key={idx} className="hall-feature">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                  <button className="hall-book-btn">Забронировать этот зал</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно для полноэкранного видео */}
      {isModalOpen && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <IoClose />
            </button>
            <div className="modal-video-container">
              <video
                ref={modalVideoRef}
                className="modal-video"
                controls
                autoPlay
                poster={previewImage}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
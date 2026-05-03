import './footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo">
            <h3>Al <span className="gold-text">Maktum</span></h3>
            <p>Премиум ресторан в Бухаре</p>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/al_maktum_bukhara/" target="_blank" rel="noopener noreferrer">
                📷 Instagram
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Навигация</h4>
            <ul>
              <li><a href="#hero">Главная</a></li>
              <li><a href="#about">О нас</a></li>
              <li><a href="#menu">Меню</a></li>
              <li><a href="#halls">Залы</a></li>
              <li><a href="#gallery">Галерея</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
          </div>

          <div className="footer-working">
            <h4>Режим работы</h4>
            <p>⏰ Ежедневно: 10:00 - 23:00</p>
            <p>✨ Без выходных</p>
            <p>🎙️ Живая музыка: Пт-Сб с 20:00</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Al Maktum. Все права защищены.</p>
          <p className="footer-address">📍 г. Бухара, Шарк 1</p>
        </div>
      </div>
    </footer>
  );
}
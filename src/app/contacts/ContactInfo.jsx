import { IoLocation, IoCall, IoTime, IoMail, IoLogoInstagram } from 'react-icons/io5';

export default function ContactInfo() {
  const contactDetails = [
    { icon: <IoLocation />, title: 'Адрес', info: 'г. Бухара, Шарк 1', link: 'https://maps.google.com/?q=Бухара+Шарк+1' },
    { icon: <IoCall />, title: 'Телефоны', info: ['+998 907 449 870', '+998 914 417 181'], link: 'tel:+998907449870' },
    { icon: <IoTime />, title: 'Режим работы', info: 'Ежедневно: 10:00 - 23:00' },
    { icon: <IoLogoInstagram />, title: 'Instagram', info: '@al_maktum_bukhara', link: 'https://www.instagram.com/al_maktum_bukhara/' }
  ];

  return (
    <div className="contact-info-block">
      <h2>Контактная информация</h2>
      <p>Свяжитесь с нами для бронирования столов, организации мероприятий или любых других вопросов</p>
      
      <div className="contact-details">
        {contactDetails.map((detail, idx) => (
          <div key={idx} className="contact-detail-item">
            <div className="detail-icon">{detail.icon}</div>
            <div className="detail-content">
              <h4>{detail.title}</h4>
              {Array.isArray(detail.info) ? (
                detail.info.map((phone, i) => (
                  <a key={i} href={detail.link}>{phone}</a>
                ))
              ) : (
                detail.link ? (
                  <a href={detail.link}>{detail.info}</a>
                ) : (
                  <p>{detail.info}</p>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="social-links">
        <a href="https://t.me/+998907449870" target="_blank">📱 Telegram</a>
        <a href="https://wa.me/998907449870" target="_blank">💬 WhatsApp</a>
      </div>
    </div>
  );
}
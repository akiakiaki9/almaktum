export default function ContactMap() {
    return (
        <div className="contact-map-block">
            <h3>📍 Как нас найти</h3>
            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.456789123456!2d64.42123456789012!3d39.77456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzI4LjQiTiA2NMKwMjUnMTYuNCJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Al Maktum Location"
                />
            </div>
            <div className="map-address">
                <p>📍 г. Бухара, Шарк 1</p>
                <a href="https://maps.google.com/?q=Бухара+Шарк+1" target="_blank" className="btn-outline-gold">
                    Построить маршрут
                </a>
            </div>
        </div>
    );
}
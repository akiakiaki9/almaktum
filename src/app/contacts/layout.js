export const metadata = {
  title: "Контакты Al Maktum | Как добраться, телефон и адрес ресторана в Бухаре",
  description: "Свяжитесь с рестораном Al Maktum в Бухаре. Адрес: Шарк 1. Телефоны: +998 907 449 870, +998 914 417 181. Режим работы: ежедневно 10:00-23:00. Бронирование столов онлайн.",
  keywords: ["контакты ресторана Бухара", "телефон ресторана", "адрес Al Maktum", "как добраться", "бронирование стола Бухара", "ресторан на карте", "связаться с рестораном"],
  openGraph: {
    title: "Контакты Al Maktum | Ресторан в Бухаре",
    description: "Свяжитесь с нами: адрес, телефон, режим работы, карта проезда. Бронирование столов онлайн.",
    images: [{ url: "/images/logo.PNG", width: 1200, height: 630, alt: "Контакты Al Maktum" }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты Al Maktum | Ресторан в Бухаре",
    description: "Свяжитесь с нами: адрес, телефон, режим работы, карта проезда.",
    images: ["/images/logo.PNG"],
  },
  alternates: {
    canonical: "https://almaktum.uz/contacts",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactsLayout({ children }) {
  return <>{children}</>;
}
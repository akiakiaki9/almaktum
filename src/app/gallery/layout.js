export const metadata = {
  title: "Фотогалерея Al Maktum | Интерьер, блюда и атмосфера ресторана в Бухаре",
  description: "Посмотрите фотогалерею премиум ресторана Al Maktum в Бухаре. Интерьер залов, банкетные зоны, летняя терраса, авторские блюда и атмосфера мероприятий.",
  keywords: ["фотогалерея ресторана Бухара", "интерьер ресторана", "Al Maktum фото", "банкетный зал Бухара", "ресторан дизайн", "атмосфера ресторана", "фото блюд"],
  openGraph: {
    title: "Фотогалерея Al Maktum | Ресторан в Бухаре",
    description: "Погрузитесь в атмосферу ресторана Al Maktum через нашу фотогалерею: интерьеры, блюда, мероприятия и живая музыка.",
    images: [{ url: "/images/logo.PNG", width: 1200, height: 630, alt: "Фотогалерея Al Maktum" }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Фотогалерея Al Maktum | Ресторан в Бухаре",
    description: "Погрузитесь в атмосферу ресторана Al Maktum через нашу фотогалерею.",
    images: ["/images/logo.PNG"],
  },
  alternates: {
    canonical: "https://almaktum.uz/gallery",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryLayout({ children }) {
  return <>{children}</>;
}
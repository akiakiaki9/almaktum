export const metadata = {
  title: "Меню ресторана Al Maktum | Изысканная восточная и европейская кухня в Бухаре",
  description: "Ознакомьтесь с меню премиум ресторана Al Maktum в Бухаре. Салаты, супы, горячие блюда, плов, десерты и авторские блюда от шеф-повара. Цены и описание.",
  keywords: ["меню ресторана Бухара", "блюда Al Maktum", "восточная кухня Бухара", "европейская кухня", "плов Бухара", "ресторан меню", "авторские блюда"],
  openGraph: {
    title: "Меню Al Maktum | Ресторан в Бухаре",
    description: "Изучите наше меню: изысканные блюда восточной и европейской кухни. Свежие ингредиенты, авторская подача, доступные цены.",
    images: [{ url: "/images/logo.PNG", width: 1200, height: 630, alt: "Меню Al Maktum" }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Меню Al Maktum | Ресторан в Бухаре",
    description: "Изучите наше меню: изысканные блюда восточной и европейской кухни.",
    images: ["/images/logo.PNG"],
  },
  alternates: {
    canonical: "https://almaktum.uz/menu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MenuLayout({ children }) {
  return <>{children}</>;
}
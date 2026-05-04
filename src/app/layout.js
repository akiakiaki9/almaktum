import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { CartProvider } from '@/context/CartContext';
import Script from "next/script";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Полные метаданные для SEO
export const metadata = {
  metadataBase: new URL('https://almaktum.uz'),
  title: {
    default: "Al Maktum | Премиум Ресторан в Бухаре",
    template: "%s | Al Maktum Premium Restaurant"
  },
  description: "Al Maktum - премиум ресторан в центре Бухары. Изысканная восточная и европейская кухня, банкетные залы, летняя веранда. Бронирование столиков онлайн. Лучший ресторан Бухары.",
  keywords: [
    "ресторан Бухара",
    "премиум ресторан",
    "Al Maktum",
    "ресторан с восточной кухней",
    "банкетный зал Бухара",
    "ресторан для свадьбы",
    "лучший ресторан Бухары",
    "европейская кухня Бухара",
    "ресторан с живой музыкой",
    "доставка еды Бухара"
  ],
  authors: [{ name: "Al Maktum Restaurant", url: "https://almaktum.uz" }],
  creator: "Al Maktum",
  publisher: "Al Maktum",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Al Maktum | Премиум Ресторан в Бухаре",
    description: "Изысканная кухня, элегантный интерьер и безупречный сервис. Забронируйте столик в лучшем ресторане Бухары уже сегодня.",
    url: "https://almaktum.uz",
    siteName: "Al Maktum Premium Restaurant",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Maktum Premium Restaurant Интерьер",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Maktum | Премиум Ресторан в Бухаре",
    description: "Изысканная кухня, элегантный интерьер и безупречный сервис. Забронируйте столик в лучшем ресторане Бухары.",
    images: ["/images/og-image.jpg"],
    creator: "@almaktum",
    site: "@almaktum",
  },
  verification: {
    google: "ваш-google-verification-код",
    yandex: "ваш-yandex-verification-код",
  },
  alternates: {
    canonical: "https://almaktum.uz",
    languages: {
      'ru': 'https://almaktum.uz/ru',
      'uz': 'https://almaktum.uz/uz',
      'en': 'https://almaktum.uz/en',
    },
  },
  category: "restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head>
        {/* Базовые метатеги */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#0a0808" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Favicon и иконки */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d4af37" />
        <meta name="msapplication-TileColor" content="#0a0808" />

        {/* Структурированные данные Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Al Maktum Premium Restaurant",
              "url": "https://almaktum.uz",
              "logo": "https://almaktum.uz/images/logo.png",
              "image": "https://almaktum.uz/images/og-image.jpg",
              "description": "Премиум ресторан в центре Бухары с изысканной восточной и европейской кухней",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Шарк 1",
                "addressLocality": "Бухара",
                "addressCountry": "UZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.7746,
                "longitude": 64.4212
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "10:00",
                  "closes": "23:00"
                }
              ],
              "telephone": "+998907449870",
              "priceRange": "$$$",
              "servesCuisine": ["Восточная кухня", "Европейская кухня", "Азиатская кухня"],
              "acceptsReservations": true,
              "hasMenu": "https://almaktum.uz/menu",
              "sameAs": [
                "https://www.instagram.com/al_maktum_bukhara",
                "https://t.me/almaktum",
                "https://www.facebook.com/almaktumbukhara"
              ]
            })
          }}
        />

        {/* Структурированные данные для локального бизнеса */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Al Maktum Premium Restaurant",
              "image": "https://almaktum.uz/images/logo.png",
              "priceRange": "$$$",
              "telephone": "+998907449870",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Шарк 1",
                "addressLocality": "Бухара",
                "addressRegion": "Bukhara",
                "addressCountry": "UZ"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "156",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Open Graph метатеги */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Al Maktum | Премиум Ресторан в Бухаре" />
        <meta property="og:description" content="Изысканная кухня, элегантный интерьер и безупречный сервис. Забронируйте столик в лучшем ресторане Бухары." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://almaktum.uz" />
        <meta property="og:site_name" content="Al Maktum Premium Restaurant" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@almaktum" />
        <meta name="twitter:creator" content="@almaktum" />
        <meta name="twitter:title" content="Al Maktum | Премиум Ресторан в Бухаре" />
        <meta name="twitter:description" content="Изысканная кухня, элегантный интерьер и безупречный сервис. Лучший ресторан Бухары." />
        <meta name="twitter:image" content="/images/og-image.jpg" />

        {/* Дополнительные SEO метатеги */}
        <meta name="geo.region" content="UZ-BU" />
        <meta name="geo.placename" content="Bukhara" />
        <meta name="geo.position" content="39.7746;64.4212" />
        <meta name="ICBM" content="39.7746, 64.4212" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Russian" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="General" />

        {/* Preload критических ресурсов */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        <link rel="preload" href="/styles/globals.css" as="style" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://almaktum.uz" />
        <link rel="alternate" href="https://almaktum.uz" hrefLang="x-default" />

        {/* RSS Feed (если есть блог) */}
        <link rel="alternate" type="application/rss+xml" title="Al Maktum Blog" href="/feed.xml" />
      </Head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>

        {/* Аналитика и скрипты */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* Яндекс.Метрика */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(XXXXXXXXXX, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />

        {/* JSON-LD для хлебных крошек */}
        <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://almaktum.uz"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Меню",
                  "item": "https://almaktum.uz/menu"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Галерея",
                  "item": "https://almaktum.uz/gallery"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Контакты",
                  "item": "https://almaktum.uz/contacts"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
};
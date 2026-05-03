import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al Maktum Premium Restaurant",
  description: "Al Maktum Premium Restaurant - это ресторан, который предлагает своим гостям изысканные блюда и напитки в уютной атмосфере. Мы гордимся нашим меню, которое сочетает в себе традиционные рецепты и современные кулинарные тенденции. Наши повара используют только свежие ингредиенты, чтобы создать уникальные вкусы и впечатления для наших гостей. Приходите и наслаждайтесь незабываемым опытом в Al Maktum Premium Restaurant.",
  
  verification: {
    google: "znwVu_mU6xaLz1H1aUZpyR8zqUaB_iLbqyGQUQUjgOQ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
};
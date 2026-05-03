'use client';

import { CartProvider } from '@/context/CartContext';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Menu from './components/menu/Menu';
import Halls from './components/halls/Halls';
import Footer from './components/footer/Footer';
import Gallery from './components/gallery/Gallery';
import Contact from './components/contacts/Contacts';

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Halls />
      <Gallery />
      <Contact />
      <Footer />
    </CartProvider>
  );
};  
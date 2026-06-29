import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { CartProvider } from './context/CartContext';
import CustomCursor from './components/CustomCursor';
import HUD from './components/HUD';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Explode from './components/Explode';
import Cosmic from './components/Cosmic';
import Features from './components/Features';
import Collection from './components/Collection';
import Statement from './components/Statement';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Reviews from './components/Reviews';

gsap.registerPlugin(ScrollTrigger);

function StoreFront() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <Hero />
      <Explode />
      <Cosmic />
      <Features />
      <Collection />
      <Reviews />
      <Statement />
      <Footer />
    </>
  );
}

export default function App() {
  const [page, setPage] = useState('home');

  const goCheckout = () => { window.scrollTo(0, 0); setPage('checkout'); };
  const goHome     = () => { window.scrollTo(0, 0); setPage('home'); };
  const goConfirm  = () => { window.scrollTo(0, 0); setPage('confirmation'); };

  return (
    <CartProvider>
      <CustomCursor />
      {page === 'home' && <HUD />}
      <Nav />
      {page === 'home'         && <StoreFront />}
      {page === 'checkout'     && <Checkout onBack={goHome} onComplete={goConfirm} />}
      {page === 'confirmation' && <OrderConfirmation onContinue={goHome} />}
      <CartSidebar onCheckout={goCheckout} />
    </CartProvider>
  );
}

import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Icon from './Icon';

export default function PublicLayout() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <button
        className={`back-to-top${showTop ? ' show' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="arrowUp" />
      </button>
    </>
  );
}

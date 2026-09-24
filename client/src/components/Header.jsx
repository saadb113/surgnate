import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Icon from './Icon';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-lock', navOpen);
  }, [navOpen]);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-links">
            <a href="tel:+923492030569"><Icon name="phone" /> +92 349 2030569</a>
            <a href="mailto:surgnate.pk@gmail.com"><Icon name="mail" /> surgnate.pk@gmail.com</a>
          </div>
          <span className="topbar-tag">Crafted in Sialkot, Pakistan | Shipped Worldwide</span>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-row">
          <Link to="/" className="logo">
            <img src="/images/logoMain.png" style={{maxWidth : "150px"}} alt="" />
          </Link>

          <nav className="main-nav">
            <div className="nav-links">
              {LINKS.map(l => (
                <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => isActive ? 'active' : ''}>
                  {l.label}
                </NavLink>
              ))}
            </div>
            <div className="nav-cta">
              <a href="tel:+923492030569" className="nav-phone"><Icon name="phone" /> +92 349 2030569</a>
              <Link to="/contact" className="btn btn-navy btn-sm">Request a Quote</Link>
            </div>
          </nav>

          <button className={`burger${navOpen ? ' open' : ''}`} aria-label="Menu" onClick={() => setNavOpen(o => !o)}>
            <span />
          </button>
        </div>
      </header>

      <div className={`nav-scrim${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(false)} />
      <nav className={`mobile-nav${navOpen ? ' open' : ''}`}>
        {LINKS.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setNavOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>
            {l.label}
          </NavLink>
        ))}
        <Link to="/contact" onClick={() => setNavOpen(false)} className="btn btn-gold btn-block">
          Request a Quote <Icon name="arrowRight" />
        </Link>
      </nav>
    </>
  );
}

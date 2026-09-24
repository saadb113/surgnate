import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from './Icon';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const showToast = useToast();
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  function onSubscribe(e) {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thanks — you’re on the list.', 'mail');
      setEmail('');
    }
  }

  return (
    <footer>
      <div className="footer-glow" />
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <img className='footerLogo' src="/images/logoMain.png" alt="" />
          </Link>
          <p>Precision-forged surgical scissors for hospitals, clinics and surgical professionals — crafted in Sialkot, Pakistan and trusted across borders.</p>
          {/* <div className="social-row">
            <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
            <a href="https://wa.me/923492030569" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          </div> */}
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?cat=Operating">Operating Scissors</Link></li>
            <li><Link to="/products?cat=Mayo">Mayo Scissors</Link></li>
            <li><Link to="/products?cat=Iris">Iris Scissors</Link></li>
            <li><Link to="/products?cat=Metzenbaum">Metzenbaum Scissors</Link></li>
            <li><Link to="/products?cat=Lister">Lister Bandage</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <div className="footer-contact-item"><Icon name="pin" /><span>Sialkot, Punjab, Pakistan</span></div>
          <div className="footer-contact-item"><Icon name="phone" /><a href="tel:+923492030569">+92 349 2030569</a></div>
          <div className="footer-contact-item"><Icon name="mail" /><a href="mailto:surgnate.pk@gmail.com">surgnate.pk@gmail.com</a></div>
          <form className="footer-newsletter" style={{ marginTop: 18 }} onSubmit={onSubscribe}>
            <input type="email" placeholder="Your email for catalog updates" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit" aria-label="Subscribe"><Icon name="arrowRight" /></button>
          </form>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>&copy; {year} Surgnate. All rights reserved.</span>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-trade">Terms of Trade</Link>
          <Link to="/admin/login" style={{ opacity: .5 }}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}

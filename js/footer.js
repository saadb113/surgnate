/* ==========================================================================
   SURGNATE — Shared footer, injected into #site-footer on every page
   ========================================================================== */
(function(){
  const footerHTML = `
    <div class="footer-glow"></div>
    <div class="wrap footer-top">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <svg class="logo-mark" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="13" fill="#0e3760"/>
            <path d="M24 12c6.5 0 10.5 4 10.5 4s-2 6.5-10.5 6.5S13.5 16 13.5 16 17.5 12 24 12Z" stroke="url(#gf1)" stroke-width="2"/>
            <path d="M13.5 32s2-6.5 10.5-6.5S34.5 32 34.5 32s-4 4-10.5 4S13.5 32 13.5 32Z" stroke="url(#gf1)" stroke-width="2"/>
            <defs><linearGradient id="gf1" x1="13" y1="12" x2="35" y2="36"><stop stop-color="#e9d7ab"/><stop offset="1" stop-color="#c6a15b"/></linearGradient></defs>
          </svg>
          <span><span class="logo-word">SURGNATE</span><span class="logo-sub" style="color:var(--gold-400)">Precision · Performance · Trust</span></span>
        </a>
        <p>Precision-forged surgical scissors for hospitals, clinics and surgical professionals — crafted in Sialkot, Pakistan and trusted across borders.</p>
        <div class="social-row">
          <a href="#" aria-label="Facebook" data-icon="facebook"></a>
          <a href="#" aria-label="LinkedIn" data-icon="linkedin"></a>
          <a href="#" aria-label="Instagram" data-icon="instagram"></a>
          <a href="https://wa.me/923492030569" aria-label="WhatsApp" data-icon="whatsapp"></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Categories</h4>
        <ul>
          <li><a href="products.html?cat=Operating">Operating Scissors</a></li>
          <li><a href="products.html?cat=Mayo">Mayo Scissors</a></li>
          <li><a href="products.html?cat=Iris">Iris Scissors</a></li>
          <li><a href="products.html?cat=Metzenbaum">Metzenbaum Scissors</a></li>
          <li><a href="products.html?cat=Lister">Lister Bandage</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Get in Touch</h4>
        <div class="footer-contact-item"><span data-icon="pin"></span><span>Sialkot, Punjab, Pakistan</span></div>
        <div class="footer-contact-item"><span data-icon="phone"></span><a href="tel:+923492030569">+92 349 2030569</a></div>
        <div class="footer-contact-item"><span data-icon="mail"></span><a href="mailto:surgnate.pk@gmail.com">surgnate.pk@gmail.com</a></div>
        <form class="footer-newsletter" style="margin-top:18px">
          <input type="email" placeholder="Your email for catalog updates" required>
          <button type="submit" aria-label="Subscribe" data-icon="arrowRight"></button>
        </form>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>&copy; <span class="js-year"></span> Surgnate. All rights reserved.</span>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Trade</a>
      </div>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('site-footer');
    if (mount){
      mount.innerHTML = footerHTML;
      paintIcons(mount);
      mount.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
      const form = mount.querySelector('.footer-newsletter');
      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input && input.value.trim()){ showToast('Thanks — you’re on the list.', 'mail'); input.value=''; }
      });
    }
  });
})();

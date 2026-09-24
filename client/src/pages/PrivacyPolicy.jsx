import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

export default function PrivacyPolicy() {
  useEffect(() => { document.title = 'Privacy Policy — Surgnate'; }, []);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link to="/">Home</Link><Icon name="chevronRight" /><span>Privacy Policy</span></div>
          <h1>Privacy <span style={{ color: 'var(--gold-400)' }}>Policy</span></h1>
          <p>How Surgnate collects, uses and protects the information you share with us.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <Reveal className="legal-content">
            <p className="legal-updated">Last updated: September 2026</p>

            <p>Surgnate ("we", "us", "our") respects your privacy. This policy explains what information we collect through this website, why we collect it, and how we handle it. By using this site or submitting an inquiry, you agree to the practices described here.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, primarily through our Contact / Request a Quote form:</p>
            <ul className="check-list">
              <li><span className="tick"><Icon name="check" /></span> Your name, and organization or hospital name (if provided)</li>
              <li><span className="tick"><Icon name="check" /></span> Email address and phone number</li>
              <li><span className="tick"><Icon name="check" /></span> Country and the product(s) you're inquiring about</li>
              <li><span className="tick"><Icon name="check" /></span> The message or requirements you enter into the form</li>
            </ul>
            <p>We do not collect payment card details, government identification numbers, or other sensitive personal data through this website. We do not use tracking cookies or third-party advertising pixels on this site.</p>

            <h2>2. How We Use Your Information</h2>
            <p>Information submitted through our forms is used solely to:</p>
            <ul className="check-list">
              <li><span className="tick"><Icon name="check" /></span> Respond to your inquiry and prepare wholesale or retail quotations</li>
              <li><span className="tick"><Icon name="check" /></span> Coordinate orders, shipping and export documentation where applicable</li>
              <li><span className="tick"><Icon name="check" /></span> Maintain a record of past inquiries so our team can follow up appropriately</li>
              <li><span className="tick"><Icon name="check" /></span> Improve our product range and website based on the kinds of requests we receive</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

            <h2>3. How Your Information Is Stored</h2>
            <p>Inquiry submissions are stored securely on our systems and are accessible only to authorized Surgnate staff for the purpose of responding to your request. If you subscribe to catalog updates via our newsletter field, your email is stored solely for that purpose and you may unsubscribe at any time by contacting us.</p>

            <h2>4. Cookies &amp; Local Storage</h2>
            <p>This website does not use tracking or advertising cookies. Our admin panel (used only by Surgnate staff) uses browser local storage to keep a staff member signed in between visits — this has no effect on visitors browsing the public site.</p>

            <h2>5. Third-Party Services</h2>
            <p>We may use standard, reputable service providers (for example, hosting, email delivery, or map display) to operate this website. These providers process data only as necessary to provide their service to us and are not permitted to use your information for their own purposes.</p>

            <h2>6. Your Rights</h2>
            <p>You may ask us at any time to:</p>
            <ul className="check-list">
              <li><span className="tick"><Icon name="check" /></span> Confirm what information we hold about you</li>
              <li><span className="tick"><Icon name="check" /></span> Correct inaccurate information</li>
              <li><span className="tick"><Icon name="check" /></span> Request deletion of your inquiry record, where we are not required to retain it for legitimate business or legal purposes</li>
            </ul>
            <p>To exercise any of these rights, contact us using the details below.</p>

            <h2>7. Children's Privacy</h2>
            <p>This website is intended for healthcare professionals, procurement staff, and business buyers. It is not directed at children, and we do not knowingly collect information from anyone under the age of 18.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this policy from time to time to reflect changes in our practices. The "Last updated" date at the top of this page will reflect the most recent revision.</p>

            <h2>9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or how your information is handled, reach out to us:</p>
            <div className="contact-info-card legal-contact-box">
              <div className="contact-info-row"><div className="ico"><Icon name="mail" /></div><div><b>Email</b><a href="mailto:surgnate.pk@gmail.com">surgnate.pk@gmail.com</a></div></div>
              <div className="contact-info-row"><div className="ico"><Icon name="phone" /></div><div><b>Phone / WhatsApp</b><a href="tel:+923492030569">+92 349 2030569</a></div></div>
              <div className="contact-info-row"><div className="ico"><Icon name="pin" /></div><div><b>Address</b><span>Sialkot, Punjab, Pakistan</span></div></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

export default function TermsOfTrade() {
  useEffect(() => { document.title = 'Terms of Trade — Surgnate'; }, []);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link to="/">Home</Link><Icon name="chevronRight" /><span>Terms of Trade</span></div>
          <h1>Terms of <span style={{ color: 'var(--gold-400)' }}>Trade</span></h1>
          <p>The terms that govern quotations, orders and shipments placed with Surgnate.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <Reveal className="legal-content">
            <p className="legal-updated">Last updated: September 2026</p>

            <p>These Terms of Trade apply to all quotations, orders, and sales of surgical instruments by Surgnate ("we", "us", "our") to hospitals, clinics, distributors and individual buyers ("you", "the buyer"), whether placed through this website, by phone, WhatsApp or email. By requesting a quote or placing an order with us, you agree to these terms.</p>

            <h2>1. Quotations</h2>
            <p>Prices and quotations shared in response to an inquiry are indicative and valid for the period stated at the time (or, if unstated, for 14 days from issue) unless confirmed in writing. Quotations do not constitute a binding offer until an order is formally accepted by Surgnate.</p>

            <h2>2. Orders &amp; Confirmation</h2>
            <p>An order is confirmed only once Surgnate issues a written order confirmation or invoice. We reserve the right to accept, decline, or request modification of any order — for example where quantities, specifications, or destination require clarification before production or dispatch.</p>

            <h2>3. Pricing</h2>
            <p>Prices are quoted per unit or per set as specified and are subject to change without notice until an order is confirmed. Unless stated otherwise, quoted prices do not include freight, insurance, duties, or destination-country taxes, which are the buyer's responsibility on international shipments.</p>

            <h2>4. Minimum Order Quantities</h2>
            <p>There is no fixed minimum order for standard catalog items; however, bulk and wholesale pricing tiers apply at higher quantities and will be confirmed at the time of quotation. Custom-branded or engraved orders may carry a separate minimum quantity, communicated per request.</p>

            <h2>5. Payment Terms</h2>
            <p>Payment terms (advance payment, partial deposit, or terms against documents) are agreed on a per-order basis, particularly for first-time and export buyers. Production or dispatch of an order typically begins only after agreed payment terms are met.</p>

            <h2>6. Shipping &amp; Delivery</h2>
            <p>Lead times quoted are estimates based on order size, customization, and destination, and are not guaranteed delivery dates unless explicitly confirmed in writing. Export shipments are dispatched with standard commercial documentation; the buyer is responsible for import compliance, customs clearance, and any permits required in the destination country.</p>

            <h2>7. Product Specifications</h2>
            <p>We aim for accuracy in all product descriptions, dimensions, and imagery published on this site. Because instruments are individually forged and hand-finished, minor variations in finish or dimension may occur between units and do not constitute a defect.</p>

            <h2>8. Quality &amp; Returns</h2>
            <p>Every instrument is inspected before packing. If an order arrives with a manufacturing defect, contact us within 7 days of receipt with photos and your order reference — we will assess and, where a defect is confirmed, arrange a replacement or remedy at our discretion. Instruments that have been used, sterilized, engraved, or altered after delivery cannot be returned for non-defect reasons.</p>

            <h2>9. Custom &amp; Branded Orders</h2>
            <p>Orders involving custom engraving, private-label branding, or non-standard specifications are made to order and are non-cancellable once production has started, unless otherwise agreed in writing.</p>

            <h2>10. Intellectual Property</h2>
            <p>The Surgnate name, logo, and product photography on this website are the property of Surgnate. Private-label or custom-branded units produced for a buyer remain subject to any separate branding agreement made at the time of order.</p>

            <h2>11. Limitation of Liability</h2>
            <p>To the extent permitted by law, Surgnate's liability in connection with any order is limited to the value of that order. We are not liable for indirect or consequential losses, including delays caused by carriers, customs authorities, or events outside our reasonable control.</p>

            <h2>12. Governing Law</h2>
            <p>These Terms of Trade are governed by the laws of Pakistan. Any dispute arising from an order will first be addressed through direct discussion between the parties in good faith.</p>

            <h2>13. Changes to These Terms</h2>
            <p>We may revise these Terms of Trade from time to time; the version in effect at the time an order is confirmed will apply to that order.</p>

            <h2>14. Contact Us</h2>
            <p>For questions about an active quotation or order, or about these terms generally, reach out to our team:</p>
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

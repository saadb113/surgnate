import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { useProducts } from '../context/ProductsContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';

const FAQS = [
  ['Do you supply hospitals and clinics directly?', "Yes — we work directly with hospitals, clinics, distributors and individual surgical professionals, both locally and internationally, on retail and bulk order terms."],
  ['What is your minimum order quantity?', "There's no strict minimum for standard stock items, though bulk hospital and distributor orders receive preferential pricing. Share your required quantity with us and we'll quote accordingly."],
  ['Can instruments be custom branded or engraved?', "Yes, custom engraving and private-label branding is available on qualifying bulk orders. Mention this in your inquiry and we'll walk you through the options."],
  ['Do you ship internationally?', "We regularly export to surgical buyers and distributors abroad. Share your destination country in the form and we'll confirm shipping options and lead times."],
  ['What materials are your scissors made from?', "All Surgnate scissors are made from high-grade surgical stainless steel. Select models include tungsten-carbide (TC) cutting inserts and gold-plated handles for extended edge life."]
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { products } = useProducts();
  const showToast = useToast();

  const qProduct = searchParams.get('product') || '';
  const qQty = searchParams.get('qty');

  const [form, setForm] = useState({
    name: '', org: '', email: '', phone: '', country: '',
    product: qProduct,
    message: qProduct ? `I'm interested in the ${qProduct}${qQty ? ` (quantity: ${qQty})` : ''}. Please send pricing and availability.` : ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) return;
    setSending(true);
    try {
      await api.sendMessage(form);
      setSent(true);
      showToast("Inquiry sent — we'll be in touch shortly.", 'check');
    } catch (err) {
      showToast(err.message || 'Something went wrong — please try again.', 'alert');
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link to="/">Home</Link><Icon name="chevronRight" /><span>Contact</span></div>
          <h1>Let's Talk <span className="accent-italic">Requirements</span></h1>
          <p>Wholesale pricing, bulk hospital orders, or export inquiries — tell us what you need and we'll respond within 24 hours.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap contact-grid">
          <Reveal type="left" className="contact-info-card">
            <h3>Get in Touch</h3>
            <p>Our team responds to every inquiry personally — no bots, no ticket queues.</p>

            <div className="contact-info-row">
              <div className="ico"><Icon name="pin" /></div>
              <div><b>Workshop &amp; Office</b><span>Sialkot, Punjab, Pakistan</span></div>
            </div>
            <div className="contact-info-row">
              <div className="ico"><Icon name="phone" /></div>
              <div><b>Phone / WhatsApp</b><a href="tel:+923492030569">+92 349 2030569</a></div>
            </div>
            <div className="contact-info-row">
              <div className="ico"><Icon name="mail" /></div>
              <div><b>Email</b><a href="mailto:surgnate.pk@gmail.com">surgnate.pk@gmail.com</a></div>
            </div>
            <div className="contact-info-row">
              <div className="ico"><Icon name="clock" /></div>
              <div><b>Working Hours</b><span>Mon – Sat, 9:00 AM – 7:00 PM (PKT)</span></div>
            </div>

            {/* <div className="social-row">
              <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
              <a href="https://wa.me/923492030569" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
            </div> */}
          </Reveal>

          <Reveal type="right" className="contact-form-card">
            <h3>Request a Quote</h3>
            <p className="lede" style={{ marginBottom: 26 }}>Fill in your details below and let us know what your hospital, clinic or distribution business needs.</p>

            <form onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">Full Name *</label>
                  <input id="f-name" required placeholder="Dr. Jane Smith" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="f-org">Hospital / Organization</label>
                  <input id="f-org" placeholder="City General Hospital" value={form.org} onChange={e => update('org', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-email">Email Address *</label>
                  <input id="f-email" type="email" required placeholder="you@hospital.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone Number *</label>
                  <input id="f-phone" type="tel" required placeholder="+1 234 567 8901" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-country">Country</label>
                  <input id="f-country" placeholder="e.g. Pakistan, UAE, UK..." value={form.country} onChange={e => update('country', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="f-product">Product of Interest</label>
                  <select id="f-product" value={form.product} onChange={e => update('product', e.target.value)}>
                    <option value="">Select an instrument (optional)</option>
                    {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field full">
                  <label htmlFor="f-message">Your Requirements *</label>
                  <textarea id="f-message" required placeholder="Instrument types, quantities, destination, and any customization needs..." value={form.message} onChange={e => update('message', e.target.value)} />
                </div>
              </div>
              <div className="form-foot">
                <span className="form-note">By submitting, you agree to be contacted regarding your inquiry.</span>
                <button type="submit" className="btn btn-gold" disabled={sending || sent}>
                  {sent ? 'Sent' : sending ? 'Sending…' : 'Send Inquiry'} <Icon name="arrowRight" />
                </button>
              </div>
              <div className={`form-success${sent ? ' show' : ''}`}>
                <Icon name="check" />
                <span>Thank you — your inquiry has been recorded. Our team will reach out shortly. For urgent orders, call <a href="tel:+923492030569" style={{ color: '#1a8a52', textDecoration: 'underline' }}>+92 349 2030569</a>.</span>
              </div>
            </form>

            <div className="map-embed">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.44%2C32.46%2C74.60%2C32.56&layer=mapnik&marker=32.5100%2C74.5300"
                loading="lazy" title="Surgnate location — Sialkot, Pakistan"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>FAQ</div>
            <h2>Common Questions From Buyers</h2>
          </Reveal>
          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(o => o === i ? null : i)}>
                  <span>{q}</span><span className="plus"><Icon name="plus" /></span>
                </div>
                <div className="faq-a"><div className="faq-a-in">{a}</div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

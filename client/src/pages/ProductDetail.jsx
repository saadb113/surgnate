import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { assetUrl } from '../lib/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { findBySlug, related, loading } = useProducts();
  const product = findBySlug(slug);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');

  useEffect(() => { setActiveImg(0); setTab('desc'); setQty(1); }, [slug]);
  useEffect(() => {
    if (product) document.title = `${product.name} — Surgnate`;
  }, [product]);

  if (loading) {
    return (
      <section className="section-pad"><div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}><p>Loading instrument details…</p></div></section>
    );
  }

  if (!product) {
    return (
      <section className="section-pad">
        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Product not found</h2>
          <p className="lede" style={{ margin: '14px auto 24px' }}>The instrument you're looking for may have been moved or removed.</p>
          <Link to="/products" className="btn btn-navy">Back to Products</Link>
        </div>
      </section>
    );
  }

  const isGold = product.finish === 'Gold';
  const relatedList = related(product, 4);

  function requestQuote() {
    navigate(`/contact?product=${encodeURIComponent(product.name)}&qty=${qty}`);
  }

  return (
    <>
      <section className="page-hero" style={{ paddingBlock: '40px 0' }}>
        <div className="wrap">
          <div className="breadcrumb">
            <Link to="/">Home</Link><Icon name="chevronRight" />
            <Link to="/products">Products</Link><Icon name="chevronRight" />
            <Link to="/products">{product.category}</Link><Icon name="chevronRight" />
            <span>{product.name}</span>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 32 }}>
        <div className="wrap pd-grid">
          <Reveal type="left" className="pd-gallery">
            <div className="pd-gallery-main">
              <div className="pd-badge-row">
                <span className={`prod-tag${isGold ? ' gold' : ''}`}>{isGold ? 'Gold-Plated TC' : 'Stainless Steel'}</span>
              </div>
              {product.images?.[activeImg] && <img src={assetUrl(product.images[activeImg])} alt={product.name} />}
            </div>
            {product.images?.length > 1 && (
              <div className="pd-thumbs">
                {product.images.map((img, i) => (
                  <button key={img + i} className={i === activeImg ? 'active' : ''} onClick={() => setActiveImg(i)}>
                    <img src={assetUrl(img)} alt={`${product.name} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal type="right" className="pd-info">
            <span className="pd-cat">{product.category} Scissors &middot; {product.type}</span>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-desc">{product.short}</p>

            <div className="pd-price-row">
              <div className="pd-price">
                <b>Wholesale &amp; Retail Pricing</b>
                <span>Request a quote for your required quantity</span>
              </div>
              <span className="stock-pill"><span className="dot" /> In Stock</span>
            </div>

            <table className="pd-specs-table"><tbody>
              <tr><td>Size</td><td>{product.size}</td></tr>
              <tr><td>Material</td><td>{product.material}</td></tr>
              <tr><td>Finish</td><td>{product.finishDetail}</td></tr>
              <tr><td>Type</td><td>{product.type}</td></tr>
              <tr><td>Tip</td><td>{product.tip}</td></tr>
              <tr><td>Usage</td><td>{product.usage}</td></tr>
            </tbody></table>

            <div className="qty-row">
              <div className="qty-stepper">
                <button aria-label="Decrease" onClick={() => setQty(q => Math.max(1, q - 1))}>&minus;</button>
                <input type="text" value={qty} readOnly />
                <button aria-label="Increase" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <span style={{ fontSize: '.82rem', color: 'var(--ink-400)' }}>units per box — bulk cartons available</span>
            </div>

            <div className="pd-actions">
              <button className="btn btn-gold" onClick={requestQuote}>Request a Quote <Icon name="arrowRight" /></button>
              <a
                href={`https://wa.me/923492030569?text=${encodeURIComponent('Hi, I would like a quote for the Surgnate ' + product.name)}`}
                className="btn btn-line" target="_blank" rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> WhatsApp Us
              </a>
            </div>

            <div className="pd-trust-mini">
              <div><Icon name="droplet" /> Autoclavable</div>
              <div><Icon name="shieldCheck" /> Corrosion Resistant</div>
              <div><Icon name="truck" /> Export Ready</div>
            </div>
          </Reveal>
        </div>

        <div className="wrap">
          <div className="pd-tabs">
            <button className={tab === 'desc' ? 'active' : ''} onClick={() => setTab('desc')}>Description</button>
            <button className={tab === 'feat' ? 'active' : ''} onClick={() => setTab('feat')}>Features</button>
            <button className={tab === 'ship' ? 'active' : ''} onClick={() => setTab('ship')}>Shipping &amp; Ordering</button>
          </div>

          <div className={`pd-tab-panel${tab === 'desc' ? ' active' : ''}`}>
            <p className="lede">{product.description}</p>
          </div>
          <div className={`pd-tab-panel${tab === 'feat' ? ' active' : ''}`}>
            <ul className="pd-feature-grid">
              {(product.features || []).map((f, i) => (
                <li key={i}><span className="tick"><Icon name="check" /></span> {f}</li>
              ))}
            </ul>
          </div>
          <div className={`pd-tab-panel${tab === 'ship' ? ' active' : ''}`}>
            <ul className="check-list">
              <li><span className="tick"><Icon name="check" /></span> Bulk carton packing available for hospital &amp; distributor orders</li>
              <li><span className="tick"><Icon name="check" /></span> Export documentation prepared for international shipments</li>
              <li><span className="tick"><Icon name="check" /></span> Custom engraving / branding available on request for large orders</li>
              <li><span className="tick"><Icon name="check" /></span> Lead times and freight quoted per destination at time of order</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad related-strip" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal className="section-head between">
            <div>
              <div className="eyebrow">You May Also Need</div>
              <h2>Related Instruments</h2>
            </div>
            <Link to="/products" className="btn btn-line">View All <Icon name="arrowRight" /></Link>
          </Reveal>
          <div className="prod-grid">
            {relatedList.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>
    </>
  );
}

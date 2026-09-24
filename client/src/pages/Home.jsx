import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { categoryMeta } from '../lib/categories';

const CATEGORY_ORDER = ['Operating', 'Mayo', 'Iris', 'Metzenbaum', 'Lister'];

export default function Home() {
  const { products, categories, loading } = useProducts();
  const featured = products.filter(p => p.featured).slice(0, 6);
  const catKeys = [...new Set([...CATEGORY_ORDER, ...categories])];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="dot"><Icon name="check" /></span> Built for Healthcare Professionals
            </div>
            <Reveal as="h1">Precision-Forged <em>Surgical Scissors</em> Hospitals Trust</Reveal>
            <Reveal as="p" className="lede" delay={.1}>
              Surgnate designs and manufactures Operating, Mayo, Iris, Metzenbaum and Lister Bandage scissors. mirror-finished, autoclavable, and engineered for the cut that has to be right the first time.
            </Reveal>
            <Reveal className="hero-actions" delay={.2}>
              <Link to="/products" className="btn btn-gold">Explore the Range <Icon name="arrowRight" /></Link>
              <Link to="/contact" className="btn btn-outline">Request a Quote</Link>
            </Reveal>
            <Reveal className="hero-stats" delay={.3}>
              <div className="stat"><CountUp end={9} /><span>Instrument Types</span></div>
              <div className="stat"><CountUp end={100} suffix="%" /><span>Autoclavable Steel</span></div>
              <div className="stat"><CountUp end={150} suffix="+" /><span>Hospitals &amp; Clinics Served</span></div>
              <div className="stat"><CountUp end={20} suffix="+" /><span>Export Markets</span></div>
            </Reveal>
          </div>
          <Reveal type="scale" className="hero-visual">
            <div className="hero-card">
              <img src="/images/HomeImg2.png" alt="Surgnate gold-plated tungsten carbide surgical scissor" />
            </div>
            <div className="hero-float fl-1">
              <div className="ico"><Icon name="droplet" /></div>
              <div><b>Autoclavable</b><span>Full sterilization ready</span></div>
            </div>
            <div className="hero-float fl-2">
              <div className="ico"><Icon name="gem" /></div>
              <div><b>Mirror Finish</b><span>Hand-polished steel</span></div>
            </div>
          </Reveal>
        </div>
      </section>

     

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="wrap trust-row">
          <Reveal type="fade" className="trust-item"><div className="ico"><Icon name="gem" /></div><div><b>Precisely Crafted</b><span>Cold-forged &amp; hand-honed</span></div></Reveal>
          <Reveal type="fade" delay={.08} className="trust-item"><div className="ico"><Icon name="shieldCheck" /></div><div><b>Durable &amp; Reliable</b><span>Built for daily theatre use</span></div></Reveal>
          <Reveal type="fade" delay={.16} className="trust-item"><div className="ico"><Icon name="droplet" /></div><div><b>Autoclavable &amp; Reusable</b><span>Sterilization-cycle rated</span></div></Reveal>
          <Reveal type="fade" delay={.24} className="trust-item"><div className="ico"><Icon name="award" /></div><div><b>Trusted by Professionals</b><span>Hospitals &amp; surgical teams</span></div></Reveal>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{display : "none"}} className="section-pad">
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Range</div>
            <h2>Five Instrument Families. <span className="accent-italic">One Standard.</span></h2>
          </Reveal>
          <div className="cat-grid">
            {catKeys.map((key, i) => {
              const meta = categoryMeta(key);
              return (
                <Reveal as={Link} to={`/products?cat=${key}`} key={key} delay={i * 0.06} className="cat-card">
                  <div className="ico"><Icon name={meta.icon} /></div>
                  <h4>{meta.name}</h4>
                  <span>{meta.desc}</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal className="section-head between">
            <div>
              <div className="eyebrow">Featured Instruments</div>
              <h2>Signature Pieces From the Bench</h2>
            </div>
            <Link to="/products" className="btn btn-line">View All Products <Icon name="arrowRight" /></Link>
          </Reveal>
          <div className="prod-grid">
            {!loading && featured.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* WHY SURGNATE */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Why Surgnate</div>
            <h2>Engineered for the Moment <span className="accent-italic">Precision Matters Most</span></h2>
            <p className="lede" style={{ marginTop: 14 }}>Every Surgnate instrument passes through the same discipline: premium raw steel, exacting tolerances, and a final human inspection before it reaches your tray.</p>
          </Reveal>
          <div className="feat-grid">
            {[
              ['01', 'gem', 'Premium Stainless Steel', 'High-grade steel, cold-forged and heat-treated for strength that holds its geometry cut after cut.'],
              ['02', 'target', 'Precise Cutting', 'Hand-honed blades deliver clean, accurate, single-pass cuts — reducing tissue trauma and time on the table.'],
              ['03', 'droplet', 'Autoclavable', 'Rated for repeated steam sterilization cycles without losing finish, tension or sharpness.'],
              ['04', 'shieldCheck', 'Corrosion Resistant', 'A mirror-polished surface resists rust and staining, keeping instruments tray-ready for years.'],
              ['05', 'sparkle', 'Tungsten Carbide Options', 'TC-inserted edges hold their sharpness dramatically longer than standard steel for high-volume theatres.'],
              ['06', 'globe', 'Local & Export Ready', 'Serving hospitals and distributors across Pakistan, and shipping to surgical buyers internationally.']
            ].map(([num, icon, title, text], i) => (
              <Reveal key={num} delay={i * 0.08} className="feat-card">
                <span className="num">{num}</span>
                <div className="ico"><Icon name={icon} /></div>
                <h4>{title}</h4>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>From Steel to Sterile Tray</div>
            <h2>Our Manufacturing <span className="accent-italic"> Process</span></h2>
          </Reveal>
          <div className="process-grid">
            {[
              ['01', 'Forge', "Surgical-grade steel billets are cold-forged into rough blanks in Sialkot's instrument workshops."],
              ['02', 'Grind & Shape', 'Blades are milled, ground and fitted for the precise box-lock action every scissor depends on.'],
              ['03', 'Polish & Plate', 'Hand-buffed to a mirror finish, with gold-plating applied to TC handle variants.'],
              ['04', 'Inspect & Pack', 'Every instrument is individually checked for edge, tension and finish before packing.']
            ].map(([num, title, text], i) => (
              <Reveal key={num} delay={i * 0.1} className="process-step">
                <div className="process-num">{num}</div>
                <h4>{title}</h4>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SPLIT */}
      <section className="section-pad">
        <div className="wrap split">
          <Reveal type="left" className="split-media">
            <img src="/images/operating-straight-sharp.jpg" alt="Surgnate operating scissor, straight, mirror finish" />
            <div className="split-media-badge">
              <div className="ring"><b>14cm</b></div>
              <span>Most requested size across our Operating &amp; Mayo range</span>
            </div>
          </Reveal>
          <Reveal type="right" className="split-body">
            <div className="eyebrow">Made for the Field, Not Just the Tray</div>
            <h2>Instruments That Perform Across<span className="accent-italic"> Hospitals, Clinics &amp; Field Units</span></h2>
            <p className="lede">Whether you're outfitting an operating theatre, a district hospital, or a mobile surgical unit, Surgnate scissors are built to the same specification — because the standard shouldn't change with the setting.</p>
            <ul className="check-list">
              <li><span className="tick"><Icon name="check" /></span> Wholesale &amp; bulk pricing for hospitals and distributors</li>
              <li><span className="tick"><Icon name="check" /></span> Custom engraving and branding available on request</li>
              <li><span className="tick"><Icon name="check" /></span> Export documentation handled for international buyers</li>
              <li><span className="tick"><Icon name="check" /></span> Straight, curved, TC and gold-plated variants in stock</li>
            </ul>
            <Link to="/about" className="btn btn-navy" style={{ marginTop: 30 }}>More About Surgnate <Icon name="arrowRight" /></Link>
          </Reveal>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section-pad-sm">
        <div className="wrap">
          <Reveal type="scale" className="stats-band">
            <div className="grid">
              <div className="stat"><CountUp end={9} /><span>Product Lines</span></div>
              <div className="stat"><CountUp end={150} suffix="+" /><span>Hospitals &amp; Clinics</span></div>
              <div className="stat"><CountUp end={20} suffix="+" /><span>Countries Reached</span></div>
              <div className="stat"><CountUp end={100} suffix="%" /><span>Quality Checked</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal type="scale" className="cta-band">
            <div className="eyebrow" style={{ justifyContent: 'center', color: 'var(--gold-300)' }}>Wholesale &amp; Bulk Orders</div>
            <h2>Outfitting a Hospital or Clinic? <br /><span className="accent-italic">Let's Talk Volume Pricing.</span></h2>
            <p>Tell us your requirements — instrument types, quantities, and destination — and our team will prepare a tailored quote within 24 hours.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-gold">Request a Quote <Icon name="arrowRight" /></Link>
              <a href="tel:+923492030569" className="btn btn-outline"><Icon name="phone" /> Call Us Directly</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

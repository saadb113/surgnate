import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link to="/">Home</Link><Icon name="chevronRight" /><span>About</span></div>
          <h1>Precision Has Been Our Only <span className="accent-italic">Product</span></h1>
          <p>Surgnate exists for a simple reason — surgical teams deserve instruments that behave exactly the same way on the thousandth use as they did on the first.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap split">
          <Reveal type="left" className="split-media">
            <img src="/images/mayo-curved.jpg" alt="Surgnate mayo curved scissor on white background" />
            <div className="split-media-badge">
              <div className="ring"><b>100%</b></div>
              <span>Individually inspected before packing</span>
            </div>
          </Reveal>
          <Reveal type="right" className="split-body">
            <div className="eyebrow">Our Story</div>
            <h2>Built in Sialkot, the World's Surgical Instrument Capital</h2>
            <p className="lede">Sialkot has shaped surgical steel for well over a century, supplying hospitals across the globe. Surgnate was founded inside that tradition — bringing together experienced instrument makers to build a focused range of scissors, done properly rather than a catalogue done broadly.</p>
            <p style={{ marginTop: 16 }}>We don't chase every instrument category. We forge, grind, polish and inspect Operating, Mayo, Iris, Metzenbaum and Lister Bandage scissors — and we hold every one of them to the same standard before it earns the Surgnate name.</p>
            <ul className="check-list">
              <li><span className="tick"><Icon name="check" /></span> Premium stainless steel sourced for surgical-grade hardness</li>
              <li><span className="tick"><Icon name="check" /></span> Hand-finished mirror polish on every blade</li>
              <li><span className="tick"><Icon name="check" /></span> Optional tungsten-carbide inserts &amp; gold-plated handles</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>What Drives Us</div>
            <h2>The Values Behind Every <span className="accent-italic"> Instrument</span></h2>
          </Reveal>
          <div className="values-grid">
            {[
              ['gem', 'Precision', 'Tolerances checked by hand, because "close enough" isn\'t a standard we accept.'],
              ['shieldCheck', 'Trust', 'What leaves our workshop is exactly what was promised on the spec sheet.'],
              ['target', 'Performance', 'Instruments engineered to perform identically on cut one and cut one thousand.'],
              ['users', 'Partnership', 'We work directly with hospitals and distributors to fit real theatre needs.']
            ].map(([icon, title, text], i) => (
              <Reveal key={title} delay={i * 0.08} className="value-card">
                <div className="ico"><Icon name={icon} /></div>
                <h4>{title}</h4>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <Reveal className="section-head between">
            <div>
              <div className="eyebrow">Our Journey</div>
              <h2>From Workshop Bench to <span className="accent-italic">Operating Table</span></h2>
            </div>
          </Reveal>
          <div className="timeline">
            {[
              ['Origins', "Rooted in Sialkot's Instrument-Making Tradition", "Surgnate began among craftsmen already fluent in the forging and grinding techniques that have defined Sialkot's surgical steel industry for generations."],
              ['Building the Range', 'A Focused Catalogue, Not a Sprawling One', 'We deliberately built out Operating, Mayo, Iris, Metzenbaum and Lister Bandage scissors first — mastering each before adding the next.'],
              ['Refining the Finish', 'Tungsten Carbide & Gold-Plated Variants', 'Premium TC-inserted, gold-handled variants were introduced for teams that needed an edge that holds longer under high case volume.'],
              ['Today', 'Serving Hospitals Locally and Buyers Abroad', 'Surgnate instruments now reach clinics and distributors across Pakistan, with export inquiries welcomed from surgical buyers worldwide.']
            ].map(([tag, title, text], i) => (
              <Reveal key={tag} delay={i * 0.1} className="tl-item">
                <b>{tag}</b><h4>{title}</h4><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      <section className="section-pad" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Quality Assurance</div>
            <h2>Every Standard We Build To</h2>
          </Reveal>
          <Reveal className="credibility-strip" style={{ justifyContent: 'center' }}>
            <span className="cred-pill"><Icon name="gem" /> Precisely Crafted</span>
            <span className="cred-pill"><Icon name="shieldCheck" /> Durable &amp; Reliable</span>
            <span className="cred-pill"><Icon name="droplet" /> Autoclavable &amp; Reusable</span>
            <span className="cred-pill"><Icon name="award" /> Trusted by Professionals</span>
            <span className="cred-pill"><Icon name="sparkle" /> Tungsten Carbide Options</span>
            <span className="cred-pill"><Icon name="globe" /> Export Ready</span>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <Reveal type="scale" className="cta-band">
            <div className="eyebrow" style={{ justifyContent: 'center', color: 'var(--gold-300)' }}>Work With Us</div>
            <h2>Ready to Equip Your Team With Instruments <span className="accent-italic">Built to Last?</span></h2>
            <p>Reach out with your requirements and our team will help you find the right configuration — steel or TC, straight or curved, retail or bulk.</p>
            <div className="cta-actions">
              <Link to="/products" className="btn btn-gold">Browse Products <Icon name="arrowRight" /></Link>
              <Link to="/contact" className="btn btn-outline">Contact Our Team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

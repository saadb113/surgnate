import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import { CATALOG_SECTIONS, CATALOG_IMAGE_COUNT, CATALOG_COVER, sectionByKey } from '../lib/catalog';

export default function Catalog() {
  const { hash } = useLocation();
  const [light, setLight] = useState(null);

  // Deep links such as /catalog#needle-holders land on the right section.
  // Deferred a frame so ScrollToTop's reset (image/lazy layout) can't win.
  useEffect(() => {
    const key = hash.replace('#', '');
    if (!key) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(key);
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  const activeSection = light ? sectionByKey(light.sectionKey) : null;

  function scrollToSection(key) {
    const target = document.getElementById(key);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="chevronRight" />
            <span>Catalog</span>
          </div>
          <h1>The Surgnate <span className="accent-italic">Catalog</span></h1>
          <p>
            Three instrument families — scissors, forceps and needle holders — documented pattern by pattern.
            Open any sheet to view it full screen.
          </p>
        </div>
      </section>

      <section className="catalog-nav-bar">
        <div className="wrap catalog-nav">
          {CATALOG_SECTIONS.map(section => (
            <button key={section.key} type="button" className="catalog-nav-pill" onClick={() => scrollToSection(section.key)}>
              <Icon name={section.icon} />
              {section.name}
              <span>{section.images.length}</span>
            </button>
          ))}
          <span className="catalog-total">{CATALOG_IMAGE_COUNT} images in total</span>
        </div>
      </section>

      {CATALOG_SECTIONS.map((section, sectionIndex) => {
        const shots = [{ src: CATALOG_COVER, cover: true }, ...section.images.map(src => ({ src }))];

        return (
        <section
          key={section.key}
          id={section.key}
          className={`catalog-section section-pad${sectionIndex % 2 === 1 ? ' catalog-section-alt' : ''}`}
        >
          <div className="wrap">
            <Reveal className="section-head between">
              <div className="catalog-heading">
                <div className="catalog-heading-ico"><Icon name={section.icon} /></div>
                <div>
                  <div className="eyebrow">{section.tagline}</div>
                  <h2>{section.name}</h2>
                  <p className="catalog-desc">{section.desc}</p>
                </div>
              </div>
              <span className="result-count">{section.images.length} sheets</span>
            </Reveal>

            <div className="catalog-grid">
              {shots.map((shot, i) => (
                <Reveal
                  key={shot.src}
                  type="fade"
                  delay={Math.min(i, 8) * 0.04}
                  className={`catalog-tile${shot.cover ? ' catalog-tile-cover' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setLight({ sectionKey: section.key, index: i })}
                    aria-label={shot.cover
                      ? `Open the ${section.name} catalogue cover full screen`
                      : `Open ${section.name} image ${i} full screen`}
                  >
                    <img
                      src={shot.src}
                      alt={shot.cover ? 'Surgical Instruments — Product Catalogue cover' : `${section.name} — pattern ${i}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <span className="catalog-tile-overlay">
                      <Icon name="search" />
                      View
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        );
      })}

      <section className="section-pad-sm">
        <div className="wrap">
          <Reveal type="scale" className="cta-band">
            <div className="eyebrow" style={{ justifyContent: 'center', color: 'var(--gold-300)' }}>Can't Find What You Need?</div>
            <h2>We Also Handle <span className="accent-italic"> Custom &amp; Bulk Orders</span></h2>
            <p>Need a specific size, tip configuration, or branding on the handle? Tell us what your theatre requires.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-gold">Talk to Our Team <Icon name="arrowRight" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {activeSection && (
        <Lightbox
          section={activeSection}
          images={[CATALOG_COVER, ...activeSection.images]}
          index={light.index}
          onClose={() => setLight(null)}
          onNavigate={index => setLight({ sectionKey: light.sectionKey, index })}
        />
      )}
    </>
  );
}

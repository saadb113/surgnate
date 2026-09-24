import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { MAIN_CATEGORIES, mainCategoryMeta } from '../lib/categories';

export default function Products() {
  const { products, loading } = useProducts();

  const [finish, setFinish] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('default');

  const list = useMemo(() => {
    let result = products.filter(p => {
      const matchFinish = finish === 'all' || p.finish === finish;
      const matchQ = !q || `${p.name}${p.category}${p.type}`.toLowerCase().includes(q.toLowerCase());
      return matchFinish && matchQ;
    });
    if (sort === 'az') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'finish') result = [...result].sort((a, b) => (b.finish === 'Gold') - (a.finish === 'Gold'));
    return result;
  }, [products, finish, q, sort]);

  const sections = useMemo(() => MAIN_CATEGORIES.map(mainCat => ({
    key: mainCat,
    meta: mainCategoryMeta(mainCat),
    items: list.filter(p => (p.mainCategory || MAIN_CATEGORIES[0]) === mainCat)
  })), [list]);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link to="/">Home</Link><Icon name="chevronRight" /><span>Products</span></div>
          <h1>The Full <span className="accent-italic">Surgnate</span> Range</h1>
          <p>Forceps, needle holders and plasma-coated instruments — precision-forged in stainless steel and gold-plated tungsten carbide.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <Reveal className="filter-bar">
            <div className="filter-tabs">
              <span className="result-count" style={{ marginRight: 6 }}>Finish:</span>
              <button className={finish === 'all' ? 'active' : ''} onClick={() => setFinish('all')}>All</button>
              <button className={finish === 'Steel' ? 'active' : ''} onClick={() => setFinish('Steel')}>Stainless Steel</button>
              <button className={finish === 'Gold' ? 'active' : ''} onClick={() => setFinish('Gold')}>Gold-Plated TC</button>
            </div>
            <div className="filter-meta">
              <div className="search-input-wrap">
                <Icon name="search" />
                <input type="text" placeholder="Search instruments..." value={q} onChange={e => setQ(e.target.value)} />
              </div>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">Sort: Featured</option>
                <option value="az">Name: A–Z</option>
                <option value="za">Name: Z–A</option>
                <option value="finish">Finish: Gold First</option>
              </select>
            </div>
          </Reveal>

         

          {!loading && list.length === 0 && (
            <div className="empty-state">
              <Icon name="search" />
              <h4>No instruments match your filters</h4>
              <p>Try a different search or clear your filters.</p>
            </div>
          )}

          {sections.map(section => (
            <div key={section.key} className="prod-section" style={{ marginTop: 48 }}>
              <Reveal className="section-head between">
                <div>
                  <div className="eyebrow">{section.meta.desc}</div>
                  <h2>{section.key}</h2>
                </div>
                <span className="result-count">{section.items.length} instrument{section.items.length === 1 ? '' : 's'}</span>
              </Reveal>

              {section.items.length > 0 ? (
                <div className="prod-grid">
                  {section.items.map((p, i) => <ProductCard key={p.id} product={p} delay={Math.min(i, 8) * 0.05} />)}
                </div>
              ) : (
                !loading && <p style={{ color: 'var(--ink-400)' }}>No instruments in this category yet.</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
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
    </>
  );
}

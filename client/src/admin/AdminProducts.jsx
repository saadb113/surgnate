import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { useProducts } from '../context/ProductsContext';
import { useToast } from '../context/ToastContext';
import { api, assetUrl } from '../lib/api';

export default function AdminProducts() {
  const { products, categories, loading, refresh } = useProducts();
  const showToast = useToast();

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const list = useMemo(() => {
    return products.filter(p => {
      const matchQ = !q || `${p.name}${p.category}${p.slug}`.toLowerCase().includes(q.toLowerCase());
      const matchCat = cat === 'all' || p.category === cat;
      return matchQ && matchCat;
    });
  }, [products, q, cat]);

  async function confirmDelete() {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await api.deleteProduct(confirmTarget.id);
      showToast(`${confirmTarget.name} was deleted`, 'trash');
      setConfirmTarget(null);
      refresh();
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'alert');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="admin-panel-head" style={{ background: 'transparent', border: 'none', padding: '0 0 20px' }}>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>Products</h1>
        <Link to="/admin/products/new" className="btn btn-gold btn-sm"><Icon name="plus" /> Add Product</Link>
      </div>

      <div className="admin-toolbar">
        <div className="search-input-wrap">
          <Icon name="search" />
          <input placeholder="Search by name, category, slug…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="sort-select" value={cat} onChange={e => setCat(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="result-count">{loading ? 'Loading…' : `${list.length} product${list.length === 1 ? '' : 's'}`}</span>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th><th>Category</th><th>Finish</th><th>Size</th><th>Featured</th><th></th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="name-cell">
                      <div className="prod-thumb-sm">{p.images?.[0] && <img src={assetUrl(p.images[0])} alt={p.name} />}</div>
                      <div><b>{p.name}</b><span>/{p.slug}</span></div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td><span className={`badge-pill ${p.finish === 'Gold' ? 'badge-gold' : 'badge-steel'}`}>{p.finish === 'Gold' ? 'Gold TC' : 'Steel'}</span></td>
                  <td>{p.sizes?.join(' / ')}</td>
                  <td>{p.featured ? <span className="badge-pill badge-featured">Featured</span> : <span style={{ color: 'var(--ink-400)' }}>—</span>}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link to={`/products/${p.slug}`} target="_blank" className="admin-icon-btn" title="View on site"><Icon name="externalLink" /></Link>
                      <Link to={`/admin/products/${p.id}/edit`} className="admin-icon-btn" title="Edit"><Icon name="edit" /></Link>
                      <button className="admin-icon-btn danger" title="Delete" onClick={() => setConfirmTarget(p)}><Icon name="trash" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && list.length === 0 && (
          <div className="admin-empty">
            <Icon name="box" />
            <p>No products match your search.</p>
          </div>
        )}
      </div>

      {confirmTarget && (
        <div className="admin-modal-scrim" onClick={() => !deleting && setConfirmTarget(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="ico"><Icon name="trash" /></div>
            <h4>Delete "{confirmTarget.name}"?</h4>
            <p>This will permanently remove the product from your catalog. This can't be undone.</p>
            <div className="actions">
              <button className="btn btn-line" onClick={() => setConfirmTarget(null)} disabled={deleting}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>{deleting ? 'Deleting…' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

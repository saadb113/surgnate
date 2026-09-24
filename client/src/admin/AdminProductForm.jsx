import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { useProducts } from '../context/ProductsContext';
import { useToast } from '../context/ToastContext';
import { api, assetUrl } from '../lib/api';
import { MAIN_CATEGORIES } from '../lib/categories';

const EMPTY = {
  name: '', slug: '', category: 'Operating', mainCategory: MAIN_CATEGORIES[0], finish: 'Steel', sizes: [''], material: '',
  finishDetail: '', type: '', tip: '', usage: '', tagline: '', short: '', description: '',
  features: [''], images: [], featured: false
};

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { products, categories, refresh } = useProducts();
  const showToast = useToast();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loaded, setLoaded] = useState(!isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const existing = products.find(p => p.id === id);
    if (existing) {
      setForm({
        ...EMPTY,
        ...existing,
        features: existing.features?.length ? existing.features : [''],
        sizes: existing.sizes?.length ? existing.sizes : ['']
      });
      setLoaded(true);
    }
  }, [isEdit, id, products]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function setListItem(field, i, value) {
    setForm(f => {
      const list = [...f[field]];
      list[i] = value;
      return { ...f, [field]: list };
    });
  }
  function addListItem(field) {
    setForm(f => ({ ...f, [field]: [...f[field], ''] }));
  }
  function removeListItem(field, i) {
    setForm(f => ({ ...f, [field]: f[field].filter((_, idx) => idx !== i) }));
  }

  async function onPickImages(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const res = await api.uploadImage(file);
        setForm(f => ({ ...f, images: [...f.images, res.url] }));
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'alert');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function removeImage(idx) {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) { showToast('Product name is required', 'alert'); return; }

    setSaving(true);
    const payload = { ...form, features: form.features.filter(f => f.trim()), sizes: form.sizes.filter(s => s.trim()) };

    try {
      if (isEdit) {
        await api.updateProduct(id, payload);
        showToast('Product updated', 'check');
      } else {
        await api.createProduct(payload);
        showToast('Product created', 'check');
      }
      await refresh();
      navigate('/admin/products');
    } catch (err) {
      showToast(err.message || 'Failed to save product', 'alert');
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) return <p style={{ color: 'var(--ink-400)' }}>Loading product…</p>;

  return (
    <form onSubmit={onSubmit}>
      <div className="admin-panel-head" style={{ background: 'transparent', border: 'none', padding: '0 0 20px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', margin: '0 0 4px' }}>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <span style={{ fontSize: '.86rem', color: 'var(--ink-400)' }}>{isEdit ? `Editing "${form.name}"` : 'Fill in the details below to add a new instrument to your catalog'}</span>
        </div>
        <Link to="/admin/products" className="btn btn-line btn-sm"><Icon name="arrowLeft" /> Back to Products</Link>
      </div>

      <div className="admin-form-grid">
        <div>
          <div className="admin-form-section">
            <h4>Basic Information</h4>
            <div className="admin-field">
              <label>Product Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Operating Scissors — Straight" required />
            </div>
            <div className="admin-field">
              <label>Main Category *<span className="hint">which section this product appears under on the Products page</span></label>
              <select value={form.mainCategory} onChange={e => set('mainCategory', e.target.value)} required>
                {MAIN_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-form-grid-2">
              <div className="admin-field">
                <label>Category <span className="hint">select existing or type new</span></label>
                <input list="category-options" value={form.category} onChange={e => set('category', e.target.value)} placeholder="Operating" />
                <datalist id="category-options">
                  {[...new Set(['Operating', 'Mayo', 'Iris', 'Metzenbaum', 'Lister', ...categories])].map(c => <option key={c} value={c} />)}
                </datalist>
              </div>
              <div className="admin-field">
                <label>Finish</label>
                <select value={form.finish} onChange={e => set('finish', e.target.value)}>
                  <option value="Steel">Stainless Steel</option>
                  <option value="Gold">Gold-Plated TC</option>
                </select>
              </div>
            </div>
            <div className="admin-field">
              <label>Slug <span className="hint">used in the product URL — auto-generated if left blank</span></label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="operating-scissors-straight" />
            </div>
            <div className="admin-field">
              <label>Tagline</label>
              <input value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="The workhorse of every tray" />
            </div>
            <div className="admin-field">
              <label>Short Description <span className="hint">shown on product cards</span></label>
              <textarea value={form.short} onChange={e => set('short', e.target.value)} placeholder="One or two sentences summarizing the product" />
            </div>
            <div className="admin-field">
              <label>Full Description</label>
              <textarea style={{ minHeight: 140 }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed product description shown on the Description tab" />
            </div>
          </div>

          <div className="admin-form-section">
            <h4>Specifications</h4>
            <div className="admin-field">
              <label>Sizes <span className="hint">add every size this product is available in — shown on the product page</span></label>
              <div className="list-editor">
                {form.sizes.map((s, i) => (
                  <div className="list-editor-row" key={i}>
                    <input value={s} onChange={e => setListItem('sizes', i, e.target.value)} placeholder='5.5" (14 cm)' />
                    <button type="button" className="admin-icon-btn danger" onClick={() => removeListItem('sizes', i)} aria-label="Remove size"><Icon name="trash" /></button>
                  </div>
                ))}
                <button type="button" className="add-row-btn" onClick={() => addListItem('sizes')}><Icon name="plus" /> Add Size</button>
              </div>
            </div>
            <div className="admin-form-grid-2">
              <div className="admin-field"><label>Type</label><input value={form.type} onChange={e => set('type', e.target.value)} placeholder="Straight / Curved" /></div>
              <div className="admin-field"><label>Material</label><input value={form.material} onChange={e => set('material', e.target.value)} placeholder="High-Grade Stainless Steel" /></div>
              <div className="admin-field"><label>Finish Detail</label><input value={form.finishDetail} onChange={e => set('finishDetail', e.target.value)} placeholder="Mirror Finish" /></div>
              <div className="admin-field"><label>Tip</label><input value={form.tip} onChange={e => set('tip', e.target.value)} placeholder="Sharp / Sharp" /></div>
              <div className="admin-field"><label>Usage</label><input value={form.usage} onChange={e => set('usage', e.target.value)} placeholder="Cutting tissues & sutures" /></div>
            </div>
          </div>

          <div className="admin-form-section">
            <h4>Features <span className="hint">shown on the product's Features tab</span></h4>
            <div className="list-editor">
              {form.features.map((f, i) => (
                <div className="list-editor-row" key={i}>
                  <input value={f} onChange={e => setListItem('features', i, e.target.value)} placeholder={`Feature ${i + 1}`} />
                  <button type="button" className="admin-icon-btn danger" onClick={() => removeListItem('features', i)} aria-label="Remove feature"><Icon name="trash" /></button>
                </div>
              ))}
              <button type="button" className="add-row-btn" onClick={() => addListItem('features')}><Icon name="plus" /> Add Feature</button>
            </div>
          </div>
        </div>

        <div>
          <div className="admin-form-section">
            <h4>Product Images</h4>
            <div className="image-manager">
              {form.images.map((img, i) => (
                <div className="image-slot" key={img + i}>
                  <img src={assetUrl(img)} alt={`Product ${i + 1}`} />
                  <button type="button" className="remove-img" onClick={() => removeImage(i)} aria-label="Remove image"><Icon name="close" /></button>
                </div>
              ))}
              <label className={`image-drop${uploading ? ' uploading' : ''}`}>
                <Icon name="upload" />
                <span>{uploading ? 'Uploading…' : 'Upload Image'}</span>
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onPickImages} disabled={uploading} />
              </label>
            </div>
            <p style={{ fontSize: '.76rem', color: 'var(--ink-400)', marginTop: 12 }}>First image is used as the primary thumbnail. JPG, PNG or WEBP, up to 8MB each.</p>
          </div>

          <div className="admin-form-section">
            <h4>Visibility</h4>
            <div className="admin-switch-row">
              <span>Feature on Homepage</span>
              <label className="switch">
                <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
                <span className="track" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-form-sticky-foot">
        <span style={{ fontSize: '.82rem', color: 'var(--ink-400)' }}>{isEdit ? 'Changes save immediately to the live catalog.' : 'The product will appear on the live site once saved.'}</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/admin/products" className="btn btn-line">Cancel</Link>
          <button type="submit" className="btn btn-gold" disabled={saving || uploading}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'} <Icon name="check" />
          </button>
        </div>
      </div>
    </form>
  );
}

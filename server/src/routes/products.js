import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const MAIN_CATEGORIES = [
  'Surgical Forceps & Clamp',
  'Needle Holders & Surgical Clamps',
  'Plasma Coated'
];

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function uniqueSlug(base, products, ignoreId) {
  let slug = base || 'product';
  let n = 2;
  while (products.some(p => p.slug === slug && p.id !== ignoreId)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

// ---------- Public ----------

router.get('/', (req, res) => {
  const products = db.getProducts();
  res.json(products);
});

router.get('/categories', (req, res) => {
  const products = db.getProducts();
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
  res.json(cats);
});

router.get('/:slug', (req, res) => {
  const products = db.getProducts();
  const product = products.find(p => p.slug === req.params.slug || p.id === req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// ---------- Admin (protected) ----------

router.post('/', requireAuth, async (req, res) => {
  const body = req.body || {};
  if (!body.name) return res.status(400).json({ error: 'Product name is required' });

  const products = db.getProducts();
  const baseSlug = slugify(body.slug || body.name);
  const now = new Date().toISOString();

  const product = {
    id: nanoid(10),
    slug: uniqueSlug(baseSlug, products),
    name: body.name,
    category: body.category || 'Operating',
    mainCategory: MAIN_CATEGORIES.includes(body.mainCategory) ? body.mainCategory : MAIN_CATEGORIES[0],
    finish: body.finish || 'Steel',
    size: body.size || '',
    material: body.material || '',
    finishDetail: body.finishDetail || '',
    type: body.type || '',
    tip: body.tip || '',
    usage: body.usage || '',
    tagline: body.tagline || '',
    short: body.short || '',
    description: body.description || '',
    features: Array.isArray(body.features) ? body.features.filter(Boolean) : [],
    images: Array.isArray(body.images) ? body.images.filter(Boolean) : [],
    featured: !!body.featured,
    createdAt: now,
    updatedAt: now
  };

  products.push(product);
  await db.saveProducts(products);
  res.status(201).json(product);
});

router.put('/:id', requireAuth, async (req, res) => {
  const products = db.getProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });

  const body = req.body || {};
  const existing = products[idx];
  const newSlugBase = body.slug ? slugify(body.slug) : existing.slug;

  const updated = {
    ...existing,
    name: body.name ?? existing.name,
    category: body.category ?? existing.category,
    mainCategory: MAIN_CATEGORIES.includes(body.mainCategory) ? body.mainCategory : (existing.mainCategory || MAIN_CATEGORIES[0]),
    finish: body.finish ?? existing.finish,
    size: body.size ?? existing.size,
    material: body.material ?? existing.material,
    finishDetail: body.finishDetail ?? existing.finishDetail,
    type: body.type ?? existing.type,
    tip: body.tip ?? existing.tip,
    usage: body.usage ?? existing.usage,
    tagline: body.tagline ?? existing.tagline,
    short: body.short ?? existing.short,
    description: body.description ?? existing.description,
    features: Array.isArray(body.features) ? body.features.filter(Boolean) : existing.features,
    images: Array.isArray(body.images) ? body.images.filter(Boolean) : existing.images,
    featured: typeof body.featured === 'boolean' ? body.featured : existing.featured,
    slug: uniqueSlug(newSlugBase, products, existing.id),
    updatedAt: new Date().toISOString()
  };

  products[idx] = updated;
  await db.saveProducts(products);
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const products = db.getProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });

  const [removed] = products.splice(idx, 1);
  await db.saveProducts(products);
  res.json({ ok: true, removed });
});

export default router;

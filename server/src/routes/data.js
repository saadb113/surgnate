import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/export', requireAuth, (req, res) => {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    products: db.getProducts(),
    messages: db.getMessages()
  };
  res.setHeader('Content-Disposition', `attachment; filename="surgnate-data-${Date.now()}.json"`);
  res.json(payload);
});

router.post('/import', requireAuth, async (req, res) => {
  const body = req.body || {};
  if (!Array.isArray(body.products)) {
    return res.status(400).json({ error: 'Invalid data file: "products" array is missing' });
  }

  await db.saveProducts(body.products);
  await db.saveMessages(Array.isArray(body.messages) ? body.messages : []);

  res.json({
    ok: true,
    products: body.products.length,
    messages: Array.isArray(body.messages) ? body.messages.length : 0
  });
});

export default router;

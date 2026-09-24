import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ---------- Public: submit an inquiry ----------
router.post('/', async (req, res) => {
  const body = req.body || {};
  if (!body.name || !body.email || !body.phone || !body.message) {
    return res.status(400).json({ error: 'Name, email, phone and message are required' });
  }

  const messages = db.getMessages();
  const message = {
    id: nanoid(10),
    name: body.name,
    org: body.org || '',
    email: body.email,
    phone: body.phone,
    country: body.country || '',
    product: body.product || '',
    message: body.message,
    read: false,
    createdAt: new Date().toISOString()
  };

  messages.unshift(message);
  await db.saveMessages(messages);
  res.status(201).json({ ok: true, id: message.id });
});

// ---------- Admin (protected) ----------

router.get('/', requireAuth, (req, res) => {
  res.json(db.getMessages());
});

router.patch('/:id', requireAuth, async (req, res) => {
  const messages = db.getMessages();
  const idx = messages.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Message not found' });

  if (typeof req.body?.read === 'boolean') messages[idx].read = req.body.read;
  await db.saveMessages(messages);
  res.json(messages[idx]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const messages = db.getMessages();
  const idx = messages.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Message not found' });

  const [removed] = messages.splice(idx, 1);
  await db.saveMessages(messages);
  res.json({ ok: true, removed });
});

export default router;

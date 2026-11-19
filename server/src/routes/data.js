import { Router } from 'express';
import multer from 'multer';
import AdmZip from 'adm-zip';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 200 * 1024 * 1024 } });

router.get('/export', requireAuth, (req, res) => {
  const payload = {
    version: 3,
    exportedAt: new Date().toISOString(),
    messages: db.getMessages()
  };

  const zip = new AdmZip();
  zip.addFile('data.json', Buffer.from(JSON.stringify(payload, null, 2)));

  const buffer = zip.toBuffer();
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="surgnate-inquiries-${Date.now()}.zip"`);
  res.send(buffer);
});

router.post('/import', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' });

  let zip;
  try {
    zip = new AdmZip(req.file.buffer);
  } catch {
    return res.status(400).json({ error: 'That file is not a valid zip archive' });
  }

  const dataEntry = zip.getEntry('data.json');
  if (!dataEntry) return res.status(400).json({ error: 'Zip is missing data.json' });

  let parsed;
  try {
    parsed = JSON.parse(dataEntry.getData().toString('utf-8'));
  } catch {
    return res.status(400).json({ error: 'data.json in the zip is not valid JSON' });
  }

  const messages = Array.isArray(parsed.messages) ? parsed.messages : null;
  if (!messages) {
    return res.status(400).json({ error: 'Invalid data file: "messages" array is missing' });
  }

  await db.saveMessages(messages);

  res.json({ ok: true, messages: messages.length });
});

export default router;

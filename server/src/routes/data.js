import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { UPLOAD_DIR } from '../paths.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 200 * 1024 * 1024 } });

router.get('/export', requireAuth, (req, res) => {
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    products: db.getProducts(),
    messages: db.getMessages()
  };

  const zip = new AdmZip();
  zip.addFile('data.json', Buffer.from(JSON.stringify(payload, null, 2)));

  const files = fs.existsSync(UPLOAD_DIR) ? fs.readdirSync(UPLOAD_DIR) : [];
  for (const file of files) {
    const full = path.join(UPLOAD_DIR, file);
    if (fs.statSync(full).isFile()) zip.addLocalFile(full, 'images');
  }

  const buffer = zip.toBuffer();
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="surgnate-data-${Date.now()}.zip"`);
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
  if (!Array.isArray(parsed.products)) {
    return res.status(400).json({ error: 'Invalid data file: "products" array is missing' });
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const imageEntries = zip.getEntries().filter(e => !e.isDirectory && e.entryName.startsWith('images/'));
  for (const entry of imageEntries) {
    const filename = path.basename(entry.entryName);
    if (!filename) continue;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), entry.getData());
  }

  await db.saveProducts(parsed.products);
  await db.saveMessages(Array.isArray(parsed.messages) ? parsed.messages : []);

  res.json({
    ok: true,
    products: parsed.products.length,
    messages: Array.isArray(parsed.messages) ? parsed.messages.length : 0,
    images: imageEntries.length
  });
});

export default router;

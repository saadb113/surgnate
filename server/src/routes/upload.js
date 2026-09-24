import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { nanoid } from 'nanoid';
import { requireAuth } from '../middleware/auth.js';
import { UPLOAD_DIR } from '../paths.js';

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${nanoid(12)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED.has(ext)) return cb(new Error('Unsupported image type'));
    cb(null, true);
  }
});

const router = Router();

router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image received' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

// Multer/error handler for this route
router.use((err, req, res, next) => {
  if (err) return res.status(400).json({ error: err.message || 'Upload failed' });
  next();
});

export default router;

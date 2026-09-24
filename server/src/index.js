import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';
import { UPLOAD_DIR } from './paths.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Surgnate API running on http://localhost:${PORT}`);
});

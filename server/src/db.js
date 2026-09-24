import fs from 'node:fs';
import path from 'node:path';
import { DATA_DIR } from './paths.js';

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function ensureFile(file, fallback) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
}

function readJSON(file, fallback) {
  ensureFile(file, fallback);
  const raw = fs.readFileSync(file, 'utf-8');
  try { return JSON.parse(raw); } catch { return fallback; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// A tiny write queue to avoid concurrent writes clobbering each other
let queue = Promise.resolve();
function enqueue(fn) {
  queue = queue.then(fn, fn);
  return queue;
}

export const db = {
  getProducts() { return readJSON(PRODUCTS_FILE, []); },
  saveProducts(products) { return enqueue(() => writeJSON(PRODUCTS_FILE, products)); },

  getMessages() { return readJSON(MESSAGES_FILE, []); },
  saveMessages(messages) { return enqueue(() => writeJSON(MESSAGES_FILE, messages)); }
};

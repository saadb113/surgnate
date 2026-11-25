/**
 * Post-build step: emit a static HTML entry for every public route.
 *
 * The app is a client-rendered SPA, so by default every URL serves the same
 * index.html with a single <title>. Google can render JS, but it is slower and
 * less reliable than static markup. This script clones the built index.html
 * into <route>/index.html with route-specific metadata, which Vercel serves
 * directly for that path while the SPA still takes over once JS loads.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '..', 'dist');
const SITE = 'https://surgnate.vercel.app';

const routes = [
  {
    path: '/',
    title: 'Surgnate — Surgical Instruments from Sialkot, Pakistan',
    description:
      'Surgnate supplies surgical scissors, forceps and needle holders to hospitals, clinics and medical distributors worldwide. Precision instruments crafted in Sialkot, Pakistan.',
    image: '/images/HomeImg2.jpg'
  },
  {
    path: '/catalog',
    title: 'Surgical Instrument Catalog — Scissors, Forceps & Needle Holders | Surgnate',
    description:
      'Browse the Surgnate catalog: surgical scissors, forceps and needle holders, documented pattern by pattern with sizes, materials and finishes.',
    image: '/images/catalog/cover.jpg'
  },
  {
    path: '/about',
    title: 'Why Surgnate — Connecting Quality with Global Healthcare',
    description:
      'Surgnate brings quality surgical instruments from Sialkot, Pakistan, to the international healthcare market through trusted manufacturing partnerships.',
    image: '/images/about-hero.webp'
  },
  {
    path: '/contact',
    title: 'Contact Surgnate — Request a Quote for Surgical Instruments',
    description:
      'Request pricing and availability for surgical scissors, forceps and needle holders. Bulk and export orders welcome — crafted in Sialkot, Pakistan, shipped worldwide.',
    image: '/images/HomeImg2.jpg'
  },
  {
    path: '/terms-of-trade',
    title: 'Terms of Trade — Surgnate',
    description:
      'The terms governing quotations, orders, payment, shipping and specifications for Surgnate surgical instruments.',
    image: '/images/HomeImg2.jpg'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy — Surgnate',
    description:
      'How Surgnate collects, uses and protects the information you share when requesting a quote or browsing our catalog.',
    image: '/images/HomeImg2.jpg'
  }
];

const templatePath = path.join(dist, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found — run vite build first');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf8');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function withMeta(html, route) {
  const url = `${SITE}${route.path === '/' ? '/' : route.path}`;
  const image = `${SITE}${route.image}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(")/, '$1index, follow, max-image-preview:large$2')
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);

  return out;
}

for (const route of routes) {
  const html = withMeta(template, route);
  if (route.path === '/') {
    fs.writeFileSync(templatePath, html);
    console.log('[prerender] / (index.html)');
    continue;
  }
  const dir = path.join(dist, route.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`[prerender] ${route.path} -> ${path.relative(dist, path.join(dir, 'index.html'))}`);
}

/**
 * The Surgnate catalog is organised into three instrument families.
 * Each family is a pure image gallery — no per-instrument records.
 *
 * Images live in `public/images/catalog/<folder>/` and are named
 * `<folder>-01.jpg`, `<folder>-02.jpg`, … so the lists stay in sync
 * with what was actually exported into the folder.
 */
function buildImages(folder, count) {
  return Array.from(
    { length: count },
    (_, i) => `/images/catalog/${folder}/${folder}-${String(i + 1).padStart(2, '0')}.jpg`
  );
}

export const CATALOG_SECTIONS = [
  {
    key: 'scissors',
    name: 'Scissors',
    icon: 'scissors',
    tagline: 'Operating, Mayo, Metzenbaum, Iris & Lister Bandage',
    desc: 'Straight and curved blades in high-grade stainless steel, tungsten carbide and gold-plated finishes — hand-honed for a clean, single-pass cut.',
    images: buildImages('scissors', 23)
  },
  {
    key: 'forceps',
    name: 'Forceps',
    icon: 'layers',
    tagline: 'Haemostatic, tissue & towel forceps',
    desc: 'Kelly, Mosquito, Allis, Kocher, Babcock, Sponge Holding and Backhaus patterns — for secure tissue handling, haemostasis and confident grip.',
    images: buildImages('forceps', 17)
  },
  {
    key: 'needle-holders',
    name: 'Needle Holders',
    icon: 'target',
    tagline: 'Mayo Hegar, Crile Wood & Olsen Hegar',
    desc: 'Needle drivers engineered for locked, non-slip needle control during suturing, with TC-inserted jaws for a lasting grip.',
    images: buildImages('needle-holders', 17)
  }
];

export const CATALOG_IMAGE_COUNT = CATALOG_SECTIONS.reduce((sum, s) => sum + s.images.length, 0);

/** Shared cover sheet shown first in every section. */
export const CATALOG_COVER = '/images/catalog/cover.jpg';

export function sectionByKey(key) {
  return CATALOG_SECTIONS.find(s => s.key === key) || null;
}

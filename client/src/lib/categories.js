export const CATEGORY_META = {
  Operating: { name: 'Operating Scissors', desc: 'Straight & curved scissors for everyday general surgery.', icon: 'scissors' },
  Mayo: { name: 'Mayo Scissors', desc: 'Heavy-duty scissors for general tissue & suture work.', icon: 'layers' },
  Iris: { name: 'Iris Scissors', desc: 'Fine-tipped scissors for delicate, precision cutting.', icon: 'eye' },
  Metzenbaum: { name: 'Metzenbaum Scissors', desc: 'Long, curved blades for deep tissue dissection.', icon: 'wave' },
  Lister: { name: 'Lister Bandage', desc: 'Safety-tipped scissors for dressings & bandages.', icon: 'shield' }
};

export function categoryMeta(key) {
  return CATEGORY_META[key] || { name: `${key} Scissors`, desc: 'Precision surgical instruments.', icon: 'scissors' };
}

export const MAIN_CATEGORIES = [
  'Surgical Forceps & Clamp',
  'Needle Holders & Surgical Clamps',
  'Plasma Coated'
];

export const MAIN_CATEGORY_META = {
  'Surgical Forceps & Clamp': { desc: 'Precision forceps and clamps for tissue handling & hemostasis.', icon: 'layers' },
  'Needle Holders & Surgical Clamps': { desc: 'Needle drivers and clamps for secure suturing control.', icon: 'shield' },
  'Plasma Coated': { desc: 'Plasma-coated instruments for enhanced durability & finish.', icon: 'sparkle' }
};

export function mainCategoryMeta(key) {
  return MAIN_CATEGORY_META[key] || { desc: 'Precision surgical instruments.', icon: 'scissors' };
}

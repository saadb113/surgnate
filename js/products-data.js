/* ==========================================================================
   SURGNATE — Product Catalog Data
   Single source of truth, consumed by products.html and product.html
   ========================================================================== */

const SURGNATE_PRODUCTS = [
  {
    slug: "operating-scissors-straight",
    name: "Operating Scissors — Straight",
    category: "Operating",
    finish: "Steel",
    size: '5.5" (14 cm)',
    material: "High-Grade Stainless Steel",
    financeFinish: "Mirror Finish",
    type: "Straight",
    tip: "Sharp / Sharp",
    usage: "Cutting tissues & sutures",
    tagline: "The workhorse of every tray",
    short: "A precision-forged straight operating scissor built for the clean, controlled cuts general surgery depends on — pass after pass, procedure after procedure.",
    description: "The Surgnate Operating Scissor is engineered for precise cutting of tissue and sutures during general surgical procedures. Cold-forged from a single billet of premium stainless steel, each pair is hardened, ground and hand-polished to a mirror finish, then tested for blade alignment and spring tension before it ever leaves the factory. Available in sharp/sharp and blunt/blunt tip configurations to match your theatre's protocol.",
    features: [
      "Cold-forged from premium surgical-grade stainless steel",
      "Hand-honed cutting edge for clean, single-pass cuts",
      "Fully autoclavable — rated for repeated sterilization cycles",
      "Corrosion and stain resistant mirror finish",
      "Tensioned box-lock joint for consistent, chatter-free action",
      "Individually inspected before packing"
    ],
    images: ["operating-straight-sharp.jpg", "operating-straight-blunt.jpg"],
    featured: true
  },
  {
    slug: "iris-scissor",
    name: "Iris Scissor",
    category: "Iris",
    finish: "Steel",
    size: '4.5" (11 cm)',
    material: "High-Grade Stainless Steel",
    financeFinish: "Mirror Finish",
    type: "Straight, Fine Tip",
    tip: "Sharp / Sharp",
    usage: "Delicate ophthalmic & fine tissue cutting",
    tagline: "Precision where the margin is a millimetre",
    short: "A compact, needle-fine scissor designed for the delicate, high-accuracy cutting that ophthalmic and micro-surgical work demands.",
    description: "Surgnate Iris Scissors are precision-crafted for fine, accurate cutting during delicate procedures. Their short, slender blades and lighter spring action give surgeons exceptional control in confined surgical fields, while high-grade stainless steel construction keeps every edge sharp through cycle after cycle of sterilization.",
    features: [
      "Slim 11 cm profile for confined surgical fields",
      "Fine, needle-sharp tips for accurate micro-cutting",
      "High-grade stainless steel for long-term sharpness",
      "Autoclavable and built for repeated reuse",
      "Corrosion-resistant mirror polish",
      "Balanced, lightweight handling"
    ],
    images: ["iris-closed.jpg", "operating-straight-sharp.jpg"],
    featured: true
  },
  {
    slug: "mayo-tc-scissor",
    name: "Mayo TC Scissor",
    category: "Mayo",
    finish: "Gold",
    size: '5.5" (14 cm)',
    material: "Stainless Steel with Tungsten Carbide Inserts",
    financeFinish: "Mirror Finish, Gold-Plated Handles",
    type: "Straight",
    tip: "Sharp / Blunt",
    usage: "General cutting & tissue handling",
    tagline: "Tungsten-carbide edge, gold-standard grip",
    short: "Tungsten-carbide cutting inserts fused into a gold-plated handle — built for surgeons who need an edge that keeps its edge.",
    description: "The Surgnate Mayo TC Scissor pairs tungsten-carbide cutting inserts with elegantly gold-plated ergonomic handles. The carbide edge holds sharpness dramatically longer than standard steel, making it the preferred choice for high-volume theatres and demanding general-surgery tissue work, while the gold handle marks it instantly on a crowded tray.",
    features: [
      "Tungsten Carbide (TC) inserts for superior edge retention",
      "Gold-plated handles — instantly identifiable on the tray",
      "Ergonomic ring design reduces hand fatigue in long procedures",
      "Fully autoclavable and reusable",
      "Corrosion-resistant, mirror-polished blades",
      "Precision box-lock for smooth, controlled action"
    ],
    images: ["gold-tc-vertical.jpg", "metzenbaum-curved.jpg"],
    featured: true
  },
  {
    slug: "operating-curved-scissor",
    name: "Operating Scissors — Curved TC",
    category: "Operating",
    finish: "Gold",
    size: '5.1" (13 cm)',
    material: "High-Grade Stainless Steel with TC Inserts",
    financeFinish: "Mirror Finish, Gold-Plated Handles",
    type: "Curved",
    tip: "Sharp / Blunt",
    usage: "General cutting & tissue handling",
    tagline: "A gentle curve for precise dissection",
    short: "A fine curved point and tungsten-carbide insert give this operating scissor reliable sharpness and ergonomic control for precise dissection.",
    description: "Made with a fine curved point and high-grade stainless steel handles finished in gold plate, the Surgnate Operating Curved Scissor is designed for precise general cutting and tissue handling. The gentle curve improves visibility along the cut line, while tungsten-carbide inserts extend the working life of the edge well beyond standard steel scissors.",
    features: [
      "Gold-plated handles for premium, ergonomic feel",
      "Tungsten Carbide inserts for long-lasting sharpness",
      "Precise curve improves visibility during dissection",
      "Fully autoclavable for repeated sterilization",
      "High-grade stainless steel body resists corrosion",
      "Mirror-polished finish throughout"
    ],
    images: ["gold-tc-vertical.jpg", "mayo-curved.jpg"],
    featured: false
  },
  {
    slug: "operating-straight-tc-scissor",
    name: "Operating Scissors — Straight TC",
    category: "Operating",
    finish: "Gold",
    size: '5.1" (13 cm)',
    material: "High-Grade Stainless Steel with TC Inserts",
    financeFinish: "Mirror Finish, Gold-Plated Handles",
    type: "Straight",
    tip: "Sharp / Blunt",
    usage: "General cutting & tissue handling",
    tagline: "Direct, precise, uncompromising",
    short: "A fine straight point paired with tungsten-carbide inserts and gold-plated handles — for direct, precise cutting action in general surgery.",
    description: "The Surgnate Operating Straight TC Scissor is built with a fine straight point and high-grade stainless steel handles finished in gold plate for an ergonomic, premium feel. Its tungsten-carbide cutting inserts deliver long-lasting sharpness for direct, precise general cutting and tissue handling across high-volume surgical schedules.",
    features: [
      "Gold-plated handles for ergonomic, premium grip",
      "Tungsten Carbide inserts hold an edge far longer than steel",
      "Straight profile for direct, controlled cutting action",
      "Autoclavable for full sterilization compatibility",
      "High-grade stainless steel resists corrosion and staining",
      "Individually quality-checked before dispatch"
    ],
    images: ["gold-tc-vertical.jpg", "operating-straight-sharp.jpg"],
    featured: false
  },
  {
    slug: "mayo-curved-scissor",
    name: "Mayo Scissor — Curved",
    category: "Mayo",
    finish: "Steel",
    size: '5.5" (14 cm)',
    material: "High-Grade Stainless Steel",
    financeFinish: "Mirror Finish",
    type: "Curved",
    tip: "Blunt / Blunt",
    usage: "General dissection & tissue cutting",
    tagline: "The general surgeon's steady hand",
    short: "A dependable curved Mayo scissor for general surgical purposes and tissue dissection, ground for excellent sharpness and long service life.",
    description: "Surgnate Mayo Curved Scissors are precision-crafted for general surgical purposes and tissue dissection. Made from high-grade stainless steel, they offer excellent sharpness, durability, corrosion resistance and reliable performance procedure after procedure — a dependable choice for any general theatre tray.",
    features: [
      "Curved blade profile for controlled tissue dissection",
      "High-grade stainless steel for lasting strength",
      "Excellent, long-holding sharpness",
      "Fully autoclavable and reusable",
      "Corrosion and stain resistant mirror finish",
      "Smooth, tensioned box-lock action"
    ],
    images: ["mayo-curved.jpg", "metzenbaum-curved.jpg"],
    featured: true
  },
  {
    slug: "lister-bandage-scissor",
    name: "Lister Bandage Scissor",
    category: "Lister",
    finish: "Steel",
    size: '5.5" (14 cm)',
    material: "High-Grade Stainless Steel",
    financeFinish: "Mirror Finish",
    type: "Angular, Safety Nodule",
    tip: "Blunt Safety Tip",
    usage: "Removal of dressings & bandages",
    tagline: "Safety-first, every single time",
    short: "An angled blade with a blunt safety nodule lets clinicians remove dressings, bandages and tape quickly — without ever risking the skin beneath.",
    description: "Surgnate Lister Bandage Scissors are precision-crafted for the safe and efficient removal of bandages, dressings and medical tape. A distinctive angled design and a blunt lower blade with a protective safety nodule keep the patient's skin protected during use, while high-grade stainless steel construction delivers excellent sharpness, durability and corrosion resistance.",
    features: [
      "Angled blade design keeps the hand clear of the work area",
      "Blunt lower blade with safety nodule protects the skin",
      "High-grade stainless steel for durability and edge life",
      "Autoclavable for full sterilization compatibility",
      "Corrosion-resistant mirror finish",
      "Trusted staple of emergency, ward and field kits"
    ],
    images: ["lister-bandage.jpg", "operating-straight-blunt.jpg"],
    featured: true
  },
  {
    slug: "metzenbaum-curved-scissor",
    name: "Metzenbaum Scissor — Curved",
    category: "Metzenbaum",
    finish: "Steel",
    size: '5.7" (14.5 cm)',
    material: "High-Grade Stainless Steel",
    financeFinish: "Mirror Finish",
    type: "Curved",
    tip: "Blunt / Blunt, Fine Tip",
    usage: "Precise cutting & tissue handling",
    tagline: "Long reach, gentle touch",
    short: "Long, gently curved blunt blades with fine tips reach deep into the surgical field for precise dissection without disturbing surrounding tissue.",
    description: "The Surgnate Metzenbaum Curved Scissor is a premium-crafted surgical instrument made with long, gently curved blunt blades and fine tips. Designed for precise general cutting, tissue handling and deep tissue access, it offers reliable sharpness and ergonomic control across cardiovascular, gynaecological and general surgical procedures.",
    features: [
      "Long curved blades reach deep surgical fields",
      "Fine blunt tips minimise trauma to surrounding tissue",
      "High-grade stainless steel construction",
      "Fully autoclavable and reusable",
      "Corrosion-resistant mirror finish",
      "Balanced for extended, fatigue-free use"
    ],
    images: ["metzenbaum-curved.jpg", "mayo-curved.jpg"],
    featured: false
  },
  {
    slug: "metzenbaum-tc-scissor",
    name: "Metzenbaum Scissors TC",
    category: "Metzenbaum",
    finish: "Gold",
    size: '5.7" (14.5 cm)',
    material: "Stainless Steel with Tungsten Carbide Inserts",
    financeFinish: "Mirror Finish & Gold Plating",
    type: "Curved, Tungsten Carbide",
    tip: "Blunt / Blunt, Fine Tip",
    usage: "Tissue dissection",
    tagline: "Carbide-edged for demanding dissection",
    short: "Durable tungsten-carbide cutting edges meet gold-plated handles for superior edge retention through the most demanding tissue dissection.",
    description: "Surgnate Metzenbaum Scissors TC are built with durable tungsten-carbide cutting edges and gold-plated handles, designed for precise tissue dissection where edge retention matters most. The carbide insert holds a working edge far longer than conventional steel, reducing the frequency of resharpening across high-volume surgical use.",
    features: [
      "Tungsten Carbide cutting edges for superior edge retention",
      "Gold-plated handles for an ergonomic, premium grip",
      "Long curved blade for deep tissue dissection",
      "Fully autoclavable and reusable",
      "High-grade stainless steel body resists corrosion",
      "Engineered for high-volume surgical schedules"
    ],
    images: ["gold-tc-vertical.jpg", "lister-bandage.jpg"],
    featured: false
  }
];

const SURGNATE_CATEGORIES = [
  {
    key: "Operating",
    name: "Operating Scissors",
    desc: "Straight & curved scissors for everyday general surgery.",
    icon: "scissors"
  },
  {
    key: "Mayo",
    name: "Mayo Scissors",
    desc: "Heavy-duty scissors for general tissue & suture work.",
    icon: "layers"
  },
  {
    key: "Iris",
    name: "Iris Scissors",
    desc: "Fine-tipped scissors for delicate, precision cutting.",
    icon: "eye"
  },
  {
    key: "Metzenbaum",
    name: "Metzenbaum Scissors",
    desc: "Long, curved blades for deep tissue dissection.",
    icon: "wave"
  },
  {
    key: "Lister",
    name: "Lister Bandage",
    desc: "Safety-tipped scissors for dressings & bandages.",
    icon: "shield"
  }
];

function imgPath(file){ return getBasePath() + "assets/img/products/" + file; }

function getBasePath(){
  // works whether the page lives at root or is opened via file:// from any depth
  return "";
}

function findProduct(slug){
  return SURGNATE_PRODUCTS.find(p => p.slug === slug);
}

function relatedProducts(product, count){
  count = count || 4;
  const sameCat = SURGNATE_PRODUCTS.filter(p => p.category === product.category && p.slug !== product.slug);
  const rest = SURGNATE_PRODUCTS.filter(p => p.category !== product.category && p.slug !== product.slug);
  return [...sameCat, ...rest].slice(0, count);
}

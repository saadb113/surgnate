/* ==========================================================================
   SURGNATE — Product detail page renderer
   Reads ?slug= from the URL and builds the full page from products-data.js
   ========================================================================== */
(function(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const product = findProduct(slug) || SURGNATE_PRODUCTS[0];
  const root = document.getElementById('pd-root');

  document.title = `${product.name} — Surgnate`;

  const related = relatedProducts(product, 4);

  root.innerHTML = `
    <section class="page-hero" style="padding-block:40px 0">
      <div class="wrap">
        <div class="breadcrumb">
          <a href="index.html">Home</a><span data-icon="chevronRight"></span>
          <a href="products.html">Products</a><span data-icon="chevronRight"></span>
          <a href="products.html?cat=${product.category}">${product.category}</a><span data-icon="chevronRight"></span>
          <span>${product.name}</span>
        </div>
      </div>
    </section>

    <section class="section-pad" style="padding-top:32px">
      <div class="wrap pd-grid">

        <div class="pd-gallery" data-reveal="left">
          <div class="pd-gallery-main">
            <div class="pd-badge-row">
              <span class="prod-tag ${product.finish==='Gold' ? 'gold' : ''}">${product.finish==='Gold' ? 'Gold-Plated TC' : 'Stainless Steel'}</span>
            </div>
            <img id="pd-main-img" src="${imgPath(product.images[0])}" alt="${product.name}">
          </div>
          <div class="pd-thumbs" id="pd-thumbs">
            ${product.images.map((img,i)=>`
              <button class="${i===0?'active':''}" data-img="${imgPath(img)}"><img src="${imgPath(img)}" alt="${product.name} view ${i+1}"></button>
            `).join('')}
          </div>
        </div>

        <div class="pd-info" data-reveal="right">
          <span class="pd-cat">${product.category} Scissors &middot; ${product.type}</span>
          <h1 class="pd-title">${product.name}</h1>
          <p class="pd-desc">${product.short}</p>

          <div class="pd-price-row">
            <div class="pd-price">
              <b>Wholesale &amp; Retail Pricing</b>
              <span>Request a quote for your required quantity</span>
            </div>
            <span class="stock-pill"><span class="dot"></span> In Stock</span>
          </div>

          <table class="pd-specs-table">
            <tr><td>Size</td><td>${product.size}</td></tr>
            <tr><td>Material</td><td>${product.material}</td></tr>
            <tr><td>Finish</td><td>${product.financeFinish}</td></tr>
            <tr><td>Type</td><td>${product.type}</td></tr>
            <tr><td>Tip</td><td>${product.tip}</td></tr>
            <tr><td>Usage</td><td>${product.usage}</td></tr>
          </table>

          <div class="qty-row">
            <div class="qty-stepper">
              <button id="qty-minus" aria-label="Decrease">&minus;</button>
              <input type="text" id="qty-input" value="1" inputmode="numeric">
              <button id="qty-plus" aria-label="Increase">+</button>
            </div>
            <span style="font-size:.82rem; color:var(--ink-400)">units per box — bulk cartons available</span>
          </div>

          <div class="pd-actions">
            <button id="pd-quote-btn" class="btn btn-gold">Request a Quote <span data-icon="arrowRight"></span></button>
            <a href="https://wa.me/923492030569?text=${encodeURIComponent('Hi, I would like a quote for the Surgnate ' + product.name)}" class="btn btn-line" target="_blank" rel="noopener">
              <span data-icon="whatsapp"></span> WhatsApp Us
            </a>
          </div>

          <div class="pd-trust-mini">
            <div><span data-icon="droplet"></span> Autoclavable</div>
            <div><span data-icon="shieldCheck"></span> Corrosion Resistant</div>
            <div><span data-icon="truck"></span> Export Ready</div>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="pd-tabs" id="pd-tabs">
          <button class="active" data-tab="desc">Description</button>
          <button data-tab="feat">Features</button>
          <button data-tab="ship">Shipping &amp; Ordering</button>
        </div>
        <div class="pd-tab-panel active" data-panel="desc" data-reveal="fade">
          <p class="lede">${product.description}</p>
        </div>
        <div class="pd-tab-panel" data-panel="feat">
          <ul class="pd-feature-grid">
            ${product.features.map(f => `<li><span class="tick" data-icon="check"></span> ${f}</li>`).join('')}
          </ul>
        </div>
        <div class="pd-tab-panel" data-panel="ship">
          <ul class="check-list">
            <li><span class="tick" data-icon="check"></span> Bulk carton packing available for hospital &amp; distributor orders</li>
            <li><span class="tick" data-icon="check"></span> Export documentation prepared for international shipments</li>
            <li><span class="tick" data-icon="check"></span> Custom engraving / branding available on request for large orders</li>
            <li><span class="tick" data-icon="check"></span> Lead times and freight quoted per destination at time of order</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section-pad related-strip" style="background:var(--surface); border-block:1px solid var(--line)">
      <div class="wrap">
        <div class="section-head between" data-reveal>
          <div>
            <div class="eyebrow">You May Also Need</div>
            <h2>Related Instruments</h2>
          </div>
          <a href="products.html" class="btn btn-line">View All <span data-icon="arrowRight"></span></a>
        </div>
        <div class="prod-grid" id="related-grid" data-stagger></div>
      </div>
    </section>
  `;

  // Gallery thumb switching
  const mainImg = document.getElementById('pd-main-img');
  document.querySelectorAll('#pd-thumbs button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('#pd-thumbs button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      mainImg.style.opacity = 0;
      setTimeout(()=>{ mainImg.src = btn.dataset.img; mainImg.style.opacity = 1; }, 150);
    });
  });

  // Quantity stepper
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', ()=>{
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || 1) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', ()=>{
    qtyInput.value = parseInt(qtyInput.value || 1) + 1;
  });
  qtyInput.addEventListener('change', ()=>{
    const v = parseInt(qtyInput.value); qtyInput.value = (isNaN(v) || v < 1) ? 1 : v;
  });

  // Request a quote -> contact page with context
  document.getElementById('pd-quote-btn').addEventListener('click', ()=>{
    requestQuoteFor(product.name, qtyInput.value);
  });

  // Tabs
  document.querySelectorAll('#pd-tabs button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('#pd-tabs button').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.pd-tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.pd-tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });

  // Related products
  const relatedGrid = document.getElementById('related-grid');
  related.forEach((p,i)=>{
    relatedGrid.insertAdjacentHTML('beforeend', `
      <a href="product.html?slug=${p.slug}" class="prod-card" data-reveal="fade" style="transition-delay:${i*0.08}s">
        <div class="prod-thumb">
          <span class="prod-tag ${p.finish==='Gold'?'gold':''}">${p.finish==='Gold'?'Gold-Plated TC':'Stainless Steel'}</span>
          <img src="${imgPath(p.images[0])}" alt="${p.name}">
          <span class="prod-quick" data-icon="arrowRight"></span>
        </div>
        <div class="prod-body">
          <span class="prod-cat">${p.category} Scissors</span>
          <h4>${p.name}</h4>
          <div class="prod-specs"><span><b>${p.size}</b></span><span>${p.type}</span></div>
          <div class="prod-foot"><span class="prod-link">View Details <span data-icon="arrowRight"></span></span></div>
        </div>
      </a>`);
  });

  paintIcons(root);

  // Re-run reveal observer for dynamically injected nodes
  const revealEls = root.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('in'));
  }
})();

/* ==========================================================================
   POKRZ — app.js
   Logique principale : rendu des paniers, sélection de taille S/M/L,
   construction du lien WhatsApp, FAQ, formulaire de contact.
   ========================================================================== */

const WA_NUMBER = "212612605737";
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* -------------------------------------------------------------------------
   WhatsApp URL builder
   ------------------------------------------------------------------------- */
function buildWaUrl(panierNom, taille, zone) {
  const tailleLabel = { S: "Petit (S)", M: "Moyen (M)", L: "Grand (L)" }[taille] || taille;
  const msg =
    "Bonjour, je voudrais commander :\n\n" +
    "🧺 Panier : " + panierNom +
    "\n📏 Taille : " + tailleLabel +
    "\n📍 Zone de livraison : " + (zone || "à préciser") +
    "\n\nMerci de confirmer la disponibilité 🙏";
  return WA_BASE + "?text=" + encodeURIComponent(msg);
}

/* -------------------------------------------------------------------------
   Header / Footer
   ------------------------------------------------------------------------- */
function headerHTML() {
  return `
  <a href="#main-content" class="skip-link">Aller au contenu</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a href="index.html" class="logo">
        <span class="logo-mark">🧺</span>
        <span>POKR<span class="accent">Z</span></span>
      </a>

      <nav class="main-nav" id="main-nav" aria-label="navigation principale">
        <ul>
          <li><a href="index.html">Accueil</a></li>
          <li><a href="paniers.html">Nos Paniers</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <div class="search-wrap" style="position:relative;">
          <div class="search-box">
            <span>🔍</span>
            <input type="search" id="search-input" placeholder="Chercher un panier..." autocomplete="off">
          </div>
          <div id="search-dropdown" class="search-dropdown hidden"></div>
        </div>

        <a href="${WA_BASE}" target="_blank" rel="noopener" class="btn-wa-header">
          Commander
        </a>

        <button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>`;
}

function footerHTML() {
  const zones = [
    "Guéliz", "Hivernage", "Médina", "Targa",
    "Sidi Ghanem", "Palmeraie", "Route de Casablanca"
  ];
  const zonesLinks = zones.map(z => `<li><a href="paniers.html">${z}</a></li>`).join("");

  return `
  <div class="weave-rule thin"></div>
  <footer class="site-footer">
    <div class="wrap footer-top">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">🧺 POKR<span style="color:var(--color-terracotta)">Z</span></div>
          <p class="footer-tagline">Des paniers de fruits et légumes frais, composés et livrés à votre porte à Marrakech.</p>
          <div style="display:flex;flex-direction:column;gap:.6rem;">
            <a href="${WA_BASE}" target="_blank" rel="noopener"
               style="display:inline-flex;align-items:center;gap:.5rem;color:rgba(255,253,249,.85);font-size:.9rem;">
              🟢 +212 612 605 737
            </a>
            <a href="mailto:salatrir@gmail.com" style="color:rgba(255,253,249,.75);font-size:.85rem;">
              salatrir@gmail.com
            </a>
          </div>
        </div>

        <div>
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="paniers.html">Nos Paniers</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>Nos paniers</h4>
          <ul>
            <li><a href="paniers.html?theme=cuisine">Paniers Cuisine</a></li>
            <li><a href="paniers.html?theme=frais">Paniers Frais</a></li>
            <li><a href="paniers.html?theme=fruits">Paniers Fruits</a></li>
            <li><a href="paniers.html?theme=mixte">Paniers Mixtes</a></li>
          </ul>
        </div>

        <div>
          <h4>Zones livrées</h4>
          <ul>${zonesLinks}</ul>
        </div>
      </div>
    </div>
    <div class="weave-rule thin" style="opacity:.25;"></div>
    <div class="wrap footer-bottom">
      <span>© <span id="copy-year"></span> POKRZ.com — Tous droits réservés</span>
      <span>Marrakech, Maroc 🇲🇦</span>
    </div>
  </footer>

  <a href="${WA_BASE}" target="_blank" rel="noopener" class="wa-float" aria-label="WhatsApp">
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.646 4.79 1.776 6.8L2 30l7.4-1.74A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="#fff"/>
      <path d="M23.007 19.743c-.36-.18-2.126-1.05-2.455-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.524-.562-2.903-1.793-1.072-.957-1.796-2.139-2.007-2.499-.21-.36-.022-.554.158-.733.162-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.292-.702-.59-.607-.81-.618l-.69-.012c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.538 3.879 6.15 5.44.86.37 1.53.592 2.052.757.862.274 1.647.235 2.268.143.691-.103 2.126-.869 2.427-1.709.3-.84.3-1.56.21-1.709-.09-.15-.33-.24-.69-.42z" fill="#25d366"/>
    </svg>
  </a>

  <div class="mobile-order-bar show" id="mobile-order-bar">
    <a href="${WA_BASE}" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1;">
      🟢 Commander
    </a>
    <a href="paniers.html" class="btn btn-dark" style="flex:1;">Nos Paniers</a>
  </div>`;
}

/* -------------------------------------------------------------------------
   Panier card renderer
   ------------------------------------------------------------------------- */
function panierCardHTML(p) {
  const tailleDefault = "M";
  const prix = p.tailles[tailleDefault].prix;
  return `
  <div class="panier-card" data-theme="${p.theme}">
    <a href="panier.html?id=${p.id}">
      <div class="panier-media">
        <img src="${p.image}" alt="${p.nom}" loading="lazy">
        <div class="panier-weave-edge"></div>
        ${p.populaire ? `<div class="panier-badge">Populaire</div>` : ""}
      </div>
    </a>
    <div class="panier-body">
      <a href="panier.html?id=${p.id}"><h3>${p.nom}</h3></a>
      <p class="panier-desc">${p.description}</p>
      <p class="panier-compo"><strong>Contient :</strong> ${p.composition.slice(0, 3).join(", ")}${p.composition.length > 3 ? "…" : ""}</p>
      <div class="panier-foot">
        <span class="panier-price">À partir de ${Math.min(...Object.values(p.tailles).map(t => t.prix))} MAD</span>
        <a href="${buildWaUrl(p.nom, tailleDefault, "")}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
          🟢 Commander
        </a>
      </div>
    </div>
  </div>`;
}

function renderPaniers(containerId, { theme, limit, populaire } = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  let list = PKZ_PANIERS;
  if (theme)     list = list.filter(p => p.theme === theme);
  if (populaire) list = list.filter(p => p.populaire);
  if (limit)     list = list.slice(0, limit);
  el.innerHTML = list.map(panierCardHTML).join("");
}

/* -------------------------------------------------------------------------
   Panier detail page
   ------------------------------------------------------------------------- */
function initPanierPage() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const panier = PKZ_PANIERS.find(p => p.id === id);
  if (!panier) { location.href = "paniers.html"; return; }

  const root = document.getElementById("panier-root");
  if (!root) return;

  let selectedTaille = "M";
  let selectedZone = "";

  function rebuildWaLink() {
    const btn = document.getElementById("wa-order-btn");
    if (btn) btn.href = buildWaUrl(panier.nom, selectedTaille, selectedZone);
  }

  function render() {
    const t = panier.tailles;
    const zones = ["Guéliz","Hivernage","Médina","Targa","Sidi Ghanem","Palmeraie","Route de Casablanca","Autre quartier"];

    root.innerHTML = `
    <div class="panier-detail">
      <div class="panier-gallery">
        <img src="${panier.image}" alt="${panier.nom}">
      </div>
      <div class="panier-info">
        <h1>${panier.nom}</h1>
        <div class="panier-price-big">
          ${t[selectedTaille].prix} <small>MAD — ${t[selectedTaille].poids}</small>
        </div>
        <p style="color:var(--color-ink-soft);margin-bottom:var(--space-3);">${panier.description}</p>

        <div class="option-group">
          <label>Choisissez la taille</label>
          <div class="taille-pills" id="taille-pills">
            <button class="taille-pill${selectedTaille === "S" ? " selected" : ""}" data-taille="S">
              S<span class="sub">${t.S.prix} MAD</span>
            </button>
            <button class="taille-pill${selectedTaille === "M" ? " selected" : ""}" data-taille="M">
              M<span class="sub">${t.M.prix} MAD</span>
            </button>
            <button class="taille-pill${selectedTaille === "L" ? " selected" : ""}" data-taille="L">
              L<span class="sub">${t.L.prix} MAD</span>
            </button>
          </div>
          <p style="font-size:.85rem;color:var(--color-ink-soft);">
            ${t[selectedTaille].poids} · idéal pour ${t[selectedTaille].portions}
          </p>
        </div>

        <div class="option-group">
          <label>Composition du panier</label>
          <ul class="compo-list">
            ${panier.composition.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>

        <div class="option-group">
          <label>Zone de livraison</label>
          <select id="zone-select" style="width:100%;padding:.65rem .9rem;border:1.5px solid var(--color-line);border-radius:6px;font-family:inherit;font-size:.95rem;background:var(--color-white);">
            <option value="">Sélectionnez votre quartier</option>
            ${zones.map(z => `<option value="${z}">${z}</option>`).join("")}
          </select>
        </div>

        <a href="#" id="wa-order-btn" target="_blank" rel="noopener"
           class="btn btn-primary btn-block" style="margin-top:var(--space-2);font-size:1.05rem;">
          🟢 Commander ce panier sur WhatsApp
        </a>

        <div class="info-list mt-3">
          <div class="row"><strong>Fraîcheur</strong><span>Achat quotidien au souk, livraison le jour même</span></div>
          <div class="row"><strong>Origine</strong><span>Souk local de Marrakech</span></div>
          <div class="row"><strong>Livraison</strong><span>Le jour même dans la plupart des quartiers</span></div>
          <div class="row"><strong>Paiement</strong><span>À la livraison (Dirham marocain)</span></div>
        </div>
      </div>
    </div>`;

    root.querySelectorAll(".taille-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedTaille = btn.dataset.taille;
        render();
        rebuildWaLink();
      });
    });

    root.querySelector("#zone-select")?.addEventListener("change", e => {
      selectedZone = e.target.value;
      rebuildWaLink();
    });

    rebuildWaLink();

    const related = PKZ_PANIERS.filter(p => p.theme === panier.theme && p.id !== panier.id).slice(0, 3);
    const relEl = document.getElementById("related-grid");
    if (relEl) relEl.innerHTML = related.map(panierCardHTML).join("");
  }

  render();
  document.title = `${panier.nom} — POKRZ Marrakech`;
}

/* -------------------------------------------------------------------------
   Paniers listing page
   ------------------------------------------------------------------------- */
function initPaniersPage() {
  const params = new URLSearchParams(location.search);
  const activeTheme = params.get("theme") || "all";
  const themes = [
    { id: "all", label: "Tous" },
    { id: "cuisine", label: "Cuisine" },
    { id: "frais", label: "Frais & Salades" },
    { id: "fruits", label: "Fruits" },
    { id: "mixte", label: "Mixte" }
  ];

  const filterBar = document.getElementById("filter-bar");
  const grid = document.getElementById("paniers-grid");
  if (!filterBar || !grid) return;

  function renderFilter() {
    filterBar.innerHTML = themes.map(t => `
      <button class="filter-chip${t.id === activeTheme ? " active" : ""}" data-theme="${t.id}">
        ${t.label}
      </button>`).join("");

    filterBar.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        const url = new URL(location.href);
        theme === "all" ? url.searchParams.delete("theme") : url.searchParams.set("theme", theme);
        history.pushState({}, "", url);
        initPaniersPage();
      });
    });
  }

  renderFilter();
  renderPaniers("paniers-grid", { theme: activeTheme === "all" ? undefined : activeTheme });
}

/* -------------------------------------------------------------------------
   FAQ accordion
   ------------------------------------------------------------------------- */
const FAQ_DATA = [
  {
    q: "Quelles zones de livraison couvrez-vous ?",
    a: "Nous livrons actuellement à Guéliz, Hivernage, Médina, Targa, Sidi Ghanem, Route de Casablanca et Palmeraie. Si vous êtes hors de ces zones, contactez-nous, nous verrons ce qu'on peut faire."
  },
  {
    q: "Quel est le délai de livraison d'un panier ?",
    a: "En général 1 à 3 heures selon la zone et les horaires de pointe. Nous essayons toujours de livrer le jour même pour les commandes passées avant 17h."
  },
  {
    q: "La composition du panier peut-elle changer ?",
    a: "Chaque panier a une composition fixe basée sur sa thématique (Tajine, Salade, Couscous...). Si un ingrédient précis n'est pas disponible au marché ce jour-là, nous le remplaçons par un équivalent de qualité similaire et vous en informons."
  },
  {
    q: "Comment choisir la bonne taille (S/M/L) ?",
    a: "Le S convient à 2-3 personnes, le M à 4-5 personnes, et le L à 6-8 personnes ou plus. Chaque fiche panier indique le poids approximatif et le nombre de portions pour vous aider à choisir."
  },
  {
    q: "Comment passer une commande ?",
    a: "Parcourez nos paniers, choisissez la taille qui vous convient, cliquez sur 'Commander sur WhatsApp'. Un message pré-rempli s'ouvre — envoyez-le et nous nous occupons du reste."
  },
  {
    q: "Le paiement est-il en ligne ?",
    a: "Non. Paiement à la livraison uniquement, en dirhams marocains. Pas d'application de paiement, pas de carte bancaire requise."
  },
  {
    q: "Puis-je commander plusieurs paniers en même temps ?",
    a: "Bien sûr. Ajoutez simplement tous les paniers souhaités dans votre message WhatsApp, ou envoyez plusieurs messages — notre équipe regroupera votre commande."
  },
  {
    q: "Quelles sont vos heures d'ouverture ?",
    a: "Nous recevons les commandes de 7h à 21h, 7 jours sur 7."
  }
];

function initFAQ() {
  const container = document.getElementById("faq-list");
  if (!container) return;

  container.innerHTML = FAQ_DATA.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
        <span>${f.q}</span>
        <span class="plus">+</span>
      </button>
      <div class="faq-a" id="faq-a-${i}" role="region">
        <div>${f.a}</div>
      </div>
    </div>`).join("");

  container.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const panel = item.querySelector(".faq-a");
      const open = item.classList.contains("open");
      container.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq-a").style.maxHeight = null;
        i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* -------------------------------------------------------------------------
   Search
   ------------------------------------------------------------------------- */
function initSearch() {
  const input = document.getElementById("search-input");
  const dropdown = document.getElementById("search-dropdown");
  if (!input) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { dropdown?.classList.add("hidden"); return; }

    const results = PKZ_PANIERS.filter(p =>
      p.nom.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.composition.some(c => c.toLowerCase().includes(q))
    ).slice(0, 6);

    dropdown.classList.remove("hidden");
    if (!results.length) {
      dropdown.innerHTML = `<div class="search-empty">Aucun panier trouvé</div>`;
      return;
    }
    dropdown.innerHTML = results.map(p => `
      <div class="search-result-item">
        <a href="panier.html?id=${p.id}">
          <img src="${p.image}" alt="${p.nom}" loading="lazy">
          <div>
            <strong>${p.nom}</strong>
            <span>À partir de ${Math.min(...Object.values(p.tailles).map(t => t.prix))} MAD</span>
          </div>
        </a>
      </div>`).join("");
  });

  document.addEventListener("click", e => {
    if (!input.contains(e.target) && !dropdown?.contains(e.target)) {
      dropdown?.classList.add("hidden");
    }
  });
}

/* -------------------------------------------------------------------------
   Contact form
   ------------------------------------------------------------------------- */
function initContactPage() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name    = form.querySelector("#f-name")?.value || "";
    const message = form.querySelector("#f-msg")?.value  || "";
    const area    = form.querySelector("#f-area")?.value || "";
    const msg = `Bonjour, message de : ${name}\n\nQuartier : ${area}\n\n${message}`;
    window.open(WA_BASE + "?text=" + encodeURIComponent(msg), "_blank");
  });
}

/* -------------------------------------------------------------------------
   Nav toggle + active link + copyright year
   ------------------------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const nav    = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "✕" : "☰";
  });
}

function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === page);
  });
}

function setCopyYear() {
  const el = document.getElementById("copy-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* -------------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const hEl = document.getElementById("site-header-placeholder");
  const fEl = document.getElementById("site-footer-placeholder");
  if (hEl) hEl.outerHTML = headerHTML();
  if (fEl) fEl.outerHTML = footerHTML();

  initNavToggle();
  setActiveNav();
  setCopyYear();
  initSearch();

  const page = location.pathname.split("/").pop() || "index.html";

  if (page === "index.html" || page === "") {
    renderPaniers("paniers-preview", { populaire: true, limit: 4 });
  }
  if (page === "paniers.html") initPaniersPage();
  if (page === "panier.html")  initPanierPage();
  if (page === "faq.html")     initFAQ();
  if (page === "contact.html") initContactPage();
});

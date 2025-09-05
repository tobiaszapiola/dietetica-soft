// ====== Config básico ======
const BRAND = "IGNAFF TE DEGOLLO";
document.getElementById("year").textContent = new Date().getFullYear();

// ====== Hero slider ======
const HERO_IMAGES = [
  "https://lasfor.com.ar/wp-content/uploads/2021/03/dietetica-foto.jpg",
  "https://media.sitioandino.com.ar/p/601d5ed24f849901f15ba421b376eb6b/adjuntos/335/imagenes/000/210/0000210918/1200x630/smart/dieteticas-herboristeria-alimentos-sanos-semillas-frutos-secos-dietetica.jpg",
  "https://saboresandinos.com/wp-content/uploads/2021/11/3c6d1f1e4f10c3a1148bf9f638ab4ca2-1.jpg"
];
let heroIndex = 0;
const heroImg = document.getElementById("heroImg");
heroImg.src = HERO_IMAGES[heroIndex];
document.getElementById("heroPrev").onclick = () => {
  heroIndex = (heroIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;
  heroImg.src = HERO_IMAGES[heroIndex];
};
document.getElementById("heroNext").onclick = () => {
  heroIndex = (heroIndex + 1) % HERO_IMAGES.length;
  heroImg.src = HERO_IMAGES[heroIndex];
};
setInterval(() => {
  heroIndex = (heroIndex + 1) % HERO_IMAGES.length;
  heroImg.src = HERO_IMAGES[heroIndex];
}, 5000);

// ====== Catálogo (EDITABLE) ======
// Reemplazá [NOMBRE_PRODUCTO], [PRECIO], [IMG_URL] y ajustá categoría
const PRODUCTS = [
  // --- Frutos Secos ---
  {id:"fs-01", categoria:"Frutos Secos", nombre:"banana del igna", precio:"gratis", imagen:"https://thumbs.dreamstime.com/b/small-tropical-banana-small-tropical-banana-hand-isolated-white-117694027.jpg", descripcion:"Alto en nutrientes.", stock:100},
  {id:"fs-02", categoria:"Frutos Secos", nombre:"Almendra Non Pareil 1kg", precio: "2000", imagen:"https://http2.mlstatic.com/D_NQ_NP_682940-MLC45298673842_032021-F.jpg", descripcion:"Selección premium.", stock:40},
  {id:"fs-03", categoria:"Frutos Secos", nombre:"Nuez Mariposa 500g", precio:"2450", imagen:"https://d22fxaf9t8d39k.cloudfront.net/aaa9fd273221706c50916693ef3d7462fe1a67e1bb194da78257efe089ff1f68136777.jpg", descripcion:"Crocante y fresca.", stock:60},

  // --- Semillas ---
  {id:"se-01", categoria:"Semillas", nombre:"Chía 500g", precio:"1.000", imagen:"https://th.bing.com/th/id/R.121798d750a2b59507db57f85271ff90?rik=Uqte3Vwp99aOSA&riu=http%3a%2f%2fhealthbenefitsofeating.com%2fwp-content%2fuploads%2f2014%2f04%2fChia-Seeds-Benefits.jpg&ehk=%2f3fB8L2neKbrJxx7On8%2bpbXLMfO6PMWDP3uKsScAGYQ%3d&risl=&pid=ImgRaw&r=0", descripcion:"Rica en omega 3.", stock:80},
  {id:"se-02", categoria:"Semillas", nombre:"Lino Molido 500g", precio:"1200", imagen:"https://www.gemadistribuidora.com.ar/wp-content/uploads/2022/11/harina-linaza-2.jpg", descripcion:"Fibra natural.", stock:50},

  // --- Sin TACC ---
  {id:"st-01", categoria:"Sin TACC", nombre:"Harina de Almendras 500g", precio:"400", imagen:"https://gastrocosmos.com.mx/wp-content/uploads/2024/09/Harina-de-almendra-1.png", descripcion:"Apta celíacos.", stock:35},

  // --- Yerbas e Infusiones ---
  {id:"yi-01", categoria:"Yerbas e Infusiones", nombre:"Yerba Mate Orgánica 1kg", precio:"3500", imagen:"https://www.yerbamarket.com/pol_pl_Yerba-Mate-Amanda-Organica-500g-8041_1.jpg", descripcion:"Suave sabor.", stock:70},

  // --- Endulzantes ---
  {id:"en-01", categoria:"Endulzantes", nombre:"Stevia Líquida 100ml", precio:"600", imagen:"https://th.bing.com/th/id/R.dca49b35888014089f73567b63eed6a1?rik=qz2uPWMCUT0Yog&riu=http%3a%2f%2fimages.lider.cl%2fwmtcl%3fsource%3durl%5bfile%3a%2fproductos%2f896658a.jpg%5d%26sink&ehk=K%2f5SNSyJpz78EmfkvBqq9r8fzmOksbS%2bQYiaWORPyxs%3d&risl=&pid=ImgRaw&r=0", descripcion:"Sin azúcar.", stock:90},

  // --- Suplementos ---
  {id:"su-01", categoria:"Suplementos", nombre:"Magnesio Quelato 120 caps", precio:"800", imagen:"https://tse3.mm.bing.net/th/id/OIP.PBcdeKV354U4j2Aogne7nAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", descripcion:"Apoya energía.", stock:25},
];


// ====== Derivar secciones a partir del catálogo ======
const CATEGORIES = [...new Set(PRODUCTS.map(p => p.categoria))];

// ====== UI Dinámica ======
const nav = document.getElementById("mainNav");
nav.innerHTML = CATEGORIES.map(c => `<a href="#sec-${slug(c)}">${c}</a>`).join("");
const categoriesEl = document.getElementById("categories");
categoriesEl.innerHTML = CATEGORIES.map(renderCatTile).join("");

const main = document.getElementById("catalogo");
main.innerHTML = CATEGORIES.map(cat => renderSection(cat)).join("");

function renderSection(cat){
  const items = PRODUCTS.filter(p => p.categoria === cat);
  const cards = items.map(renderCard).join("");
  return `
    <section class="section" id="sec-${slug(cat)}">
      <div class="section__title">
        <h2>${cat}</h2>
        <a href="#top" class="btn btn--ghost">↑ Arriba</a>
      </div>
     <div class="grid">${cards}</div>
    </section>
  `;
}
function renderCard(p){
  return `
    <article class="card">
      <img class="card__img" src="${p.imagen}" alt="${sanitize(p.nombre)}" loading="lazy">
      <div class="card__body">
        <div class="card__title">${escapeBrackets(p.nombre)}</div>
        <div class="card__price">$ ${escapeBrackets(p.precio)}</div>
        <div class="card__cta">
          <div class="qty">
            <button aria-label="menos" onclick="decQty('${p.id}')">−</button>
            <span id="qty-${p.id}">1</span>
            <button aria-label="más" onclick="incQty('${p.id}')">+</button>
          </div>
          <button class="btn btn--primary" onclick="addToCart('${p.id}')">Agregar</button>
        </div>
      </div>
    </article>
  `;
}
function slug(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-")}
function sanitize(s){return String(s).replace(/[<>&"]/g, x=>({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;' }[x]))}
function escapeBrackets(s){return String(s).replace(/\[/g,'[').replace(/\]/g,']')}
function renderCatTile(cat){
  const img = PRODUCTS.find(p => p.categoria === cat)?.imagen || "";
  return `
    <a href="#sec-${slug(cat)}" class="cat-tile">
      <img src="${img}" alt="${sanitize(cat)}">
      <span>${cat}</span>
    </a>
  `;
}


function parsePrice(val){
  return Number(String(val).replace(/[^0-9,.-]/g,'').replace(',', '.')) || 0;
}

// ====== Buscador ======
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  if(!q){main.innerHTML = CATEGORIES.map(renderSection).join(""); return;}
  const found = PRODUCTS.filter(p => (p.nombre + " " + p.categoria).toLowerCase().includes(q));
  main.innerHTML = `
  <section class="section">
      <div class="section__title"><h2>Resultados</h2><a href="#top" class="btn btn--ghost">Limpiar</a></div>
      <div class="grid">${found.map(renderCard).join("") || "<p>No hay resultados.</p>"}</div>
    </section>
  `;
});

// ====== Carrito ======
const cart = new Map(); // id -> {producto, qty}
const drawer = document.getElementById("cartDrawer");
document.getElementById("openCart").onclick = ()=> drawer.setAttribute("aria-hidden","false");
document.getElementById("closeCart").onclick = ()=> drawer.setAttribute("aria-hidden","true");
document.querySelector("#cartDrawer .drawer__overlay").onclick = ()=> drawer.setAttribute("aria-hidden","true");

function incQty(id){ const el = document.getElementById(`qty-${id}`); el.textContent = (+el.textContent)+1; }
function decQty(id){ const el = document.getElementById(`qty-${id}`); el.textContent = Math.max(1,(+el.textContent)-1); }

function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  const q = +document.getElementById(`qty-${id}`).textContent;
  const cur = cart.get(id);
  cart.set(id, { p, qty: (cur?.qty || 0) + q });
  renderCart();
  drawer.setAttribute("aria-hidden","false");
}

function renderCart() {
  const holder = document.getElementById("cartItems");
  const count = [...cart.values()].reduce((n, i) => n + i.qty, 0);
  document.getElementById("cartCount").textContent = count;

  if (cart.size === 0) {
    holder.innerHTML = "<p>Tu carrito está vacío.</p>";
    updateTotals();
    return;
  }

  holder.innerHTML = [...cart.values()]
    .map(({ p, qty }) => `
      <div class="card">
        <div class="card__body">
          <div class="card__title">${escapeBrackets(p.nombre)}</div>
          <div class="cart__line">
            <span>${qty} x $${escapeBrackets(p.precio)}</span>
            <span>$${(parsePrice(p.precio) * qty).toFixed(2)}</span>
          </div>
          <button class="btn btn--ghost" onclick="removeFromCart('${p.id}')">Eliminar</button>
        </div>
      </div>
    `)
    .join("");

  updateTotals();
}

function updateTotals(){
  const subtotal = [...cart.values()].reduce((sum, {p, qty}) => sum + (parsePrice(p.precio) * qty), 0);
  document.getElementById("cartSubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `$${subtotal.toFixed(2)}`;
}

function removeFromCart(id){
  cart.delete(id);
  renderCart();
}

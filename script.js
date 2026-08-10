 const SUPABASE_URL = "https://luyampkgrtjojwtgsoqq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_0BkAs0yDQP3qBT71yCjeKA_LsHpIw6T";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

 const STORE_KEYS = {
  cart: "ali-wood-cart",
  products: "ali-wood-products"
};

const DEFAULT_MAX_PRICE = 1;

const categories = [
  { name: "الكل", icon: "&#10022;" },
  { name: "غرف النوم", icon: "&#8767;" },
  { name: "الديكورات", icon: "&#9671;" },
  { name: "غرف الخشب", icon: "&#8962;" },
  { name: "ابواب الخشب", icon: "&#9675;" },
  { name: "دواليب الخشب", icon: "&#10023;" },
  { name: "شاشات الخشب", icon: "&#9632;" },
  { name: "الاعمال المعمارية", icon: "&#9636;" },
  { name: "اسرة النوم", icon: "&#9670;" },
  

];

const starterProducts = [
  {
    id: 1,
    name: "غرفة نوم مودرن",
    category: "اسرة النوم",
    price: 1,
    rating: 4.9,
    tag: "الأكثر طلبا",
    image: "https://imgur.com/boST3BF.jpg",
    description: "تصميم هادئ بخشب متين وتشطيب ناعم، مناسب للمساحات الحديثة مع إمكانية تعديل المقاسات."
  },
  {
    id: 2,
    name: "غرفة نوم كلاسيك",
    category: "اسرة النوم",
    price: 1,
    rating: 4.8,
    tag: "تفصيل",
    image: "https://imgur.com/i7bUFZK.jpg",
    description: "غرفة نوم بتفاصيل كلاسيكية وإحساس فاخر، تشمل سرير ودولاب وتسريحة حسب الطلب."
  },
  {
    id: 3,
    name: "فاصل ديكور خشبي",
    category: "الديكورات",
    price: 1,
    rating: 4.7,
    tag: "جديد",
    image: "https://files.catbox.moe/r1ucph.jpg",
    description: "فاصل أنيق لتقسيم المساحات دون إغلاقها، مناسب للمداخل والصالات والمكاتب."
  },
  {
    id: 4,
    name: "دولاب سحاب مودرن",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.6,
    tag: "مخصص",
    image: "https://files.catbox.moe/1uup2w.jpg",
    description: "دولاب منزق سحاب ذو اداء عالي وكفاءة عالية."
  },
  {
    id: 5,
    name: "بارتشن درج",
    category: "الديكورات",
    price: 1,
    rating: 4.5,
    tag: "يدوي",
    image: "https://files.catbox.moe/hza4n5.jpg",
    description: "بارتشن درج ديكور شائع في الوقت الحالي ذو منظر مريح وبسعر ممتاز حسب الطلب."
  },
  {
    id: 6,
    name: "سريرا نوم كلاسيك",
    category: "اسرة النوم",
    price: 1,
    rating: 4.4,
    tag: "عملي",
    image: "https://files.catbox.moe/df3n1y.jpg",
    description: "اسرة نوم ذات منظر هادئ ومريح وبأسععار منخفظة."
  },
  {
    id: 7,
    name: "باب خشب داخلي",
    category: "ابواب الخشب",
    price: 1,
    rating: 4.8,
    tag: "حسب المقاس",
    image: "https://files.catbox.moe/port3h.jpg",
    description: "باب داخلي بخامات قوية وتشطيب مقاوم للاستخدام اليومي، مع خيارات متعددة للألوان."
  },
  {
    id: 8,
    name: "باب مدخل فاخر",
    category: "ابواب الخشب",
    price: 1,
    rating: 4.9,
    tag: "فاخر",
    image: "https://files.catbox.moe/iuhhbg.jpg",
    description: "باب مدخل بتصميم قوي وحضور واضح، مناسب للفلل والمداخل الرئيسية."
  },
  {
    id: 9,
    name: "دولاب ملابس منزلق",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.8,
    tag: "مساحات ذكية",
    image: "https://files.catbox.moe/phbar5.jpg",
    description: "دولاب أبواب سحب يستغل المساحة بكفاءة، مع تقسيم داخلي للملابس والاكسسوارات."
  },
  {
    id: 10,
    name: "دولاب تخزين متعدد",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.6,
    tag: "منظم",
    image: "https://files.catbox.moe/co9r6x.jpg",
    description: "حل تخزين عملي للغرف والممرات، بتصميم نظيف ورفوف داخلية قابلة للتعديل."
  },
  {
    id: 11,
    name: "وحدة شاشة معلقة",
    category: "شاشات الخشب",
    price: 1,
    rating: 4.7,
    tag: "مخفي الأسلاك",
    image: "https://files.catbox.moe/0zwcsh.jpg",
    description: "وحدة تلفزيون عصرية بمساحة تخزين وإدارة مخفية للأسلاك، مناسبة للصالة وغرفة المعيشة."
  },
  {
    id: 12,
    name: "ديكور شاشة شيبورد",
    category: "الديكورات",
    price: 1,
    rating: 4.5,
    tag: "جاهز للتفصيل",
    image: "https://files.catbox.moe/ug5wk2.jpg",
    description: "كاونتر خشبي منخفض للتلفزيون والديكور، يجمع بين العملية والمظهر المرتب."
  },
  {
    id: 13,
    name: "ركن قهوة مودرن",
    category: "الديكورات",
    price: 1,
    rating: 4.6,
    tag: "خفيف",
    image: "https://files.catbox.moe/q1rl8m.jpg",
    description: "رفوف حائطية للكتب والتحف والنباتات، بتوزيع متوازن لا يزحم الجدار."
  },
  {
    id: 14,
    name: "منارة مسجد",
    category: "الاعمال المعمارية",
    price: 1,
    rating: 4.4,
    tag: "للمساحات الصغيرة",
    image: "https://files.catbox.moe/dlgk8b.jpg",
    description: "منارة للمساجد التي تبنى بسعر جيد وقوة عالية."
  },
  {
    id: 15,
    name: "سرير خشب مع تخزين",
    category: "غرف النوم",
    price: 1,
    rating: 4.8,
    tag: "عملي",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    description: "سرير قوي بتخزين سفلي يساعد على ترتيب المفارش والأغراض الموسمية."
  },
  {
    id: 16,
    name: "اقواس مسجد",
    category: "الاعمال المعمارية",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/klrhgk.jpg",
    description: "عمل معماري مطلوب خاصة لعماير المساجد التي تبنى."
  },
  {
    id: 17,
    name: "دولاب تسريحة الدب",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/6e19a1.jpg",
    description: "دولاب ذو ديكور ظريف وجميل للاطفال."
  },
  {
    id: 18,
    name: "دولاب شجرة الكريسماس",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/inmwcv.jpg",
    description: "دولاب خشبي ذو ديكور شجرة الكريسماس جميل للاطفال وبسعر مناسب."
  },
  {
    id: 19,
    name: "شاشة ارضية خشبية",
    category: "شاشات الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/uvrkd7.jpg",
    description: "شاشة ديكور لشاشات التلفزيون ذو منظر عصري ."
  },
  {
    id: 20,
    name: "دولاب كلاسيك ثلاث درف حجم كبير",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/euqf3o.jpg",
    description: "دولاب خشبي كلاسيك قوام جميل وكفاءة عالية."
  },
  {
    id: 21,
    name: "غرفة نوم مودرن مع ملحقات",
    category: "غرف النوم",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/d0qk5b.jpg",
    description: "غرفة نوم مودرن مع ملحقات ارفف وتسريحةودولاب بسعر منخفض عن السوق"
  },
  {
    id: 22,
    name: "دولاب عصري درف نحيلة",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/7n1d7h.jpg",
    description: "دولاب خشبي ذو منظر عصري وتقفيلات رائعة."
  },
  {
    id: 23,
    name: "ديكور شيبوردردرج وجدران",
    category: "الديكورات",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/rjtczu.jpg",
    description: "ديكور ارضي شيبةرد للدرج وجدران الدرج منظر مريح وكفاءة عالية سهل التنظيف."
  },
  {
    id: 24,
    name: "شاشة ارضية مع قاطع ديكوري",
    category: "شاشات الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/hkgenz.jpg",
    description: "شاشة ارضيه قواطع خشبية وأرفف ديكور جميل لشاشات التلفزيون ذات كفاءة عالية."
  },
  {
    id: 25,
    name: "قاطع خشبي ديكوري",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/eet8wd.jpg",
    description: "قاطع خشبي مع ارفف للتزيين وتجميل المنظر."
  },
  {
    id: 26,
    name: "غرفة خشبية بالكامل",
    category: "غرف الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/zztjtr.jpg",
    description: "غرفة خشبية كلاسيك مصنوعة من الخشب الكامل وبسعر ممتاز."
  },
  {
    id: 27,
    name: "ديكور رف",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/txa7nd.jpg",
    description: "ديكور ذو تصميم يناسب المساحات الجيدة."
  },
  {
    id: 28,
    name: "ديكور شيبورد جدار",
    category: "الديكورات",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "https://files.catbox.moe/edasir.jpg",
    description: "ديكور مريح للمنظر بالشيبةرد الاصلي وبعمل متقن سهل التنظيف."
  },
  {
    id: 29,
    name: "دولاب شجرة الكريسماس",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "",
    description: "دولاب خشبي ذوديكورشجرة الكريسماس جميل للاطفال وبسعر مناسب."
  },
  {
    id: 30,
    name: "دولاب شجرة الكريسماس",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "",
    description: "دولاب خشبي ذوديكورشجرة الكريسماس جميل للاطفال وبسعر مناسب."
  },
  {
    id: 31,
    name: "دولاب شجرة الكريسماس",
    category: "دواليب الخشب",
    price: 1,
    rating: 4.7,
    tag: "آمن",
    image: "",
    description: "دولاب خشبي ذوديكورشجرة الكريسماس جميل للاطفال وبسعر مناسب."
  },
];

const selectors = {
  departmentList: "#departmentList",
  categoryChips: "#categoryChips",
  productGrid: "#productGrid",
  emptyState: "#emptyState",
  resultsTitle: "#resultsTitle",
  searchInput: "#searchInput",
  priceRange: "#priceRange",
  priceValue: "#priceValue",
  sortSelect: "#sortSelect",
  cartDrawer: "#cartDrawer",
  overlay: "#overlay",
  cartItems: "#cartItems",
  cartCount: "#cartCount",
  cartTitle: "#cartTitle",
  wishCount: "#wishCount",
  subtotal: "#subtotal",
  delivery: "#delivery",
  total: "#total",
  productModal: "#productModal",
  modalContent: "#modalContent",
  checkoutModal: "#checkoutModal",
  toast: "#toast",
  adminPanel: "#adminPanel",
  newCategory: "#newCategory"
};

const elements = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [key, document.querySelector(selector)])
);

const state = {
  products: loadProducts(),
  cart: readStorage(STORE_KEYS.cart, []),
  activeCategory: "الكل",
  search: "",
  maxPrice: 0,
  sort: "featured"
};

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function loadProducts() {
  const customProducts = readStorage(STORE_KEYS.products, []);
  return [...starterProducts, ...customProducts];
}

function saveProducts() {
  const customProducts = state.products.filter((product) => product.id > 1000);
  localStorage.setItem(STORE_KEYS.products, JSON.stringify(customProducts));
}

function saveCart() {
  localStorage.setItem(STORE_KEYS.cart, JSON.stringify(state.cart));
}

function money(value) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0
  }).format(value);
}

function clean(value = "") {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function maxCatalogPrice() {
  const highestProductPrice = Math.max(...state.products.map((product) => product.price), DEFAULT_MAX_PRICE);
  return Math.ceil(highestProductPrice / 500) * 500;
}

function syncPriceRange() {
  const max = maxCatalogPrice();
  elements.priceRange.max = String(max);
  if (!state.maxPrice || state.maxPrice > max) {
    state.maxPrice = max;
  }
  elements.priceRange.value = String(state.maxPrice);
  elements.priceValue.textContent = money(state.maxPrice);
}

function countCategory(category) {
  if (category === "الكل") return state.products.length;
  return state.products.filter((product) => product.category === category).length;
}

function renderDepartments() {
  elements.departmentList.innerHTML = categories.map((category) => `
    <button class="department-button ${state.activeCategory === category.name ? "active" : ""}"
      type="button" data-category="${clean(category.name)}">
      <span>${category.icon}</span>
      <strong>${clean(category.name)}</strong>
      <small>${countCategory(category.name)}</small>
    </button>
  `).join("");

  elements.categoryChips.innerHTML = categories.map((category) => `
    <button class="chip ${state.activeCategory === category.name ? "active" : ""}"
      type="button" data-category="${clean(category.name)}">
      ${category.icon} ${clean(category.name)}
    </button>
  `).join("");

  elements.newCategory.innerHTML = categories
    .filter((category) => category.name !== "الكل")
    .map((category) => `<option value="${clean(category.name)}">${clean(category.name)}</option>`)
    .join("");
}

function filteredProducts() {
  const query = state.search.trim().toLocaleLowerCase("ar");
  const products = state.products.filter((product) => {
    const text = `${product.name} ${product.category} ${product.description} ${product.tag ?? ""}`
      .toLocaleLowerCase("ar");
    const matchesCategory = state.activeCategory === "الكل" || product.category === state.activeCategory;
    return matchesCategory && product.price <= state.maxPrice && text.includes(query);
  });

  return products.sort((a, b) => {
    if (state.sort === "priceLow") return a.price - b.price;
    if (state.sort === "priceHigh") return b.price - a.price;
    if (state.sort === "rating") return b.rating - a.rating;
    return b.rating * 100 - b.price / 250 - (a.rating * 100 - a.price / 250);
  });
}

function renderProducts() {
  const products = filteredProducts();
  const title = state.activeCategory === "الكل"
  ? "كل المنتجات"
  : state.activeCategory;  
  elements.resultsTitle.textContent = `${title} (${products.length})`;
  elements.emptyState.hidden = products.length !== 0;

  elements.productGrid.innerHTML = products.map((product) => {
    return `
      <article class="product-card">
        <div class="product-media">
          <img src="${clean(product.image)}" alt="${clean(product.name)}" loading="lazy" />
          <span class="badge">${clean(product.tag || "متوفر")}</span>
        </div>
        <div class="product-info">
          <div class="product-topline">
            <span>${clean(product.category)}</span>
            <span>&#9733; ${Number(product.rating).toFixed(1)}</span>
          </div>
          <h3>${clean(product.name)}</h3>
          <p>${clean(product.description)}</p>
          <div class="price-row">
            <strong>${money(product.price)}</strong>
            <small>متوفر للتنفيذ</small>
          </div>
          <div class="card-actions">
            <button class="quick-button" type="button" data-view="${product.id}"
              aria-label="عرض تفاصيل ${clean(product.name)}">&#8599;</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function cartQuantity() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => {
    const product = state.products.find((entry) => entry.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

function renderCart() {
  const quantity = cartQuantity();
  const subtotal = cartSubtotal();
  const delivery = subtotal > 0 && subtotal < 2500 ? 75 : 0;
  const total = subtotal + delivery;

  elements.cartTitle.textContent = `${quantity} ${quantity === 1 ? "منتج" : "منتجات"}`;
  elements.subtotal.textContent = money(subtotal);
  elements.delivery.textContent = delivery === 0 ? "مجانا" : money(delivery);
  elements.total.textContent = money(total);

  if (!state.cart.length) {
    elements.cartItems.innerHTML = `
      <div class="empty-state">
        <strong>السلة فارغة</strong>
        <span>اختر منتجا من الكتالوج لإضافته هنا.</span>
      </div>
    `;
    return;
  }

  elements.cartItems.innerHTML = state.cart.map((item) => {
    const product = state.products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `
      <article class="cart-item">
        <img src="${clean(product.image)}" alt="${clean(product.name)}" />
        <div>
          <h3>${clean(product.name)}</h3>
          <strong>${money(product.price)}</strong>
          <div class="quantity" aria-label="كمية ${clean(product.name)}">
            <button type="button" data-decrease="${product.id}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-increase="${product.id}">+</button>
          </div>
        </div>
        <button class="remove-button" type="button" data-remove="${product.id}">حذف</button>
      </article>
    `;
  }).join("");
}

function addToCart(id) {
  const item = state.cart.find((entry) => entry.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    state.cart.push({ id, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast("تمت الإضافة إلى السلة");
}

function changeQuantity(id, amount) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== id);
  }
  saveCart();
  renderCart();
}

function setCategory(category) {
  state.activeCategory = category;
  renderDepartments();
  renderProducts();
}

function openCart() {
  elements.cartDrawer.classList.add("open");
  elements.cartDrawer.setAttribute("aria-hidden", "false");
  elements.overlay.hidden = false;
}

function closeCart() {
  elements.cartDrawer.classList.remove("open");
  elements.cartDrawer.setAttribute("aria-hidden", "true");
  if (!elements.adminPanel.classList.contains("open")) {
    elements.overlay.hidden = true;
  }
}

function openProductModal(id) {
  const product = state.products.find((entry) => entry.id === id);
  if (!product) return;

  elements.modalContent.innerHTML = `
    <div class="modal-layout">
      <img src="${clean(product.image)}" alt="${clean(product.name)}" />
      <div class="modal-details">
        <span class="kicker dark">${clean(product.category)}</span>
        <h2>${clean(product.name)}</h2>
        <div class="modal-meta">
          <span>&#9733; ${Number(product.rating).toFixed(1)} تقييم</span>
          <span>${clean(product.tag || "متوفر")}</span>
          <span>تنفيذ حسب الطلب</span>
        </div>
        <p>${clean(product.description)}</p>
        <div class="price-row">
          <strong>${money(product.price)}</strong>
        </div>
        <button class="primary-button full" type="button" data-modal-add="${product.id}">
          أضف للسلة
        </button>
      </div>
    </div>
  `;
  elements.productModal.showModal();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 1800);
}

function resetFilters() {
  state.activeCategory = "الكل";
  state.search = "";
  state.maxPrice = maxCatalogPrice();
  state.sort = "featured";
  elements.searchInput.value = "";
  elements.sortSelect.value = "featured";
  syncPriceRange();
  renderDepartments();
  renderProducts();
}

document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

elements.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

elements.priceRange.addEventListener("input", (event) => {
  state.maxPrice = Number(event.target.value);
  elements.priceValue.textContent = money(state.maxPrice);
  renderProducts();
});

elements.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  const categoryJump = event.target.closest("[data-category-jump]");
  const addButton = event.target.closest("[data-add]");
  const modalAddButton = event.target.closest("[data-modal-add]");
  const wishButton = event.target.closest("[data-wish]");
  const viewButton = event.target.closest("[data-view]");
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");
  const removeButton = event.target.closest("[data-remove]");

  if (categoryButton) setCategory(categoryButton.dataset.category);
  if (categoryJump) setCategory(categoryJump.dataset.categoryJump);
  if (addButton) addToCart(Number(addButton.dataset.add));
  if (modalAddButton) {
    addToCart(Number(modalAddButton.dataset.modalAdd));
    elements.productModal.close();
  }
  if (viewButton) openProductModal(Number(viewButton.dataset.view));
  if (increaseButton) changeQuantity(Number(increaseButton.dataset.increase), 1);
  if (decreaseButton) changeQuantity(Number(decreaseButton.dataset.decrease), -1);
  if (removeButton) {
    state.cart = state.cart.filter((item) => item.id !== Number(removeButton.dataset.remove));
    saveCart();
    renderCart();
  }
});

const openCartButton = document.querySelector("#openCart");
const closeCartButton = document.querySelector("#closeCart");

if (openCartButton) {
  openCartButton.addEventListener("click", openCart);
}

if (closeCartButton) {
  closeCartButton.addEventListener("click", closeCart);
}


elements.overlay.addEventListener("click", () => {
  closeCart();
  elements.adminPanel.classList.remove("open");
  elements.overlay.hidden = true;
});

document.querySelector("#closeModal").addEventListener("click", () => elements.productModal.close());
document.querySelector("#closeCheckout").addEventListener("click", () => elements.checkoutModal.close());

document.querySelector("#checkoutButton").addEventListener("click", () => {
  if (!state.cart.length) {
    showToast("السلة فارغة");
    return;
  }
  elements.checkoutModal.showModal();
});

document.querySelector("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.cart = [];
  saveCart();
  renderCart();
  closeCart();
  elements.checkoutModal.close();
  event.target.reset();
  showToast("تم إرسال الطلب بنجاح");
});

const adminToggle = document.querySelector("#adminToggle");

if (adminToggle) {
  adminToggle.addEventListener("click", () => {
    const isOpen = elements.adminPanel.classList.toggle("open");
    elements.overlay.hidden =
      !isOpen && !elements.cartDrawer.classList.contains("open");
  });
}

document.querySelector("#closeAdmin").addEventListener("click", () => {
  elements.adminPanel.classList.remove("open");
  if (!elements.cartDrawer.classList.contains("open")) elements.overlay.hidden = true;
});

document.querySelector("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const image = document.querySelector("#newImage").value.trim();
  const product = {
    id: Date.now(),
    name: document.querySelector("#newName").value.trim(),
    category: document.querySelector("#newCategory").value,
    price: Number(document.querySelector("#newPrice").value),
    rating: 4.5,
    tag: "مضاف حديثا",
    image: image || "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
    description: document.querySelector("#newDescription").value.trim() || "منتج جديد يمكن تنفيذه بالمقاس والتشطيب المطلوب."
  };

  state.products.push(product);
  state.maxPrice = Math.max(state.maxPrice, product.price);
  saveProducts();
  syncPriceRange();
  renderDepartments();
  renderProducts();
  form.reset();
  showToast("تمت إضافة المنتج");
});

document.querySelector("#shopNow").addEventListener("click", () => {
  setCategory("غرف النوم");
  document.querySelector("#resultsTitle").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#clearFilters").addEventListener("click", resetFilters);

syncPriceRange();
renderDepartments();
renderProducts();
renderCart();

async function testSupabase() {
  console.log("Supabase client:", supabaseClient);

  const { data, error, status } = await supabaseClient
    .from("Products")
    .select("*");

  console.log("Status:", status);
  console.log("Products:", data);
  console.log("Error:", error);
}

testSupabase();
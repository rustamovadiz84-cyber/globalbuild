// Exchange rates (simulated real-time data)
const exchangeRates = {
  USD: { RUB: 92.5, EUR: 0.92, CNY: 7.24, TRY: 32.1 },
  EUR: { RUB: 100.2, USD: 1.09, CNY: 7.85, TRY: 34.8 },
  CNY: { RUB: 12.75, USD: 0.14, EUR: 0.13, TRY: 4.43 },
  TRY: { RUB: 2.88, USD: 0.031, EUR: 0.029, CNY: 0.23 },
  RUB: { USD: 0.0108, EUR: 0.01, CNY: 0.078, TRY: 0.35 },
  UZB: { USD: 0.000082, EUR: 0.000071, CNY: 0.00057, TRY: 0.0036, RUB: 0.006 },
};

// Products data
const products = [
  {
    id: 1,
    name: "Цемент М500 Д0",
    category: "concrete",
    country: "🇩🇪 Германия",
    price: 850,
    currency: "EUR",
    specs: "50 кг / Морозостойкий",
    img: "https://st47.stpulscen.ru/images/product/494/788/913_original.png",
  },
  {
    id: 2,
    name: "Арматура А500С",
    category: "metal",
    country: "🇹🇷 Турция",
    price: 45000,
    currency: "TRY",
    specs: "12 мм / 11.7 м",
    img: "https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2025/4/22/1/1.png",
  },
  {
    id: 3,
    name: "Керамогранит 60x60",
    category: "finish",
    country: "🇮🇹 Италия",
    price: 45,
    currency: "EUR",
    specs: "Класс А / Матовый",
    img: "https://media.3dplitka.ru/CACHE/images/catalog/realistik/realistik-molly/785282/realistik-molly-white-str-60x60-sm-plitka.ad3d6f49b760.jpg",
  },
  {
    id: 4,
    name: "Бетон B25",
    category: "concrete",
    country: "🇨🇳 Китай",
    price: 3200,
    currency: "CNY",
    specs: "1 м³ / П4",
    img: "https://ag-beton.com/wp-content/uploads/2025/04/%D0%91%D0%B5%D1%82%D0%BE%D0%BD-B25.jpg",
  },
  {
    id: 5,
    name: "Профнастил Н75",
    category: "metal",
    country: "🇺🇸 США",
    price: 12,
    currency: "USD",
    specs: "0.8 мм / Оцинкованный",
    img: "https://centermk.ru/upload/iblock/2d9/1rilncs3i73vkgc6tm0hc00mo3nh04ni.jpg",
  },
  {
    id: 6,
    name: "Плитка керамическая",
    category: "finish",
    country: "🇪🇸 Испания",
    price: 28,
    currency: "EUR",
    specs: "30x60 / Глазурь",
    img: "https://png.pngtree.com/thumb_back/fh260/background/20240105/pngtree-seamless-background-ceramic-texture-in-gray-tiles-image_13920405.png",
  },
  {
    id: 7,
    name: "Перфоратор SDS-Max",
    category: "tools",
    country: "🇩🇪 Германия",
    price: 450,
    currency: "EUR",
    specs: "1500 Вт / 12 Дж",
    img: "https://besttools.uz/wp-content/uploads/2023/12/51213878.jpg",
  },
  {
    id: 8,
    name: "Гипсокартон Кнауф",
    category: "finish",
    country: "🇷🇺 Россия",
    price: 320,
    currency: "RUB",
    specs: "12.5 мм / 3 м",
    img: "https://images.deal.by/16528152_w600_h600_16528152.jpg",
  },
  {
    id: 9,
    name: "Труба стальная",
    category: "metal",
    country: "🇨🇳 Китай",
    price: 1800,
    currency: "CNY",
    specs: "108 мм / Ст20",
    img: "https://metallasia.uz/wp-content/uploads/2021/08/pipesBanner.jpg",
  },
  // Дополнительные продукты для добавления в массив products

  {
    id: 10,
    name: "Кирпич керамический М150",
    category: "concrete",
    country: "🇷🇺 Россия",
    price: 28,
    currency: "RUB",
    specs: "250×120×65 мм / Полнотелый",
    img: "https://alex-group.com.ua/image/cache/data/pk_krasnyi-1000x1000.jpg",
  },

  {
    id: 11,
    name: "Утеплитель минеральная вата",
    category: "finish",
    country: "🇫🇮 Финляндия",
    price: 1250,
    currency: "EUR",
    specs: "100 мм / 50 кг/м³ / Paroc",
    img: "https://www.snabcom.ru/upload/iblock/e48/17cvij421yy4t6qg92sslv67373lgzyj.jpeg",
  },

  {
    id: 12,
    name: "Металлочерепица Монтеррей",
    category: "metal",
    country: "🇷🇺 Россия",
    price: 798,
    currency: "RUB",
    specs: "0.5 мм / Полиэстер / Шоколад",
    img: "https://mega27.ru/wa-data/public/shop/products/96/08/896/images/3403/3403.750x0.png",
  },

  {
    id: 13,
    name: "Фанера ФК 18 мм",
    category: "finish",
    country: "🇷🇺 Россия",
    price: 1100,
    currency: "RUB",
    specs: "1525×1525 мм / Сорт 3/4",
    img: "https://i0.wp.com/placaj.md/wp-content/uploads/fanera-placaj-fk-moldova.jpg?fit=1000%2C1000&ssl=1",
  },

  {
    id: 14,
    name: "Цемент М400 Д20",
    category: "concrete",
    country: "🇹🇷 Турция",
    price: 520,
    currency: "TRY",
    specs: "50 кг / Морозостойкий",
    img: "https://cdn-products.sdvor.com/images/sdvor-catalog/350x350/0/450690.jpg?t=1753094181900",
  },

  {
    id: 15,
    name: "Газобетонные блоки D500",
    category: "concrete",
    country: "🇧🇾 Беларусь",
    price: 185,
    currency: "RUB",
    specs: "600×300×200 мм / Пазогребневые",
    img: "https://st32.stpulscen.ru/images/product/479/668/416_original.jpg",
  },

  {
    id: 16,
    name: "Плита OSB-3 12 мм",
    category: "finish",
    country: "🇨🇦 Канада",
    price: 42,
    currency: "USD",
    specs: "2500×1250 мм / Влагостойкая",
    img: "https://images.satu.kz/209580036_w300_h300_osb-3-osp-plita.jpg",
  },

  {
    id: 17,
    name: "Пиломатериалы сосна 50×150",
    category: "finish",
    country: "🇷🇺 Россия",
    price: 18500,
    currency: "RUB",
    specs: "6 м / Естественной влажности",
    img: "https://bls-ufa.ru/images/doska-obreznaja-40x150x6000.jpg",
  },

  {
    id: 18,
    name: "Штукатурка машинная Knauf",
    category: "finish",
    country: "🇩🇪 Германия",
    price: 385,
    currency: "EUR",
    specs: "30 кг / MP 75 / Белая",
    img: "https://kondopoga.elementsm.ru/upload/iblock/b04/b04a503c241f58855dc35e7a608c8f7c.jpg",
  },

  {
    id: 19,
    name: "Кабель ВВГнг 3×2.5",
    category: "tools",
    country: "🇨🇳 Китай",
    price: 125,
    currency: "CNY",
    specs: "1 м / Медный / Гибкий",
    img: "https://e-kc.ru/_ipx/cover/ezm/images/d14800f35283decadc201b7d19899907_UaiJXYG.jpg",
  },

  {
    id: 20,
    name: "Смеситель для ванны Grohe",
    category: "tools",
    country: "🇩🇪 Германия",
    price: 285,
    currency: "EUR",
    specs: "Eurosmart / Хром / С душем",
    img: "https://vencon.ua/uploads/goods/341887/additional/grohe-cubeo-1018140000-4.jpg",
  },

  {
    id: 21,
    name: "Линолеум Tarkett Force",
    category: "finish",
    country: "🇷🇺 Россия",
    price: 1250,
    currency: "RUB",
    specs: "3 м / Класс 32 / Серо-коричневый",
    img: "https://www.kwadratura23.ru/_mod_files/ce_images/eshop/generated/fors3_2d77fa8fc336a20209926cdf19e8baa5_538x540_pc.jpg",
  },

  {
    id: 22,
    name: "Сайдинг виниловый Docke",
    category: "finish",
    country: "🇷🇺 Россия",
    price: 450,
    currency: "RUB",
    specs: "3.66 м / D4.5D / Корабельный брус",
    img: "https://www.strd.ru/img/offer/4/44/449585/11471_65386.jpg",
  },

  {
    id: 23,
    name: "Сварочный аппарат MMA-200",
    category: "tools",
    country: "🇨🇳 Китай",
    price: 280,
    currency: "USD",
    specs: "200 А / IGBT / Инверторный",
    img: "https://belmagazin.by/pics/items/553e334759eef_middle_20161226181205.jpg",
  },

  {
    id: 24,
    name: "Краска фасадная Ceresit",
    category: "finish",
    country: "🇩🇪 Германия",
    price: 95,
    currency: "EUR",
    specs: "10 л / CT 42 / База А",
    img: "https://alkiv.ua/upload/iblock/834/wtf1d6n36or4zd15g2t3r9odwi799e3x.webp",
  },
];

// Initialize
window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("hidden");
  initTicker();
  renderProducts();
  convertCurrency();
  animateNumbers();
  initScrollAnimations();
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Currency Ticker
function initTicker() {
  const ticker = document.getElementById("ticker");
  const rates = [
    { pair: "USD/RUB", rate: "92.50", change: "+0.15%" },
    { pair: "EUR/RUB", rate: "100.20", change: "-0.08%" },
    { pair: "CNY/RUB", rate: "12.75", change: "+0.22%" },
    { pair: "TRY/RUB", rate: "2.88", change: "+0.45%" },
    { pair: "GBP/RUB", rate: "117.30", change: "-0.12%" },
  ];

  let content = "";
  rates.forEach((r) => {
    const color = r.change.includes("+") ? "#4ade80" : "#f87171";
    content += `
                    <div class="ticker-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${r.pair}: ${r.rate}</span>
                        <span style="color: ${color}">${r.change}</span>
                    </div>
                `;
  });
  ticker.innerHTML = content + content; // Duplicate for seamless loop
}

// Render Products
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  filtered.forEach((product, index) => {
    const priceInRub = convertToRUB(product.price, product.currency);
    const card = document.createElement("div");
    card.className = "product-card fade-in";
    card.style.animationDelay = `${index * 0.1}s`;
    // Находим внутри функции renderProducts строку с card.innerHTML и меняем блок <div class="product-image">
    card.innerHTML = `
    <div class="product-image">
        <!-- Заменяем старую строку на нормальный тег img -->
        <img src="${product.img}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        <div class="country-badge">${product.country}</div>
    </div>
    <div class="product-info">
        <div class="product-category">${getCategoryName(product.category)}</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-specs">
            <span><i class="fas fa-tag"></i> ${product.specs}</span>
        </div>
        <div class="product-footer">
            <div>
                <div class="price">${product.price} ${product.currency}</div>
                <div class="price-converted">≈ ${priceInRub.toLocaleString()} ₽</div>
            </div>
            <button class="add-to-cart" onclick="addToCart('${product.name}')">
                <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
    </div>
`;

    grid.appendChild(card);
  });
  // Re-trigger animations
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      if (isInViewport(el)) el.classList.add("visible");
    });
  }, 100);
}

function getCategoryName(cat) {
  const names = {
    concrete: "Бетон и ЖБИ",
    metal: "Металлоконструкции",
    finish: "Отделочные материалы",
    tools: "Инструменты",
  };
  return names[cat] || cat;
}

function convertToRUB(amount, currency) {
  if (currency === "RUB") return amount;
  return Math.round(amount * exchangeRates[currency].RUB);
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    renderProducts(this.dataset.filter);
  });
});

// Currency Converter
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount1").value) || 0;
  const from = document.getElementById("currency1").value;
  const to = document.getElementById("currency2").value;

  let result;
  if (from === to) {
    result = amount;
  } else {
    result = amount * exchangeRates[from][to];
  }

  document.getElementById("amount2").value = result.toFixed(2);

  const rate = from === to ? 1 : exchangeRates[from][to];
  document.getElementById("rateDisplay").textContent =
    `1 ${from} = ${rate.toFixed(4)} ${to}`;

  const now = new Date();
  document.getElementById("lastUpdate").textContent =
    now.toLocaleTimeString("ru-RU");
}

function swapCurrencies() {
  const curr1 = document.getElementById("currency1");
  const curr2 = document.getElementById("currency2");
  const temp = curr1.value;
  curr1.value = curr2.value;
  curr2.value = temp;
  convertCurrency();
}

// Add to cart
function addToCart(productName) {
  const notification = document.getElementById("cartNotification");
  notification.querySelector("p").textContent =
    `${productName} добавлен в корзину`;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 3000);
}

// Animate numbers
function animateNumbers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  });

  document
    .querySelectorAll(".stat-number")
    .forEach((el) => observer.observe(el));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(
      progress * (end - start) + start,
    ).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Simulate live rate updates
setInterval(() => {
  // Randomly fluctuate rates slightly
  Object.keys(exchangeRates).forEach((base) => {
    Object.keys(exchangeRates[base]).forEach((target) => {
      const change = (Math.random() - 0.5) * 0.001;
      exchangeRates[base][target] *= 1 + change;
    });
  });
  convertCurrency();
}, 30000); // Update every 30 seconds

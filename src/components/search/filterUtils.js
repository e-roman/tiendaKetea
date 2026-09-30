/* =============================
  CONFIGURACIÓN DE FILTROS DEL PLP
============================= */

// Tramos de descuento: "Desde X% OFF" incluye todo producto con descuento >= X
export const DISCOUNT_TIERS = [50, 25, 15, 10];

// Cantidad de cuotas sin interés, de mayor a menor
export const INSTALLMENT_OPTIONS = [12, 9, 6, 3];

// Etiquetas comerciales que no son categorías reales
const HIDDEN_CATEGORIES = ["ofertas", "destacados", "premium"];

export const SWITCHES = [
  { key: "envioGratis", label: "Envío gratis" },
  { key: "llegaHoy", label: "Envío Express" },
  { key: "retiroInmediato", label: "Retiro inmediato" },
];

export const EMPTY_FILTERS = {
  marcas: [],
  categorias: [],
  accionamiento: [],
  descuento: null,
  cuotas: [],
  precio: null, // { min, max, label }
  envioGratis: false,
  llegaHoy: false,
  retiroInmediato: false,
};

export const normalizeText = (s = "") =>
  s.toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

export const matchesSearch = (product, term) => {
  const q = normalizeText(term);
  if (!q) return true;
  const haystack = [product.title, product.Marca, ...(product.categories || [])]
    .map(normalizeText)
    .join(" ");
  return q.split(/\s+/).every(word => haystack.includes(word));
};

export const visibleCategories = product =>
  (product.categories || []).filter(c => !HIDDEN_CATEGORIES.includes(c.toLowerCase()));

/* =============================
  PREDICADOS POR GRUPO
  (se evalúan por separado para calcular facetas)
============================= */
const predicates = {
  marcas: (p, f) => !f.marcas.length || f.marcas.includes(p.Marca),
  categorias: (p, f) => !f.categorias.length || visibleCategories(p).some(c => f.categorias.includes(c)),
  accionamiento: (p, f) => !f.accionamiento.length || f.accionamiento.includes(p.accionamiento),
  descuento: (p, f) => !f.descuento || (p.discount || 0) >= f.descuento,
  cuotas: (p, f) => !f.cuotas.length || f.cuotas.includes(p.cuotas),
  precio: (p, f) =>
    !f.precio || (p.price >= f.precio.min && (f.precio.max == null || p.price < f.precio.max)),
  ...Object.fromEntries(SWITCHES.map(({ key }) => [key, (p, f) => !f[key] || !!p[key]])),
};

export const applyFilters = (products, filters, exceptGroup) =>
  products.filter(p =>
    Object.entries(predicates).every(([group, test]) => group === exceptGroup || test(p, filters))
  );

export const hasActiveFilters = filters =>
  filters.marcas.length > 0 ||
  filters.categorias.length > 0 ||
  filters.accionamiento.length > 0 ||
  filters.cuotas.length > 0 ||
  !!filters.descuento ||
  !!filters.precio ||
  SWITCHES.some(({ key }) => filters[key]);

/* =============================
  FACETAS
  Cada grupo cuenta sobre los resultados filtrados por todos
  los demás grupos, así los números siempre coinciden con lo
  que se ve al seleccionar la opción.
============================= */
const countBy = (items, getValues) => {
  const map = new Map();
  items.forEach(p => {
    [].concat(getValues(p)).filter(Boolean).forEach(v => map.set(v, (map.get(v) || 0) + 1));
  });
  return map;
};

const toOptions = (map, selected) =>
  [...map.entries()]
    .map(([value, count]) => ({ value, label: value, count }))
    .concat(selected.filter(v => !map.has(v)).map(v => ({ value: v, label: v, count: 0 })))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "es"));

const roundNice = n => {
  const magnitude = 10 ** Math.max(0, Math.floor(Math.log10(n)) - 1);
  return Math.round(n / magnitude) * magnitude;
};

const formatPrice = n => `$ ${n.toLocaleString("es-AR")}`;

// Tres rangos de precio calculados a partir de los resultados actuales
const buildPriceRanges = products => {
  const prices = products.map(p => p.price).sort((a, b) => a - b);
  if (prices.length < 3) return [];
  const low = roundNice(prices[Math.floor(prices.length / 3)]);
  const high = roundNice(prices[Math.floor((prices.length * 2) / 3)]);
  if (low >= high) return [];
  return [
    { min: 0, max: low, label: `Hasta ${formatPrice(low)}` },
    { min: low, max: high, label: `${formatPrice(low)} a ${formatPrice(high)}` },
    { min: high, max: null, label: `Más de ${formatPrice(high)}` },
  ];
};

export const isSameRange = (a, b) => !!a && !!b && a.min === b.min && a.max === b.max;

// Si el rango elegido ya no está entre los calculados, se conserva para poder quitarlo
const withSelectedRange = (ranges, selected) =>
  !selected || ranges.some(r => isSameRange(r, selected)) ? ranges : [selected, ...ranges];

export const buildFacets =(baseProducts, filters) => {
  const scope = group => applyFilters(baseProducts, filters, group);

  const marcasScope = scope("marcas");
  const categoriasScope = scope("categorias");
  const accionamientoScope = scope("accionamiento");
  const descuentoScope = scope("descuento");
  const cuotasScope = scope("cuotas");
  const precioScope = scope("precio");

  const cuotasCount = countBy(cuotasScope, p => p.cuotas);

  return {
    marcas: toOptions(countBy(marcasScope, p => p.Marca), filters.marcas),
    categorias: toOptions(countBy(categoriasScope, visibleCategories), filters.categorias),
    accionamiento: toOptions(countBy(accionamientoScope, p => p.accionamiento), filters.accionamiento),
    descuentos: DISCOUNT_TIERS.map(tier => ({
      value: tier,
      label: `Desde ${tier}% OFF`,
      count: descuentoScope.filter(p => (p.discount || 0) >= tier).length,
    })).filter(o => o.count > 0 || o.value === filters.descuento),
    cuotas: INSTALLMENT_OPTIONS.map(n => ({
      value: n,
      label: `${n} cuotas sin interés`,
      count: cuotasCount.get(n) || 0,
    })).filter(o => o.count > 0 || filters.cuotas.includes(o.value)),
    precios: withSelectedRange(buildPriceRanges(precioScope), filters.precio).map(r => ({
      ...r,
      count: precioScope.filter(p => p.price >= r.min && (r.max == null || p.price < r.max)).length,
    })).filter(r => r.count > 0 || isSameRange(r, filters.precio)),
    switches: SWITCHES.map(s => ({
      ...s,
      count: scope(s.key).filter(p => p[s.key]).length,
    })),
  };
};

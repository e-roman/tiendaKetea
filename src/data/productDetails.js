import detailsBySlug from "./productDetails.json";

const HIDDEN_CATEGORIES = ["ofertas", "destacados", "premium"];

/* =============================
  CONTENIDO GENÉRICO POR CATEGORÍA
  Cada producto puede sumar sus propias preguntas o garantía en productDetails.json
============================= */
const GENERIC_FAQ = [
  {
    q: "¿Cuánto tarda el envío?",
    a: "Los envíos se despachan dentro de las 48 h hábiles. Si el producto tiene Envío Express, llega en el día en zonas seleccionadas."
  },
  {
    q: "¿Puedo retirarlo en una sucursal?",
    a: "Sí, podés elegir retiro gratis en sucursal al finalizar la compra."
  }
];

const CATEGORY_DEFAULTS = {
  Robots: {
    warrantyMonths: 12,
    faq: [
      {
        q: "¿Cada cuánto conviene usar el robot?",
        a: "Para uso residencial recomendamos 2 o 3 ciclos por semana en temporada y uno semanal fuera de temporada."
      },
      {
        q: "¿Qué mantenimiento necesita?",
        a: "Lavar el filtro después de cada uso y guardar el robot a la sombra, con el cable sin dobleces."
      }
    ]
  },
  "Bombas de Calor": {
    warrantyMonths: 12,
    faq: [
      {
        q: "¿Necesita instalación profesional?",
        a: "Sí, recomendamos instalarla con un técnico matriculado para conservar la garantía."
      }
    ]
  },
  Químicos: {
    faq: [
      {
        q: "¿Cómo debo almacenarlo?",
        a: "En un lugar fresco, seco y ventilado, fuera del alcance de niños y lejos de otros productos químicos."
      }
    ]
  }
};

const WARRANTY_TEXT =
  "Todos nuestros productos cuentan con garantía oficial de la marca. Ante cualquier falla, nuestro equipo de soporte gestiona la revisión con el servicio técnico autorizado.";

/* =============================
  ESPECIFICACIONES BÁSICAS
  Se usan cuando el producto todavía no tiene ficha técnica cargada
============================= */
const basicSpecs = product => [
  {
    group: "Información general",
    items: [
      { label: "Marca", value: product.Marca },
      { label: "Categoría", value: product.categoryDetail?.[0] },
      { label: "Accionamiento", value: product.accionamiento },
      { label: "Código", value: product.code }
    ].filter(item => item.value)
  }
];

/* =============================
  DATO TÉCNICO DESTACADO EN LA CARD
  Por categoría: qué especificación mostrar (en orden de preferencia)
  y con qué etiqueta corta. Si el producto no la tiene, no se muestra.
============================= */
const CARD_SPEC_BY_CATEGORY = {
  Robots: [
    { spec: "Tiempo de ciclo", short: "Ciclo" },
    { spec: "Superficie de corte", short: "Superficie" },
    { spec: "Alimentación" }
  ],
  "Bombas de Calor": [{ spec: "Volumen de piscina", short: "Piscinas" }],
  Filtros: [{ spec: "Caudal" }],
  Químicos: [{ spec: "Presentación" }],
  Válvulas: [{ spec: "Conexión" }, { spec: "Volumen de piscina", short: "Piscinas" }],
  Accesorios: [{ spec: "Largo" }, { spec: "Ancho" }, { spec: "Capacidad" }, { spec: "Contenido" }]
};

export function getCardSpec(product) {
  const own = detailsBySlug[product.slug];
  if (!own) return null;
  if (own.cardSpec) return own.cardSpec;

  const items = (own.specs || []).flatMap(g => g.items);
  for (const { spec, short } of CARD_SPEC_BY_CATEGORY[product.categoryDetail?.[0]] || []) {
    const found = items.find(i => i.label === spec);
    if (found) return { label: short || spec, value: found.value };
  }
  return null;
}

export const getBreadcrumb = product => {
  const cats = (product.categories || []).filter(c => !HIDDEN_CATEGORIES.includes(c.toLowerCase()));
  const detail = product.categoryDetail?.[0];
  const parent = cats.find(c => c !== detail);
  return [parent, detail].filter(Boolean);
};

export function getProductDetails(product) {
  const own = detailsBySlug[product.slug] || {};
  const defaults = CATEGORY_DEFAULTS[product.categoryDetail?.[0]] || {};

  return {
    sku: own.sku || product.code,
    shortDescription: own.shortDescription || "",
    description: own.description || [],
    sections: own.sections || [],
    tips: own.tips || [],
    includes: own.includes || [],
    notIncluded: own.notIncluded || [],
    specs: [...(own.specs || []), ...basicSpecs(product)],
    featureBlocks: own.featureBlocks || [],
    resources: own.resources || [],
    faq: [...(own.faq || []), ...(defaults.faq || []), ...GENERIC_FAQ],
    warrantyMonths: own.warrantyMonths || defaults.warrantyMonths || null,
    warrantyText: own.warrantyText || WARRANTY_TEXT
  };
}

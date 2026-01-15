import ProductCard from "../ProductCard";

export default function ProductGrid({
  products,
  openProduct,
  type // "ofertas" | "novedades"
}) {
  const limitByType = {
    ofertas: 5,
    novedades: 5
  };

  const limit = limitByType[type] ?? 5;

  const filteredProducts = products
    .filter(p => {
      if (type === "novedades") return p.isFeatured === true;
      if (type === "ofertas") return p.categories?.includes("ofertas");
      return true;
    })
    .slice(0, limit);

  return (
    <div className="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-5">
      {filteredProducts.map((p) => (
        <div className="col" key={p.id}>
          <ProductCard product={p} openProduct={openProduct} />
        </div>
      ))}
    </div>
  );
}

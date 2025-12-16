import ProductCard from "../ProductCard";

export default function ProductGrid({ products, openProduct }) {
  return (
    <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
      {products.map((p) => (
        <div className="col" key={p.id}>
          <ProductCard product={p} openProduct={openProduct} />
        </div>
      ))}
    </div>
  );
}

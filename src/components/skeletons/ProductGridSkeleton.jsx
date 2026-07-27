import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({
  count = 10,
  rowClassName = "row g-2 row-cols-2 row-cols-md-3 row-cols-lg-5",
}) {
  return (
    <div className={rowClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <div className="col" key={i}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

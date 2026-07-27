import Skeleton from "./Skeleton";
import BannerSkeleton from "./BannerSkeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function DescuentosSkeleton() {
  return (
    <div className="skeleton-page">
      <BannerSkeleton />

      <div className="container content-space-b-1 px-2 px-md-3 pt-4 pb-8 pt-md-5 pb-md-10">
        {[0, 1, 2].map((row) => (
          <div className="mb-10" key={row}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Skeleton style={{ width: 220, height: 22 }} />
              <Skeleton style={{ width: 80, height: 16 }} />
            </div>

            <div className="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="col" key={i}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Skeleton from "./Skeleton";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function SearchResultsSkeleton() {
  return (
    <div className="container content-space-t-md-1 content-space-b-2 skeleton-page">
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block pe-md-4">
          <Skeleton className="w-75 mb-2" style={{ height: 24 }} />
          <Skeleton className="w-50 mb-4" style={{ height: 16 }} />

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton className="w-50 mb-3" style={{ height: 16 }} />
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="w-100 mb-2" style={{ height: 14 }} />
              ))}
            </div>
          ))}
        </div>

        <div className="col-lg-9 mx-auto">
          <div className="d-none d-lg-flex justify-content-end mb-4">
            <Skeleton style={{ width: 160, height: 34 }} />
          </div>

          <ProductGridSkeleton
            count={9}
            rowClassName="row g-2 g-md-3 row-cols-2 row-cols-md-3"
          />
        </div>
      </div>
    </div>
  );
}

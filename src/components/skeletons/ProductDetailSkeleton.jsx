import Skeleton from "./Skeleton";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="bg-white skeleton-page">
      <div className="container pt-md-3 pt-lg-5 px-0-xs">
        <div className="row mx-xs-0">
          <div className="col-lg-12 mb-3 mb-lg-0 d-none d-md-block">
            <Skeleton style={{ width: 320, height: 16 }} />
          </div>

          {/* GALERÍA */}
          <div className="col-lg-8 mb-5 mb-lg-0 px-xs-0">
            <div className="pe-lg-3">
              <Skeleton className="w-100 rounded-3 mb-3" style={{ height: 420 }} />
              <div className="d-flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="rounded-2"
                    style={{ width: 70, height: 70 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="col-lg-4">
            <Skeleton className="w-50 mb-3" style={{ height: 14 }} />
            <Skeleton className="w-100 mb-2" style={{ height: 28 }} />
            <Skeleton className="w-75 mb-3" style={{ height: 28 }} />
            <Skeleton className="w-100 mb-3" style={{ height: 14 }} />
            <Skeleton className="w-25 mb-4" style={{ height: 22 }} />
            <Skeleton className="w-50 mb-4" style={{ height: 34 }} />

            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-100 mb-3" style={{ height: 14 }} />
            ))}

            <Skeleton className="w-100 mt-4" style={{ height: 44 }} />
          </div>
        </div>
      </div>

      {/* ESPECIFICACIONES */}
      <div className="container py-8">
        <div className="row g-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="col-md-4" key={i}>
              <Skeleton className="w-100 rounded-3" style={{ height: 120 }} />
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTOS RELACIONADOS */}
      <div className="bg-light-medium">
        <div className="container py-8">
          <Skeleton className="mb-4" style={{ width: 240, height: 22 }} />
          <ProductGridSkeleton count={5} />
        </div>
      </div>
    </div>
  );
}

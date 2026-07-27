import Skeleton from "./Skeleton";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function HomeSkeleton() {
  return (
    <div className="skeleton-page">
      {/* HERO */}
      <div className="container p-0 px-md-3 py-md-5">
        <Skeleton className="w-100 rounded-4-md" style={{ height: 380 }} />
      </div>

      {/* SERVICES */}
      <div className="d-none d-md-block">
        <div className="container px-xs-0">
          <div className="card border shadow-none rounded-3">
            <div className="row card-body p-4">
              {[0, 1, 2].map((i) => (
                <div className="col-md-4" key={i}>
                  <div className="d-flex align-items-center">
                    <Skeleton
                      className="skeleton-circle me-3 flex-shrink-0"
                      style={{ width: 48, height: 48 }}
                    />
                    <div className="w-100">
                      <Skeleton className="w-75 mb-2" style={{ height: 14 }} />
                      <Skeleton className="w-100" style={{ height: 12 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NOVEDADES */}
      <div className="container py-4 content-space-lg-1 px-0 px-md-3">
        <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-3 px-md-0">
          <Skeleton style={{ width: 220, height: 22 }} />
          <Skeleton style={{ width: 80, height: 16 }} />
        </div>
        <ProductGridSkeleton count={5} />
      </div>

      <div className="container py-3">
        <Skeleton className="w-100 rounded-3" style={{ height: 160 }} />
      </div>

      {/* OFERTAS */}
      <div className="container py-4 content-space-t-lg-1 px-0 px-md-3">
        <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-3 px-md-0">
          <Skeleton style={{ width: 220, height: 22 }} />
          <Skeleton style={{ width: 80, height: 16 }} />
        </div>
        <ProductGridSkeleton count={5} />
      </div>
    </div>
  );
}

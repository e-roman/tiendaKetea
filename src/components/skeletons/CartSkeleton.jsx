import Skeleton from "./Skeleton";

export default function CartSkeleton() {
  return (
    <div className="bg-light-medium skeleton-page">
      <div className="container space-1 space-md-t-1 space-bottom-md-3">
        <div className="row">
          <div className="col-lg-12 pb-4">
            <Skeleton style={{ width: 180, height: 28 }} />
          </div>

          <div className="col-lg-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card shadow-none border mb-3">
                <div className="card-body px-4 pt-4 pb-5 pt-md-5 pb-md-3 px-md-4">
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="d-flex">
                        <Skeleton
                          className="rounded-2 me-3 flex-shrink-0"
                          style={{ width: 90, height: 90 }}
                        />
                        <div className="w-100">
                          <Skeleton className="w-100 mb-2" style={{ height: 16 }} />
                          <Skeleton className="w-50" style={{ height: 16 }} />
                        </div>
                      </div>
                    </div>
                    <div className="col-5 col-md-2 offset-md-1">
                      <Skeleton className="w-100" style={{ height: 34 }} />
                    </div>
                    <div className="col-6 col-md-3 text-md-right">
                      <Skeleton className="w-50 ms-md-auto" style={{ height: 18 }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="ps-lg-2">
              <div className="bg-white shadow-soft rounded border px-4 pt-4 pb-5 mb-4">
                <Skeleton className="w-75 mb-4" style={{ height: 22 }} />
                <Skeleton className="w-100 mb-3" style={{ height: 14 }} />
                <Skeleton className="w-100 mb-4" style={{ height: 14 }} />
                <Skeleton className="w-100 mb-4" style={{ height: 24 }} />
                <Skeleton className="w-100" style={{ height: 40 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

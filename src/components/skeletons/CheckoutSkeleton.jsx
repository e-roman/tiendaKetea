import Skeleton from "./Skeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="skeleton-page">
      {/* HEADER */}
      <div className="py-2 border-bottom bg-white">
        <div className="container d-flex align-items-center justify-content-between">
          <Skeleton style={{ width: 90, height: 16 }} />
          <Skeleton style={{ width: 117, height: 40 }} />
          <Skeleton style={{ width: 131, height: 30 }} />
        </div>
      </div>

      <div className="bg-light-medium bg-white-xs pt-3 pb-5">
        <div className="container">
          {/* STEPPER */}
          <div className="d-flex align-items-center justify-content-center gap-3 my-4">
            {[0, 1, 2].map((i) => (
              <div className="d-flex align-items-center gap-3" key={i} style={{ flex: i < 2 ? 1 : "0 0 auto", maxWidth: 220 }}>
                <Skeleton
                  className="skeleton-circle flex-shrink-0"
                  style={{ width: 36, height: 36 }}
                />
                {i < 2 && <Skeleton className="flex-grow-1" style={{ height: 2 }} />}
              </div>
            ))}
          </div>

          <div className="row mt-4">
            {/* FORM */}
            <div className="col-lg-8 pe-md-4">
              <div className="card shadow-none py-4 px-0 px-md-4 mb-md-4">
                <Skeleton className="w-50 mb-4" style={{ height: 24 }} />

                <div className="row">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div className="col-md-6 mb-3" key={i}>
                      <Skeleton className="w-25 mb-2" style={{ height: 12 }} />
                      <Skeleton className="w-100" style={{ height: 38 }} />
                    </div>
                  ))}
                </div>

                <Skeleton className="w-100 mt-4" style={{ height: 44 }} />
              </div>
            </div>

            {/* RESUMEN */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="bg-white rounded border px-3 pt-4 pb-5 py-md-4 px-md-4 mb-3">
                <Skeleton className="w-75 mb-4" style={{ height: 20 }} />

                {Array.from({ length: 2 }).map((_, i) => (
                  <div className="d-flex mb-4" key={i}>
                    <Skeleton
                      className="rounded-2 me-3 flex-shrink-0"
                      style={{ width: 60, height: 60 }}
                    />
                    <div className="w-100">
                      <Skeleton className="w-100 mb-2" style={{ height: 14 }} />
                      <Skeleton className="w-50" style={{ height: 14 }} />
                    </div>
                  </div>
                ))}

                <Skeleton className="w-100 mb-3" style={{ height: 14 }} />
                <Skeleton className="w-100" style={{ height: 24 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

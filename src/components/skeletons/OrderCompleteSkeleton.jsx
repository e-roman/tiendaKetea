import Skeleton from "./Skeleton";

export default function OrderCompleteSkeleton() {
  return (
    <div className="skeleton-page">
      <div className="py-2 border-bottom bg-white">
        <div className="container d-flex align-items-center justify-content-between">
          <Skeleton style={{ width: 117, height: 40 }} />
          <Skeleton style={{ width: 131, height: 30 }} />
        </div>
      </div>

      <div className="bg-light-medium py-5 py-md-3">
        <div className="row mx-0 justify-content-center py-md-10">
          <div className="col-md-12 col-lg-4">
            <div className="card shadow-none border text-center p-5">
              <Skeleton
                className="skeleton-circle mx-auto mb-4"
                style={{ width: 96, height: 96 }}
              />
              <Skeleton className="w-75 mx-auto mb-3" style={{ height: 26 }} />
              <Skeleton className="w-100 mb-2" style={{ height: 14 }} />
              <Skeleton className="w-100 mb-4" style={{ height: 14 }} />
              <Skeleton className="w-100" style={{ height: 90 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

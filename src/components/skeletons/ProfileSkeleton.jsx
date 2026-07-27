import Skeleton from "./Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="bg-light skeleton-page">
      <div className="navbar-dark bg-light">
        <div className="container py-3 content-space-t-lg-1 pb-lg-4">
          <Skeleton style={{ width: 160, height: 28 }} />
        </div>
      </div>

      <div className="container position-relative content-space-b-lg-2">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-100 mb-3" style={{ height: 18 }} />
            ))}
          </div>

          <div className="col-lg-9">
            <Skeleton className="w-50 mb-4" style={{ height: 24 }} />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-100 mb-3" style={{ height: 90 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Skeleton from "./Skeleton";

export default function BannerSkeleton({ height = 220 }) {
  return (
    <div className="container pt-3 pt-lg-5">
      <div className="row g-3 row-cols-1">
        <div className="col mb-4 mb-md-0">
          <Skeleton className="w-100 rounded-3" style={{ height }} />
        </div>
      </div>
    </div>
  );
}

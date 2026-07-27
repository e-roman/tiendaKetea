import Skeleton from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="card card-bordered shadow-none text-start h-100">
      <div className="card-pinned">
        <Skeleton className="w-100" style={{ aspectRatio: "1 / 1" }} />
      </div>

      <div className="card-body pt-0 pb-3 px-3">
        <Skeleton className="w-100 mt-2" style={{ height: 14 }} />
        <Skeleton className="w-75 mt-2 mb-3" style={{ height: 14 }} />

        <Skeleton className="w-50" style={{ height: 20 }} />

        <div className="pt-2">
          <Skeleton className="w-100" style={{ height: 12 }} />
        </div>
      </div>
    </div>
  );
}

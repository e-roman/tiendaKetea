import BannerSkeleton from "./BannerSkeleton";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function ProductListingPageSkeleton() {
  return (
    <div className="skeleton-page">
      <BannerSkeleton />

      <div className="container content-space-b-1 px-2 px-md-3 pt-4 pb-8 pt-md-5 pb-md-10">
        <ProductGridSkeleton
          count={10}
          rowClassName="row g-2 gx-md-2 gy-md-3 row-cols-2 row-cols-md-3 row-cols-lg-5 mb-3 mb-md-6"
        />
      </div>
    </div>
  );
}

import { matchPath } from "react-router-dom";

import HomeSkeleton from "./HomeSkeleton";
import ProductListingPageSkeleton from "./ProductListingPageSkeleton";
import DescuentosSkeleton from "./DescuentosSkeleton";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import CartSkeleton from "./CartSkeleton";
import CheckoutSkeleton from "./CheckoutSkeleton";
import OrderCompleteSkeleton from "./OrderCompleteSkeleton";
import SearchResultsSkeleton from "./SearchResultsSkeleton";
import ProfileSkeleton from "./ProfileSkeleton";

const ROUTE_SKELETONS = [
  { path: "/", Component: HomeSkeleton },
  { path: "/novedades", Component: ProductListingPageSkeleton },
  { path: "/descuentos", Component: DescuentosSkeleton },
  { path: "/Mas-vendido", Component: ProductListingPageSkeleton },
  { path: "/product/:slug", Component: ProductDetailSkeleton },
  { path: "/cart", Component: CartSkeleton },
  { path: "/checkout", Component: CheckoutSkeleton },
  { path: "/checkout/entrega", Component: CheckoutSkeleton },
  { path: "/checkout/pago", Component: CheckoutSkeleton },
  { path: "/pago-realizado", Component: OrderCompleteSkeleton },
  { path: "/buscar/:query", Component: SearchResultsSkeleton },
  { path: "/pages/Profile", Component: ProfileSkeleton },
];

export default function RouteSkeleton({ pathname }) {
  const match = ROUTE_SKELETONS.find((route) =>
    matchPath({ path: route.path, end: true }, pathname)
  );

  const Component = match ? match.Component : HomeSkeleton;

  return <Component />;
}

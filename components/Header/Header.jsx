import useMediaQuery from "../../src/hooks/useMediaQuery";
import HeaderDesktop from "./desktop/HeaderDesktop";
import HeaderMobile from "./mobile/HeaderMobile";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

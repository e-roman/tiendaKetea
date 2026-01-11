import useMediaQuery from "../../src/hooks/useMediaQuery";
import HeaderDesktop from "./desktop/HeaderDesktop";
import HeaderMobile from "./mobile/HeaderMobile";

export default function Header({ setShowLogoutModal }) {
  const isMobile = useMediaQuery("(max-width: 996px)");

  return isMobile
    ? <HeaderMobile setShowLogoutModal={setShowLogoutModal} />
    : <HeaderDesktop setShowLogoutModal={setShowLogoutModal} />;
}
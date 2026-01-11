import { useState, useRef, useEffect } from "react";
import TopAlert from "./TopAlert";
// import Topbar from "./Topbar";
import MainHeader from "./MainHeader";
import NavCategories from "./NavCategories";

export default function HeaderDesktop({ setShowLogoutModal }) {
  const headerRef = useRef(null);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerRef.current.offsetHeight}px`
      );
    }
  }, []);

  return (
    <>
      {/* NO sticky */}
      <div ref={headerRef}>
        <TopAlert />
        {/* <Topbar /> */}
      </div>

      {/* STICKY PURO */}
      <div className="sticky-top bg-white">
        <MainHeader />
        <NavCategories
          megaOpen={megaOpen}
          setMegaOpen={setMegaOpen}
          setShowLogoutModal={setShowLogoutModal}
        />
      </div>

      {/* OVERLAY GLOBAL */}
      {megaOpen && (
        <div
          className="layout-overlay"
          onClick={() => setMegaOpen(false)}
        />
      )}
    </>
  );
}

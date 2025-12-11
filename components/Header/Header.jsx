// src/components/header/Header.jsx
import { useState } from "react";
import TopAlert from "./TopAlert";
import Topbar from "./Topbar";
import MainHeader from "./MainHeader";
import NavCategories from "./NavCategories";
import LogoutModal from "../Modals/LogoutModal";

export default function Header() {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <TopAlert />
      <Topbar />
      <MainHeader />

      <NavCategories
        setShowPriceModal={setShowPriceModal}
        setShowLogoutModal={setShowLogoutModal}
      />

      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}

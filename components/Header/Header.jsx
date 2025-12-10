// src/components/header/Header.jsx
import TopAlert from "./TopAlert";
import Topbar from "./Topbar";
import MainHeader from "./MainHeader";
import NavCategories from "./NavCategories";

export default function Header() {
  return (
    <>
      <TopAlert />
      <Topbar />
      <MainHeader />
      <NavCategories />
    </>
  );
}

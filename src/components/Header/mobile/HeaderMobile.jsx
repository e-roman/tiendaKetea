import { useState } from "react";  
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Offcanvas } from "bootstrap";

import MenuMobile from "./MenuMobile";
import SearchMobileModal from "./SearchMobileModal"; 
import TopAlert from "./TopAlert";

export default function HeaderMobile() {
  const { cart } = useCart();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const closeAll = () => {
    document.querySelectorAll(".offcanvas.show").forEach(el => {
      const instance = Offcanvas.getInstance(el) || new Offcanvas(el);
      instance.hide();
    });
  };

  return (
    <>
      <TopAlert />
      <header className="header-mobile border-bottom sticky-top">
        <div className="d-flex align-items-center justify-content-between px-2 w-100">

          {/*  Botón Menú */}
          <button
            type="button"
            className="nav-header-menu-switch nav-button-mb"
            aria-label="Menú"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuOffcanvas"
          >
            <span /><span /><span /><span />
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-brand mx-2">
            <img src="../assets/img/logo/logo-sm.png" alt="Ketea S.A" height="28" />
          </Link>

          {/* Input Search */}
          <div className="flex-grow-1 mx-2">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos, marcas y más…"
              onFocus={() => setShowSearchModal(true)} // Abre el modal al enfocar
              readOnly // opcional, para que no escriba en este input, todo se hace en el modal
            />
          </div>

          {/*  Carrito */}
          <button
            className="btn position-relative nav-cart"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
          >
            <i className="bi bi-cart3"></i>
            {cart.length > 0 && <span className="quantity-add">{cart.length}</span>}
          </button>
        </div>

        {/* Menú principal Offcanvas */}
        <div
          className="offcanvas offcanvas-start w-100"
          tabIndex="-1"
          id="menuOffcanvas"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menú</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeAll}
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <MenuMobile closeAll={closeAll} />
          </div>
        </div>
      </header>


      {/* Modal de búsqueda fullscreen */}
      <SearchMobileModal
        show={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

    </>
  );
}

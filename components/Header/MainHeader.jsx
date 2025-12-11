// src/components/header/MainHeader.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../src/hooks/useCart";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import Select from "react-select"; // <- Import react-select

export default function MainHeader() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.searchInput.value.trim();
    if (!input) return;
    navigate(`/buscar/${encodeURIComponent(input)}`);
  };

  // Opciones para el select estilizado
  const categoryOptions = [
    { value: "", label: "Buscar en Categoría" },
    { value: "productos-quimicos", label: "Productos Químicos" },
    { value: "robots-dolphin", label: "Robots Dolphin" },
    { value: "accesorios-natacion", label: "Accesorios Natación" },
    { value: "inflables-juegos", label: "Inflables y juegos" },
    { value: "accesorios-limpieza", label: "Accesorios de limpieza" },
    { value: "accesorios-vaso-piscina", label: "Accesorios Vaso Piscina" },
    { value: "accesorios-spa", label: "Accesorios de Spa" },
    { value: "accesorios-exterior-piscina", label: "Accesorios de exterior de piscina" },
    { value: "bombas", label: "Bombas" },
    { value: "borders-atermicos", label: "Borders Atérmicos" },
    { value: "climatizacion-piscinas", label: "Climatización de Piscinas" },
    { value: "gabinetes", label: "Gabinetes" },
    { value: "conduccion-fluidos", label: "Conducción de Fluidos" },
    { value: "cuidado-agua", label: "Cuidado del agua" },
    { value: "filtros", label: "Filtros" },
    { value: "iluminacion", label: "Iluminación" },
    { value: "revestimientos", label: "Revestimientos" },
    { value: "riego", label: "Riego" },
  ];

  return (
    <header className="py-2 border-bottom sticky-nav sticky-top bg-white">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* LOGO */}
        <Link to="/" className="navbar-brand">
          <img src="../assets/img/logo/logo.svg" alt="Logo" height="60" />
        </Link>

       {/* BUSCADOR */}
        <div className="flex-grow-1 ps-4 pe-10 d-none d-md-block">
          <form className="d-flex position-relative" onSubmit={handleSearch}>
            
            {/* Select estilizado */}
            <div>
              <Select
                options={categoryOptions}
                defaultValue={categoryOptions[0]}
                classNamePrefix="custom-select"
                isSearchable={false}
              />
            </div>

            <input
              type="text"
              name="searchInput"
              className="form-control form-control-lg shadow-none input-search"
              placeholder="Buscar productos, marcas y más…"
              aria-label="Buscar productos, marcas y más…"
            />
            <button type="submit" className="btn btn-primary btn-lg rounded-pill btn-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search">
                <path d="m21 21-4.34-4.34"/>
                <circle cx="11" cy="11" r="8"/>
              </svg>
            </button>
          </form>
        </div>

        {/* ICONOS */}
        <div className="d-flex align-items-center gap-1">

        {/* FAVORITOS */}
        <Link className="btn btn-light position-relative btn-icon rounded-circle btn-icon-top" to="/pages/Profile?view=favorites"><i className="bi bi-heart"></i></Link>
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="btn btn-light position-relative btn-icon-top">
              <i className="bi bi-heart"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ minWidth: "25rem" }}>
              <div className="p-3">
                <h5>Favoritos</h5>
                <div>Producto 1</div>
              </div>
            </Dropdown.Menu>
          </Dropdown> */}

          {/* NOTIFICACIONES */}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="btn btn-light position-relative rounded-circle btn-icon btn-icon-top btn-notifications">
              <i className="bi bi-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdowNotifications p-0" style={{ minWidth: "25rem" }}>
              <div className="card">
                <div className="card-header card-header-content-between pt-4 pb-3 ps-4">
                    <h4 className="card-title text-dark mb-0">Notificaciones</h4>
                  </div>
                
                <div className="card-body-height">
                  <div className="list-group notifications">
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pb-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <small className="mb-0 opacity-50">Tu compra fue procesada correctamente.</small>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <small className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </small>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pb-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <small className="mb-0 opacity-50">Tu compra fue procesada correctamente.</small>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <small className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </small>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </Link>

                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pt-3 border-0" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Pago rechazado</h6>
                                  <small className="mb-0 opacity-50">Hubo un problema al procesar tu método de pago. </small>
                              </div>
                              <small className="opacity-50 text-nowrap">15d</small>
                          </div>
                      </Link>
                      
                  </div>
                </div>

                <a className="card-footer text-center py-4 border-top " href="#">
                    <p className="small mb-0 text-dark">Ver todas las notificaciones <i className="bi-chevron-right"></i></p>
                </a>

              </div>
            </Dropdown.Menu>
          </Dropdown>


          {/* Carrito */}
          <div className="dropdown">
              <button
                className="btn btn-light position-relative btn-icon rounded-circle btn-icon-top"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
              >
                <i className="bi bi-cart3"></i>
                {cart.length > 0 && (
                  <span className="quantity-add">
                    {cart.length}
                  </span>
                )}
              </button>
          </div>

        </div>

      </div>
    </header>
  );
}

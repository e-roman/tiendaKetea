import { useState } from "react";

// src/components/header/MainHeader.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../../src/hooks/useCart";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import Select from "react-select"; 
import products from "../../../data/products.json"; 
import { megaMenuData } from "./megaMenuData";


export default function MainHeader() {

  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    navigate(`/buscar/${encodeURIComponent(query)}`);
    clearSearch();
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


  const { cart } = useCart(); // ← FIX


  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const filtered = products
      .filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 6);

    setResults(filtered);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };


  // Opciones para el select
  const categoryOptions = [
    { value: "", label: "Buscar en Categoría" },
    ...megaMenuData.map(cat => ({
      value: cat.id,
      label: cat.label
    }))
  ];


  return (
    <header className="py-2 border-bottom">
      <div className="container d-flex align-items-center justify-content-between ">
        
        {/* LOGO */}
        <Link to="/" className="navbar-brand">
          <img src="assets/img/logo/logo-ketea.svg" alt="Ketea S.A" height="42" />
        </Link>

       {/* BUSCADOR */}
        <div className="flex-grow-1 ps-6 pe-6 d-none d-md-block">
            <div className="d-flex position-relative">
                <div>
                <Select
                    options={categoryOptions}
                    defaultValue={categoryOptions[0]}
                    classNamePrefix="custom-select"
                    isSearchable={false}
                />
                </div>

                <div className="position-relative w-100">
                    <input 
                        id="search"
                        type="text"
                        className="form-control form-control-lg shadow-none input-search"
                        placeholder="Buscar productos, marcas y más…"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                        autoComplete="off"
                        />

                <button
                  type="button"
                  className="btn btn-lg rounded-2 bg-light btn-search"
                  onClick={handleSearchSubmit}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search">
                    <path d="m21 21-4.34-4.34"/>
                    <circle cx="11" cy="11" r="8"/>
                </svg>
                </button>

                {/* DROPDOWN DE RESULTADOS */}
                {results.length > 0 && (
                <div
                    className="search-dropdown position-absolute w-100 mt-2 p-3 bg-white rounded shadow-sm"
                    style={{ zIndex: 999 }}
                >
                    {results.map((item) => (
                    <Link
                        key={item.id}
                        // to={`/product/${slugify(item.title)}`}
                        to={`/product/${item.slug}`}
                        className="d-flex align-items-center gap-3 py-2 px-1 border-bottom text-decoration-none text-dark"
                        onClick={clearSearch}
                    >
                        <img
                        src={item.image.replace("../", "/")}
                        alt={item.title}
                        width="55"
                        height="55"
                        className="rounded border"
                        />

                        <div>
                        <strong className="d-block">{item.title}</strong>

                        <span className="text-muted small">
                            ${item.price.toLocaleString("es-AR")}
                        </span>

                        <div className="small text-secondary">
                            {item.categories.slice(0, 2).join(" • ")}
                        </div>
                        </div>
                    </Link>
                    ))}

                    {/* Ver todos */}
                    <div className="text-center mt-3">
                    <Link
                        to={`/buscar/${encodeURIComponent(query)}`}
                        className="btn btn-sm btn-primary px-5"
                        onClick={clearSearch}
                    >
                        Ver todos los resultados
                    </Link>
                    </div>
                </div>
                )}
               </div>
            </div>
        </div>

        {/* ICONOS */}
        <div className="d-flex align-items-center gap-1">

        {/* FAVORITOS */}
        <Link className="btn btn-light position-relative btn-icon rounded-circle btn-icon-top" to="/pages/Profile?view=favorites"><i className="bi bi-heart"></i></Link>


          {/* NOTIFICACIONES */}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="btn btn-light position-relative rounded-circle btn-icon btn-icon-top btn-notifications">
                  <span className="notifications-active"> </span>
              <i className="bi bi-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdowNotifications p-0" style={{ minWidth: "25rem" }}>
              <div className="card">
                <div className="card-header card-header-content-between pt-4 pb-3 ps-4">
                    <h5 className="card-title text-dark mb-0">Notificaciones</h5>
                  </div>
                
                <div className="card-body-height">
                  <div className="list-group notifications">
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pt-2 pb-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <p className="mb-0 opacity-50">Tu compra fue procesada correctamente.</p>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <p className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </p>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pb-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <p className="mb-0 opacity-50">Tu compra fue procesada correctamente.</p>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <p className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </p>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </Link>

                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 ps-0 pt-3 border-0" aria-current="true">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light notif-icon"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Pago rechazado</h6>
                                  <p className="mb-0 opacity-50">Hubo un problema al procesar tu método de pago. </p>
                              </div>
                              <small className="opacity-50 text-nowrap">15d</small>
                          </div>
                      </Link>
                      
                  </div>
                </div>

                <Link className="card-footer text-center py-3 border-top" to="/pages/Profile?view=notificaciones">
                    <p className="small mb-0 text-dark py-1">Ver todas las notificaciones </p>
                </Link>

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

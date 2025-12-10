import { useEffect } from "react";
import { Dropdown } from "bootstrap";
import { useCart } from "../src/hooks/useCart";

export default function Header() {
  const { cart } = useCart();

  useEffect(() => {
    document
      .querySelectorAll('[data-bs-toggle="dropdown"]')
      .forEach((el) => new Dropdown(el));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container-fluid">

        <a className="navbar-brand">Tienda</a>

        <div className="d-flex align-items-center">
          <input className="form-control me-2" placeholder="Buscar..." />
          <select className="form-select me-3" style={{ width: 160 }}>
            <option value="">Todas</option>
            <option value="destacados">Destacados</option>
            <option value="ofertas">Ofertas</option>
          </select>

          {/* FAVORITOS */}
          <button className="btn me-3">
            <i className="bi bi-heart"></i>
          </button>

          {/* PERFIL */}
          <div className="dropdown me-3">
            <button
              className="btn"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item">Datos personales</a></li>
              <li><a className="dropdown-item">Favoritos</a></li>
              <li><a className="dropdown-item">Pedidos</a></li>
              <li><a className="dropdown-item">Comprobantes</a></li>
              <li><a className="dropdown-item">Direcciones</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-danger">Cerrar sesión</a></li>
            </ul>
          </div>

          {/* CARRITO */}
          <button
            className="btn position-relative"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
          >
            <i className="bi bi-cart"></i>
            {cart.length > 0 && (
              <span className="quantity-add">{cart.length}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

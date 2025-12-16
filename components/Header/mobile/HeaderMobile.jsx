import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="header-mobile">
        <button className="burger" onClick={() => setOpen(true)}>
          <i className="bi bi-list"></i>
        </button>

        <Link to="/" className="logo">
          <img src="/assets/img/logo.svg" alt="Logo" />
        </Link>

        <Link to="/cart" className="icon">
          <i className="bi bi-cart"></i>
        </Link>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close" onClick={() => setOpen(false)}>
          <i className="bi bi-x"></i>
        </button>

        <nav>
          <button onClick={() => goTo("/novedades")}>Novedades</button>
          <button onClick={() => goTo("/descuentos")}>Descuentos</button>
          <button onClick={() => goTo("/buscar")}>Buscar</button>
        </nav>
      </div>
    </>
  );
}

import { Link, useLocation } from "react-router-dom";

const BACK_BY_STEP = {
  "/checkout": { to: "/cart", label: "Regresar", extra: "a mi Carrito" },
  "/checkout/entrega": { to: "/checkout", label: "Regresar" },
  "/checkout/pago": { to: "/checkout/entrega", label: "Regresar" },
};

export default function HeaderCheckOut() {
  const location = useLocation();
  const back = BACK_BY_STEP[location.pathname] || { to: "/cart", label: "Regresar" };

  return (
   <>
   <header className="py-2 border-bottom sticky-nav bg-white">
        <div className="container position-relative d-flex align-items-center justify-content-between">

        {/* BACK */}
        <div>
          <Link to={back.to}>
            <i className="bi bi-arrow-left me-1"></i>
            {back.label} {back.extra && <span className="d-none d-inline">{back.extra}</span>}
          </Link>
        </div>

        {/* LOGO */}
        <div className="position-absolute top-50 start-50 translate-middle">
          <Link to="/" className="navbar-brand">
            <img src="../assets/img/logo/logo.svg" alt="Ketea" height="45" />
          </Link>
        </div>

        {/* SEGURIDAD */}
        <div>
          <div className="security-seal">
            <span className="d-inline-block">
              <img alt="Compra Segura" src="https://checkout-front.tiendanube.com/production/2.3.619/_next/server/static/img/safe-shopping.svg" className="security-seal-badge" /></span>
              <span className="d-inline-block text-left">
                <p className="m-none text-uppercase text-semi-bold mb-0"><b>Compra Segura</b></p>
              <p className="m-none text-uppercase mb-0">100% Protegido</p></span>
          </div>
        </div>

        </div>
    </header>
    </>
  );
}
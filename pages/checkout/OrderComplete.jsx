
import { Link, useNavigate } from "react-router-dom";

export default function OrderComplete() {
  const navigate = useNavigate();

  return (
    <>
    <header className="py-2 border-bottom sticky-nav bg-white">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* LOGO */}
        <div>
        <Link to="/" className="navbar-brand">
          <img src="../assets/img/logo/logo.svg" alt="Logo" height="60" />
        </Link>
        </div>

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

    <div className="container py-10">
      <div className="row justify-content-center py-10">
        <div className="col-md-8 col-lg-6">

          <div className="card text-center p-5">
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "6rem" }}></i>
            </div>

            <h1 className="h2 mb-3 font-bold">¡Pago realizado con éxito!</h1>

            <p className="text-muted mb-4">
              Tu pedido fue confirmado correctamente.  
              En breve recibirás un correo con los detalles de la compra.
            </p>

            <div className="border rounded p-3 mb-4 bg-light">
              <p className="mb-1">
                <strong>N° de orden:</strong> #784512
              </p>
              <p className="mb-1">
                <strong>Método de pago:</strong> Tarjeta de crédito
              </p>
              <p className="mb-0">
                <strong>Total:</strong> $11.284.320,00
              </p>
            </div>

            <div className="d-flex  gap-3 justify-content-center">
              <button
                className="btn btn-sm btn-primary rounded-pill px-5"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </button>

              <button
                className="btn btn-sm btn-outline-secondary rounded-pill px-5"
                onClick={() => navigate("/pages/Profile?view=orders")}
              >
                Ver mis pedidos
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    </>
  );
}

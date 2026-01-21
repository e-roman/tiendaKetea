import { Link, useNavigate } from "react-router-dom";
import StepsCheckout from "./SteppersCheck";


export default function HeaderCheckOut() {

  return (
   <>
   <header className="py-2 border-bottom sticky-nav bg-white">
        <div className="container d-flex align-items-center justify-content-between">
        
        {/* LOGO */}
        <div>
        <Link to="/" className="navbar-brand">
          <img src="../assets/img/logo/logo.svg" alt="Ketea" height="45" />
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
    </>
  );
}
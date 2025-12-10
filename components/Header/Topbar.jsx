// src/components/header/Topbar.jsx
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar d-none d-lg-block border-bottom" id="sectionHome">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <small className="mb-0">Bienvenido a tienda Ketea S.A. </small>
          </div>
          <div className="col-lg-7">
          {/*<!-- Nav -->*/}
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" href="[+54 9][113065-6942]">
                <small><i className="bi bi-whatsapp"></i> (+54) 911 3065-6942</small>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link border-start px-3" href="contacto">
                <small><i className="bi bi-envelope"></i>  info@ketea.com.ar</small></Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link border-start px-3" href="contacto">
                <small><i className="bi bi-geo-alt"></i> Sucursales</small></Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link border-start px-3 pe-0" href="como-comprar">
                <small><i className="bi bi-question-circle"></i> Ayuda</small>
              </Link>
            </li>
          </ul>
          {/*<!-- End Nav -->*/}
          </div>
        </div>
      </div>
    </div>
  );
}

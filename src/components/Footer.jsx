import { Link } from "react-router-dom";
import BrandsLogos from "../components/BrandsLogos";

export default function Footer() {
  return (
    <>
      <BrandsLogos />

      <footer className="bg-white">
        <div className="container">
          <div className="row justify-content-lg-between content-space-t-1 content-space-b-lg-1">

            {/* ===== MI CUENTA ===== */}
            <div className="col-12 col-sm-4 col-lg-2 mb-0 mb-lg-0">

              {/* Mobile toggle */}
              <button
                className="btn w-100 d-flex justify-content-between text-start d-lg-none fw-semibold px-0 border-bottom"
                data-bs-toggle="collapse"
                data-bs-target="#footer-account"
                aria-expanded="false"
              >
                Mi Cuenta

                <i className="bi bi-chevron-down"></i>
              </button>

              {/* Desktop title */}
              <h5 className="d-none d-lg-block">Mi Cuenta</h5>

              <ul
                id="footer-account"
                className="list-unstyled pt-2 pb-3 list-py-1 collapse d-lg-block"
              >
                <li>
                  <a
                    className="btn link-sm text-secondary p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("authStep", { detail: "login" })
                      )
                    }
                  >
                    Ingresar
                  </a>
                </li>

                <li>
                  <a
                    className="btn link-sm text-secondary p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("authStep", { detail: "signup" })
                      )
                    }
                  >
                    Registrarse
                  </a>
                </li>

                <li>
                  <a className="link-sm text-secondary" href="#">
                    Recuperar contraseña
                  </a>
                </li>

                <li>
                  <a className="link-sm text-secondary" href="#">
                    Botón de arrepentimiento
                  </a>
                </li>
              </ul>
            </div>

            {/* ===== INFORMACIÓN ===== */}
            <div className="col-12 col-sm-4 col-lg-2 mb-3 mb-lg-0">

              {/* Mobile toggle */}
              <button
                className="btn w-100 d-flex justify-content-between text-start d-lg-none fw-semibold px-0 border-bottom"
                data-bs-toggle="collapse"
                data-bs-target="#footer-info"
                aria-expanded="false"
              >
                Información

                <i className="bi bi-chevron-down"></i>
              </button>

              {/* Desktop title */}
              <h5 className="d-none d-lg-block">Información</h5>

              <ul
                id="footer-info"
                className="list-unstyled pt-2 pb-3 list-py-1 collapse d-lg-block"
              >
                <li><a className="link-sm text-secondary" href="#">Preguntas frecuentes</a></li>
                <li><a className="link-sm text-secondary" href="#">Cómo comprar</a></li>
                <li><a className="link-sm text-secondary" href="#">Políticas de privacidad</a></li>
                <li><a className="link-sm text-secondary" href="#">Términos y condiciones</a></li>
                <li><a className="link-sm text-secondary" href="#">Preferencias de cookies</a></li>
              </ul>
            </div>

            {/* ===== CONTACTO ===== */}
            <div className="col-sm-4 col-lg-2 mb-7 mb-lg-0">
              <h5 className="mb-3">Contacto</h5>

              <ul className="list-unstyled list-py-1 mb-3">
                <li className="d-none d-md-block"><a className="link-sm link-secondary" href="#">Dónde encontrarnos</a></li>
                <li className="d-block d-md-none"><p className="mb-0 small">Cnel. Brandsen 2230, B1704DER Ramos Mejía, Provincia de Buenos Aires</p></li>
                <li><a className="link-sm link-secondary" href="#">info@ketea.com.ar</a></li>
                <li><a className="link-sm link-secondary" href="#">(+54) 911 3065-5787</a></li>
              </ul>
            </div>

            {/* ===== NEWSLETTER ===== */}
            <div className="col-md-7 col-lg-5">
              <div className="mb-3">
                <h5>Subscribite al Newsletter</h5>
                <p className="link-sm">
                  Recibe nuestras ofertas semanales y promociones.
                </p>
              </div>

              <form>
                <div className="input-card shadow-none input-card-sm border mb-3 p-1 input-subscribe">
                  <div className="input-card-form">
                    <label
                      htmlFor="subscribeForm"
                      className="form-label visually-hidden"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="subscribeForm"
                      placeholder="Escribe tu email"
                      type="text"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm font-medium"
                  >
                    Suscribirse
                  </button>
                </div>
              </form>

              <small className="link-sm">
                Puedes darte de baja en cualquier momento.{" "}
                <Link to="/politicas-privacidad" className="link-primary">
                  Política de Privacidad
                </Link>
              </small>
            </div>
          </div>

          <hr className="my-0" />

          {/* ===== FOOTER BOTTOM ===== */}
          <div className="row align-items-center justify-content-between py-4">
            <div className="col-sm mb-4 mb-sm-0">
              <small className="text-black">
                <b>©Ketea S.A.</b> Todos los derechos reservados.
              </small>
            </div>

            <div className="col-sm mb-4 mb-sm-0">
              <div className="d-flex gap-2 flex-wrap">
                <img src="../assets/img/cards/visa.svg" alt="Visa" />
                <img src="../assets/img/cards/mastercard.svg" alt="Mastercard" />
                <img src="../assets/img/cards/amex.svg" alt="Amex" />
                <img src="../assets/img/cards/argencard.svg" alt="Argencard" />
                <img src="../assets/img/cards/naranja.svg" alt="Naranja" />
                <img src="../assets/img/cards/cencosud.svg" alt="Cencosud" />
                <img src="../assets/img/cards/nativa.svg" alt="Nativa" />
                <img src="../assets/img/cards/cabal.svg" alt="Cabal" />
              </div>
            </div>

            <div className="col-sm text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <small className="text-black pe-1">Seguinos en:</small>
                </li>
                <li className="list-inline-item">
                  <a
                    className="btn text-secondary btn-social btn-icon"
                    href="https://www.facebook.com/keteaSA/"
                  >
                    <i className="bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="btn text-secondary btn-social btn-icon"
                    href="https://www.instagram.com/keteapiscinas/"
                  >
                    <i className="bi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

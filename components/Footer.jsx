import { Link } from "react-router-dom";
import BrandsLogos from "../components/BrandsLogos";

export default function Footer() {
  return (
    <>
    <BrandsLogos />

    <footer className="bg-white">
      <div className="container">

        <div className="row justify-content-lg-between content-space-t-1 content-space-b-lg-1">


          <div className="col-6 col-sm-4 col-lg-2 mb-7 mb-lg-0">
            <h5>Mi Cuenta</h5>

            {/*-- List --*/}
            <ul className="list-unstyled list-py-1">
              <li>
                <a
                  className="btn link-sm text-secondary p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                  onClick={() => window.dispatchEvent(new CustomEvent("authStep", { detail: "login" }))}
                > Ingresar
                </a>
              </li>
              <li>
                <a
                  className="btn link-sm text-secondary p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                  onClick={() => window.dispatchEvent(new CustomEvent("authStep", { detail: "signup" }))}
                > Registrarse
                </a>
              </li>
              <li><a className="link-sm text-secondary" href="#">Recuperar contraseña</a></li>
            </ul>
            {/*-- End List --*/}
          </div>
          {/*-- End Col --*/}

          <div className="col-6 col-sm-4 col-lg-2 mb-7 mb-lg-0">
            <h5>Información</h5>
            {/*-- List --*/}
            <ul className="list-unstyled list-py-1">
              <li><a className="link-sm text-secondary" href="#">Preguntas frecuentes</a></li>
              <li><a className="link-sm text-secondary" href="#">Como comprar</a></li>
              <li><a className="link-sm text-secondary" href="#">Políticas de privacidad</a></li>
              <li><a className="link-sm text-secondary" href="#">Términos y condiciones</a></li>
              <li><a className="link-sm text-secondary" href="#">Preferencias de cookies</a></li>
            </ul>
            {/*-- End List --*/}
          </div>
          {/*-- End Col --*/}

          <div className="col-sm-4 col-lg-2 mb-7 mb-lg-0">
            <h5 className="mb-3">Contacto</h5>

            {/*-- List --*/}
            <ul className="list-unstyled list-py-1 mb-3">
              <li><a className="link-sm link-secondary" href="#"> info@ketea.com.ar</a></li>
              <li><a className="link-sm link-secondary" href="#"> (+54) 911 3065-5787</a></li>
            </ul>
            {/*-- End List --*/}
          

          </div>
          {/*-- End Col --*/}



          <div className="col-md-7 col-lg-5">
            <div className="mb-3">
              <h5>Subscribite al Newsletter</h5>
              <p className="link-sm">Recibe nuestras ofertas semanales y promociones especiales.</p>
            </div>


            <form>
              <div className="input-card shadow-none input-card-sm border mb-3 p-1 input-subscribe">
                <div className="input-card-form">
                  <label for="subscribeForm" className="form-label visually-hidden">Enter email</label>
                  <input className="form-control" id="subscribeForm" placeholder="Escribe tu email" type="text" />
                  </div>
                  <button type="button" className="btn btn-primary btn-sm font-medium">Suscribirse</button>
                </div>
            </form>

            <div>
              <small className="link-sm">Puedes darte de baja en cualquier momento. <Link to="pliticas-privacidad" className="link-primary">Política de Privacidad</Link></small>
            </div>


            {/* <!-- End Subscribe Form --> */}
          </div>





        </div>
        {/*-- End Row --*/}

        <hr className="my-0" />

        <div className="row align-items-center justify-content-between py-4">
          <div className="col-sm mb-4 mb-sm-0">
            <small className="text-black"><b>©Ketea S.A.</b> Todos los derechos reservados.</small>
          </div>


          <div className="col-sm mb-4 mb-sm-0">
            <div className="d-flex gap-2">
                <div><img src="../assets/img/cards/visa.svg" alt="Visa" /></div>
                <div><img src="../assets/img/cards/mastercard.svg" alt="Mastercard" /></div>
                <div><img src="../assets/img/cards/amex.svg" alt="Amex" /></div>
                <div><img src="../assets/img/cards/argencard.svg" alt="argencard"/></div>
                <div><img src="../assets/img/cards/naranja.svg" alt="naranja" /></div>
                <div><img src="../assets/img/cards/cencosud.svg" alt="cencosud" /></div>
                <div><img src="../assets/img/cards/nativa.svg" alt="Nativa" /></div>
                <div><img src="../assets/img/cards/cabal.svg" alt="Cabal" /></div>
            </div>
          </div>
    

          <div className="col-sm text-md-end">
            {/*-- List --*/}
            <ul className="list-inline">
              <li className="list-inline-item">
                <small className="font-mdium text-black pe-1">Seguinos en:</small>
              </li>
              <li className="list-inline-item">
                  <a className="btn text-secondary btn-social btn-icon" href="https://www.facebook.com/keteaSA/?locale=es_LA">
                    <i className="bi-facebook"></i>
                  </a>
              </li>
              <li className="list-inline-item">
                  <a className="btn text-secondary btn-social btn-icon" href="https://www.instagram.com/keteapiscinas/?hl=es">
                    <i className="bi-instagram"></i>
                  </a>
              </li>
            </ul>
            {/*-- End List --*/}
          </div>
        </div>
      </div>
    </footer>
  </>
  );
}
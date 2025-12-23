export default function Footer() {
  return (
  <footer>
    <div className="container">
      <div className="row justify-content-lg-between content-space-t-2 content-space-b-lg-2">
        <div className="col-lg-3 mb-5">
          <div className="d-flex align-items-start flex-column h-100">
            {/*-- Logo --*/}
            <a className="w-100 mb-3 mb-lg-auto" href="index.html" aria-label="Front">
              <img className="brand" src="assets/img/logo/logo.svg" alt="Ketea S.A" />
            </a>
            {/*-- End Logo --*/}
              <small>Coronel Brandsen 2230, <br className="d-none d-md-block"/>Ramos Mejia, Buenos Aires</small>
          </div>
        </div>

        <div className="col-md-6 col-md-4 col-lg-3 ms-lg-auto mb-5 mb-lg-0">
          <h5>Mi Cuenta</h5>

          {/*-- List --*/}
          <ul className="list-unstyled list-py-1">
            <li><a className="link-sm text-secondary" href="#">Login</a></li>
            <li><a className="link-sm text-secondary" href="#">Register</a></li>
            <li><a className="link-sm text-secondary" href="#">Recuperar contraseña</a></li>
          </ul>
          {/*-- End List --*/}
        </div>
        {/*-- End Col --*/}

        <div className="col-md-6 col-md-4 col-lg-3 mb-5 mb-lg-0">
          <h5>Información</h5>
          {/*-- List --*/}
          <ul className="list-unstyled list-py-1">
            <li><a className="link-sm text-secondary" href="#">Preguntas frecuentes</a></li>
            <li><a className="link-sm text-secondary" href="#">Como comprar</a></li>
            <li><a className="link-sm text-secondary" href="#">Políticas de privacidad</a></li>
            <li><a className="link-sm text-secondary" href="#">Preferencias de cookies</a></li>
          </ul>
          {/*-- End List --*/}
        </div>
        {/*-- End Col --*/}

        <div className="col-md-4 col-lg-2 mb-5 mb-lg-0">
          <h5 className="mb-3">Contacto</h5>

          {/*-- List --*/}
          <ul className="list-unstyled list-py-1 mb-3">
            <li><a className="link-sm link-secondary" href="#"><i className="bi bi-envelope"></i> info@ketea.com.ar</a></li>
            <li><a className="link-sm link-secondary" href="#"><i className="bi bi-phone"></i> (+54) 911 3065-5787</a></li>
          </ul>
          {/*-- End List --*/}
        
          {/*-- Button Group --*/}
          <div className="btn-group">
          {/*-- Socials --*/}
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a className="btn btn-soft-secondary btn-social btn-icon rounded-pill" href="https://www.facebook.com/keteaSA/?locale=es_LA">
                  <i className="bi-facebook"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a className="btn btn-soft-secondary btn-social btn-icon rounded-pill" href="https://www.instagram.com/keteapiscinas/?hl=es">
                  <i className="bi-instagram"></i>
                </a>
              </li>
            </ul>
          {/*-- End Socials --*/}
          </div>
          {/*-- End Button Group --*/}
        </div>
        {/*-- End Col --*/}
      </div>
      {/*-- End Row --*/}

      <hr className="my-0" />

      <div className="row align-items-sm-center content-space-1">
        <div className="col-sm mb-4 mb-sm-0">
          <small>Copyright © Ketea S.A. Todos los derechos reservados.</small>
        </div>

        <div className="col-sm-auto">
          {/*-- List --*/}
          <ul className="list-inline list-separator">
            <li className="list-inline-item">
              <a className="link-sm link-secondary" href="page-privacy.html">Política de Privacidad</a>
            </li>
            <li className="list-inline-item">
              <a className="link-sm link-secondary" href="page-terms.html">Terminos y condiciones</a>
            </li>
          </ul>
          {/*-- End List --*/}
        </div>
      </div>
    </div>
  </footer>

  );
}
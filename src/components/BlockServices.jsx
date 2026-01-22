// src/components/Header.jsx
export default function BlockServices() {
  return (
    <>
    <div className="d-none d-md-block">
      <div className="container px-xs-0">
        <div className="card border shadow-none rounded-3">
          <div className="row card-body p-4 ">
            <div className="col-md-4 d-none d-md-block">
              {/*-- Contacts --*/}
              <div className="media">
                <figure className="ie-height-56 w-100 max-width-8 me-4">
                  <img src="assets/svg/icons/icon1.svg" style={{maxWidth:"100%"}}/>
                </figure>
                <div className="media-body pe-md-3">
                  <h4 className="h4 font-medium mb-1">Soporte 24/7</h4>
                  <p className="font-size-1 mb-0">Contáctanos las 24 horas, los 7 días <br/>de la semana.</p>
                </div>
              </div>
              {/*-- End Contacts --*/}
            </div>

            <div className="col-6 col-md-4">
              {/*-- Contacts --*/}
              <div className="media">
                <figure className="ie-height-56 w-100 max-width-8 me-4">
                  <img src="assets/svg/icons/icon2.svg" style={{maxWidth:"100%"}}/>
                </figure>
                <div className="media-body pe-md-3">
                  <h4 className="h4 font-medium mb-1">30 días de devolución</h4>
                  <p className="font-size-1 mb-0">Reembolso completo dentro de los 30 días posteriores a la compra.</p>
                </div>
              </div>
              {/*-- End Contacts --*/}
            </div>

            <div className="col-6 col-md-4">
              {/*-- Contacts --*/}
              <div className="media">
                <figure className="ie-height-56 w-100 max-width-8 me-4">
                  <img src="assets/svg/icons/icon3.svg" style={{maxWidth:"100%"}}/>
                </figure>
                <div className="media-body">
                  <h4 className="h4 font-medium mb-1">Envío gratuito</h4>
                  <p className="font-size-1 mb-0">Recibe automáticamente envío estándar gratuito en cada pedido.</p>
                </div>
              </div>
              {/*-- End Contacts --*/}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="d-block d-md-none">
      <div className="services-box bg-white">
        <div className="wrapper">
          <div className="grid">
              <div className="container">
                  <div className="icon-container">
                      <img className="icon-service" src="./assets/svg/icons/cards.svg" />
                  </div>
                  <div>
                      <p> Medios de pago </p>
                      <a href="#"> Ver promociones </a>
                  </div>
              </div>
              <div className="line"> </div>
              <div className="container">
                  <div className="icon-container">
                      <img className="icon-service" src="./assets/svg/icons/icon3.svg"  style={{maxWidth:"100%"}}/>
                  </div>
                  <div>
                      <p> Envío gratuito </p>
                      <a href="#"> envío estándar </a>
                  </div>
              </div>
          </div>
      </div></div>
    </div>
    </>
  );
}
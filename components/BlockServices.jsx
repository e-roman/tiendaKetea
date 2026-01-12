// src/components/Header.jsx
export default function BlockServices() {
  return (
   
    <div className=" ">
      <div className="container">
        <div className="card shadow-none rounded-3 border">
          <div className="row card-body">
            <div className="col-md-4 mb-7 mb-md-0">
              {/*-- Contacts --*/}
              <div className="media">
                <figure className="ie-height-56 w-100 max-width-8 me-4">
                  <img src="assets/svg/icons/icon1.svg"/>
                </figure>
                <div className="media-body pe-md-3">
                  <h4 className="h4 font-medium mb-1">Soporte 24/7</h4>
                  <p className="font-size-1 mb-0">Contáctanos las 24 horas, los 7 días <br/>de la semana.</p>
                </div>
              </div>
              {/*-- End Contacts --*/}
            </div>

            <div className="col-md-4 mb-7 mb-md-0">
              {/*-- Contacts --*/}
              <div className="media">
                <figure className="ie-height-56 w-100 max-width-8 me-4">
                  <img src="assets/svg/icons/icon2.svg"/>
                </figure>
                <div className="media-body pe-md-3">
                  <h4 className="h4 font-medium mb-1">30 días de devolución</h4>
                  <p className="font-size-1 mb-0">Reembolso completo dentro de los 30 días posteriores a la compra.</p>
                </div>
              </div>
              {/*-- End Contacts --*/}
            </div>

            <div className="col-md-4">
              {/*-- Contacts --*/}
              <div className="media">
                <figure className="ie-height-56 w-100 max-width-8 me-4">
                  <img src="assets/svg/icons/icon3.svg"/>
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
    
  );
}
import { Link } from "react-router-dom";

export default function Block3ColsBanners() {
  return (
    <>
      {/* Banners */}
      <div className="container">
        <div className="row g-3 row-cols-1 row-cols-md-3 content-space-b-md-2">


          <div className="col-md-4 mb-1 mb-md-0">
            <div className="grid-card h-100">
                <div className="colleftText">
                    <div>
                      <h3 className="font-bold text-dark">Bombas de Aguas</h3>
                      <span>Descuento del mes</span>
                    </div>
                    <div className="d-inline-block text-align-center height-auto card-link">
                      <Link className="btn btn-primary btn-sm btn-transition px-4 font-medium" to="#">Ver Productos</Link>
                    </div>
                </div>
                <div className="banner-img">
                    <img src="assets/img/banners/item-3col-1.png" style={{mxWidth:"100%"}} alt="Bombas de Aguas"/>
                </div>
            </div>
          </div>
          


          <div className="col-md-4 mb-1 mb-md-0">
            <div className="grid-card h-100">
                <div className="colleftText">
                    <div>
                      <h3 className="font-bold text-dark">Filtros para piscinas</h3>
                      <span>Descuento del mes</span>
                    </div>
                    <div className="d-inline-block text-align-center height-auto card-link">
                      <Link className="btn btn-primary btn-sm btn-transition px-4 font-medium" to="#">Ver Productos</Link>
                    </div>
                </div>
                <div className="banner-img">
                    <img src="assets/img/banners/item-3col-2.png" style={{mxWidth:"100%"}} alt="Bombas de Aguas"/>
                </div>
            </div>
          </div>
          


          <div className="col-md-4 mb-4 mb-md-0">
              <div className="grid-card h-100">
                  <div className="colleftText">
                      <div>
                        <h3 className="font-bold text-dark">Productos Químicos</h3>
                        <span>Descuento del mes</span>
                      </div>
                      <div className="d-inline-block text-align-center height-auto card-link">
                        <Link className="btn btn-primary btn-sm btn-transition px-4 font-medium" to="#">Ver Productos</Link>
                      </div>
                  </div>
                  <div className="banner-img">
                      <img src="assets/img/banners/item-3col-3.png" style={{mxWidth:"100%"}} alt="Bombas de Aguas"/>
                  </div>
              </div>
          </div>

          
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";

export default function Block3ColsBanners() {
  return (
    <>
      {/* Banners */}
      <div className="container">
        <div className="row g-3 row-cols-1 row-cols-md-3 content-space-b-md-2">


          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card card-lg border shadow-none bg-img-3cols h-100" style={{backgroundImage: "url(assets/img/banners/item-3col-1.png)", minHeight: "15rem"}}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="font-bold text-dark">Bombas de Aguas</h3>
                  <span>Descuento del mes</span>
                </div>
                <div><Link className="btn btn-primary btn-sm btn-transition px-4 font-medium" to="#">Ver Productos</Link></div>
              </div>
            </div>
          </div>
          

          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card card-lg border shadow-none bg-img-3cols h-100" style={{backgroundImage: "url(assets/img/banners/item-3col-2.png)", minHeight: "15rem"}}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="font-bold text-dark">Bombas de Aguas</h3>
                  <span>Descuento del mes</span>
                </div>
                <div><Link className="btn btn-primary btn-sm btn-transition px-4 font-medium" to="#">Ver Productos</Link></div>
              </div>
            </div>
          </div>
          

          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card card-lg border shadow-none bg-img-3cols h-100" style={{backgroundImage: "url(assets/img/banners/item-3col-3.png)", minHeight: "15rem"}}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="font-bold text-dark">Bombas de Aguas</h3>
                  <span>Descuento del mes</span>
                </div>
                <div><Link className="btn btn-primary btn-sm btn-transition px-4 font-medium" to="#">Ver Productos</Link></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";

export default function Block3ColsBanners() {
  return (
    <>
      {/* Banners */}
      <div className="container">
        <div className="row g-2 g-md-3">

          <div className="col-6 col-md-3 h-100">
            <div className="card card-lg border-none shadow-card bg-img-start">
              <div className="card-body text-center p-4">
                <div className="mb-2"><img src="assets/img/banners/item-md-1.png" style={{maxWidth:"100%"}} /></div>
                <div className="my-2"><h4 className="font-medium">Válvulas de PVC</h4></div>
                <Link to="#" className="font-15 font-medium link-primary">Ver Productos</Link>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3 h-100">
            <div className="card card-lg border-none shadow-card bg-img-start">
              <div className="card-body text-center p-4">
                <div className="mb-2"><img src="assets/img/banners/item-md-2.png" style={{maxWidth:"100%"}} /></div>
                <div className="my-2"><h4 className="font-medium">Dosificadores</h4></div>
                <Link to="#" className="font-15 font-medium link-primary">Ver Productos</Link>
              </div>
            </div>
          </div>


<div className="col-md-6 pt-1 pt-md-0">
  <div className="grid-card h-100">
      <div className="colleftText pe-0">
          <div>
              <p className="pre-card-title font-medium">¡Nuevos ingresos!</p>
              <h2 className="card-title font-bold">Bombas de calor para piscinas</h2>
          </div>
          <div>
            <Link className="btn btn-outline-primary btn-sm btn-transition px-4 px-md-5" to="#">Ver Productos</Link>
          </div>
      </div>
      <div className="banner-img">
          <img src="assets/img/banners/item-lg-1.png" className="pe-0 pe-md-3" style={{maxWidth:"100%"}} alt="Bombas de calor"/>
      </div>
  </div>
</div>

          {/* <div className="col-md-6">
             <div className="card card-lg border shadow-none bg-img-lg">
              <div className="card-body d-flex px-4 px-md-5 py-md-4">
                
                <div className="mb-4">
                  <h2 className="card-title">Lanzamiento</h2>
                  <h3 className="card-title font-medium ">Robot Dolphin Pool up</h3>
                  <p className="card-text">Barrefondo Para Piscina</p>
                  <a className="btn btn-outline-primary btn-sm btn-transition px-6" href="#">Ver Producto</a>
                </div>
                

                <div className="mb-2"><img src="assets/img/banners/item-lg-1.png" className="w-100" /></div>

              </div>
            </div>
          </div> */}

        </div>
      </div>
    </>
  );
}

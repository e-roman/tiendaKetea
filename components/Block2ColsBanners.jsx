import { Link } from "react-router-dom";

export default function Block3ColsBanners() {
  return (
    <>
      {/* Banners */}
      <div className="container">
        <div className="row g-3 row-cols-1 row-cols-md-2">

          <div className="col-md-3 mb-4 mb-md-0">
            <div className="card card-lg border shadow-none bg-img-start">
              <div className="card-body text-center p-4">
                <div className="mb-2"><img src="assets/img/banners/item-md-1.png" /></div>
                <div className="my-2"><h4>Válvulas de PVC</h4></div>
                <Link className="" to="#">Ver Productos</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4 mb-md-0">
            <div className="card card-lg border shadow-none bg-img-start">
              <div className="card-body text-center p-4">
                <div className="mb-2"><img src="assets/img/banners/item-md-2.png" /></div>
                <div className="my-2"><h4> Boyas Dosificadoras</h4></div>
                <a className="" href="#">Ver Productos</a>
              </div>
            </div>
          </div>


          <div className="col-md-6">
             <div className="card card-lg border shadow-none bg-img-lg h-100" style={{backgroundImage: "url(assets/img/banners/item-lg-1.png)"}}>
              <div className="card-body">
                <div className="mb-4">
                  <h2 className="card-title">Lanzamiento</h2>
                  <h3 className="card-title font-medium ">Robot Dolphin Pool up</h3>
                  <p className="card-text">Barrefondo Para Piscina</p>
                </div>

                <a className="btn btn-primary btn-sm btn-transition px-6" href="#">Ver Producto</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

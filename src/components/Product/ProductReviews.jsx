// src/components/Produc Detail
import { useEffect } from "react";


export default function ProductsReviews() {


return (

    <>


    {/*!-- Review Section */}
    <div id="reviewSection" className="container space-bottom-2 space-bottom-lg-3">
      <div className="row">
        <div className="col-lg-4 mb-7 mb-lg-0">
          <div className="border-bottom pb-4 mb-4">
            {/*!-- Overall Rating Stats */}
            <div className="card border-0 bg-primary text-white p-4 mb-3">
              <div className="d-flex justify-content-center align-items-center">
                <span className="display-4 font-weight-semi-bold">4.7</span>
                <div className="ms-3">
                  <div className="small">
                    <small className="bi bi-star-fill"></small>
                    <small className="bi bi-star-fill"></small>
                    <small className="bi bi-star-fill"></small>
                    <small className="bi bi-star-fill"></small>
                    <small className="far fa-star"></small>
                  </div>
                  <span className="font-weight-normal"><strong>287</strong> reviews</span>
                </div>
              </div>
            </div>
            {/*!-- End Overall Rating Stats */}

            <h3 className="h4">Rating breakdown</h3>

            {/*!-- Ratings */}
            <ul className="list-unstyled">
              <li className="py-1">
                <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                  <div className="col-3">
                    <span className="text-dark">5 stars</span>
                  </div>
                  <div className="col-7">
                    <div className="progress" style={{height: "4px"}}>
                      <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text-secondary">205</span>
                  </div>
                </a>
              </li>
              <li className="py-1">
                <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                  <div className="col-3">
                    <span className="text-dark">4 stars</span>
                  </div>
                  <div className="col-7">
                    <div className="progress" style={{height: "4px"}}>
                      <div className="progress-bar" role="progressbar" style={{width: "53%"}} aria-valuenow="53" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text-secondary">55</span>
                  </div>
                </a>
              </li>
              <li className="py-1">
                <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                  <div className="col-3">
                    <span className="text-dark">3 stars</span>
                  </div>
                  <div className="col-7">
                    <div className="progress" style={{height: "4px"}}>
                      <div className="progress-bar" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text-secondary">23</span>
                  </div>
                </a>
              </li>
              <li className="py-1">
                <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                  <div className="col-3">
                    <span className="text-dark">2 stars</span>
                  </div>
                  <div className="col-7">
                    <div className="progress" style={{height: "4px"}}>
                      <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text-secondary">0</span>
                  </div>
                </a>
              </li>
              <li className="py-1">
                <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                  <div className="col-3">
                    <span className="text-dark">1 stars</span>
                  </div>
                  <div className="col-7">
                    <div className="progress" style={{height: "4px"}}>
                      <div className="progress-bar" role="progressbar" style={{width: "1%;"}} aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text-secondary">4</span>
                  </div>
                </a>
              </li>
            </ul>
            {/*!-- End Ratings */}
          </div>

          <span className="d-block display-4 font-weight-medium">77%</span>
          <p className="small">of customers recommend this product</p>
        </div>

        <div className="col-lg-8">
          <div className="pl-lg-4">
            {/*!-- Title */}
            <div className="border-bottom pb-4 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="h5 text-secondary font-weight-normal mb-0">Ordenar por</h3>

                {/*!-- Select */}
                <select className="form-select" style={{width: "20%"}}>
                  <option value="mostRecent" selected>Más Reciente</option>
                  <option value="relevant">Relevantes</option>
                  <option value="helpful">Ayuda</option>
                  <option value="newest">Nuevos</option>
                </select>
                {/*!-- End Select */}
              </div>
            </div>
            {/*!-- End Title */}

            {/*!-- Review */}
            <div className="border-bottom pb-4 mb-4">
              {/*!-- Review Rating */}
              <div className="d-flex justify-content-between align-items-center text-secondary font-size-1 mb-3">
                <div className="text-warning">
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                </div>
                <span>April 3, 2019</span>
              </div>
              {/*!-- End Review Rating */}

              <h4 className="h6 font-weight-semi-bold text-uppercase">I jus love it!</h4>
              <p>I bought this hat for my boyfriend, but then i found out he cheated on me so I kept it and I love it!! I wear it all the time and there is no problem with the fit even though its a “mens” hat.</p>

              {/*!-- Reviewer */}
              <div className="text-secondary font-size-1 mb-2">
                <strong className="text-dark">Hailey</strong>
                <span>- Verified Purchase</span>
              </div>
              {/*!-- End Reviewer */}

              {/*!-- Helpful */}
              <div className="font-size-1">
                <span>Was this helpful?</span>
                <span className="ml-2">
                  <a className="link-muted" href="javascript:;">Yes</a>
                  <span className="text-secondary">(45)</span>
                </span>
                <span className="ml-2">
                  <a className="link-muted" href="javascript:;">No</a>
                  <span className="text-secondary">(21)</span>
                </span>
              </div>
              {/*!-- End Helpful */}
            </div>
            {/*!-- End Review */}

            {/*!-- Review */}
            <div className="border-bottom pb-4 mb-4">
              {/*!-- Review Rating */}
              <div className="d-flex justify-content-between align-items-center text-secondary font-size-1 mb-3">
                <div className="text-warning">
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                </div>
                <span>January 19, 2019</span>
              </div>
              {/*!-- End Review Rating */}

              <h4 className="h6 font-weight-semi-bold text-uppercase">Really nice</h4>
              <p>Material is great and the hat is comfortable and stylish.</p>

              {/*!-- Reviewer */}
              <div className="text-secondary font-size-1 mb-2">
                <strong className="text-dark">David</strong>
                <span>- Verified Purchase</span>
              </div>
              {/*!-- End Reviewer */}

              {/*!-- Helpful */}
              <div className="font-size-1">
                <span>Was this helpful?</span>
                <span className="ml-2">
                  <a className="link-muted" href="javascript:;">Yes</a>
                  <span className="text-secondary">(2)</span>
                </span>
                <span className="ml-2">
                  <a className="link-muted" href="javascript:;">No</a>
                  <span className="text-secondary">(0)</span>
                </span>
              </div>
              {/*!-- End Helpful */}
            </div>
            {/*!-- End Review */}

            {/*!-- Review */}
            <div className="border-bottom pb-4 mb-4">
              {/*!-- Review Rating */}
              <div className="d-flex justify-content-between align-items-center text-secondary font-size-1 mb-3">
                <div className="text-warning">
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                  <small className="bi bi-star-fill"></small>
                </div>
                <span>December 21, 2018</span>
              </div>
              {/*!-- End Review Rating */}

              <p>A really well built cap. It looks great and wears just as well. A great staple in ball caps.</p>

              {/*!-- Reviewer */}
              <div className="text-secondary font-size-1 mb-2">
                <strong className="text-dark">Chrizelle</strong>
                <span>- Verified Purchase</span>
              </div>
              {/*!-- End Reviewer */}

              {/*!-- Helpful */}
              <div className="font-size-1">
                <span>Was this helpful?</span>
                <span className="ml-2">
                  <a className="link-muted" href="javascript:;">Yes</a>
                  <span className="text-secondary">(0)</span>
                </span>
                <span className="ml-2">
                  <a className="link-muted" href="javascript:;">No</a>
                  <span className="text-secondary">(0)</span>
                </span>
              </div>
              {/*!-- End Helpful */}
            </div>
            {/*!-- End Review */}

            <div className="d-sm-flex justify-content-sm-end">
              <a className="btn btn-soft-primary rounded-2 px-5 mb-2 me-3" href="#">Read More</a>
              <button type="button" className="btn btn-primary rounded-2 px-5 mb-2">Write a Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*!-- End Review Section */}


    </>
  );
}
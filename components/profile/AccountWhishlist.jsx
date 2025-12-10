export default function AccountWhishlist() {
  return (
      <>
      <div className="card shadow-none">
        <div className="card-header d-sm-flex justify-content-sm-between align-items-sm-center border-bottom">
          <h4 className="card-header-title">Recientemente agregado/s</h4>
          <span className="lh-1">2 items</span>
        </div>

        {/* Body */}
        <div className="card-body">
          {/* Form */}
          <form>
            {/* List Group */}
            <ul className="list-group list-group-flush list-group-no-gutters">
              
              {/* Item */}
              <li className="list-group-item">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      className="avatar avatar-xl avatar-4x3"
                      src="../assets/img/320x320/img2.jpg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <div className="row">
                      <div className="col-sm-7 mb-3 mb-sm-0">
                        <h5>
                          <a className="text-dark" href="#">Originals national backpack</a>
                        </h5>

                        <div className="d-block d-sm-none">
                          <h5 className="mb-1">$29.99</h5>
                        </div>

                        <div className="d-grid gap-1">
                          <div className="text-body">
                            <span className="small">Gender:</span>
                            <span className="fw-semi-bold small">Men</span>
                          </div>

                          <div className="text-body">
                            <span className="small">Color:</span>
                            <span className="fw-semi-bold small">Grey</span>
                          </div>

                          <div className="text-body">
                            <span className="small">Size:</span>
                            <span className="fw-semi-bold small">One size</span>
                          </div>
                        </div>
                      </div>
                      {/* End Col */}

                      <div className="col-sm-3">
                        <div className="row">
                          <div className="col-auto">
                            {/* Select */}
                            <select className="form-select form-select-sm mb-3">
                              <option value="quantity1">1</option>
                              <option value="quantity2">2</option>
                              <option value="quantity3">3</option>
                              <option value="quantity4">4</option>
                              <option value="quantity5">5</option>
                              <option value="quantity6">6</option>
                              <option value="quantity7">7</option>
                              <option value="quantity8">8</option>
                              <option value="quantity9">9</option>
                              <option value="quantity10">10</option>
                            </select>
                            {/* End Select */}
                          </div>

                          <div className="col-auto">
                            <div className="d-grid gap-2">
                              <a className="link-sm link-secondary small" href="javascript:;">
                                <i className="bi-trash me-1"></i> Eliminar
                              </a>

                              <a className="link-sm link-secondary small" href="javascript:;">
                                <i className="bi-heart me-1"></i> Guardar
                              </a>
                            </div>
                          </div>
                          {/* End Col */}
                        </div>
                        {/* End Row */}
                      </div>
                      {/* End Col */}

                      <div className="col-4 col-sm-2 d-none d-sm-inline-block text-right">
                        <span className="h5 d-block mb-1">$29.99</span>
                      </div>
                      {/* End Col */}
                    </div>
                    {/* End Row */}
                  </div>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="list-group-item">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      className="avatar avatar-xl avatar-4x3"
                      src="../assets/img/320x320/img3.jpg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <div className="row">
                      <div className="col-sm-7 mb-3 mb-sm-0">
                        <h5>
                          <a className="text-dark" href="#">Vans large image t-shirt</a>
                        </h5>

                        <div className="d-block d-sm-none">
                          <h5 className="mb-1">$43.99</h5>
                        </div>

                        <div className="d-grid gap-1">
                          <div className="text-body">
                            <span className="small">Gender:</span>
                            <span className="fw-semi-bold small">Women</span>
                          </div>

                          <div className="text-body">
                            <span className="small">Color:</span>
                            <span className="fw-semi-bold small">Core Black / Carbon</span>
                          </div>

                          <div className="text-body">
                            <span className="small">Size:</span>
                            <span className="fw-semi-bold small">S</span>
                          </div>
                        </div>
                      </div>
                      {/* End Col */}

                      <div className="col-sm-3">
                        <div className="row">
                          <div className="col-auto">
                            {/* Select */}
                            <select className="form-select form-select-sm mb-3">
                              <option value="quantity1">1</option>
                              <option value="quantity2">2</option>
                              <option value="quantity3">3</option>
                              <option value="quantity4">4</option>
                              <option value="quantity5">5</option>
                              <option value="quantity6">6</option>
                              <option value="quantity7">7</option>
                              <option value="quantity8">8</option>
                              <option value="quantity9">9</option>
                              <option value="quantity10">10</option>
                            </select>
                            {/* End Select */}
                          </div>

                          <div className="col-auto">
                            <div className="d-grid gap-2">
                              <a className="link-sm link-secondary small" href="javascript:;">
                                <i className="bi-trash me-1"></i> Eliminar
                              </a>

                              <a className="link-sm link-secondary small" href="javascript:;">
                                <i className="bi-heart me-1"></i> Guardar
                              </a>
                            </div>
                          </div>
                          {/* End Col */}
                        </div>
                        {/* End Row */}
                      </div>
                      {/* End Col */}

                      <div className="col-4 col-sm-2 d-none d-sm-inline-block text-right">
                        <span className="h5 d-block mb-1">$29.99</span>
                      </div>
                      {/* End Col */}
                    </div>
                    {/* End Row */}
                  </div>
                </div>
              </li>
              {/* End Item */}
            </ul>
            {/* End List Group */}
          </form>
          {/* End Form */}
        </div>
        {/* End Body */}

        <a className="card-footer card-link text-center border-top" href="#">Continuar comprando</a>
      </div>

    </>
  );
}
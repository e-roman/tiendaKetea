import { Link } from "react-router-dom";

export default function AccountPayment({ onOpenAddCard, onOpenEditCard, onOpenInvoice }) {

  return (
      <>
      <div className="d-grid gap-3 gap-lg-5">

        {/* Card */}
        <div className="card shadow-none p-2 p-lg-5 p-2 p-lg-5">
          <div className="pt-4 pt-md-0 pb-4 mb-3 pb-md-5 mb-md-4 border-bottom">
            <h4 className="card-header-title">Métodos de pago</h4>
          </div>

          {/* Body */}
          <div className="card-body p-1 p-md-0 mt-2 mt-md-3">
            <div className="mb-4">
              <p>
                El cargo se realizará al final del mes o cuando el saldo supere el límite de uso.
                Se aceptan todas las principales tarjetas de crédito y débito.
              </p>
            </div>

            {/* List Group */}
            <ul className="list-group mb-5">

              {/* Item */}
              <li className="list-group-item">
                <div className="mb-2">
                  <h5>
                    Francisco Perez <span className="badge bg-primary ms-1">Principal</span>
                  </h5>
                </div>

                {/* Media */}
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      className="max-width-9 mr-3"
                      src="../assets/img/cards/img2.jpg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <div className="row">
                      <div className="col-sm mb-3 mb-sm-0">
                        <span className="d-block text-dark">MasterCard •••• 3846</span>
                        <small className="d-block text-muted">Crédito - Fecha 06/21</small>
                      </div>

                      <div className="col-sm-auto">
                        <div className="d-flex gap-3">
                          <button
                            className="btn btn-white btn-xs"
                            type="button"
                            onClick={onOpenEditCard}
                          >
                            <i className="bi-pencil-fill me-1"></i> Editar
                          </button>
                          <button type="button" className="btn btn-white btn-xs">
                            <i className="bi-trash me-1"></i> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Media */}
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="list-group-item">
                <div className="mb-2">
                  <h5>
                    Francisco Perez <span className="text-danger small ms-1">Vencida</span>
                  </h5>
                </div>

                {/* Media */}
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      className="max-width-9 mr-3"
                      src="../assets/img/cards/img1.jpg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <div className="row">
                      <div className="col-sm mb-3 mb-sm-0">
                        <span className="d-block text-dark">Visa •••• 9016</span>
                        <small className="d-block text-muted">Débito - Fecha 06/21</small>
                      </div>

                      <div className="col-sm-auto">
                        <div className="d-flex gap-3">
                          <button
                            className="btn btn-white btn-xs"
                            type="button"
                            onClick={onOpenEditCard}
                          >
                            <i className="bi-pencil-fill me-1"></i> Editar
                          </button>
                          <button type="button" className="btn btn-white btn-xs">
                            <i className="bi-trash me-1"></i> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Media */}
              </li>
              {/* End Item */}

            </ul>
            {/* End List Group */}

            {/* Card */}
            <button
              className="card border link-secondary w-100"
              onClick={onOpenAddCard}
              type="button"
              style={{ border: "none", background: "transparent" }}
            >
              <div className="card-body text-center   py-4">
                <div className="mb-2">
                  <i className="bi-credit-card fs-2"></i>
                </div>
                Agregar nueva tarjeta
              </div>
            </button>
            {/* End Card */}
          </div>
          {/* End Body */}
        </div>
        {/* End Card */}

        {/* Card */}
        {/* <div className="card shadow-none">
          <div className="card-header">
            <h5 className="card-header-title">Historial de Pedidos</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle">
              <thead className="thead-light">
                <tr>
                  <th>Referencia</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Comprobante</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><a href="#">#3682303</a></td>
                  <td><span className="badge bg-soft-warning text-warning">Pendiente</span></td>
                  <td>$264</td>
                  <td>22/04/2020</td>
                  <td>
                    <Link className="btn btn-white btn-xs" to="#">
                      <i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-white btn-xs"
                      type="button"
                      onClick={onOpenInvoice}
                    >
                      <i className="bi-eye-fill me-1"></i> Ver Recibo
                    </button>
                  </td>
                </tr>

                <tr>
                  <td><a href="#">#2333234</a></td>
                  <td><span className="badge bg-soft-success text-success">Recibido</span></td>
                  <td>$264</td>
                  <td>22/04/2019</td>
                  <td>
                    <Link className="btn btn-white btn-xs" to="#">
                      <i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-white btn-xs"
                      type="button"
                      onClick={onOpenInvoice}
                    >
                      <i className="bi-eye-fill me-1"></i> Ver Recibo
                    </button>
                  </td>
                </tr>

                <tr>
                  <td><a href="#">#9834283</a></td>
                  <td><span className="badge bg-soft-success text-success">Recibido</span></td>
                  <td>$264</td>
                  <td>22/04/2018</td>
                  <td>
                    <Link className="btn btn-white btn-xs" to="#">
                      <i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-white btn-xs"
                      type="button"
                      onClick={onOpenInvoice}
                    >
                      <i className="bi-eye-fill me-1"></i> Ver Recibo
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        {/* End Card */}

      </div>

    </>
  );
}